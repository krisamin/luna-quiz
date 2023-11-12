import type { ActionFunction, LoaderFunction } from "@remix-run/node";

import { json, redirect } from "@remix-run/node";

import { login } from "~/utils/auth.server";

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const token = String(form.get("token"));

  if (!token) {
    return json({ error: "No token" }, { status: 400 });
  }

  return await login(token);
};
export const loader: LoaderFunction = async () => redirect("/");
