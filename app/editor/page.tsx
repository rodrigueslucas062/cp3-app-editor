import { AppSidebar } from "@/components/app-sidebar";
import { SimpleEditor } from "@/components/tiptap-editor/simple-editor";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AuthLayout from "./layout";

export default function Editor() {
  return (
    <AuthLayout>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <SimpleEditor />
        </SidebarInset>
      </SidebarProvider>
    </AuthLayout>
  );
}
