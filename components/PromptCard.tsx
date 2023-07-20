'use client';

import { useState } from 'react';
import { UserType, PromptType, tagType } from './Feed';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

type PromptCardType = {
  userPrompt: UserType;
  prompt: PromptType;
};

const PromptCard = ({ userPrompt, prompt }: PromptCardType) => {
  const { name, email, image, id } = userPrompt;
  const { data: session } = useSession();

  const pathName = usePathname();
  const router = useRouter();

  const [isCopied, setIsCopied] = useState(false);

  const copyPrompt = (idPrompt: string) => {
    navigator.clipboard.writeText(prompt.prompt);
    if (idPrompt === prompt.id) {
      setIsCopied(true);
    }
    setTimeout(() => setIsCopied(false), 1000);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/prompt/${prompt.id}`, {
        method: 'DELETE',
      });
      const result = await response.json();

      console.log(result);

      if (response.ok) router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 border border-gray-300 p-3 rounded-lg h-fit">
      <div className="flex flex-between ">
        <div className="flex gap-2 items-center">
          <Image
            src={image}
            alt="Profile Picture"
            height={40}
            width={40}
            className="rounded-full"
            placeholder="blur"
            blurDataURL={image}
          />
          <div>
            <h3 className="font-bold">{name}</h3>
            <p className="text-gray-700 text-sm">{email}</p>
          </div>
        </div>
        <Image
          src={isCopied ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
          alt="Prompt Card Icon"
          height={35}
          width={35}
          className="rounded-full cursor-pointer bg-gray-200 p-2"
          onClick={() => copyPrompt(prompt.id)}
        />
      </div>
      <div>
        <p className="text-sm">{prompt.prompt}</p>
        <div>
          <ul className="flex gap-x-3 flex-wrap my-2">
            {prompt.tags.map((tag: tagType) => {
              return (
                <li key={tag.id} className="text-blue-500 text-sm">
                  #{tag.tag}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      {pathName == '/profile' && id === session?.user.id && (
        <div className="flex justify-center gap-2">
          <Link
            className="text-green-800 text-sm"
            href={`/edit-prompt?id=${prompt.id}`}
          >
            Edit
          </Link>
          <button onClick={handleDelete} className="text-red-800 text-sm">
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
