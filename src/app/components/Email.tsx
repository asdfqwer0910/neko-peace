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

// バリデーション定義
const schema = z.object({
    email: z.string().email({ message: 'メールアドレスの形式ではありません' })
})

// メール変更
const Email = ({ email }: { email: string }) => {
    const router = useRouter()
    const supabase = createClientComponentClient<Database>()
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        // 初期値
        defaultValues: { email: '' },
        // バリデーション
        resolver: zodResolver(schema),
    })

    const onSubmit: SubmitHandler<Schema> = async (data) => {
        setLoading(true)
        setMessage('')

        try {
            // メール変更のメールを送信
            const { error: updateUserError } = await supabase.auth.updateUser(
                { email: data.email },
                { emailRedirectTo: `${location.origin}/auth/login` }
            )

            // エラーチェック
            if (updateUserError) {
                setMessage('エラーが発生しました。' + updateUserError.message)
                return
            }

            setMessage('メールアドレス変更確認のメールを送信しました。URLをクリックして、変更を完了してください。')

            // ログアウト
            const { error: signOutError } = await supabase.auth.signOut()
             if (signOutError) {
                setMessage('エラーが発生しました。' + signOutError.message)
                return
             }

             router.push('/auth/login')

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
                <h2 className="text-center text-2xl font-bold">メールアドレス変更</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-10">
                    <label className="text-md font-bold">メールアドレス</label>
                        <div>{email}</div>
                    </div>
                    <div className="mb-10">
                        <label htmlFor="email" className="text-md font-bold">新しいメールアドレス</label>
                            <input 
                                type="email" 
                                autoComplete="none" 
                                placeholder="新しいメールアドレスを入力してください" 
                                id="email" 
                                className="relative appearance-none rounded-md border block w-full px-3 py-3" 
                                {...register('email', { required: true })}    
                            />
                        <div className="my-3 text-red-500">{errors.email?.message}</div>
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

export default Email