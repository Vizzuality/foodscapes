import cn from 'lib/classnames';

import Wrapper from 'containers/wrapper';

const Footer = () => {
  return (
    <footer
      className={cn({
        'relative z-10 border-t border-navy-400 bg-white': true,
      })}
    >
      <Wrapper>
        <div className="flex items-center justify-between py-6">
          {/* CREDITS */}
          <p className="text-sm font-light">
            © {new Date().getFullYear()} Foodscapes by The Nature Conservancy
          </p>

          {/* NAV */}
          <nav className="flex items-center justify-between">
            <ul className="flex items-center justify-between space-x-2.5 divide-x text-sm font-light">
              <li>
                <a
                  href="https://www.nature.org/en-us/about-us/who-we-are/accountability/terms-of-use/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p className="pl-2">Terms of Use</p>
                </a>
              </li>
              <li className="pl-2.5">
                <a
                  href="https://www.nature.org/en-us/about-us/who-we-are/accountability/privacy-policy/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p className="pl-2">Privacy policy</p>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </Wrapper>
    </footer>
  );
};

export default Footer;
