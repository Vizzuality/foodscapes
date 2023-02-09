// import Footer from 'containers/footer';
import { Domine, Public_Sans } from '@next/font/google';

import Header from 'containers/header/app';

type LayoutProps = {
  children: React.ReactNode;
};

const publicSans = Public_Sans({
  weight: ['300', '400', '600', '700'],
  style: ['normal'],
  subsets: ['latin'],
  variable: '--font-public-sans',
  display: 'block',
});

const domine = Domine({
  weight: ['400', '700'],
  style: ['normal'],
  subsets: ['latin'],
  variable: '--font-domine',
  display: 'block',
});

const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
  const { children } = props;

  return (
    <main
      className={`${domine.variable} ${publicSans.variable} flex flex-col font-sans antialiased lg:min-h-screen`}
    >
      <Header />

      <div className="relative grow">
        {/* Content */}
        {children}
      </div>

      {/* <Footer /> */}
    </main>
  );
};

export default Layout;
