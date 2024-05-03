import { Container, CssBaseline } from "@mui/material";
import { PropsWithChildren } from "react";

export function Layout(props: PropsWithChildren) {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {props.children}
    </Container>
  );
}
