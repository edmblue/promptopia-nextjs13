'use client';

import PromptCard from './PromptCard';
import { useEffect, useState } from 'react';

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
  console.log(userPrompts);
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
        <PromptCard />
        <PromptCard />
        <PromptCard />
        <PromptCard />
        <PromptCard />
        <PromptCard />
        <PromptCard />
        <PromptCard />
      </section>
    </div>
  );
};

export default Feed;
