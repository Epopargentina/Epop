import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CardMedia } from "@mui/material";
import ButtonAppBar from "../components/AppBar";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Home() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <ButtonAppBar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ bgcolor: "transparent", p: 8, m: 4 }}>
            <CardMedia
              component="img"
              image="/default-avatar.svg"
              sx={{ width: "150px", height: 150 }}
            />
          </Avatar>
          <Typography component="h1" variant="h5">
            Nombre de prueba
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              mt: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              component="h4"
              sx={{ fontFamily: "revert", color: "grey" }}
            >
              <strong>Link epop</strong>
              <Button>
                <CardMedia
                  component="img"
                  image="/pencil.svg"
                  sx={{ width: "24px", height: "24px" }}
                />
              </Button>
            </Typography>

            <Typography component="h4" sx={{ fontFamily: "revert" }}>
              <strong>Editar biografia</strong>
              <Button>
                <CardMedia
                  component="img"
                  image="/pencil.svg"
                  sx={{ width: "24px", height: "24px" }}
                />
              </Button>
            </Typography>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Directo"
            />
            <FormControlLabel
              control={
                <Checkbox value="remember" color="primary" defaultChecked />
              }
              label="Cuenta privada"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Pin de seguridad
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
