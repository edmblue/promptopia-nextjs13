'use client';

import { useState } from 'react';
import { PostType } from '@app/create-prompt/page';

type TagsProps = {
  post: PostType;
  setPost: React.Dispatch<React.SetStateAction<PostType>>;
};

const TagsInput = ({ post, setPost }: TagsProps) => {
  const [tagInput, setTagInput] = useState('');
  const [error, setError] = useState(false);

  const addTag = (value: string, e: React.KeyboardEvent) => {
    e.preventDefault();

    if (value.length < 3) {
      setError(true);
      return;
    }

    setPost((prevPost) => ({ ...prevPost, tags: [...prevPost.tags, value] }));
    setError(false);
    setTagInput('');
  };

  const deleteTag = (indexToRemove: Number) => {
    setPost((prevPost) => ({
      ...prevPost,
      tags: prevPost.tags.filter((tag, index) => index != indexToRemove),
    }));
  };
  return (
    <>
      <div className="bg-white px-4 py-2 flex gap-2 flex-wrap">
        <ul className="flex gap-2 flex-wrap ">
          {post.tags.map((tag, index) => (
            <li
              className="bg-blue-500 text-white font-semibold px-2 "
              key={index}
            >
              {tag}
              <span
                onClick={() => deleteTag(index)}
                className="ml-2 text-black cursor-pointer"
              >
                x
              </span>
            </li>
          ))}
          <li>
            <input
              type="text"
              className="outline-none w-[6rem] placeholder:text-sm"
              value={tagInput}
              placeholder="Add a new tag"
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === 'Enter'
                  ? addTag((e.target as HTMLInputElement).value, e)
                  : null
              }
            />
          </li>
        </ul>
      </div>
      {error && (
        <p className="bg-red-600 font-semibold text-white pl-2 inline-block">
          Invalid Tag
        </p>
      )}
    </>
  );
};

export default TagsInput;
