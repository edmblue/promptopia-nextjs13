import Profile from '@components/Profile';
import { authOptions } from '@lib/auth';
import { getServerSession } from 'next-auth';

const UserProfile = async () => {
  const session = await getServerSession(authOptions);

  const userName = session?.user.name;
  const userId = session?.user.id;
  const description = `Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination`;

  return (
    <Profile userId={userId} userName={userName} description={description} />
  );
};

export default UserProfile;
