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
import { GeneralContext, TOKEN } from "../App";
import { useContext } from "react";
import { RoleTypes } from "../config";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import { pink } from '@mui/material/colors';

const defaultTheme = createTheme();

export default function Login() {
  const { setUser, setLoader, setRoleType, snackbar } = useContext(GeneralContext);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setLoader(true);

    fetch(`https://api.shipap.co.il/clients/login?token=${TOKEN}`, {
      credentials: "include",
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        email: data.get("email"),
        password: data.get("password"),
      }),
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
      .then((data) => {
        setUser(data);
        setRoleType(RoleTypes.user);
        snackbar(`${data.fullName} מחובר`)
        
        if (data.business) {
          setRoleType(RoleTypes.business);
        } else if (data.admin) {
          setRoleType(RoleTypes.admin);
        }
        
        navigate("/");
      })
      .catch((err) => {
        alert(err.message);
        snackbar("שגיאה בכניסה")
      })
      .finally(() => setLoader(false));
  };

  return (
    <ThemeProvider theme={defaultTheme}>
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
          <Avatar sx={{ m: 1, bgcolor: pink[500]}}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            התחברות
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
              label="אימייל"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="סיסמה"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: "#ff807cf9",
                "&:hover": {
                  backgroundColor: "#c5524ef9 !important",
                },
              }}
            >
              התחבר
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link to="/signup" style={{display: "flex", alignItems: "center", textDecoration: "none", color: "#000"}}>
                    <div style={{marginLeft: "7px"}}>להרשמה</div>
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
