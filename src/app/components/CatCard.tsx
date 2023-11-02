import { createClient } from '@supabase/supabase-js'
import { CAT_CARD } from '../const'
import Link from 'next/link'

const supabase = createClient('https://reahvokhwbxlfxbcuupo.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlYWh2b2tod2J4bGZ4YmN1dXBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg4MDU0MDcsImV4cCI6MjAxNDM4MTQwN30.3PyWMmFoqnQn6uwvf2AhWEDvrhfL5PK4IcsJvLi2p10')

const CatCard = () => {
  return (
    <div className='flex flex-row items-center justify-center w-screen'>
        {CAT_CARD.map((cat) => (
            <Link href="/" key={cat.key}>
                <div className="flex flex-col p-6 my-24 mx-12 justify-center w-full items-start text-black bg-gray-200 hover:bg-white hover:shadow-md rounded-3xl group">
                    <div className="w-full flex flex-col justify-between items-start gap-2">
                        <h2 className="text-[22px] leading-[26px] font-bold capitalize">
                            {cat.catName}
                        </h2>
                        <p>{cat.breed}</p>
                        <p>{cat.birth}</p>
                        <p>{cat.sex}</p>
                        <p>{cat.detail}</p>
                    </div>
                </div>
            </Link>
        ))}
    </div>
  )
}

export default CatCard