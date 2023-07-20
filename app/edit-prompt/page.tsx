'use client';

import Form from '@components/Form';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { PostType } from '@app/create-prompt/page';
import { useState, FormEvent, useEffect } from 'react';

type TagsType = {
  id: string;
  tag: string;
};

//ADD CONFIRMATION

const EditPrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id');
  const [post, setPost] = useState<PostType>({
    prompt: '',
    tags: [],
  });

  useEffect(() => {
    const retrievePromptInfo = async () => {
      try {
        const response = await fetch(`/api/prompt/${promptId}`);
        const result = await response.json();

        const tagsArray = result.tags.map(
          (currentTag: TagsType) => currentTag.tag
        );

        setPost((prevPost) => {
          return { ...prevPost, prompt: result.prompt, tags: tagsArray };
        });
      } catch (error) {
        console.log(error);
      }
    };
    if (session?.user.id) retrievePromptInfo();
  }, [session?.user.id]);

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

      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        router.push('/profile');
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
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default EditPrompt;
