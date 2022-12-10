import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Divider } from "@mui/material";
import { useAppDispatch } from "../../src/store";
import { postLink } from "../../src/store/slices/firebase";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

const linksPerDefault = [
  {
    name: "Enlace personalizado",
    icon: "https://cdn-icons-png.flaticon.com/512/2990/2990159.png",
  },
  {
    name: "Whatsapp",
    icon: "https://cdn-icons-png.flaticon.com/512/124/124034.png?w=740&t=st=1669245748~exp=1669246348~hmac=c862bcb421c905ef3764f3f4ad975c7abbca87bd9837a68556f32cf498d4a8ee",
  },
  {
    name: "Facebook",
    icon: "https://cdn-icons-png.flaticon.com/512/174/174848.png",
  },
  {
    name: "Instagram",
    icon: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png",
  },
  {
    name: "Contacto",
    icon: "https://cdn-icons-png.flaticon.com/512/46/46646.png",
  },
];

interface Props {
  open: boolean;
  setOpen: any;
}

export default function BasicModal({ open, setOpen }: Props) {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [token, setToken] = React.useState<any>("");
  const dispatch = useAppDispatch();
  const [input, setInput] = React.useState({
    link_name: "",
    link_logo: "",
    link_url: "",
  });

  React.useEffect(() => {
    setToken(localStorage.getItem("accessToken"));
  }, []);

  React.useEffect(() => {
    const inArray = linksPerDefault.filter(
      (item: any) => item.name === input.link_name
    );
    if (input.link_name !== "" && inArray.length > 0) {
      console.log(inArray[0].icon);
      setInput({
        ...input,
        link_logo: inArray[0].icon,
      });
    } else {
      return;
    }
  }, [input.link_name]);

  function handleChange(e: any) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit() {
    const inArray = linksPerDefault.filter(
      (item: any) => item.name === input.link_name
    );
    if (input.link_logo === "" && inArray) {
      setInput({
        ...input,
        link_logo: inArray[0].icon,
      });
      dispatch(postLink(token, input));
      handleClose();
    }
    dispatch(postLink(token, input));
    handleClose();
  }

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <label
            style={{
              display: "block",
              marginBottom: "15px",
              fontFamily: "Mulish",
              fontWeight: 800,
            }}
          >
            Agregar link
          </label>
          <Divider />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              marginTop: "5px",
            }}
          >
            <button
              onChange={(e: any) => handleChange(e)}
              name="link_logo"
              style={{
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
                marginBottom: "15px",
              }}
            >
              LOGO
            </button>
            <select
              onChange={(e: any) => handleChange(e)}
              name="link_name"
              style={{
                width: "60%",
                height: "48px",
                border: "2px solid #d9d9d9",
                fontFamily: "Mulish",
                borderRadius: "10px",
                marginBottom: "10px",
                marginTop: "15px",
              }}
            >
              <option>Selecciona una opcion</option>
              {Array.isArray(linksPerDefault) &&
                linksPerDefault.map((item: any) => (
                  <option key={item.name} value={item.name}>
                    {item.name}
                  </option>
                ))}
            </select>
            <input
              onChange={(e: any) => handleChange(e)}
              name="link_name"
              placeholder="Titulo del enlace (opcional)"
              style={{
                width: "60%",
                height: "48px",
                border: "2px solid #d9d9d9",
                fontFamily: "Mulish",
                borderRadius: "10px",
                marginBottom: "10px",
              }}
            ></input>

            <input
              onChange={(e: any) => handleChange(e)}
              name="link_url"
              placeholder="Link"
              style={{
                width: "60%",
                height: "48px",
                border: "2px solid #d9d9d9",
                fontFamily: "Mulish",
                borderRadius: "10px",
                marginBottom: "10px",
              }}
            ></input>
          </Box>
          <Button
            onClick={handleSubmit}
            fullWidth
            sx={{
              backgroundColor: "#000",
              color: "#FFF",
              fontFamily: "Mulish",
              "&:hover": {
                backgroundColor: "#000",
              },
              marginTop: "5px",
              borderRadius: "10px",
            }}
          >
            Guardar perfil
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
