'use client';

import Form from '@components/Form';
import { useState } from 'react';

export type PostType = {
  prompt: string;
  tags: string[];
};

const CreatePrompt = () => {
  const [post, setPost] = useState<PostType>({
    prompt: '',
    tags: [],
  });
  return (
    <div className="flex-start w-full">
      <Form type="Create" post={post} setPost={setPost} />
    </div>
  );
};

export default CreatePrompt;
