'use client'

import Image from "next/image"
import ReactPaginate from "react-paginate"

type PaginationType = {
    allCnt: number
    perPage: number
    clickPagenation({ selected }: { selected: number }): void
}

const Pagination = ({ allCnt, perPage, clickPagenation }: PaginationType) => {
    return (
        <>
            <ReactPaginate 
                previousLabel={<Image src={'/ChevronLeft.svg'} alt="left" fill className="h-5 w-5" />}
                nextLabel={<Image src={'/ChevronRight.svg'} alt="right" fill className="h-5 w-5" />}
                breakLabel={'...'}
                pageCount={Math.ceil(allCnt / perPage)}
                marginPagesDisplayed={1}
                pageRangeDisplayed={2}
                onPageChange={clickPagenation}
                containerClassName={'z-0 inline-flex rounded -space-x-px text-sm bg-white'}
                pageLinkClassName={'border border-gray-100 hover:bg-yellow-500 hover:text-white inline-flex items-center'}
                activeClassName={'z-10 bg-blue-200 text-white border border-blue-200 inline-flex items-center'}
                breakLinkClassName={'inline-flex items-center px-3 py-2 border border-gray-100'}
                previousLinkClassName={'inline-flex items-center px-2 py-2 rounded-1 border border-gray-100'}
                nextLinkClassName={'inline-flex items-center px-2 py-2 rounded-1 border border-gray-100'}
                disabledClassName={'hidden'}
            />
        </>
    )
}

export default Pagination