import { createClient } from "@/lib/supabase/client";

interface CreatePostDTO {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  cover_image: string;
  content_html: string;
  reading_time: number;
}

export async function createPost(data: CreatePostDTO) {
  const supabase = createClient();

  return await supabase.from("posts").insert(data).select().single();
}
