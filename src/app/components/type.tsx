import type { Database } from "../../../lib/database.types";

export type PostType = Database['public']['Tables']['adoption']['Row']

type PostProfileType = {
    profiles: {
        username: string | null
        avatar_url: string | null
    } | null
}

export type PostWithProfileType = PostType & PostProfileType

export interface SearchType {
    searchParams: {
        page: string
    }
}