'use client';

import PromptCard from './PromptCard';
import { useEffect, useState } from 'react';

export type tagType = {
  id: string;
  tag: string;
};

export type PromptType = {
  id: string;
  prompt: string;
  tags: tagType[];
  userId: string;
};

export type UserType = {
  email: string;
  emailVerified: boolean | null;
  id: string;
  image: string;
  name: string;
  prompts: PromptType[];
  username: string;
};

const Feed = () => {
  const [userPrompts, setUserPrompts] = useState([]);

  useEffect(() => {
    const retrieveUsersPromps = async () => {
      try {
        const response = await fetch('/api/prompt');
        const result = await response.json();

        setUserPrompts(result);
      } catch (error) {
        console.log(error);
      }
    };

    retrieveUsersPromps();
  }, []);
  return (
    <div className="my-10">
      <section className="w-full my-10">
        <form className="text-center">
          <input
            className="max-w-xl w-full p-3 shadow-xl rounded-md"
            type="text"
            placeholder="Search for a tag or a username"
          />
        </form>
      </section>
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {userPrompts.map((userPrompt: UserType): React.ReactNode => {
          const { prompts } = userPrompt;

          if (prompts.length > 0) {
            return prompts.map((prompt) => {
              return (
                <PromptCard
                  key={prompt.id}
                  prompt={prompt}
                  userPrompt={userPrompt}
                />
              );
            });
          }

          return null;
        })}
      </section>
    </div>
  );
};

export default Feed;
