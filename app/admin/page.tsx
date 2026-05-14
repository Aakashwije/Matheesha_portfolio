import AdminDashboard from "./AdminDashboard";
import AdminLogin from "./AdminLogin";
import { getAdminEmailFromCookieStore } from "@/lib/adminAuth";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const adminEmail = getAdminEmailFromCookieStore(await cookies());

  if (!adminEmail) {
    return <AdminLogin />;
  }

  return <AdminDashboard />;
}
