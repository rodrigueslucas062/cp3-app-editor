export interface Post {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  cover_image: string;
  created_at: string;
  content_html: string;
}

export interface SimpleEditorProps {
    post: Post | null;
}