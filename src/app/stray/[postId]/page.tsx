import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import type { Database } from "../../../../lib/database.types"
import StrayDetail from "@/app/components/StrayDetail"

type PageProps = {
    params: {
        postId: string
    }
}

// 迷子情報の詳細
const StrayPostDetail = async ({ params }: PageProps) => {
    const supabase = createServerComponentClient<Database>({
        cookies,
    })

    // セッションの取得
    const {
        data: { session },
    } = await supabase.auth.getSession()

    // データベースから投稿を取得
    const { data: postData } = await supabase
        .from('stray')
        .select('*, profiles(username, avatar_url)')
        .eq('id', params.postId)
        .single()

    if (!postData) {
        return <div className="text-center">投稿が見つかりません</div>
    }

    return <StrayDetail post={postData} />
}

export default StrayPostDetail