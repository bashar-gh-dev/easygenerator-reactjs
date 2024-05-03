import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useAuthContext } from "../../providers/auth/useAuth";
import { pages } from "../../constants";
import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const atLeastOneSpecialCharRegExp = /[!@#$%^&*()_+{}[\]:;<>,.?/\\~-]/;
const atLeastOneLetterRegExp = /[a-zA-Z]/;
const atLeastOneDigitRegExp = /\d/;

const signUpFormSchema = z.object({
  name: z.string().min(2, "Name must contain at least 2 characters"),
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(8, "Password must contain at least 8 characters")
    .regex(
      atLeastOneSpecialCharRegExp,
      "Password must contains at least one special character"
    )
    .regex(atLeastOneLetterRegExp, "Password must contains at least one letter")
    .regex(atLeastOneDigitRegExp, "Password must contains at least one digit"),
});

type SignUpFormData = z.infer<typeof signUpFormSchema>;

export function SignUp() {
  const auth = useAuthContext();
  const navigate = useNavigate();

  const { control, handleSubmit, setError, formState } =
    useForm<SignUpFormData>({
      resolver: zodResolver(signUpFormSchema),
      defaultValues: {
        name: "",
        email: "",
        password: "",
      },
    });
  const onSubmit = handleSubmit(async (data) => {
    await auth
      .signUp(data)
      .then(() => {
        navigate(`/${pages.MAIN}`);
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((e: any) => {
        setError("root.serverError", {
          message: e.message ?? "Unable to sign up",
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
        Sign up
      </Typography>

      <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
        <Controller
          name="name"
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
                label="Name"
                disabled={formState.isSubmitting}
                error={hasError}
                helperText={hasError && fieldState.error?.message}
                {...field}
              />
            );
          }}
        />

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
          Sign Up
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
              to={`/${pages.SIGN_IN}`}
              variant="body2"
            >
              {"Already have an account? Sign in"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
