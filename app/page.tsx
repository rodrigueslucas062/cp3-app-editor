"use client";

import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!error) {
      await supabase.auth.getSession(); // força sync

      router.push("/editor");
      router.refresh();
    }
  }

  return (
    <div className="flex h-screen">
      <div className="w-full min-h-full bg-orange-400">
        <div>cp3</div>
      </div>
      <div className="flex w-full flex-col justify-center items-center py-auto">
        <input value={email} onChange={(e) => setEmail(e.target.value)} />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Entrar</button>
      </div>
    </div>
  );
}
