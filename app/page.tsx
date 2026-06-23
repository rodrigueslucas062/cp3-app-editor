import { AppSidebar } from "@/components/app-sidebar";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import {
  SidebarInset,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "radix-ui";

export default function Home() {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <SidebarSeparator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
          </header>
         <SimpleEditor />
        </SidebarInset>
      </SidebarProvider>
      
    </div>
  );
}
