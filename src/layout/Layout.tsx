import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    <div className="mx-auto flex h-svh w-full max-w-[1400px] flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer>공통 푸터</footer>
    </div>
  );
};

export default Layout;
