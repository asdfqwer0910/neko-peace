import type { Database } from "../../../lib/database.types";

export type PostType = Database['public']['Tables']['adoption']['Row']
export type StrayType = Database['public']['Tables']['stray']['Row']

type PostProfileType = {
    profiles: {
        username: string | null
        avatar_url: string | null
    } | null
}

export type PostWithProfileType = PostType & PostProfileType
export type StrayWithProfileType = StrayType & PostProfileType

export interface SearchType {
    searchParams: {
        page: string
    }
}