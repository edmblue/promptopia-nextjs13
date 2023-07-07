import { UserType, PromptType, tagType } from './Feed';
import Image from 'next/image';

type PromptCardType = {
  userPrompt: UserType;
  prompt: PromptType;
};

// hacer copia
// my profile

const PromptCard = ({ userPrompt, prompt }: PromptCardType) => {
  const { name, email, image } = userPrompt;

  return (
    <div className="w-full flex flex-col gap-4 border border-gray-300 p-3 rounded-lg">
      <div className="flex flex-between ">
        <div className="flex gap-2 items-center">
          <Image
            src={image}
            alt="Profile Picture"
            height={40}
            width={40}
            className="rounded-full"
          />
          <div>
            <h3 className="font-bold">{name}</h3>
            <p className="text-gray-700 text-sm">{email}</p>
          </div>
        </div>
        <div className="rounded-full bg-gray-400 w-7 h-7"></div>
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
    </div>
  );
};

export default PromptCard;
