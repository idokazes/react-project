import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import EditIcon from '@mui/icons-material/Edit';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { GeneralContext, TOKEN } from "../App";
import Switch from "@mui/material/Switch";
import { FormControlLabel } from "@mui/material";
import Joi from "joi";
import { useState } from "react";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import { JOI_HEBREW } from "../user/joi-hebrew";

const defaultTheme = createTheme();

export default function EditCard() {
  const { setLoader, snackbar } = useContext(GeneralContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formObject, setFormObject] = useState({
    title: "",
    description: "",
    subtitle: "",
    phone: "",
    email: "",
    web: "",
    imgUrl: "",
    imgAlt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: null,
    zip: 0,
  });

  const structure = [
    {
      name: "title",
      type: "text",
      label: "כותרת",
      required: true,
      block: false,
    },
    {
      name: "description",
      type: "text",
      label: "תיאור",
      required: true,
      block: false,
    },
    {
      name: "subtitle",
      type: "text",
      label: "כותרת משנה",
      required: true,
      block: false,
    },
    {
      name: "phone",
      type: "text",
      label: "טלפון",
      required: true,
      block: false,
    },
    {
      name: "email",
      type: "email",
      label: "אימייל",
      required: true,
      block: false,
    },
    {
      name: "web",
      type: "text",
      label: "אתר העסק",
      required: true,
      block: false,
    },
    {
      name: "imgUrl",
      type: "text",
      label: "קישור תמונה",
      required: true,
      block: false,
    },
    {
      name: "imgAlt",
      type: "text",
      label: "כיתוב תמונה",
      required: true,
      block: false,
    },
    {
      name: "state",
      type: "text",
      label: "מחוז",
      required: true,
      block: false,
    },
    {
      name: "country",
      type: "text",
      label: "מדינה",
      required: true,
      block: false,
    },
    {
      name: "city",
      type: "text",
      label: "עיר",
      required: true,
      block: false,
    },
    {
      name: "street",
      type: "text",
      label: "רחוב",
      required: true,
      block: false,
    },
    {
      name: "houseNumber",
      type: "number",
      label: "מספר בית",
      required: true,
      block: false,
    },
    {
      name: "zip",
      type: "number",
      label: "מיקוד",
      required: false,
      block: false,
    },
  ];

  const schema = Joi.object({
    title: Joi.string()
      .required()
      .error(() => new Error(JOI_HEBREW["string.base"])),
    description: Joi.string()
      .required()
      .error(() => new Error(JOI_HEBREW["string.base"])),
    subtitle: Joi.string()
      .required()
      .error(() => new Error(JOI_HEBREW["string.base"])),
    phone: Joi.string()
      .required()
      .error(() => new Error(JOI_HEBREW["string.base"])),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .error(() => new Error(JOI_HEBREW["string.email"])),
    web: Joi.string()
      .required()
      .error(() => new Error(JOI_HEBREW["string.base"])),
    imgUrl: Joi.string()
      .required()
      .error(() => new Error(JOI_HEBREW["string.base"])),
    imgAlt: Joi.string()
      .required()
      .error(() => new Error(JOI_HEBREW["string.base"])),
    state: Joi.string()
      .required()
      .error(() => new Error(JOI_HEBREW["string.base"])),
    country: Joi.string()
      .required()
      .error(() => new Error(JOI_HEBREW["string.base"])),
    city: Joi.string()
      .required()
      .error(() => new Error(JOI_HEBREW["string.base"])),
    street: Joi.string()
      .required()
      .error(() => new Error(JOI_HEBREW["string.base"])),
    houseNumber: Joi.number()
      .required()
      .error(() => new Error(JOI_HEBREW["number.base"])),
    zip: Joi.number().optional(),
  });

  const validateForm = () => {
    const { error } = schema.validate(formObject);
    return error === undefined;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();

    if (!validateForm()) {
      console.log("form error");
      return;
    } else {
      console.log("form success");
    }

    // setLoader(true);

    // fetch(`https://api.shipap.co.il/business/cards?token=${TOKEN}`, {
    //   credentials: "include",
    //   method: "POST",
    //   headers: { "Content-type": "application/json" },
    //   body: JSON.stringify(formObject),
    // })
    //   .then((res) => {
    //     if (res.ok) {
    //       return res.json();
    //     } else {
    //       return res.text().then((x) => {
    //         throw new Error(x);
    //       });
    //     }
    //   })
    //   .then(() => {
    //     snackbar("כרטיסייה נוספה בהצלחה");
    //     navigate("/");
    //   })
    //   .catch((err) => {
    //     snackbar("שגיאה בהעלאת הכרטיסייה");
    //     alert(err.message);
    //   })
    //   .finally(() => setLoader(false));
  };

  const handleFieldChange = (ev, fieldName) => {
    const updatedFormObject = { ...formObject };
    updatedFormObject[fieldName] = ev.target.value;
    setFormObject(updatedFormObject);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" sx={{ marginBottom: "80px" }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{ m: 1, bgcolor: "secondary.main", backgroundColor: "#ff817c" }}
          >
            <EditIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            עריכת כרטיסייה
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              {structure.map((s) => (
                <Grid key={s.name} item xs={12} sm={s.block ? 12 : 6}>
                  {s.type === "boolean" ? (
                    <FormControlLabel
                      name={s.name}
                      control={<Switch color="primary" />}
                      label={s.label}
                      labelPlacement="start"
                    />
                  ) : (
                    <TextField
                      name={s.name}
                      required={s.required}
                      fullWidth
                      id={s.name}
                      label={s.label}
                      type={s.type}
                      onChange={(ev) => handleFieldChange(ev, s.name)}
                    />
                  )}
                </Grid>
              ))}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#ff817c",
                "&:hover": {
                  backgroundColor: "#ca5066",
                },
              }}
            >
              ערוך
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link
                  to="/"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    textDecoration: "none",
                    color: "#000",
                  }}
                >
                  <div style={{ marginLeft: "7px" }}>לדף הבית</div>
                  <ArrowCircleLeftOutlinedIcon />
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
