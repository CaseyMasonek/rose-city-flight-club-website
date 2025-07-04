'use client'

import {TextField, Stack, Button, Typography, Box} from "@mui/material";
import {login} from '@/app/lib/auth/actions'
import {useActionState} from "react";
import Link from "next/link";

/**
 * Form for logging in as a user or admin
 * @constructor
 */
export default function LoginForm() {
    const [state, action, pending] = useActionState(login,undefined);

    return (
        <Box sx={{
            maxWidth: 600,
            width: '100%',
        }}>
            <form action={action} className="">
                <Stack spacing={2} className={'w-full'}>
                    <TextField variant="outlined" label='Email' id='email' name='email' type='email' />

                    <TextField variant="outlined" error={(state?.errors?.password != null)} label='Password'
                               name='password' type='password'/>
                    {state?.errors?.password && <p>{state.errors.password}</p>}

                    <Stack spacing={2} direction='row' sx={{
                        width: '100%',
                    }}>
                        <Button variant="contained" color="primary" type="submit" sx={{
                            width: '33%',
                        }}>
                            Log In
                        </Button>
                        <Link href='/signup' className={'w-full'}>
                            <Button variant="contained" color={'inherit'} sx={{
                                width: '100%',
                            }}>
                                Create Account
                            </Button>
                        </Link>
                    </Stack>
                </Stack>
            </form>
        </Box>
    )
}