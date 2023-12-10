export interface Build {
  content: Json
  created_at: string
  created_by: string | null
  id: string
  is_published: boolean
}

export interface Guide {
  attribution: string | null
  content: string
  created_at: string
  created_by: string
  id: number
  title: string
  updated_at: string
}

export interface Profile {
  id: string
  is_admin: boolean | null
  name: string | null
}

export interface BuildFavorite {
  build_id: string | null
  created_at: string
  created_by: string | null
  id: number
}

export interface GuideFavorite {
  guide_id: string | null
  created_at: string
  created_by: string | null
  id: number
}
