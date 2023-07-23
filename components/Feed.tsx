'use client';

import { useEffect, useState } from 'react';
import PromptsLists from './PromptsLists';

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
  const [searchInput, setSearchInput] = useState('');
  const [filteredResults, setFilteredResults] = useState<UserType[]>([]);

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

  const handleSearch = (searchValue: string) => {
    setSearchInput(searchValue);

    if (searchValue.length > 0) {
      const regex = new RegExp(searchValue, 'i');

      const filteredPrompts = userPrompts.map((userInfo: UserType) => {
        const matchingName = regex.test(userInfo.name);
        const matchingEmail = regex.test(userInfo.email);

        if (matchingName || matchingEmail) {
          return userInfo;
        } else {
          const matchingPrompts = userInfo.prompts.filter((selectedPrompt) => {
            const matchingTags = selectedPrompt.tags.some((selectedTag) =>
              regex.test(selectedTag.tag)
            );
            return regex.test(selectedPrompt.prompt) || matchingTags;
          });
          return {
            ...userInfo,
            prompts: matchingPrompts,
          };
        }
      });

      setFilteredResults(filteredPrompts);
    }
  };

  return (
    <div className="my-10 w-full">
      <section className="my-10">
        <form className="text-center">
          <input
            className="max-w-xl w-full p-3 shadow-xl rounded-md"
            type="text"
            placeholder="Search for a tag or a username"
            value={searchInput}
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
          />
        </form>
      </section>
      <section className="md:columns-2 lg:columns-3 w-full">
        {searchInput.length > 0 ? (
          <PromptsLists
            userPromptList={filteredResults}
            handleSearch={handleSearch}
          />
        ) : (
          <PromptsLists
            userPromptList={userPrompts}
            handleSearch={handleSearch}
          />
        )}
      </section>
    </div>
  );
};

export default Feed;
