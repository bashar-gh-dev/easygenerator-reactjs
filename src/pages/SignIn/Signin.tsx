import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useAuthContext } from "../../providers/auth/useAuth";
import { pages } from "../../constants";
import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const signInFormSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password can't be empty"),
});

type SignInFormData = z.infer<typeof signInFormSchema>;

export function SignIn() {
  const auth = useAuthContext();
  const navigate = useNavigate();

  const { control, handleSubmit, setError, formState } =
    useForm<SignInFormData>({
      resolver: zodResolver(signInFormSchema),
      defaultValues: {
        email: "",
        password: "",
      },
    });
  const onSubmit = handleSubmit(async (data) => {
    await auth
      .signIn(data)
      .then(() => {
        navigate(`/${pages.MAIN}`);
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((e: any) => {
        setError("root.serverError", {
          message: e.message ?? "Unable to sign in",
        });
      });
  });

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>

      <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
        <Controller
          name="email"
          control={control}
          render={({ field, formState, fieldState }) => {
            const hasError =
              !!fieldState.error &&
              formState.isSubmitted &&
              !formState.isSubmitSuccessful &&
              !formState.isSubmitting;
            return (
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email Address"
                autoComplete="email"
                disabled={formState.isSubmitting}
                error={hasError}
                helperText={hasError && fieldState.error?.message}
                {...field}
              />
            );
          }}
        />

        <Controller
          name="password"
          control={control}
          render={({ field, formState, fieldState }) => {
            const hasError =
              !!fieldState.error &&
              formState.isSubmitted &&
              !formState.isSubmitSuccessful &&
              !formState.isSubmitting;
            return (
              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                autoComplete="current-password"
                disabled={formState.isSubmitting}
                error={hasError}
                helperText={hasError && fieldState.error?.message}
                {...field}
              />
            );
          }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={formState.isSubmitting}
        >
          Sign in
        </Button>

        {formState.errors.root?.serverError.message && (
          <Typography component="p" variant="caption" color="red">
            {formState.errors.root?.serverError.message}
          </Typography>
        )}

        <Grid container>
          <Grid item>
            <Link
              component={RouterLink}
              to={`/${pages.SIGN_UP}`}
              variant="body2"
            >
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
