"use client";

import { useEffect, useMemo, useState } from "react";
import type { Editor } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogModal } from "../ui/dialog-modal";
import { Toaster, toast } from "sonner";
import { createPost } from "@/lib/supabase/posts/create-post";
import { Spinner } from "../ui/spinner";

interface PublishPostDialogProps {
  editor: Editor | null;
  trigger: React.ReactNode;
}

function generateSlug(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function PublishPostDialog({ editor, trigger }: PublishPostDialogProps) {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [coverImage, setCoverImage] = useState<string>("");

  const [loading, setLoading] = useState(false);

  function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;

      reader.readAsDataURL(file);
    });
  }

  async function handleCoverImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    const base64 = await fileToBase64(file);

    setCoverImage(base64);
  }

  useEffect(() => {
    setSlug(generateSlug(title));
  }, [title]);

  async function handlePublish() {
    if (!editor) return;

    if (!title.trim()) {
      toast.error("Informe um título.");
      return;
    }

    if (!category.trim()) {
      toast.error("Informe uma categoria.");
      return;
    }

    setLoading(true);

    const content = editor.getHTML();

    const text = editor.getText();

    const readingTime = Math.max(1, Math.ceil(text.split(/\s+/).length / 200));

    const { error } = await createPost({
      title,
      slug,
      category,
      excerpt,
      cover_image: coverImage,
      content_html: content,
      reading_time: readingTime,
    });

    setLoading(false);

    if (error) {
      toast.error("Erro ao publicar o artigo.");
      console.error(error);
      return;
    }

    toast.success("Artigo publicado!");

    setTitle("");
    setSlug("");
    setCategory("");
    setExcerpt("");
    setCoverImage("");
  }

  return (
    <>
      <Toaster />
      <DialogModal
        dialogTitle="Publicar artigo"
        dialogTrigger={trigger}
        dialogContent={
          <div className="space-y-5 pt-2">
            <div className="space-y-2">
              <Label>Título</Label>

              <Input
                placeholder="Ex.: Como comecei a usar Next.js"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Slug</Label>

              <Input value={slug} onChange={(e) => setSlug(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label>Categoria</Label>

              <Input
                placeholder="Tecnologia, financeiro, LGPD..."
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Resumo</Label>

              <textarea
                className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                placeholder="Escreva um resumo do artigo (até 180 caracteres)"
                maxLength={180}
                value={excerpt}
                onChange={(e: any) => setExcerpt(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Imagem de capa</Label>

              <div className="space-y-3">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleCoverImage}
                />

                {coverImage && (
                  <img
                    src={coverImage}
                    alt="Prévia da capa"
                    className="h-40 w-full rounded-md border object-cover"
                  />
                )}
              </div>
            </div>

            <Button
              className="w-full"
              disabled={loading}
              onClick={handlePublish}
            >
              {loading ? "Publicando..." : "Publicar artigo"}
              {loading && <Spinner />}
            </Button>
          </div>
        }
      />
    </>
  );
}
