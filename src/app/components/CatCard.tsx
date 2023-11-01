import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://reahvokhwbxlfxbcuupo.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlYWh2b2tod2J4bGZ4YmN1dXBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg4MDU0MDcsImV4cCI6MjAxNDM4MTQwN30.3PyWMmFoqnQn6uwvf2AhWEDvrhfL5PK4IcsJvLi2p10')

const CatCard = () => {
  return (
    <div className="flex flex-col p-6 my-24 justify-center items-start text-black bg-gray-200 hover:bg-white hover:shadow-md rounded-3xl group">
        <div className="w-full flex justify-between items-start gap-2">
            <h2 className="text-[22px] leading-[26px] font-bold capitalize">
                あああ
            </h2>
        </div>
        <p>
            <span>
                ねこここ
            </span>
        </p>
    </div>
  )
}

export default CatCard