import { Outlet, Link, useLocation } from "@remix-run/react";

import styles from "~/styles/layout.module.css";

const Layout = () => {
  const { pathname } = useLocation();
  console.log(pathname);

  const getClassName = (path: string) => {
    if (pathname === path) {
      return `${styles.item} ${styles.active}`;
    }
    return styles.item;
  };

  return (
    <div className={styles.layout}>
      <div className={styles.navbar}>
        <div className={styles.inner}>
          <div className={styles.mix}>
            <Link to="/" prefetch="viewport" className={getClassName("/")}>
              <div className={styles.logo} />
            </Link>
            <Link to="/" className={getClassName("/quiz")}>
              퀴즈
            </Link>
            <Link
              to="/luna"
              prefetch="viewport"
              className={getClassName("/luna")}>
              LUNA
            </Link>
          </div>
          <div className={styles.mix}>
            <p className={styles.item}>로그인</p>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.inner}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
