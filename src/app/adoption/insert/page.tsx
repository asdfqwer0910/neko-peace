import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Database } from "../../../../lib/database.types";
import InsertAdoption from "@/app/components/InsertAdoption";

const InsertAdoptionPage = async () => {
    const supabase = createServerComponentClient<Database>({
        cookies,
    })

    const {
        data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
        redirect('/auth/login')
    }

    return (
        <InsertAdoption />
    )
}

export default InsertAdoptionPage