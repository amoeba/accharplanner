export interface Guide {
  id: Number,
  title: string,
  created_by: string,
  created_at: Date,
  updated_at: Date,
  content: string,
  attribution: string
}
export interface Profile {
  id: Number,
  name: string,
  is_admin: boolean
}
