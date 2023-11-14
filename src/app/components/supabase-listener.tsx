"use server"

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import type { Database } from "../../../lib/database.types"
import NavBar from "./Navbar"

const SupabaseListener = async () => {
    const supabase = createServerComponentClient<Database>({ cookies })

    const {
        data: { session },
    } = await supabase.auth.getSession()

    return <NavBar session={session} />
}

export default SupabaseListener