'use client'

import { useRouter } from "next/navigation"
import Pagination from "./Pagination"

type PageProps = {
    allCnt: number
    perPage: number
}

// ページネーション
const PagePagination = ({ allCnt, perPage }: PageProps) => {
    const router = useRouter()

    const paginationHandler = ({ selected }: { selected: number }): void => {
        router.push(`/adoption/?page=${selected + 1}`)
    }

    return <Pagination allCnt={allCnt} perPage={perPage} clickPagenation={paginationHandler} />
}

export default PagePagination