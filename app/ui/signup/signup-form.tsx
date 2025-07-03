"use client";

import {
  TextField,
  Stack,
  Button,
  Typography,
  Box,
  Autocomplete, Checkbox, FormControl, FormControlLabel,
} from "@mui/material";
import { signup } from "@/app/lib/auth/actions";
import { useActionState, useState } from "react";
import { US_STATES } from "@/app/lib/constants/states";

/**
 * Form for creating a user
 * @constructor
 */
export default function SignupForm() {
  const [state, action, pending] = useActionState(signup, undefined);
  const [isBillingAddressDifferent, setBillingAddressDifferent] = useState(false);

  return (
    <Box
      sx={{
        maxWidth: 600,
        width: "100%",
      }}
    >
      <form action={action}>
        <Stack spacing={2} className={"w-full"}>
          <TextField
            variant="outlined"
            error={state?.errors?.email != null}
            label="Email"
            id="email"
            name="email"
            required
          />
          {state?.errors?.email && <p>{state.errors.email}</p>}

          <TextField
            variant="outlined"
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
            variant="outlined"
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
            variant="outlined"
            error={state?.errors?.first_name != null}
            label="First Name"
            id="first_name"
            name="first_name"
            required
          />
          {state?.errors?.first_name && <p>{state.errors.first_name}</p>}

          <TextField
            variant="outlined"
            error={state?.errors?.first_name != null}
            label="Last Name"
            id="last_name"
            name="last_name"
            required
          />
          {state?.errors?.last_name && <p>{state.errors.last_name}</p>}

          <TextField
            variant="outlined"
            error={state?.errors?.phone != null}
            label="Phone Number"
            id="phone"
            name="phone"
          />
          {state?.errors?.phone && <p>{state.errors.phone}</p>}

          <Typography>Delivery Address</Typography>

          <TextField
            variant="outlined"
            error={state?.errors?.delivery_street != null}
            label="Street"
            id="delivery_street"
            name="delivery_street"
          />
          {state?.errors?.delivery_street && (
            <p>{state.errors.delivery_street}</p>
          )}

          <TextField
            variant="outlined"
            error={state?.errors?.delivery_apt_number != null}
            label="Apt. #"
            id="delivery_apt_number"
            name="delivery_apt_number"
          />
          {state?.errors?.delivery_apt_number && (
            <p>{state.errors.delivery_apt_number}</p>
          )}

          <TextField
            variant="outlined"
            error={state?.errors?.delivery_city != null}
            label="City"
            id="delivery_city"
            name="delivery_city"
          />
          {state?.errors?.delivery_city && <p>{state.errors.delivery_city}</p>}

          <TextField
              variant="outlined"
              error={state?.errors?.delivery_zip != null}
              label="Zip"
              id="delivery_zip"
              name="delivery_zip"
          />
          {state?.errors?.delivery_zip && <p>{state.errors.delivery_zip}</p>}
          
          <Autocomplete
            freeSolo
            options={US_STATES}
            renderInput={(params) => (
              <TextField {...params} label="State" name="delivery_state" error={state?.errors?.delivery_state != null} />
            )}
          />
          {state?.errors?.delivery_state && <p>{state.errors.delivery_state}</p>}

          <FormControlLabel
              label={<Typography>Billing address is the same as delivery address</Typography>}
              control={<Checkbox defaultChecked onChange={(event, checked) => {setBillingAddressDifferent(!checked)}} />}
          />


          <Stack spacing={2} sx={{
            display: isBillingAddressDifferent ? "block" : "none",
            width: "100%",
          }}>
            <TextField
                variant="outlined"
                error={state?.errors != null}
                label="Street"
                id="billing_street"
                name="delivery_street"
                sx={{width:"100%"}}
            />
            {state?.errors?.delivery_street && (
                <p>{state.errors.delivery_street}</p>
            )}

            <TextField
                variant="outlined"
                error={state?.errors?.delivery_apt_number != null}
                label="Apt. #"
                id="delivery_apt_number"
                name="delivery_apt_number"
                sx={{width:"100%"}}
            />
            {state?.errors?.delivery_apt_number && (
                <p>{state.errors.delivery_apt_number}</p>
            )}

            <TextField
                variant="outlined"
                error={state?.errors?.delivery_city != null}
                label="City"
                id="delivery_city"
                name="delivery_city"
                sx={{width:"100%"}}
            />
            {state?.errors?.delivery_city && <p>{state.errors.delivery_city}</p>}

            <TextField
                variant="outlined"
                error={state?.errors?.delivery_zip != null}
                label="Zip"
                id="delivery_zip"
                name="delivery_zip"
                sx={{width:"100%"}}
            />
            {state?.errors?.delivery_zip && <p>{state.errors.delivery_zip}</p>}

            <Autocomplete
                freeSolo
                options={US_STATES}
                renderInput={(params) => (
                    <TextField {...params} label="State" name="delivery_state" error={state?.errors?.delivery_state != null} />
                )}
            />
            {state?.errors?.delivery_state && <p>{state.errors.delivery_state}</p>}

          </Stack>

          <Button variant="contained" color="primary" type="submit">
            Sign up
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
