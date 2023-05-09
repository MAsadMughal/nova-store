import * as React from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, styled, Avatar, Button, Tooltip, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'
import "./Navbar.css"
import asad from "../../../assets/asad.png";
import AsadLogo from "../../../assets/AsadLogo.jpg";
import { Link, useLocation } from 'react-router-dom';
const pages = ['Home', 'Login', 'Signup', 'admin/dashboard', 'admin/login', 'productDetails', 'admin/addProduct'];


function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const location = useLocation();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const Navbar = styled(AppBar)`
  background-color:transparent;
  backdrop-filter: blur(10px);
  color:black;
  min-width:200px;
  `;
  return (

    <Navbar position="fixed"  >
      {!(location.pathname.includes('admin')) ? <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: 'flex', md: 'none', sm: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page,ind) => (
                <MenuItem key={ind} sx={{ width: "200px" }} onClick={handleCloseNavMenu}>
                  <Link style={{ textDecoration: 'none' }} to={`/${page}`}>
                    <Typography textAlign="center" style={{ textDecoration: 'none' }}>{page}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <div style={{ flex: 1 }}>
            <img width="100px" alt="logo" src={AsadLogo} />
          </div>


          <Box sx={{ display: { xl: 'flex', lg: 'flex', md: 'flex', sm: 'flex', xs: 'none' } }}>
            {pages.map((page,ind) => (
              <Link key={ind} style={{ textDecoration: 'none' }} to={`/${page}`}>
                <Button key={page} onClick={handleCloseNavMenu} sx={{ my: 2, textDecoration: 'none', fontWeight: "600", fontFamily: "sans-serif", }}>{page}</Button></Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <div className="dropdown text-primary" style={{ cursor: "pointer" }}>
              <div className="dropdown-toggle ms-5" id="triggerId" data-bs-toggle="dropdown"
                aria-expanded="false">
                <Avatar alt="Remy Sharp" sx={{ background: 'white' }} src={asad} />
              </div>
              <div className="dropdown-menu" aria-labelledby="triggerId">
                <Link to="/userprofile"><div className="dropdown-item" href="#">Profile</div></Link>
                <Link to="/dashboard"><div className="dropdown-item" href="#">Dashboard</div></Link>
              </div>
            </div>
          </Box>
        </Toolbar>
      </Container> : null}
    </Navbar>
  );
}
export default Navbar;
