'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

const UserProfile = () => {
  const { data: session } = useSession();
  const name = session?.user.name;

  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    const retrieveUserInfo = async () => {
      try {
        const id = session?.user.id;
        console.log(id);
        const response = await fetch(`/api/user/${id}/posts`);
        const result = await response.json();

        setUserInfo(result);
      } catch (error) {
        console.log(error);
      }
    };

    retrieveUserInfo();
  }, []);

  //console.log(userInfo);

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
      <div></div>
    </div>
  );
};

export default UserProfile;
