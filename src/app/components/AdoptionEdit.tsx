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
            const {
                register,
                handleSubmit,
                formState: { errors },
            } = useForm({
                // 初期値
                defaultValues: {
                    catname: adoption.catname,
                    pedigree: adoption.pedigree,
                    birth: adoption.birth,
                    sex: adoption.sex,
                    detail: adoption.detail,
                },
                // バリデーション
                resolver: zodResolver(schema),
            })
        }
    }, [])

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
                catname: adoption.catname,
                pedigree: adoption.pedigree,
                birth: adoption.birth,
                sex: adoption.sex,
                detail: adoption.detail,
                image_url,
            })
            .eq('id', adoption.id)
    
            // エラーチェック
            if (updateError) {
                setMessage('エラーが発生しました。' + updateError.message)
                return
            }
    
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
}

export default AdoptionEdit