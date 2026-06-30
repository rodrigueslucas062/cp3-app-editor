"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SimpleEditor } from "@/components/tiptap-editor/simple-editor";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useState } from "react";
import { Post } from "./types";
import { createClient } from "@/lib/supabase/client";

export default function Editor() {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  async function handleDeletePost(post: Post) {
    const supabase = createClient();

    await supabase.from("posts").delete().eq("id", post.id);

    if (selectedPost?.id === post.id) {
      setSelectedPost(null);
    }
  }
  return (
    <SidebarProvider>
      <AppSidebar
        selectedPostId={selectedPost?.id}
        onSelectPost={setSelectedPost}
        onDeletePost={handleDeletePost}
      />

      <SidebarInset>
        <SimpleEditor post={selectedPost} />
      </SidebarInset>
    </SidebarProvider>
  );
}
