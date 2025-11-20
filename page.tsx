import { redirect } from "next/navigation";
import { isAuthenticated } from "@/app/lib/auth";

export default async function Home() {
  const authenticated = await isAuthenticated();

  if (authenticated) {
    redirect("/admin/dashboard");
  } else {
    redirect("/login");
  }
}
