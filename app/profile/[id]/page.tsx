'use client';

import Profile from '@components/Profile';
import { useSearchParams } from 'next/navigation';

const UserProfile = ({ params }: any) => {
  const { id } = params;
  const paramsURL = useSearchParams();
  const name = paramsURL.get('name');
  const description = `Welcome to ${
    name?.split(' ')[0]
  }'s personalized profile page. Explore ${
    name?.split(' ')[0]
  }exceptional prompts and be inspired by the power of their imagination`;

  return <Profile userId={id} userName={name} description={description} />;
};

export default UserProfile;
