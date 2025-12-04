import LoginClient from "./LoginClient";

// Force static generation for login page (SSG)
export const dynamic = "force-static";
export const revalidate = false;

export const metadata = {
  title: "Login — Repairo",
  description: "Sign in to your Repairo account to manage repair requests",
};

export default function LoginPage() {
  return <LoginClient />;
}
