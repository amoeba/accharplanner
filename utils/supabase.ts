
import type { SupabaseClient, User } from '@supabase/supabase-js'

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
