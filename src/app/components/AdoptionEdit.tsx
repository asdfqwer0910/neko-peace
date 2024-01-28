'use client'
import { v4 as uuidv4 } from "uuid"
import type { Database } from "../../../lib/database.types"
import { useRouter } from "next/navigation"
import Loading from "../loading"
import useStore from "../../../store"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useCallback, useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Image from "next/image"
import { PEDIGREE, SEX } from "../const"
import { PostWithProfileType } from "./type"
type Schema = z.infer<typeof schema>
type Adoption = Database['public']['Tables']['adoption']['Row']

type PageProps = {
    adoption: Adoption
}

// バリデーション定義
const schema = z.object({
    catname: z.string().min(1, { message: '必ず入力してください' }),
    pedigree: z.string().min(1, { message: '必ず入力してください' }),
    birth: z.string(),
    sex: z.string(),
    detail: z.string(),
})

const AdoptionEdit = ({ adoption }: PageProps) => {
    const supabase = createClientComponentClient<Database>()
    const router = useRouter()
    const { user } = useStore()
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState<File>(null!)
    const [myPost, setMyPost] = useState(false)
    const [fileMessage, setFileMessage] = useState('')
    const [message, setMessage] = useState('')

    useEffect(() => {
        // 自分の投稿かチェック
        if (user.id !== adoption.profile_id) {
            // 他人の投稿の場合は投稿詳細に遷移する
            router.push(`/adoption/${adoption.id}`)
        } else {
            setMyPost(true)
        }
    }, [])

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        // 初期値
        defaultValues: {
            catname: adoption.catname,
            pedigree: adoption.pedigree,
            birth: adoption.birth ? adoption.birth: '',
            sex: adoption.sex,
            detail: adoption.detail ? adoption.detail: '',
        },
        // バリデーション
        resolver: zodResolver(schema),
    })

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

        setImage(files[0])
    }, [])

    const onSubmit: SubmitHandler<Schema> = async (data) => {
        setLoading(true)
        setMessage('')

        try {
            let image_url = adoption.image_url

            if (user.id) {
                if (image) {
                    // supabaseストレージに画像アップ
                    const { data: storageData, error: storageError } = await supabase.storage
                    .from('adoption_photos')
                    .upload(`${user.id}/${uuidv4()}`, image)
    
                if (storageError) {
                    setMessage('エラーが発生しました。' + storageError.message)
                    return
                }
                
                // ファイル名取得
                if (image_url) {
                    const fileName = image_url.split('/').slice(-1)[0]
                    // 古い画像を削除する
                    await supabase.storage
                    .from('adoption_photos')
                    .remove([`${user.id}/${fileName}`])
                }

                // 画像URL取得
                const { data: urlData } = await supabase.storage
                    .from('adoption_photos')
                    .getPublicUrl(storageData.path)
    
                image_url = urlData.publicUrl
            }

            setLoading(false)
        }
        
        // アップデート
        const { error: updateError } = await supabase
        .from('adoption')
        .update({
            catname: data.catname,
            pedigree: data.pedigree,
            birth: data.birth,
            sex: data.sex,
            detail: data.detail,
            image_url,
        })
        .eq('id', adoption.id)

        // エラーチェック
        if (updateError) {
            setMessage('エラーが発生しました。' + updateError.message)
            return
        }
        
        // 投稿詳細に移動
        router.push(`/adoption/${adoption.id}`)
        router.refresh()

        } catch (error) {
            setMessage('エラーが発生しました。' + error)
            return
        } finally {
            setLoading(false)
            router.refresh()
        }
    }

    // ユーザーの投稿を表示
    const renderPost = () => {
        if(myPost) {
            return (
                <div className="flex justify-around my-20 mx-52">
                    <div className="relative w-[450px] h-[500px]">
                        <Image 
                            src={adoption.image_url ? adoption.image_url: '/noimage.png'}
                            className="rounded-md object-cover"
                            alt="image"
                            fill
                        />
                    </div>
                <div className="flex justify-center border rounded-md p-6">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col w-[450px] space-y-12">
                        <div className="flex items-center">
                            <p className="font-bold w-[100px]">名前</p>
                            <input 
                                type="text"
                                id="catname"
                                className="w-full rounded-md border px-3 py-3"
                                {...register('catname', { required: true })}
                            />
                        </div>
                        <div className="flex items-center">
                            <p className="font-bold w-[100px]">生年月日</p>
                            <input 
                                type="date"
                                id="date"
                                className="rounded-md border w-full px-3 py-3"
                                {...register('birth', { required: true })}
                            />
                        </div>
                        <div className="flex items-center">
                            <p className="font-bold w-[100px]">種類</p>
                            <select 
                                id="pedigree"
                                className="rounded-md appearance-none border w-full px-3 py-3"
                                {...register('pedigree', { required: true })}
                            >
                                {PEDIGREE.map((pedi) => (
                                    <option key={pedi.pediCode} value={pedi.pediName}>
                                        {pedi.pediName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-center">
                            <p className="font-bold w-[100px]">性別</p>
                            <select 
                                id="sex"
                                className="appearance-none rounded-md border w-full px-3 py-3"
                                {...register('sex', { required: true })}
                            >
                                {SEX.map((sex) => (
                                    <option key={sex.sexCode} value={sex.types}>
                                        {sex.types}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex-row">
                            <p className="font-bold mb-1">猫ちゃんの性格や特徴</p>
                            <textarea
                                autoComplete="none" 
                                placeholder="猫ちゃんの性格や特徴などを記入してください" 
                                id="detail" 
                                className="relative appearance-none rounded-md border block w-full px-3 py-3"
                                {...register('detail', { required: true })}
                            />
                        </div>
                        <div className="mb-5">
                            {loading ? (
                                <Loading />
                            ) : (
                            <button
                                type="submit"
                                className="group flex relative w-full justify-center border bg-blue-500 hover:bg-blue-700 border-transparent py-3 rounded-md font-bold text-white mb-5"
                            >
                                編集
                            </button>
                            )}
                        </div>
                    </div>
                    </form>
                </div>
            </div>
            )
        }
    }

    return <>{renderPost()}</>
}

export default AdoptionEdit