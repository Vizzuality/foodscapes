import Link from 'next/link';

import cn from 'lib/classnames';

import Wrapper from 'containers/wrapper';

const Footer = () => {
  return (
    <footer
      className={cn({
        'border-t border-navy-400': true,
      })}
    >
      <Wrapper>
        <div className="flex items-center justify-between py-10">
          {/* CREDITS */}
          <p className="text-sm font-light">
            © {new Date().getFullYear()} Foodscapes by The Nature Conservancy
          </p>

          {/* NAV */}
          <nav className="flex items-center justify-between">
            <ul className="flex items-center justify-between space-x-2.5 divide-x text-sm font-light">
              <li>
                <Link href="/terms-of-use">Terms of use</Link>
              </li>
              <li className="pl-2.5">
                <Link href="/privacy-policy">Privacy policy</Link>
              </li>
            </ul>
          </nav>
        </div>
      </Wrapper>
    </footer>
  );
};

export default Footer;
