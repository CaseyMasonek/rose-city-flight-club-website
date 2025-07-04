import {getUser} from "@/app/lib/dal/users";
import LoggedOutHeader from "@/app/components/header/logged-out-header";
import LoggedInHeader from "@/app/components/header/logged-in-header";

export default async function Header() {
    const user = await getUser().catch(() => null);

    return user ? <LoggedInHeader user={user} /> : <LoggedOutHeader />;
}
