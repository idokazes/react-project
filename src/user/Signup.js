import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
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
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import { JOI_HEBREW } from "./joi-hebrew";
import { pink } from '@mui/material/colors';

const defaultTheme = createTheme();

export default function Signup() {
  const { setLoader, isDarkMode, snackbar } = useContext(GeneralContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formObject, setFormObject] = useState({});

  const structure = [
    {
      name: "firstName",
      type: "text",
      label: "שם פרטי",
      required: true,
      block: false,
    },
    {
      name: "middleName",
      type: "text",
      label: "שם אמצעי",
      required: false,
      block: false,
    },
    {
      name: "lastName",
      type: "text",
      label: "שם משפחה",
      required: true,
      block: false,
    },
    {
      name: "phone",
      type: "tel",
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
      name: "password",
      type: "password",
      label: "סיסמה",
      required: true,
      block: false,
    },
    {
      name: "imgUrl",
      type: "text",
      label: "קישור לתמונה",
      required: false,
      block: true,
    },
    {
      name: "imgAlt",
      type: "text",
      label: "תיאור תמונה",
      required: false,
      block: false,
    },
    {
      name: "state",
      type: "text",
      label: "מחוז",
      required: false,
      block: false,
    },
    {
      name: "country",
      type: "text",
      label: "מדינה",
      required: true,
      block: false,
    },
    { name: "city", type: "text", label: "עיר", required: true, block: false },
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
    {
      name: "business",
      type: "boolean",
      label: "לקוח עסקי",
      required: true,
      block: false,
      defaultValue: false,
    },
  ];

  const styles = {
    input: {
      color: isDarkMode ? "#fff" : "#000", // Change text color
      borderColor: "yellow",
      border: "1px solid #fff",
      outline: "none",
    },
  };

  const schema = Joi.object({
    firstName: Joi.string()
      .required()
      .error(() => new Error(JOI_HEBREW["string.base"])),
    middleName: Joi.string().optional(),
    lastName: Joi.string()
      .required()
      .error(() => new Error(JOI_HEBREW["string.base"])),
    phone: Joi.string()
      .required()
      .error(() => new Error(JOI_HEBREW["string.base"])),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .error(() => new Error(JOI_HEBREW["string.email"])),
    password: Joi.string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*\d.*\d.*\d)[A-Za-z\d!@%$#^&*_\-]{8,}$/
      )
      .required()
      .error(() => new Error("Password does not meet the requirements.")),
    imgUrl: Joi.string().optional(),
    imgAlt: Joi.string().optional(),
    state: Joi.string().optional(),
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
    business: Joi.boolean().optional(),
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

    const obj = {};
    const elements = ev.target.elements;

    structure.forEach((s) => {
      if (s.type === "boolean") {
        obj[s.name] = elements[s.name].value === "on";
      } else {
        obj[s.name] = elements[s.name].value;
      }
    });

    setLoader(true);

    fetch(`https://api.shipap.co.il/clients/signup?token=${TOKEN}`, {
      credentials: "include",
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(obj),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.text().then((x) => {
            throw new Error(x);
          });
        }
      })
      .then(() => {
        snackbar("ההרשמה בוצעה בהצלחה")
        navigate("/login");
      })
      .catch((err) => {
        snackbar("שגיאה בהרשמה")
        alert(err.message);
      })
      .finally(() => setLoader(false));
  };

  const handleFieldChange = (ev, fieldName) => {
    const updatedFormObject = { ...formObject };
    if (fieldName === "business") {
      updatedFormObject[fieldName] = ev.target.checked;
    } else {
      updatedFormObject[fieldName] = ev.target.value;
    }
    setFormObject(updatedFormObject);
    console.log(updatedFormObject);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" sx={{marginBottom: "80px"}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: pink[500]}}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            הרשמה
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
                      control={
                        <Switch
                          color="primary"
                          onChange={(ev) => handleFieldChange(ev, s.name)}
                        />
                      }
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
                      InputProps={{ style: styles.input }}
                    />
                  )}
                </Grid>
              ))}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "#ff807cf9", '&:hover': {
                backgroundColor: '#c5524ef9 !important',
              },}}
              
            >
              הרשם
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link to="/login" style={{display: "flex", alignItems: "center", textDecoration: "none", color: "#000"}}>
                    <div style={{marginLeft: "7px"}}>להתחברות</div>
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
