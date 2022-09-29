// Library imports
import { useState, useContext } from "react";
import { Link } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";

// Local imports
import { AuthContext } from "../../shared/context/auth-context";

const title = "Hello";

/**
 * This is a MUI AppBar
 * @returns A responsive NavBar
 * @author Peter An
 * Although it was a copy and paste
 */
const NavBar = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const auth = useContext(AuthContext);

    let pages;
    let settings;

    // Handle if user is logged in
    if (auth.isLoggedIn) {
        pages = [
            { title: "Services", link: "/" },
            { title: "My Pets", link: `/${auth.userId}/pets` },
            { title: "Create Service", link: `/${auth.userId}/newService` },
            { title: "New Pet", link: `/${auth.userId}/newPet` },
        ];
        settings = [
            { title: "Account", link: `/${auth.userId}` },
            { title: "My Services", link: `/${auth.userId}/services` },
            { title: "Logout" },
        ];
    } else {
        pages = [
            { title: "Services", link: "/" },
            { title: "Login", link: "/auth" },
        ];
        settings = [{ title: "Login", link: "/auth" }];
    }

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

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component={Link}
                        to="/"
                        style={{
                            textDecoration: "none",
                        }}
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        {title}
                    </Typography>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                        }}
                    >
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
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem
                                    key={page.title}
                                    onClick={handleCloseNavMenu}
                                >
                                    <Typography
                                        textAlign="center"
                                        component={Link}
                                        to={page.link}
                                        style={{
                                            textDecoration: "none",
                                            color: "black",
                                        }}
                                    >
                                        {page.title}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component={Link}
                        to="/"
                        style={{
                            textDecoration: "none",
                        }}
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        {title}
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 10,
                        }}
                    />
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                        }}
                    >
                        {pages.map((page) => (
                            <Button
                                key={page.title}
                                onClick={handleCloseNavMenu}
                                sx={{
                                    my: 2,
                                    mx: 2,
                                    color: "white",
                                    display: "block",
                                }}
                                component={Link}
                                to={page.link}
                            >
                                {page.title}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton
                                onClick={handleOpenUserMenu}
                                sx={{ p: 0 }}
                            >
                                <Avatar
                                    alt="Remy Sharp"
                                    src="/static/images/avatar/2.jpg"
                                />
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
                            {settings.map((setting) => {
                                if (setting.title === "Logout") {
                                    return (
                                        <MenuItem
                                            key={setting.title}
                                            onClick={handleCloseUserMenu}
                                        >
                                            <Typography
                                                textAlign="center"
                                                onClick={auth.logout}
                                            >
                                                {setting.title}
                                            </Typography>
                                        </MenuItem>
                                    );
                                }
                                return (
                                    <MenuItem
                                        key={setting.title}
                                        onClick={handleCloseUserMenu}
                                    >
                                        <Typography
                                            textAlign="center"
                                            component={Link}
                                            to={setting.link}
                                            style={{
                                                textDecoration: "none",
                                                color: "black",
                                            }}
                                        >
                                            {setting.title}
                                        </Typography>
                                    </MenuItem>
                                );
                            })}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default NavBar;
