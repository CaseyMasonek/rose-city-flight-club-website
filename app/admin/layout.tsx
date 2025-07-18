import { Box } from "@mui/material";
import { verifySession } from "@/app/lib/dal/users";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await verifySession();
  const is_admin = session?.is_admin;

  if (is_admin == null) {
    redirect("/login");
  } else if (!is_admin) {
    redirect("/");
  }

  return (
    <Box>
      {children}
    </Box>
  );
}
