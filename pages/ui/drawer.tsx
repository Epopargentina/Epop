import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import { CardMedia, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../src/store";
import { useRouter } from "next/router";
import { useAppDispatch } from "../../src/store/index";
import { updateProfile } from "../../src/store/slices/firebase";
import BasicModal from "./modalLink";

interface Props {
  setState: any;
  state: any;
  photo: string;
}

export default function TemporaryDrawer(props: Props) {
  const [open, setOpen] = React.useState(false);
  const user = useSelector((state: RootState) => state.firebaseSlice.user);
  // const token = useSelector((state: RootState) => state.firebaseSlice.token);
  const [token, setToken] = React.useState<any>("");
  const [photo, setPhoto] = React.useState(props.photo);
  const [state, setState] = React.useState({
    bottom: false,
  });
  const [input, setInput] = React.useState({});
  const dispatch = useAppDispatch();
  const router = useRouter();

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

      props.setState({ ...state, [anchor]: open });
    };

  React.useEffect(() => {
    setToken(localStorage.getItem("accessToken"));
  }, []);

  function handleChange(e: any) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  async function saveProfile() {
    console.log(input);
    if (Object.values(input).length === 0) {
      return alert("Modifica algun campo para modificar");
    }
    try {
      await dispatch(updateProfile(token, input));
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <React.Fragment>
        <Drawer
          anchor={"bottom"}
          open={props.state["bottom"]}
          onClose={toggleDrawer("bottom", false)}
          sx={{
            borderTopRightRadius: "8px",
            borderTopLeftRadius: "8px",
          }}
        >
          <Box sx={{ width: "100%" }} role="presentation">
            <List>
              <Typography
                component="p"
                sx={{
                  fontFamily: "Mulish",
                  fontWeight: 600,
                  fontSize: "18px",
                  marginLeft: "15px",
                }}
              >
                Editar perfil
              </Typography>
              <Box
                component="div"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <button
                  style={{
                    backgroundImage: `url(${user?.user_image})`,
                    width: "150px",
                    height: "150px",
                    backgroundRepeat: "no-repeat",
                    borderRadius: "100%",
                    color: "#FFF",
                    fontFamily: "Mulish",
                    fontWeight: 800,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    border: "none",
                    margin: "5px",
                  }}
                >
                  EDITAR
                </button>

                <input
                  onChange={(e: any) => handleChange(e)}
                  placeholder="Nombre"
                  className="input-drawer"
                  name="user_name"
                ></input>
                <input
                  onChange={(e: any) => handleChange(e)}
                  placeholder="Biografia"
                  className="input-drawer"
                  name="user_biography"
                ></input>
                <input
                  onChange={(e: any) => handleChange(e)}
                  placeholder="Puesto de trabajo"
                  className="input-drawer"
                  name="user_job"
                ></input>
                <input
                  onChange={(e: any) => handleChange(e)}
                  placeholder="Empresa"
                  className="input-drawer"
                  name="company"
                  style={{ marginBottom: "20px" }}
                ></input>
                <Typography
                  component="p"
                  sx={{
                    fontFamily: "Mulish",
                    fontWeight: 600,
                    fontSize: "18px",
                  }}
                >
                  Enlaces
                </Typography>
                {Array.isArray(user?.links) &&
                  user.links.map((link: any) => (
                    <Button
                      key={link.link_name}
                      sx={{
                        backgroundColor: "lightgrey",
                        borderRadius: "12px",
                        padding: "6px",
                        width: "40%",
                        margin: "5px",
                        color: "#000",
                        fontFamily: "Mulish",
                        textTransform: "capitalize",
                      }}
                    >
                      {" "}
                      <CardMedia
                        key={link.link_name}
                        component="img"
                        image={link.link_logo}
                        className="image-links"
                        sx={{
                          width: "24px",
                          height: "24px",
                          marginRight: "4px",
                        }}
                      />{" "}
                      {link.link_name}
                    </Button>
                  ))}

                <Button
                  onClick={() => setOpen(true)}
                  sx={{
                    backgroundColor: "lightgrey",
                    borderRadius: "12px",
                    padding: "6px",
                    width: "40%",
                    margin: "5px",
                    color: "#000",
                    fontFamily: "Mulish",
                    textTransform: "capitalize",
                  }}
                >
                  + Agregar nuevo enlace
                </Button>
              </Box>
              <Button
                onClick={saveProfile}
                fullWidth
                sx={{
                  backgroundColor: "#000",
                  color: "#FFF",
                  fontFamily: "Mulish",
                  "&:hover": {
                    backgroundColor: "#000",
                  },
                  marginTop: "5px",
                  borderRadius: 0,
                }}
              >
                Guardar perfil
              </Button>
              {open && <BasicModal open={open} setOpen={setOpen} />}
            </List>
          </Box>
        </Drawer>
      </React.Fragment>
    </div>
  );
}
