import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("server user:", user);

  if (!user) {
    redirect("/");
  }

  return <div className="min-h-screen flex flex-col">{children}</div>;
}
