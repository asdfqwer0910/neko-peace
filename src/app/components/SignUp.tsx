'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Database } from '../../../lib/database.types'
import * as z from 'zod'
import Loading from '../loading'
type Schema = z.infer<typeof schema>

//　バリデーション定義
const schema = z.object({
    email: z.string().email({ message: 'メールアドレスの形式ではありません' }),
    password: z.string().min(8, { message: 'パスワードは8文字以上入力してください' }),
    passwordConfirmation: z.string()
})
.refine((data) => data.password === data.passwordConfirmation, {
    message: 'パスワードが一致しません',
    path: ['passwordConfirmation'],
})

const SingUp = () => {
    const router = useRouter();
    const supabase = createClientComponentClient<Database>()
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        //　初期値
        defaultValues: { email: '', password: '', passwordConfirmation: '' },
        //　バリデーション
        resolver: zodResolver(schema),
    })

    const onSubmit: SubmitHandler<Schema> = async (data) => {
        setLoading(true)

        try {
            const { error: errorSignup } = await supabase.auth.signUp({
                email: data.email,
                password: data.password,
                options: {
                    emailRedirectTo: `${location.origin}/auth/callback`,
                },
            })

            if(errorSignup) {
                setMessage('エラーが発生しました。' + errorSignup.message)
                return
            }

            // const { error: updateError } = await supabase.from('profiles').update({
            //     lastName: data.lastName,
            //     firstName: data.firstName,
            //     address: data.address,
            // }).eq('email', data.email)

            // if (updateError) {
            //     setMessage('エラーが発生しました。' + updateError.message)
            //     return
            // }

            reset()
            setMessage(
                '本登録用のURLを記載したメールを送信しました。URLをクリックして、会員登録を完了させてください。'
            )
        } catch (error) {
            setMessage('エラーが発生しました。' + error)
            return
        } finally {
            setLoading(false)
            router.refresh()
        }
    };
    
  return (
    <div className="min-h-full flex items-center justify-center mt-16 mb-32">
        <div className="max-w-lg w-full space-y-8">
            <h2 className="text-center text-2xl font-bold">新規会員登録</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-10">
                    <label htmlFor="email" className="text-md font-bold">メールアドレス</label>
                    <input 
                        type="email" 
                        autoComplete="none" 
                        placeholder="nekopeace@example.com" 
                        id="email" 
                        className="relative appearance-none rounded-md border block w-full px-3 py-3" 
                        {...register('email', { required: true })}    
                    />
                    <div className="my-3 text-red-500">{errors.email?.message}</div>
                </div>
                <div className="mb-10">
                    <label htmlFor="password" className="text-md font-bold">パスワード</label>
                    <input 
                        type="password"
                        autoComplete="none"
                        id="password"
                        className="relative appearance-none rounded-md border block w-full px-3 py-3"
                        {...register('password', { required: true })}
                    />
                    <div className="my-3 text-red-500">{errors.password?.message}</div>
                </div>
                <div className="mb-10">
                    <label htmlFor="passwordConfirmation" className="text-md font-bold">パスワードの確認</label>
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
                        登録
                    </button>
                    )}
                </div>
            </form>

            {message && <div className="text-center text-red-500">{message}</div>}

            <div className="mb-5">
                <Link href="/auth/login" className="flex items-center justify-center text-gray-500 hover:text-gray-700">
                    既にアカウントをお持ちの方はこちら
                </Link>
            </div>
        </div>
    </div>
  )
}

export default SingUp