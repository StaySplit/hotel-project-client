import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <header>공통 헤더</header>
      <main>
        <Outlet />
      </main>
      <footer>공통 푸터</footer>
    </div>
  );
};

export default Layout;
