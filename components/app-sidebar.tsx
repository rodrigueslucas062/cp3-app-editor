"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { SignOutIcon, TrashIcon } from "@phosphor-icons/react/dist/ssr";

import { SearchForm } from "@/components/search-form";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import { createClient } from "@/lib/supabase/client";
import { images } from "@/lib/images";
import { Post } from "@/app/editor/types";
import { useRouter } from "next/navigation";

function truncateText(value: string, maxLength = 35) {
  if (value.length <= maxLength) return value;

  return `${value.slice(0, maxLength)}...`;
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  selectedPostId?: string;
  onSelectPost: (post: Post) => void;
  onDeletePost: (post: Post) => void;
}

export function AppSidebar({
  selectedPostId,
  onSelectPost,
  onDeletePost,
  ...props
}: AppSidebarProps) {
  const supabase = createClient();
  const router = useRouter();

  const [posts, setPosts] = useState<Post[]>([]);

  async function handleLogout() {
    await supabase.auth.signOut();

    router.replace("/");
    router.refresh();
  }

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("posts")
        .select("*")
        .order("category")
        .order("created_at", { ascending: false });

      if (data) {
        setPosts(data);
      }
    }

    load();
  }, [supabase]);

  const groupedPosts = useMemo(() => {
    return posts.reduce<Record<string, Post[]>>((acc, post) => {
      if (!acc[post.category]) {
        acc[post.category] = [];
      }

      acc[post.category].push(post);

      return acc;
    }, {});
  }, [posts]);

  return (
    <Sidebar {...props}>
      <SidebarHeader className="space-y-2">
        <Image
          src={images.logo}
          alt="Logo"
          className="h-8 w-auto object-contain pl-2 pt-2"
          width={128}
          height={64}
        />

        <SearchForm />
      </SidebarHeader>

      <SidebarContent>
        {Object.entries(groupedPosts).map(([category, posts]) => (
          <SidebarGroup key={category}>
            <SidebarGroupLabel>{category}</SidebarGroupLabel>

            <SidebarGroupContent className="space-y-4">
              <SidebarMenu className="space-y-2 rounded-md">
                {posts.map((post) => (
                  <SidebarMenuItem key={post.id}>
                    <SidebarMenuButton
                      className="rounded-md"
                      isActive={selectedPostId === post.id}
                      onClick={() => onSelectPost(post)}
                    >
                      <span>{truncateText(post.title)}</span>
                    </SidebarMenuButton>

                    <SidebarMenuAction
                      showOnHover
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeletePost(post);
                      }}
                    >
                      <TrashIcon size={16} />
                    </SidebarMenuAction>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}

        <div className="mt-auto">
          <SidebarMenu>
            <SidebarMenuItem className="px-2 py-4">
              <SidebarMenuButton
                onClick={handleLogout}
                className="cursor-pointer rounded-md border px-2 py-1 transition-colors hover:border-red-500 hover:bg-red-200 hover:text-red-500"
              >
                <SignOutIcon size={18} />
                <span>Sair</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
