import { Box, Button, Typography } from "@mui/material";
import { useAuthContext } from "../../providers/auth/useAuth";
import { useForm } from "react-hook-form";
import { pages } from "../../constants";
import { useNavigate } from "react-router-dom";

export function Main() {
  const auth = useAuthContext();
  const navigate = useNavigate();

  const { handleSubmit, setError, formState } = useForm();
  const onSubmit = handleSubmit(async () => {
    await auth
      .signOut()
      .then(() => {
        navigate(`/${pages.SIGN_IN}`);
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((e: any) => {
        setError("root.serverError", {
          message: e.message ?? "Unable to sign out",
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
        Welcome to the application.
      </Typography>

      <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={formState.isSubmitting}
        >
          Sign out
        </Button>
        {formState.errors.root?.serverError.message && (
          <Typography component="p" variant="caption" color="red">
            {formState.errors.root?.serverError.message}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
