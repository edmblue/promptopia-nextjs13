'use client';

import Profile from '@components/Profile';

import { useSession } from 'next-auth/react';

const UserProfile = () => {
  const { data: session } = useSession();
  const userName = session?.user.name;
  const userId = session?.user.id;
  const description = `Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination`;

  return (
    <Profile userId={userId} userName={userName} description={description} />
  );
};

export default UserProfile;
