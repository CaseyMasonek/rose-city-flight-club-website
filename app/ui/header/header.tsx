import {getUser} from "@/app/lib/dal/users";
import LoggedOutHeader from "@/app/ui/header/logged-out-header";
import LoggedInHeader from "@/app/ui/header/logged-in-header";

export default async function Header() {
    const user = await getUser().catch(() => null);

    return user ? <LoggedInHeader user={user} /> : <LoggedOutHeader />;
}
