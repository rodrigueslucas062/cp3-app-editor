"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LockIcon, MailboxIcon } from "@phosphor-icons/react";
import { Spinner } from "@/components/ui/spinner";
import Image from "next/image";
import { images } from "@/lib/images";
import { createClient } from "@/lib/supabase/client";

export default function Home() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (!error) {
      await supabase.auth.getSession();

      router.push("/editor");
      router.refresh();
    }
  }

  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      <section className="relative hidden overflow-hidden lg:flex">
        <div className="absolute inset-0 bg-zinc-800 " />

        <div className="relative z-10 flex max-w-lg flex-col justify-center px-16 text-white">
          <span className="mb-4 w-fit rounded-full border border-cp3-orange bg-white/10 px-4 py-1 text-sm backdrop-blur">
            Painel Administrativo
          </span>

          <Image src={images.logo} width={256} height={128} alt="Logo CP3" />

          <p className="mt-6 text-lg text-cp3-orange">
            Gerencie publicações, notícias e conteúdos do site de forma rápida e
            organizada.
          </p>
        </div>
      </section>

      <section className="flex items-center justify-center bg-white p-6">
        <div className="w-full max-w-md">
          <div className="space-y-8 p-8">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-bold">Entrar</h2>

              <p className="text-sm text-muted-foreground">
                Acesse o painel administrativo.
              </p>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <Label>E-mail</Label>

                <div className="relative">
                  <MailboxIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    className="pl-10 rounded-md"
                    placeholder="email@empresa.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Senha</Label>

                <div className="relative">
                  <LockIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    className="pl-10 rounded-md"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <Button
                className="w-full"
                size="lg"
                disabled={loading}
                onClick={handleLogin}
              >
                Entrar
                {loading && <Spinner />}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
