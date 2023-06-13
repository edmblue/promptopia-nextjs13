import '@styles/globals.css';
import Nav from '@components/Nav';

type ChildrenProps = {
  children: React.ReactNode;
};

export const metadata = {
  title: 'Promptopia',
  description: 'Disconver and Share AI Promps',
};

const RootLayout = ({ children }: ChildrenProps) => {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient"></div>
        </div>
        <main className="app">
          <Nav />
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
