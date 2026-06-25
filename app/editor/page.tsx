import { AppSidebar } from "@/components/app-sidebar";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AuthLayout from "../auth-layout";

export default function Editor() {
  return (
    <AuthLayout>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          {/* <SidebarSeparator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          /> */}
          <SimpleEditor />
        </SidebarInset>
      </SidebarProvider>
    </AuthLayout>
  );
}
