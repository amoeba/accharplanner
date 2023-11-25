export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      builds: {
        Row: {
          content: Json
          created_at: string
          id: string
          is_published: boolean
          user_id: string | null
        }
        Insert: {
          content: Json
          created_at?: string
          id: string
          is_published?: boolean
          user_id?: string | null
        }
        Update: {
          content?: Json
          created_at?: string
          id?: string
          is_published?: boolean
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "builds_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      builds_favorites: {
        Row: {
          build_id: string | null
          created_at: string
          favorited_by: string | null
          id: number
        }
        Insert: {
          build_id?: string | null
          created_at?: string
          favorited_by?: string | null
          id?: number
        }
        Update: {
          build_id?: string | null
          created_at?: string
          favorited_by?: string | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "builds_favorites_build_id_fkey"
            columns: ["build_id"]
            isOneToOne: false
            referencedRelation: "builds"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "builds_favorites_favorited_by_fkey"
            columns: ["favorited_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      guide_favorites: {
        Row: {
          created_at: string
          favorited_by: string
          guide_id: number
          id: number
        }
        Insert: {
          created_at?: string
          favorited_by?: string
          guide_id: number
          id?: number
        }
        Update: {
          created_at?: string
          favorited_by?: string
          guide_id?: number
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "guide_favorites_favorited_by_fkey"
            columns: ["favorited_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "guide_favorites_guide_id_fkey"
            columns: ["guide_id"]
            isOneToOne: false
            referencedRelation: "guides"
            referencedColumns: ["id"]
          }
        ]
      }
      guides: {
        Row: {
          attribution: string | null
          content: string
          created_at: string
          created_by: string
          id: number
          title: string
          updated_at: string
        }
        Insert: {
          attribution?: string | null
          content: string
          created_at?: string
          created_by: string
          id?: number
          title: string
          updated_at?: string
        }
        Update: {
          attribution?: string | null
          content?: string
          created_at?: string
          created_by?: string
          id?: number
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "guides_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          id: string
          is_admin: boolean | null
          name: string | null
        }
        Insert: {
          id: string
          is_admin?: boolean | null
          name?: string | null
        }
        Update: {
          id?: string
          is_admin?: boolean | null
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
