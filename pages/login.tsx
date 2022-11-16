import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CardMedia, Divider } from "@mui/material";
import { RootState } from "../src/store";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { loginWithGoogleThunk } from "../src/store/slices/firebase";
import { useAppDispatch } from "../src/store/index";

declare module "*.svg" {
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
}

const theme = createTheme();

theme.typography.h5 = {
  fontSize: "1.2rem",
  "@media (min-width:600px)": {
    fontSize: "1.5rem",
  },
  fontWeight: "500",
};

export default function SignIn() {
  const user = useSelector((state: RootState) => state.firebaseSlice.user);
  const token = useSelector((state: RootState) => state.firebaseSlice.token);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log("handle submit in development");
  };

  const handleGoogleSignIn = async () => {
    try {
      dispatch(loginWithGoogleThunk());
    } catch (error) {
      router.push("/login");
    }
  };

  const redirect = (path: string) => {
    router.push(`/${path}`);
  };

  React.useEffect(() => {
    if (token !== null) {
      redirect("home");
    }
    if (token === null) {
      redirect("login");
    }
  }, [token]);

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="sm"
        sx={{
          backgroundColor: "white",
          borderRadius: "16px",
          marginTop: 25,
          boxShadow: 5,
          mx: "auto",
          marginBottom: 20,
        }}
      >
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "20px",
            mx: "auto",
            mb: 2,
          }}
        >
          <Typography component="h1" variant="h5" sx={{ color: "#000", mt: 2 }}>
            Iniciar sesion
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Tu usuario"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              sx={{ display: "block" }}
              control={
                <Checkbox
                  value="remember"
                  color="primary"
                  sx={{ color: "gray" }}
                />
              }
              label="Recordar contraseña"
            />
            <Box
              component="div"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{
                  mt: 2,
                  mb: 1,
                  color: "white",
                  backgroundColor: "#000",
                  textTransform: "capitalize",
                }}
              >
                Iniciar sesion
              </Button>
            </Box>
            <Grid container>
              <Grid item xs>
                <Link
                  href="#"
                  variant="body2"
                  sx={{
                    textDecoration: "none",
                    color: "#000",
                    "&:hover": { color: "#00A6CB" },
                  }}
                >
                  Olvidaste tu contraseña?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href="#"
                  variant="body2"
                  sx={{
                    textDecoration: "none",
                    color: "#000",
                    "&:hover": { color: "#00A6CB" },
                  }}
                >
                  {"No tienes una cuenta? Registrate"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Divider sx={{ color: "#000", mt: 2 }}>OR</Divider>
        <Box sx={{ py: 1 }}>
          <Button
            onClick={handleGoogleSignIn}
            sx={{
              backgroundColor: "#000",
              color: "white",
              "&:hover": { backgroundColor: "#00A6CB" },
              display: "flex",
              width: "75%",
              ml: 10,
              mt: 1,
              mb: 2,
              textTransform: "capitalize",
            }}
          >
            <CardMedia
              component="img"
              image="/google.svg"
              sx={{
                width: "22px",
                position: "absolute",
                top: "22%",
                right: "0%",
                left: "8%",
                bottom: "0%",
              }}
            />
            Continuar con Google
          </Button>
          <Button
            sx={{
              backgroundColor: "#000",
              color: "white",
              "&:hover": { backgroundColor: "#00A6CB" },
              display: "flex",
              width: "75%",
              ml: 10,
              mt: 1,
              marginBottom: 5,
              textTransform: "capitalize",
            }}
          >
            <CardMedia
              component="img"
              image="/apple_icon.svg"
              sx={{
                width: "22px",
                position: "absolute",
                top: "8%",
                right: "0%",
                left: "8%",
                bottom: "0%",
              }}
            />
            Continuar con Apple
          </Button>
        </Box>
        {/* <Copyright sx={{ mt: 8 }} /> */}
      </Container>
    </ThemeProvider>
  );
}
