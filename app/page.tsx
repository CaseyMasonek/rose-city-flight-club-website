import {Box, Typography} from '@mui/material'
import {getUser} from "@/app/lib/dal/users";

export default async function Home() {
    const user = await getUser()

    return (
          <Typography sx={{ fontSize: '1.5rem', fontWeight: 600, lineHeight: 1.33 }}>
              Hello, {user!.first_name}!
          </Typography>
    );
}
