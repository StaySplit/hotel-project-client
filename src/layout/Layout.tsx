import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <footer>공통 푸터</footer>
    </div>
  );
};

export default Layout;
