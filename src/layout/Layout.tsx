import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    <div className="mx-auto w-full max-w-[1400px]">
      <Header />
      <main>
        <Outlet />
      </main>
      <footer>공통 푸터</footer>
    </div>
  );
};

export default Layout;
