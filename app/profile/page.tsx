import Profile from '@components/Profile';
import { getCurrentUser } from '@lib/session';

const UserProfile = async () => {
  const user = await getCurrentUser();

  const userName = user?.name;
  const userId = user?.id;
  const description = `Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination`;

  return (
    <Profile userId={userId} userName={userName} description={description} />
  );
};

export default UserProfile;
