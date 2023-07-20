'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { UserType } from '@components/Feed';
import PromptCard from '@components/PromptCard';

const UserProfile = () => {
  const { data: session } = useSession();
  const name = session?.user.name;

  const [userInfo, setUserInfo] = useState<UserType>();

  useEffect(() => {
    const retrieveUserInfo = async () => {
      try {
        const response = await fetch(`/api/user/${session?.user.id}/posts`);
        const result = await response.json();

        setUserInfo(result[0]);
      } catch (error) {
        console.log(error);
      }
    };

    if (session?.user.id) retrieveUserInfo();
  }, [session?.user.id]);

  return (
    <div className=" my-10 w-full">
      <section className="">
        <h1 className="head_text blue_gradient">
          {name?.split(' ')[0]}'s Profile
        </h1>
        <p className="desc">
          Welcome to your personalized profile page. Share your exceptional
          prompts and inspire others with the power of your imagination
        </p>
      </section>
      <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-full ">
        {userInfo?.prompts.map((prompt): React.ReactNode => {
          return (
            <PromptCard key={prompt.id} prompt={prompt} userPrompt={userInfo} />
          );
        })}
      </div>
    </div>
  );
};

export default UserProfile;
