"use client";

import { TextField, Stack, Button, Typography } from "@mui/material";
import { signup } from "@/app/lib/auth/actions";
import { useActionState } from "react";

/**
 * Form for creating a user
 * @constructor
 */
export default function SignupForm() {
  const [state, action, pending] = useActionState(signup, undefined);

  return (
    <form action={action}>
      <Stack spacing={2} className={"w-1/3"}>
        <TextField
          variant="standard"
          error={state?.errors?.username != null}
          label="Username"
          id="username"
          name="username"
          required
        />
        {state?.errors?.username && <p>{state.errors.username}</p>}

        <TextField
          variant="standard"
          error={state?.errors?.password != null}
          label="Password"
          name="password"
          type="password"
          required
        />
        {state?.errors?.password && (
          <Stack spacing={1}>
            <Typography>Password must:</Typography>
            {state.errors.password.map((error) => (
              <li>{error}</li>
            ))}
          </Stack>
        )}

        <TextField
          variant="standard"
          error={state?.errors?.confirm_password != null}
          label="Confirm Password"
          name="confirm_password"
          type="password"
          required
        />
        {state?.errors?.confirm_password && (
          <p>{state.errors.confirm_password}</p>
        )}

        <TextField
          variant="standard"
          error={state?.errors?.first_name != null}
          label="First Name"
          id="first_name"
          name="first_name"
          required
        />
        {state?.errors?.first_name && <p>{state.errors.first_name}</p>}

        <TextField
          variant="standard"
          error={state?.errors?.first_name != null}
          label="Last Name"
          id="last_name"
          name="last_name"
          required
        />
        {state?.errors?.last_name && <p>{state.errors.last_name}</p>}

        <TextField
          variant="standard"
          error={state?.errors?.email != null}
          label="Email"
          id="email"
          name="email"
          required
        />
        {state?.errors?.email && <p>{state.errors.email}</p>}

        <TextField
          variant="standard"
          error={state?.errors?.phone != null}
          label="Phone Number"
          id="phone"
          name="phone"
        />
        {state?.errors?.phone && <p>{state.errors.phone}</p>}

        <TextField
          variant="standard"
          error={state?.errors?.delivery_address != null}
          label="Delivery Address"
          id="delivery_address"
          name="delivery_address"
        />
        {state?.errors?.delivery_address && (
          <p>{state.errors.delivery_address}</p>
        )}

        <TextField
          variant="standard"
          error={state?.errors?.billing_address != null}
          label="Billing Address"
          id="billing_address"
          name="billing_address"
        />
        {state?.errors?.delivery_address && (
          <p>{state.errors.billing_address}</p>
        )}

        <Button variant="contained" color="primary" type="submit">
          Sign up
        </Button>
      </Stack>
    </form>
  );
}
