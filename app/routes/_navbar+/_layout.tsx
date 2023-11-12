import type { LoaderFunction } from "@remix-run/node";

import { json } from "@remix-run/node";

import {
  Outlet,
  Link,
  useLocation,
  useLoaderData,
  useSubmit,
} from "@remix-run/react";
import KakaoLogin from "react-kakao-login";

import styles from "~/styles/layout.module.css";

import { getUser } from "~/utils/auth.server";

type LoaderData =
  | {
      auth: true;
      user: {
        id: string;
        kakao: number;
        nickname: string;
      };
    }
  | {
      auth: false;
    };
export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  if (user) {
    return json<LoaderData>({
      auth: true,
      user: user,
    });
  } else {
    return json<LoaderData>({
      auth: false,
    });
  }
};

const Layout = () => {
  const data = useLoaderData() as LoaderData;
  const submit = useSubmit();
  const { pathname } = useLocation();

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
            <Link to="/" className={getClassName("/")}>
              <div className={styles.logo} />
            </Link>
            <Link to="/quiz" className={getClassName("/quiz")}>
              퀴즈
            </Link>
            <Link to="/luna" className={getClassName("/luna")}>
              LUNA
            </Link>
          </div>
          {data.auth ? (
            <div className={styles.mix}>
              <Link to="/my" className={getClassName("/my")}>
                {data.user.nickname}님
              </Link>
              <div
                className={styles.logout}
                onClick={() => {
                  submit({}, { method: "post", action: "/logout" });
                }}
              />
            </div>
          ) : (
            <div className={styles.mix}>
              <KakaoLogin
                token="2cfcd1c08e3dc2e9f091d7768cb47e77"
                onSuccess={(res) => {
                  submit(
                    { token: res.response.access_token },
                    { method: "post", action: "/login" },
                  );
                }}
                onFail={console.error}
                onLogout={console.info}
                render={({ onClick }) => {
                  return (
                    <p onClick={onClick} className={styles.item}>
                      로그인
                    </p>
                  );
                }}
              />
            </div>
          )}
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
