import { useState, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate, useResolvedPath } from "react-router-dom";
import { GeneralContext } from "../App";
import Searchbar from "./Searchbar";
import { RoleTypes, checkPermissions, pages, settings } from "../config";
// import DarkModeIcon from "@mui/icons-material/DarkMode";
// import LightModeIcon from "@mui/icons-material/LightMode";
import "./Navbar.css";

export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const {
    user,
    roleType,
    setUser,
    setRoleType,
    setLoader,
    isDarkMode,
    snackbar,
  } = useContext(GeneralContext);
  const navigate = useNavigate();
  const path = useResolvedPath().pathname;

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout = () => {
    setLoader(true);

    fetch(`https://api.shipap.co.il/clients/logout`, {
      credentials: "include",
    }).then(() => {
      setUser();
      setRoleType(RoleTypes.none);
      setLoader(false);
      navigate("/");
      snackbar("ההתנתקות בוצעה בהצלחה ");
    });

    handleCloseUserMenu();
  };

  return (
    <AppBar position="static">
      <Container
        maxWidth="1920px"
        sx={{ backgroundColor: isDarkMode ? "#7a5af5" : "#ff817c" }}
      >
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => navigate("/")}
            className="app-logo"
            sx={{
              mr: 2,
              display: { xs: "none", sm: "flex" },
              fontFamily: "Pacifico !important",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            Easydate
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {/* תפריט המבורגר */}
              {pages
                .filter(
                  (p) =>
                    !p.permissions || checkPermissions(p.permissions, roleType)
                )
                .map((page) => (
                  <Link
                    to={page.route}
                    key={page.route}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <MenuItem key={page.route} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page.title}</Typography>
                    </MenuItem>
                  </Link>
                ))}
              <Link to="/" style={{textDecoration: "none", color: "#000"}}>
                <MenuItem>
                  <Typography textAlign="center">דף הבית</Typography>
                </MenuItem>
              </Link>
            </Menu>
          </Box>
          {/* תפריט עליון */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages
              .filter(
                (p) =>
                  !p.permissions || checkPermissions(p.permissions, roleType)
              )
              .map((page) => (
                <Link
                  to={page.route}
                  key={page.route}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      color: "white",
                      display: "block",
                      backgroundColor: page.route === path ? "#ca5066" : "",
                    }}
                  >
                    {page.title}
                  </Button>
                </Link>
              ))}
          </Box>

          <div className="features-wrapper">
            {/* {isDarkMode ? <DarkModeIcon onClick={handleDarkModeToggle} className="dark-icon"/> : <LightModeIcon onClick={handleDarkModeToggle} className="light-icon"/>} */}
            <Searchbar />
          </div>

          {user && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar>{user.fullName[0].toUpperCase()}</Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <Link
                    to={setting.route}
                    key={setting.route}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">
                        {setting.title}
                      </Typography>
                    </MenuItem>
                  </Link>
                ))}
                <MenuItem onClick={logout}>
                  <Typography textAlign="center">התנתק</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
