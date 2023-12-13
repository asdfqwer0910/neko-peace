'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import Loading from "../loading"
import { useRouter } from "next/navigation"
import { useForm, SubmitHandler } from "react-hook-form"
import * as z from 'zod'
import type { Database } from "../../../lib/database.types"
import { v4 as uuidv4 } from "uuid"
import { useCallback, useState } from "react"
import useStore from "../../../store"
import { PEDIGREE, SEX } from "../const"
type Schema = z.infer<typeof schema>

// バリデーション定義
const schema = z.object({
    catname: z.string().min(1, { message: '必ず入力してください' }),
    pedigree: z.string().min(1, { message: '必ず入力してください' }),
    birth: z.string(),
    sex: z.string(),
    detail: z.string(),
    address: z.string().min(1, { message: '必ず入力してください' }),
    lost_day: z.string(),
})

const StrayInsert = () => {
    const supabase = createClientComponentClient<Database>()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState<File | null>(null)
    const [message, setMessage] = useState('')
    const [fileMessage, setFileMessage] = useState('')
    const { user } = useStore()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        // 初期値
        defaultValues: {
            catname: '',
            pedigree: '',
            birth: '',
            sex: '',
            detail: '',
            address: '',
            lost_day: '',
        },
        // バリデーション
        resolver: zodResolver(schema),
    })

    const uploadImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        setFileMessage('')

        // ファイルが選択されてない時の処理
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

        setImage(files[0])
    }, [])

    const onSubmit: SubmitHandler<Schema> = async (data) => {
        setLoading(true)
        setMessage('')

        try {
            let image_url = ''

            if (image) {
                // supabaseストレージに画像アップ
                const { data: storageData, error: storageError } = await supabase.storage
                .from('stray_photos')
                .upload(`${user.id}/${uuidv4()}`, image)

            if (storageError) {
                setMessage('エラーが発生しました。' + storageError.message)
                return
            }

            if (image_url) {
                const fileName = image_url.split('/').slice(-1)[0]
            }

            // 画像URL取得
            const { data: urlData } = await supabase.storage
                .from('stray_photos')
                .getPublicUrl(storageData.path)

            image_url = urlData.publicUrl
            }

            const { error: insertError } = await supabase.from('stray').insert({
                profile_id: user.id,
                catname: data.catname,
                pedigree: data.pedigree,
                birth: data.birth,
                sex: data.sex,
                detail: data.detail,
                address: data.address,
                lost_day: data.lost_day,
                image_url,
            })

            if (insertError) {
                setMessage('エラーが発生しました。' + insertError.message)
                return
            }

            setMessage('登録完了しました')
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
                <h2 className="text-center text-2xl font-bold">迷子の登録</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col justify-center items-center mb-10">
                        <div className="mt-5">
                            <input type="file" id="avatar" onChange={uploadImage} />
                            {fileMessage && <div className="my-3 text-red-500">{fileMessage}</div>}
                        </div>
                    </div>
                    <div className="mb-10">
                        <label htmlFor="lost_day" className="text-md font-bold">迷子になった日</label>
                        <input 
                            type="date"
                            id="lost_day"
                            className="relative appearance-none rounded-md border block w-full px-3 py-3"
                            {...register('lost_day', { required: true })}
                        />
                        <div className="my-3 text-red-500">{errors.lost_day?.message}</div>
                    </div>
                    <div className="mb-10">
                        <label htmlFor="address" className="text-md font-bold">迷子になった場所</label>
                        <input 
                            type="text"
                            autoComplete="none" 
                            placeholder="例）福岡県福岡市博多区" 
                            id="address" 
                            className="relative appearance-none rounded-md border block w-full px-3 py-3"
                            {...register('address', { required: true })}
                        />
                        <div className="my-3 text-red-500">{errors.address?.message}</div>
                    </div>
                    <div className="mb-10">
                        <label htmlFor="catname" className="text-md font-bold">猫のおなまえ</label>
                        <input 
                            type="text"
                            autoComplete="none" 
                            placeholder="例）ぴーす" 
                            id="catname" 
                            className="relative appearance-none rounded-md border block w-full px-3 py-3"
                            {...register('catname', { required: true })}
                        />
                        <div className="my-3 text-red-500">{errors.catname?.message}</div>
                    </div>
                    <div className="mb-10">
                        <label htmlFor="pedigree" className="text-md font-bold">猫種</label>
                        <select 
                            id="pedigree"
                            className="relative appearance-none rounded-md border block w-full px-3 py-3"
                            {...register('pedigree', { required: true })}
                        >
                            {PEDIGREE.map((pedi) => (
                                <option key={pedi.pediCode} value={pedi.pediName}>
                                    {pedi.pediName}
                                </option>
                            ))}
                        </select>
                        <div className="my-3 text-red-500">{errors.pedigree?.message}</div>
                    </div>
                    <div className="mb-10">
                        <label htmlFor="birth" className="text-md font-bold">お誕生日</label>
                        <input 
                            type="date"
                            id="birth"
                            className="relative appearance-none rounded-md border block w-full px-3 py-3"
                            {...register('birth', { required: true })}
                        />
                        <div className="my-3 text-red-500">{errors.birth?.message}</div>
                    </div>
                    <div className="mb-10">
                        <label htmlFor="sex" className="text-md font-bold">性別</label>
                        <select 
                            id="sex"
                            className="relative appearance-none rounded-md border block w-full px-3 py-3"
                            {...register('sex', { required: true })}
                        >
                            {SEX.map((sex) => (
                                <option key={sex.sexCode} value={sex.types}>
                                    {sex.types}
                                </option>
                            ))}
                        </select>
                        <div className="my-3 text-red-500">{errors.sex?.message}</div>
                    </div>
                    <div className="mb-10">
                        <label htmlFor="detail" className="text-md font-bold">特徴</label>
                        <textarea
                            autoComplete="none" 
                            placeholder="猫ちゃんの特徴などを記入してください" 
                            id="detail"
                            className="relative appearance-none rounded-md border block w-full px-3 py-3"
                            {...register('detail', { required: true })}
                        />
                        <div className="my-3 text-red-500">{errors.detail?.message}</div>
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
            </div>
        </div>
    )
}

export default StrayInsert