import { UserType } from './Feed';
import PromptCard from './PromptCard';

type PromptListsType = {
  userPromptList: UserType[];
  handleSearch: (searchValue: string) => void;
};

const PromptsLists = ({ userPromptList, handleSearch }: PromptListsType) => {
  return (
    <div>
      {userPromptList.map((userPrompt: UserType): React.ReactNode => {
        const { prompts } = userPrompt;

        if (prompts.length > 0) {
          return prompts.map((prompt) => {
            return (
              <PromptCard
                key={prompt.id}
                prompt={prompt}
                userPrompt={userPrompt}
                handleSearch={handleSearch}
              />
            );
          });
        }

        return null;
      })}
    </div>
  );
};

export default PromptsLists;
