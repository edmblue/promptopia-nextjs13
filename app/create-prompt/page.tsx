'use client';

import Form from '@components/Form';
import { FormEvent, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export type PostType = {
  prompt: string;
  tags: string[];
};

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [post, setPost] = useState<PostType>({
    prompt: '',
    tags: [],
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      const body = {
        prompt: post.prompt,
        userId: session?.user.id,
        tags: post.tags,
      };
      console.log(body);
      const response = await fetch('/api/prompt/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex-start w-full">
      <Form
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default CreatePrompt;
