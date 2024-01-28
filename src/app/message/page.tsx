import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "../../../lib/database.types";
import { cookies } from "next/headers";

const page = async () => {
    const supabase = createServerComponentClient<Database>({
        cookies,
    })

    return (
        <div className="flex flex-row">
            <div className="flex flex-col px-40 border-r-2 pb-12">
                <h1 className="text-lg pt-4">メッセージ</h1>
            </div>
        </div>
    )
}

export default page