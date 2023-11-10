import { createClient } from '@supabase/supabase-js'
import { CAT_CARD } from '../const'
import Link from 'next/link'
import Image from 'next/image'

const supabase = createClient('https://reahvokhwbxlfxbcuupo.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlYWh2b2tod2J4bGZ4YmN1dXBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg4MDU0MDcsImV4cCI6MjAxNDM4MTQwN30.3PyWMmFoqnQn6uwvf2AhWEDvrhfL5PK4IcsJvLi2p10')

const CatCard = () => {
  return (
    <div className='flex flex-wrap grid-cols-3 items-center justify-center w-full'>
        {CAT_CARD.map((cat) => (
            <div className="p-6 my-24 mx-12 h-full justify-center items-start text-black border-2 hover:bg-white hover:shadow-md rounded-3xl group">
                <Link href="/" key={cat.key}>
                    <div className="flex flex-col justify-between items-start gap-2">
                        <h2 className="text-[22px] leading-[26px] font-bold capitalize">
                            {cat.catName}
                        </h2>
                        <p>{cat.breed}</p>
                        <p>{cat.birth}</p>
                        <p>{cat.sex}</p>
                        <p>{cat.detail}</p>
                        <Image src="/cover3.jpg" alt="" width={350} height={400}></Image>
                    </div>
                </Link>
            </div>
        ))}
    </div>
  )
}

export default CatCard