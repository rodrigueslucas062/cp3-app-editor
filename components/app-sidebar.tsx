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
import { SignOutIcon, TextTIcon } from "@phosphor-icons/react/dist/ssr";

function truncateText(value: string, maxLength = 35): string {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength)}...`;
}
const data = {
  navMain: [
    {
      title: "Veículos",
      url: "#",
      items: [
        {
          title: "Nova tabela FIPE é divulgada para junho",
          url: "#",
        },
        {
          title: "Carros elétricos ganham incentivo em SP",
          url: "#",
        },
      ],
    },
    {
      title: "DETRAN",
      url: "#",
      items: [
        {
          title: "Prazo para renovação da CNH é ampliado",
          url: "#",
        },
        {
          title: "Novo serviço digital facilita transferência",
          url: "#",
          isActive: true,
        },
        {
          title: "Consulta de multas recebe atualização",
          url: "#",
        },
        {
          title: "Agendamento online tem novo visual",
          url: "#",
        },
      ],
    },
    {
      title: "Trânsito",
      url: "#",
      items: [
        {
          title: "Fiscalização reforçada nas rodovias",
          url: "#",
        },
        {
          title: "Operação reduz acidentes no feriado",
          url: "#",
        },
        {
          title: "Novos radares entram em funcionamento",
          url: "#",
        },
      ],
    },
    {
      title: "Legislação",
      url: "#",
      items: [
        {
          title: "Mudanças nas regras de emplacamento",
          url: "#",
        },
        {
          title: "Projeto propõe CNH digital ampliada",
          url: "#",
        },
        {
          title: "Atualização do Código de Trânsito em debate",
          url: "#",
        },
      ],
    },
  ],
};

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
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href={item.url}>{truncateText(item.title)}</a>
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
