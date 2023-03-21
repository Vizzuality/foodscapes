import Footer from 'containers/footer';
import Header from 'containers/header/app';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
  const { children } = props;

  return (
    <main className={`flex min-h-screen flex-col font-sans antialiased`}>
      <Header />

      <div className="relative grow">
        {/* Content */}
        {children}
      </div>

      <Footer />
    </main>
  );
};

export default Layout;
