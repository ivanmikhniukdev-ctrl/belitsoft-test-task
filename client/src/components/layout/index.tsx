import type { FC, PropsWithChildren } from 'react';
import { useLocation } from 'react-router-dom';

import { PAGE_TITLES } from './constants';

import './styles.scss';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation();
  
  return (
    <div className="layout">
      <header className="layout__header">
        <span className="layout__icon">👥</span>
        <span className="layout__title">{PAGE_TITLES[location.pathname]}</span>
      </header>

      <main className="layout__main">{children}</main>
    </div>
  );
};

export default Layout;
