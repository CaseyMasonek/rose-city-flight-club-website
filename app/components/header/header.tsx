import {getUser} from "@/app/lib/dal/users";
import LoggedOutHeader from "@/app/components/header/logged-out-header";
import AdminHeader from "@/app/components/header/admin-header";
import UserHeader from "@/app/components/header/user-header";

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
