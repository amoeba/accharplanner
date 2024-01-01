import type { SupabaseClient, User } from "@supabase/supabase-js"
import { createId } from "mnemonic-id"
import type { GuideRow } from "./database.types"

// Builds
export const loadBuild = async function (client: SupabaseClient, id: string) {
  return await client
    .from("builds")
    .select()
    .eq("id", id)
}

export const shareBuild = async function (client: SupabaseClient, build: Build) {
  return await client
    .from("builds")
    .insert({ id: createId(10), content: build})
    .select()
}

export const getNumFavorites = async function (client: SupabaseClient, build_id: string) {
  return await client
    .from("builds_favorites")
    .select("*", { count: 'exact', head: true })
    .eq("build_id", build_id)
}

export const hasAlreadyFavorited = async function (client: SupabaseClient, user: Ref<User>, id: string) {
  if (!user.value) {
    return { count: 0 }
  }

  return await client
    .from("builds_favorites")
    .select("*", { count: 'exact', head: true })
    .eq("build_id", id)
    .eq("created_by", user.value?.id)
}

export const favoriteBuild = async function (client: SupabaseClient, user: Ref<User>, id: string) {
  return await client
    .from("builds_favorites")
    .insert({ build_id: id, created_by: user.value?.id })
    .select()
}

export const unFavoriteBuild = async function (client: SupabaseClient, user: Ref<User>, id: string) {
  return await client
    .from("builds_favorites")
    .delete()
    .eq("build_id", id)
    .eq("created_by", user.value?.id)
}

export const publishBuild = async function (client: SupabaseClient, user: Ref<User>, build: Build) {
  return await client
    .from("builds")
    .insert({ id: createId(10), content: build, is_published: true, created_by: user.value?.id })
    .select()
}

export const getMySharedBuilds = async function (client: SupabaseClient, user: Ref<User>, max: number) {
  return await client
    .from("builds")
    .select(`
      id,
      content,
      created_at,
      created_by,
      is_published,
      profiles (
        name
      ),
      builds_favorites (
        id
      )
    `)
    .order("created_at", { ascending: false })
    .eq("created_by", user.value?.id)
    .limit(max)
}


export const getFeaturedBuilds = async function (client: SupabaseClient, max: number) {
  return await client
    .from("featured_builds")
    .select(`
      build_id,
      builds (
        id,
        created_at,
        content,
        created_by
      )
    `)
    .order("created_at", { ascending: false })
    .limit(max)
}

export const getLastestBuilds = async function (client: SupabaseClient, max: number) {
  return await client
    .from("builds")
    .select(`
      id,
      content,
      created_at,
      profiles (
        name
      ),
      builds_favorites (
        id
      )
    `)
    .order("created_at", { ascending: false })
    .limit(max)
}

// Guides
export const fetchGuide = async function (client: SupabaseClient, id: number | string) {
  return await client.from("guides").select(`
    id,
    created_at,
    updated_at,
    created_by,
    content,
    title,
    attribution,
    profiles (
      name
    )
  `).eq("id", id)
}

export const fetchGuidesCount = async function (client: SupabaseClient) {
  return await client.from("guides").select("*", { count: "exact", head: true })
}

export const fetchGuides = async function (client: SupabaseClient, limit: number, page: number, pageSize: number) {
  const from = (page - 1) * pageSize
  const to = page * pageSize

  return await client.from("guides").select(`
    id,
    title,
    content,
    attribution,
    profiles (
      name
    )
    created_at,
    updated_at,
  `).order("created_at", { ascending: false }).range(from, to).limit(limit)
}

export const updateGuide = async function (client: SupabaseClient, user: Ref<User>, guide: GuideRow) {
  return await client
    .from("guides")
    .update({
      created_by: user.value?.id,
      title: guide.title,
      content: guide.content,
      attribution: guide.attribution,
      updated_at: (new Date()).toISOString(),
    })
    .eq("id", guide.id)
    .select()
}

export const createGuide = async function (client: SupabaseClient, user: Ref<User>, guide: GuideRow) {
  return await client
    .from("guides")
    .insert({
      created_by: user.value?.id,
      title: guide.title,
      content: guide.content,
      attribution: guide.attribution,
    })
    .select()
}

export const deleteGuide = async function (client: SupabaseClient, guide_id: number) {
  return await client
    .from("guides")
    .delete()
    .eq("id", guide_id)
}

// Profiles
export const setProfileName = async function (client: SupabaseClient, user: Ref<User>, name: string) {
  return await client
    .from("profiles")
    .upsert({
      id: user.value?.id,
      name: name,
    })
    .select()
}

export const doesProfileNameAlreadyExist = async function (client: SupabaseClient, name: string) {
  return await client
    .from("profiles")
    .select(`
      name
    `)
    .eq("name", name)
}
