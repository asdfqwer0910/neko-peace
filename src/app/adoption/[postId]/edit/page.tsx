import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import type { Database } from "../../../../../lib/database.types"
import { cookies } from "next/headers"
import AdoptionEdit from "@/app/components/AdoptionEdit"

type PageProps = {
    params: {
        postId: string
    }
}

// 編集ページ
const AdoptionEditPage = async ({ params }: PageProps) => {
    const supabase = createServerComponentClient<Database>({
        cookies,
    })

    // 保護猫情報取得
    const { data: postData } = await supabase
        .from('adoption')
        .select()
        .eq('id', params.postId)
        .single()

    // 投稿が見つからない場合
    if(!postData) {
        return <div className="text-center">投稿が見つかりません</div>
    }

    return <AdoptionEdit post={postData} />
}

export default AdoptionEditPage