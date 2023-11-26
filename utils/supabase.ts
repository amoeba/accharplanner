
import type { SupabaseClient, User } from '@supabase/supabase-js'
import { createId } from "mnemonic-id";

// Builds
export const loadBuild = async function (client: SupabaseClient, id: string) {
  return await client
    .from("builds")
    .select()
    .eq("id", id);
}

export const shareBuild = async function (client: SupabaseClient, user: User, build: Build) {
  return await client
    .from("builds")
    .insert({ id: createId(10), content: build, created_by: user.value.id })
    .select();
};

export const hasAlreadyFavorited = async function (client: SupabaseClient, user: User, id: string) {
  return await client
    .from("builds_favorites")
    .select()
    .eq("build_id", id)
    .eq("created_by", user.value.id);
}

export const favoriteBuild = async function(client: SupabaseClient, user: User, id: string) {
  return await client
    .from("builds_favorites")
    .insert({ build_id: id, created_by: user.value.id})
    .select();
}

export const publishBuild = async function(client: SupabaseClient, user:User, build: Build) {
  return await client
    .from("builds")
    .insert({ id: createId(10), content: build, is_published: true, created_by: user.value.id })
    .select();
}

export const getPublishedBuilds = async function (client: SupabaseClient) {
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
    .order("created_at")
    .eq("is_published", true)
    .limit(10);
};

export const getLastestBuilds = async function (client: SupabaseClient) {
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
    .order("created_at")
    .limit(10);
};

// Guides
export const fetchGuide = async function (client: SupabaseClient, id: Number): Guide {
  return await client.from("guides").select().eq("id", id);
};

export const updateGuide = async function (client: SupabaseClient, user: User, guide: Guide): Guide {
  return await client
    .from("guides")
    .update({
      created_by: user.value?.id,
      title: guide.title,
      content: guide.content,
      attribution: guide.attribution
    })
    .eq("id", guide.id)
    .select();
};

export const createGuide = async function (client: SupabaseClient, user: User, guide: Guide): Guide {
  return await client
    .from("guides")
    .insert({
      created_by: user.value?.id,
      title: guide.title,
      content: guide.content,
      attribution: guide.attribution
    })
    .select();
};
