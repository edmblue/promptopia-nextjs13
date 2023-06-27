import { PostType } from '@app/create-prompt/page';

type FormProps = {
  type: string;
  post: PostType;
  setPost: React.Dispatch<React.SetStateAction<PostType>>;
};

const Form = ({ type }: FormProps) => {
  return (
    <section className="mt-16 w-full max-w-full">
      <h1 className="text-5xl sm:text-6xl font-extrabold">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="mt-6 text-lg desc max-w-md">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform
      </p>
      <form className="bg-gray-200 mt-10 p-4 flex flex-col gap-6 rounded-lg max-w-2xl glassmorphism">
        <div className="flex flex-col gap-3">
          <label
            htmlFor="prompt"
            className="font-semibold font-satoshi text-base"
          >
            Your AI Prompt
          </label>
          <textarea
            className="rounded-md outline-none px-4 py-2 text-sm"
            id="prompt"
            placeholder="Write your post here"
            cols={5}
            rows={5}
            required
          />
        </div>
        <div className="flex flex-col gap-3">
          <label
            htmlFor="prompt"
            className="font-semibold font-satoshi text-base"
          >
            Field of Prompt{' '}
            <span className="font-normal">
              (#product, #webdevelopment, #idea, etc)
            </span>
          </label>
          <textarea
            className="rounded-md outline-none px-4 py-2 text-sm resize-none"
            id="prompt"
            placeholder="#tag"
            cols={1}
            rows={1}
          ></textarea>
        </div>
        <div className="flex flex-end gap-2">
          <button className="text-gray-600">Cancel</button>
          <button className="bg-orange-500 text-white px-4 rounded-full py-1 text-md">
            Create
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
