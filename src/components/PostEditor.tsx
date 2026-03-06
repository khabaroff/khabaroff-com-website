import React from 'react';
import { useTina } from 'tinacms/dist/react';

interface PostEditorProps {
  initialData: any;
  query: string;
  variables: any;
  slug: string;
}

export default function PostEditor({ initialData, query, variables, slug }: PostEditorProps) {
  const { data } = useTina({
    query,
    variables,
    data: initialData,
  });

  if (!data?.post) {
    return <div>Loading...</div>;
  }

  const post = data.post;

  return (
    <div className="post-editor">
      <article className="prose prose-lg max-w-none">
        <h1 style={{ fontFamily: "'Lora', serif" }}>{post.title}</h1>
        
        <div className="meta">
          <time>{new Date(post.date).toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}</time>
          
          <div className="tags">
            {post.tags?.map((tag: string) => (
              <span key={tag} className="tag">#{tag}</span>
            ))}
          </div>
        </div>

        {post.description && (
          <p className="description">{post.description}</p>
        )}

        <div dangerouslySetInnerHTML={{ __html: post.body }} />
      </article>
    </div>
  );
}
