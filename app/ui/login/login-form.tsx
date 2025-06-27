'use client'

import {TextField, Stack, Button, Typography} from "@mui/material";
import {login} from '@/app/lib/actions/auth'
import {useActionState} from "react";

/**
 * Form for logging in as a user or admin
 * @constructor
 */
export default function LoginForm() {
    const [state, action, pending] = useActionState(login,undefined);

    return (
        <form action={action}>
            <Stack spacing={2}>
                <TextField variant="standard" error={(state?.errors?.username != null)} label='Username' id='username' name='username' />
                {state?.errors?.username && <p>{state.errors.username}</p>}

                <TextField variant="standard" error={(state?.errors?.password != null)} label='Password' name='password' type='password' />
                {state?.errors?.password &&
                    <Stack spacing={1}>
                        <Typography>
                            Password must:
                        </Typography>
                        {state.errors.password.map(error => (
                            <li>
                                {error}
                            </li>
                        ))}
                    </Stack>}

                <Button variant="contained" color="primary" type="submit">
                    Log In
                </Button>
            </Stack>
        </form>
    )
}