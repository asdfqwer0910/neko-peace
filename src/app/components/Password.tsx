'use client'

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import Loading from "../loading"
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import type { Database } from "../../../lib/database.types"
type Schema = z.infer<typeof schema>

//　バリデーション定義
const schema = z.object({
    password: z.string().min(8, { message: 'パスワードは8文字以上入力してください' }),
    passwordConfirmation: z.string().min(8, { message: 'パスワードは8文字以上入力してください' }),
})
.refine((data) => data.password === data.passwordConfirmation, {
    message: 'パスワードが一致しません',
    path: ['passwordConfirmation'],
})

// パスワード変更
const Password = () => {
    const router = useRouter()
    const supabase = createClientComponentClient<Database>()
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        // 初期値
        defaultValues: { password: '', passwordConfirmation: '' },
        // バリデーション
        resolver: zodResolver(schema),
    })

    const onSubmit: SubmitHandler<Schema> = async (data) => {
        setLoading(true)
        setMessage('')

        try {
            // パスワード更新
            const { error } = await supabase.auth.updateUser({
                password: data.password,
            })

            if (error) {
                setMessage('エラーが発生しました。' + error.message)
                return
            }

            reset()
            setMessage('パスワードを更新しました')
        } catch (error) {
            setMessage('エラーが発生しました。' + error)
        } finally {
            setLoading(false)
            router.refresh()
        }
    }

    return (
        <div className="min-h-full flex items-center justify-center mt-16 mb-32">
            <div className="max-w-lg w-full space-y-8">
                <h2 className="text-center text-2xl font-bold">パスワード変更</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-10">
                        <label htmlFor="password" className="text-md font-bold">新しいパスワード</label>
                            <input 
                                type="password" 
                                autoComplete="none" 
                                placeholder="新しいパスワードを入力してください" 
                                id="password" 
                                className="relative appearance-none rounded-md border block w-full px-3 py-3" 
                                {...register('password', { required: true })}    
                            />
                        <div className="my-3 text-red-500">{errors.password?.message}</div>
                    </div>
                    <div className="mb-10">
                        <label htmlFor="password" className="text-md font-bold">パスワードの確認</label>
                            <input 
                                type="password" 
                                autoComplete="none"
                                id="passwordConfirmation" 
                                className="relative appearance-none rounded-md border block w-full px-3 py-3" 
                                {...register('passwordConfirmation', { required: true })}    
                            />
                        <div className="my-3 text-red-500">{errors.passwordConfirmation?.message}</div>
                    </div>
                    <div className="mb-5">
                        {loading ? (
                            <Loading />
                        ) : (
                        <button
                            type="submit"
                            className="group flex relative w-full justify-center border bg-blue-500 hover:bg-blue-700 border-transparent py-3 rounded-md font-bold text-white mb-5"
                        >
                            変更
                        </button>
                    )}
                    </div>
                </form>

                {message && <div className="text-center text-red-500">{message}</div>}

            </div>
        </div>
    )
}

export default Password