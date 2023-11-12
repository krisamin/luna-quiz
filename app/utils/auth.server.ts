import type { Session } from "@remix-run/node";

import { redirect, createCookieSessionStorage } from "@remix-run/node";

import { getKakaoProfile } from "./kakao.server";
import { prisma } from "./prisma.server";

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set");
}

const storage = createCookieSessionStorage({
  cookie: {
    name: "session",
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

type CreateSession = (userId: string) => Promise<Response>;
export const createSession: CreateSession = async (userId) => {
  const session = await storage.getSession();
  session.set("auth", userId);
  return redirect("/my", {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
};

type GetSession = (request: Request) => Promise<Session>;
export const getUserSession: GetSession = async (request) => {
  const session = await storage.getSession(request.headers.get("Cookie"));
  return session;
};

type Register = (props: { kakao: number; nickname: string }) => Promise<void>;
export const register: Register = async ({ kakao, nickname }) => {
  await prisma.user.create({ data: { kakao, nickname } });
};

type Login = (token: string) => Promise<Response>;
export const login: Login = async (token) => {
  const kakaoProfile = await getKakaoProfile(token);
  const exists = await prisma.user.count({ where: { kakao: kakaoProfile.id } });
  if (exists === 0) {
    await register({
      kakao: kakaoProfile.id,
      nickname: kakaoProfile.nickname,
    });
  }

  const user = await prisma.user.findUnique({
    where: { kakao: kakaoProfile.id },
  });
  if (!user) throw new Error("User not found");

  return createSession(user.id);
};

type Logout = (request: Request) => Promise<Response>;
export const logout: Logout = async (request) => {
  console.log("logout");
  const session = await getUserSession(request);
  return redirect("/", {
    headers: {
      "Set-Cookie": await storage.destroySession(session),
    },
  });
};

type GetUserId = (request: Request) => Promise<string | null>;
export const getUserId: GetUserId = async (request) => {
  const session = await getUserSession(request);
  return session.get("auth");
};

type GetUser = (request: Request) => Promise<{
  id: string;
  kakao: number;
  nickname: string;
} | null>;
export const getUser: GetUser = async (request) => {
  const userId = await getUserId(request);
  if (typeof userId !== "string") {
    return null;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, kakao: true, nickname: true },
    });
    return user;
  } catch {
    throw logout(request);
  }
};
