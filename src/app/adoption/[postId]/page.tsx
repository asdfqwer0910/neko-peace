import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { Database } from "../../../../lib/database.types";
import AdoptionDetail from "@/app/components/AdoptionDetail";

type PageProps = {
    params: {
        postId: string
    }
}

// 譲渡猫の詳細ページ
const AdoptionPostDetail = async ({ params }: PageProps) => {
    const supabase = createServerComponentClient<Database>({
        cookies,
    })

    // セッション取得
    const {
        data: { session },
    } = await supabase.auth.getSession()

    // データベースから投稿を取得
    const { data: postData } = await supabase
        .from('adoption')
        .select('*, profiles(username, avatar_url)')
        .eq('id', params.postId)
        .single()
    
    // 投稿が見つからない場合
    if(!postData) {
        return <div className="text-center">投稿が見つかりません</div>
    }

    return <AdoptionDetail post={postData} />
}

export default AdoptionPostDetail