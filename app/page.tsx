import {Box, Typography} from '@mui/material'
import {getUser} from "@/app/lib/dal/users";

export default async function Home() {
    const user = await getUser()

    return (
          <Typography className={'text-2xl'}>
              Hello, {user!.first_name}!
          </Typography>
    );
}
