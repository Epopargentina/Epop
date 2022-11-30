import React from "react";
import { Button, CardMedia, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "../src/store";
import SimpleBottomNavigation from "../components/AppBar";
import TemporaryDrawer from "./ui/drawer";

export default function Home() {
  const token = useSelector((state: RootState) => state.firebaseSlice.token);
  const user = useSelector((state: RootState) => state.firebaseSlice.user);
  const router = useRouter();
  const [state, setState] = React.useState({
    bottom: false,
  });
  const photoURL = user?.user_image;
  const biography = user?.user_biography;

  const toggleDrawer =
    (anchor: string, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  React.useEffect(() => {
    localStorage.setItem("accesToken", token);
  }, []);

  React.useEffect(() => {
    const accesToken = localStorage.getItem("accesToken");
    if (accesToken === null) {
      router.push("/login");
    }
  }, []);

  // React.useEffect(() => {
  //   if (token) {
  //     router.push("/home");
  //   }
  //   if (token === null) {
  //     router.push("/login");
  //   }
  // }, [token]);

  return (
    <Box component="div">
      <img
        src={`${photoURL}`}
        style={{ maxHeight: "40vh", width: "100%", objectFit: "cover" }}
        alt="profile_photo"
      />
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
          <b>{user?.user_name}</b>
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
          {user ? user.user_biography : ""}
        </Typography>
        <Button
          onClick={toggleDrawer("bottom", true)}
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
      <TemporaryDrawer
        key={token}
        state={state}
        setState={setState}
        photo={user?.user_image}
      />
      <SimpleBottomNavigation image={user?.user_image} />
    </Box>
  );
}
