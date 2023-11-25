
import type { SupabaseClient, User } from '@supabase/supabase-js'

// Builds
export const loadBuild = async function(client: SupabaseClient, id : string) {
  return await client
    .from("builds")
    .select()
    .eq("id", id);
}

export const getPublishedBuilds = async function (client: SupabaseClient) {
  return await client
    .from("builds")
    .select(
      `
      id,
      content,
      created_at,
      profiles (
        name
      )
    `
    )
    .order("created_at")
    .eq("is_published", true)
    .limit(10);
};

export const getLastestBuilds = async function (client: SupabaseClient) {
  return await client
    .from("builds")
    .select()
    .limit(10)
    .order("created_at");

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
