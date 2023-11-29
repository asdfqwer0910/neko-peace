'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import Image from "next/image"
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import Loading from "../loading"
import * as z from 'zod'
import type { Database } from "../../../lib/database.types"
import useStore from "../../../store"
type Schema = z.infer<typeof schema>

//　バリデーション定義
const schema = z.object({
    username: z.string().min(1, { message: '少なくとも一文字以上入力する必要があります' }),
    last_name: z.string(),
    first_name: z.string(),
    address: z.string(),
})

const Profile = () => {
    const router = useRouter()
    const supabase = createClientComponentClient<Database>()
    const [loading, setLoading] = useState(false)
    const [avatar, setAvatar] = useState<File | null>(null)
    const [message, setMessage] = useState('')
    const [fileMessage, setFileMessage] = useState('')
    const [avatarUrl, setAvatarUrl] = useState('/default.svg')
    const { user } = useStore()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        // 初期値
        defaultValues: {
            username: user.username ? user.username : '',
            last_name: user.last_name ? user.last_name : '',
            first_name: user.first_name ? user.first_name : '',
            address: user.address ? user.address: '',
        },
        // バリデーション
        resolver: zodResolver(schema),
    })

    // アバター画像取得
    useEffect(() => {
        if (user && user.avatar_url) {
            setAvatarUrl(user.avatar_url)
        }
    }, [user])

    // 画像アップロード
    const uploadImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        setFileMessage('')

        // ファイルが選択されていない時の処理
        if (!files || files?.length == 0) {
            setFileMessage('画像をアップロードしてください')
            return
        }

        const fileSize = files[0]?.size / 1024 / 1024
        const fileType = files[0]?.type

        if (fileSize > 2) {
            setFileMessage('画像のサイズを2MB以下にする必要があります')
            return
        }

        if (fileType !== 'image/jpeg' && fileType !== 'image/png') {
            setFileMessage('画像はjpgまたはpng形式である必要があります。')
            return
        }

        setAvatar(files[0])
    }, [])

    const onSubmit: SubmitHandler<Schema> = async (data) => {
        setLoading(true)
        setMessage('')

        try {
            let avatar_url = user.avatar_url

            if (avatar) {
                // supabaseに画像アップ
                const { data: storageData, error: storageError } = await supabase.storage
                    .from('profile')
                    .upload(`${user.id}/${uuidv4()}`, avatar)

                // エラーチェック
                if (storageError) {
                    setMessage('エラーが発生しました。' + storageError.message)
                    return
                }

                if (avatar_url) {
                    const fileName = avatar_url.split('/').slice(-1)[0]

                    // 前の画像を削除する
                    await supabase.storage.from('profile').remove([`${user.id}/${fileName}`])
                }

                // 画像のURL取得
                const { data: urlData } = await supabase.storage
                    .from('profile')
                    .getPublicUrl(storageData.path)

                avatar_url = urlData.publicUrl
            }

            // プロフィールアップデート
            const { error: updateError } = await supabase
                .from('profiles')
                .update({
                    username: data.username,
                    last_name: data.last_name,
                    first_name: data.first_name,
                    address: data.address,
                    avatar_url,
                })
                .eq('id', user.id)

            // エラーチェック
            if (updateError) {
                setMessage('エラーが発生しました。' + updateError.message)
                return
            }

            setMessage('プロフィールを更新しました')

        } catch (error) {
            setMessage('エラーが発生しました。' + error)
            return
        } finally {
            setLoading(false)
            router.refresh()
        }
    }

    return (
        <div className="min-h-full flex items-center justify-center mt-16 mb-32">
        <div className="max-w-lg w-full space-y-8">
            <h2 className="text-center text-2xl font-bold">プロフィール</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col justify-center items-center mb-10">
                    <Image src={avatarUrl} className="border-2 rounded-full object-cover" alt="avatar" width={150} height={150} />
                    <div className="mt-5">
                        <input type="file" id="avatar" onChange={uploadImage} />
                        {fileMessage && <div className="my-3 text-red-500">{fileMessage}</div>}
                    </div>
                </div>
                <div className="mb-10">
                    <label htmlFor="username" className="text-md font-bold">ユーザーネーム</label>
                    <input 
                        type="text" 
                        autoComplete="none" 
                        placeholder="例）ネコ太郎" 
                        id="username" 
                        className="relative appearance-none rounded-md border block w-full px-3 py-3" 
                        {...register('username', { required: true })}    
                    />
                    <div className="my-3 text-red-500">{errors.username?.message}</div>
                </div>
                <div className="mb-10">
                    <label htmlFor="lastName" className="text-md font-bold">姓</label>
                    <input 
                        type="text"
                        autoComplete="none"
                        id="lastName"
                        placeholder="例）山田"
                        className="relative appearance-none rounded-md border block w-full px-3 py-3"
                        {...register('last_name', { required: true })}
                    />
                    <div className="my-3 text-red-500">{errors.last_name?.message}</div>
                </div>
                <div className="mb-10">
                    <label htmlFor="firstName" className="text-md font-bold">名</label>
                    <input 
                        type="text"
                        autoComplete="none"
                        id="firstName"
                        placeholder="例）太郎"
                        className="relative appearance-none rounded-md border block w-full px-3 py-3"
                        {...register('first_name', { required: true })}
                    />
                    <div className="my-3 text-red-500">{errors.first_name?.message}</div>
                </div>
                <div className="mb-10">
                    <label htmlFor="address" className="text-md font-bold">住所</label>
                    <input 
                        type="text"
                        autoComplete="none"
                        id="address"
                        placeholder="例）福岡県福岡市博多区"
                        className="relative appearance-none rounded-md border block w-full px-3 py-3"
                        {...register('address', { required: true })}
                    />
                    <div className="my-3 text-red-500">{errors.address?.message}</div>
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

export default Profile