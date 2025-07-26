import {getUser} from "@/lib/dal/users";
import LoggedOutHeader from "@/components/header/logged-out-header";
import AdminHeader from "@/components/header/admin-header";
import UserHeader from "@/components/header/user-header";

export default async function Header() {
    const user = await getUser().catch(() => null);

    if (!user) {
        return <LoggedOutHeader />;
    } else if (user.is_admin) {
        return <AdminHeader user={user} />;
    } else {
        return <UserHeader user={user} />
    }
}
