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
                previousLabel={<div className="relative w-5 h-5"><Image src={'/ChevronLeft.svg'} alt="left" fill /></div>}
                nextLabel={<div className="relative w-5 h-5"><Image src={'/ChevronRight.svg'} alt="right" fill /></div>}
                breakLabel={'...'}
                pageCount={Math.ceil(allCnt / perPage)}
                marginPagesDisplayed={1}
                pageRangeDisplayed={2}
                onPageChange={clickPagenation}
                containerClassName={'z-0 inline-flex rounded -space-x-px text-sm bg-white my-24'}
                pageLinkClassName={'border border-gray-100 hover:bg-blue-500 hover:text-white inline-flex items-center px-3 py-2'}
                activeClassName={'z-10 bg-blue-500 text-white border border-blue-500 inline-flex items-center'}
                breakLinkClassName={'inline-flex items-center px-3 py-2 border border-gray-100'}
                previousLinkClassName={'inline-flex items-center px-2 py-2 rounded-1 border border-gray-100 hover:bg-blue-500 hover:text-white'}
                nextLinkClassName={'inline-flex items-center px-2 py-2 rounded-r border border-gray-100 hover:bg-blue-500 hover:text-white'}
                disabledClassName={'hidden'}
            />
        </>
    )
}

export default Pagination