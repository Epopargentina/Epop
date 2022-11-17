import React from "react";
import { Button, CardMedia, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "../src/store";
import SimpleBottomNavigation from "../components/AppBar";

export default function Home() {
  const token = useSelector((state: RootState) => state.firebaseSlice.token);
  const user = useSelector((state: RootState) => state.firebaseSlice.user);
  const router = useRouter();
  const photoURL = user?.photoURL;

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
    <Box component="div">
      <img
        src={`${photoURL}`}
        style={{ maxHeight: "40vh", width: "100%", objectFit: "cover" }}
        alt="profile_photo"
      ></img>
      <Box
        component="div"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          component="p"
          sx={{
            fontFamily: "Mulish",
            fontWeight: 600,
            fontSize: "32px",
            margin: "20px",
          }}
        >
          <b>{user?.displayName}</b>
        </Typography>

        <Typography
          component="p"
          sx={{
            fontFamily: "Mulish",
            fontWeight: 600,
            fontSize: "22px",
            color: "grey",
            marginBottom: "20px",
          }}
        >
          Biografia?
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "black",
            width: "320px",
            height: "42px",
            borderRadius: "16px",
            "&:hover": { backgroundColor: "black" },
          }}
        >
          Editar perfil
        </Button>
      </Box>
      <SimpleBottomNavigation image={photoURL} />
    </Box>
  );
}
