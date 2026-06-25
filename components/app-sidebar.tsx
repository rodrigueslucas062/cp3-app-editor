import * as React from "react";

import { SearchForm } from "@/components/search-form";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import { images } from "@/lib/images";
import Image from "next/image";
import { SignOutIcon } from "@phosphor-icons/react/dist/ssr";

function truncateText(value: string, maxLength = 35): string {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength)}...`;
}
const data: any = [];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="flex flex-col items-start">
        <Image
          src={images.logo}
          alt="Logo"
          className="h-8 w-auto object-contain pl-2 pt-2"
          width={64}
          height={32}
        />
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        {data?.navMain?.map((item: any) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item?.items?.map((item: any) => (
                  <SidebarMenuItem key={item?.title}>
                    <SidebarMenuButton asChild isActive={item?.isActive}>
                      <a href={item?.url}>{truncateText(item?.title)}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
        <div className="mt-auto">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <SignOutIcon size={32} />
                <span className="hover:text-red-800">Sair</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
