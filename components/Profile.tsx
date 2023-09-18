'use client';

import PromptCard from '@components/PromptCard';
import { useState, useEffect } from 'react';
import { UserType } from '@components/Feed';

type ProfileTypes = {
  userId: string | undefined;
  userName: string | undefined | null;
  description: string;
};

const Profile = ({ userId, userName, description }: ProfileTypes) => {
  const [userInfo, setUserInfo] = useState<UserType>();

  useEffect(() => {
    const retrieveUserInfo = async () => {
      try {
        const response = await fetch(`/api/user/${userId}/posts`);
        const result = await response.json();

        setUserInfo(result[0]);
      } catch (error) {
        console.log(error);
      }
    };

    if (userId) retrieveUserInfo();
  }, [userId]);

  return (
    <div className=" my-10 w-full">
      <section className="">
        <h1 className="head_text blue_gradient">
          {userName?.split(' ')[0]}'s Profile
        </h1>
        <p className="desc">{description}</p>
      </section>
      <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-full ">
        {userInfo?.prompts.length! > 0 ? (
          userInfo?.prompts.map((prompt): React.ReactNode => {
            return (
              <PromptCard
                key={prompt.id}
                prompt={prompt}
                userPrompt={userInfo}
              />
            );
          })
        ) : (
          <p className="italic">There is no prompts available</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
