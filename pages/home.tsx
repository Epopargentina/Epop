import React from "react";
import { Button, CardMedia, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "../src/store";
import SimpleBottomNavigation from "../components/AppBar";
import TemporaryDrawer from "./ui/drawer";
import { useAppDispatch } from "../src/store/index";
import { dataOfUser } from "../src/store/slices/firebase";

export default function Home() {
  const token = useSelector((state: RootState) => state.firebaseSlice.token);
  const user = useSelector((state: RootState) => state.firebaseSlice.user);
  const links = user?.links;
  const router = useRouter();
  const [state, setState] = React.useState({ bottom: false });
  const photoURL = user?.user_image;
  const biography = user?.user_biography;
  const dispatch = useAppDispatch();

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
    if (token) {
      localStorage.setItem("accessToken", token);
    }
  }, []);

  React.useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);

  return (
    <Box component="div">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={`${photoURL}`}
          style={{ maxHeight: "40vh", width: "50%", objectFit: "cover" }}
          alt="profile_photo"
        />
      </div>
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
            marginBottom: "40px",
          }}
        >
          Editar perfil
        </Button>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            maxWidth: "100%",
            alignItems: "baseline",
            justifyContent: "center",
          }}
        >
          {Array.isArray(links) &&
            links.map((item: any) => (
              <div
                style={{
                  margin: "5px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <CardMedia
                  component="img"
                  image={item.link_logo}
                  sx={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "10px",
                  }}
                />
                <label
                  style={{
                    width: "100px",
                    fontFamily: "Mulish",
                    fontSize: "12px",
                  }}
                >
                  {item.link_name}
                </label>
              </div>
            ))}
        </div>
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
