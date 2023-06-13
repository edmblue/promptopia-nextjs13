import Link from 'next/link';
import Image from 'next/image';

const Nav = () => {
  const isUserLoggedIn = true;
  return (
    <>
      <nav className="w-full mt-4 flex gap-3 flex-between">
        <Link href="/">
          <Image
            src="/assets/images/logo.svg"
            alt="logo"
            height={30}
            width={30}
          />
        </Link>
        <p className="logo_text">Promptopia</p>
        <div>{isUserLoggedIn ? <div>Yes</div> : <div>Not</div>}</div>
      </nav>
    </>
  );
};

export default Nav;
