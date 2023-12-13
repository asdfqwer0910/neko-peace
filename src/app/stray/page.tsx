import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import type { Database } from "../../../lib/database.types"
import { cookies } from "next/headers"
import PagePagination from "../components/PagePagination"
import { SearchType } from "../components/type"
import StrayImage from "../components/StrayImage"
import StrayPost from "../components/StrayPost"

// ページネーション
const getPagination = (page: number, size: number) => {
    const page2 = page -1
    const from = page2 !== 0 ? page2 * size : 0
    const to = page2 ? from + size - 1 : size - 1
    return { from, to }
}

const page = async ({ searchParams }: SearchType) => {
    const supabase = createServerComponentClient<Database>({
        cookies,
    })

  // 1ページに表示する数
  const per_page = 9

  let page = 1
  if (Object.keys(searchParams).length) {
    page = parseInt(searchParams.page, 10)
  }

  const { from, to } = getPagination(page, per_page)

  // セッション取得
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // 投稿取得
  const { data: postData, count } = await supabase
    .from('stray')
    .select('*, profiles(username, avatar_url)', {
        count: 'exact',
    })
    .order('created_at', { ascending: false })
    .range(from, to)

// 投稿が一件もない場合
if (!postData || postData.length === 0) {
    return <div className="text-center">投稿がありません</div>
}

    return (
        <div>
           <StrayImage />
           <div className="grid grid-cols-3 justify-stretch mx-20 mb-10">
                {postData.map((post, index) => {
                    return <StrayPost key={index} post={post} />
                })}
           </div>
           <div className="flex justify-center items-center">
                {postData.length != 0 && <PagePagination allCnt={count!} perPage={per_page} />}
           </div>
        </div>
    )
}

export default page