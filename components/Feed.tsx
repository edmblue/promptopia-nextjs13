import PromptCard from './PromptCard';

const Feed = () => {
  return (
    <>
      <section className="w-full my-10">
        <form className="text-center">
          <input
            className="max-w-xl w-full p-3 shadow-xl rounded-md"
            type="text"
            placeholder="Search for a tag or a username"
          />
        </form>
      </section>
      <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
        <PromptCard />
        <PromptCard />
        <PromptCard />
        <PromptCard />
        <PromptCard />
        <PromptCard />
        <PromptCard />
        <PromptCard />
      </section>
    </>
  );
};

export default Feed;
