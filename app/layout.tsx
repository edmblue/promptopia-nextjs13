import '@styles/globals.css';
import Nav from '@components/Nav';
import Provider from '@components/Provider';

type ChildrenProps = {
  children: React.ReactNode;
};

export const metadata = {
  title: 'Promptopia',
  description: 'Discover and Share AI Promps',
};

const RootLayout = async ({ children }: ChildrenProps) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient"></div>
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
