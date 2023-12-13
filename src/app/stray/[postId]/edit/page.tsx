import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import type { Database } from "../../../../../lib/database.types"
import { cookies } from "next/headers"
import StrayEdit from "@/app/components/StrayEdit"


type PageProps = {
    params: {
        postId: string
    }
}

// 迷子情報の編集ページ
const StrayEditPage = async ({ params }: PageProps) => {
    const supabase = createServerComponentClient<Database>({
        cookies,
    })

    const { data: postData } = await supabase
        .from('stray')
        .select()
        .eq('id', params.postId)
        .single()

    // 投稿が見つからない場合
    if (!postData) {
        return <div className="text-center">投稿が見つかりません</div>
    }

    return <StrayEdit stray={postData} />
}

export default StrayEditPage