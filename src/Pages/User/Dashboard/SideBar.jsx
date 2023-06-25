import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';
import { AppBar, Badge, Drawer, IconButton, Toolbar, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import "./SideBar.css";
import { arr } from './SidebarData';
import UserContext from '../../../context/User/UserContext';
import axios from 'axios';
import ProductContext from '../../../context/Product/ProductContext';
import CartIcon from '@mui/icons-material/ShoppingCartOutlined'
import Mic from '@mui/icons-material/MicExternalOn'
import { voiceCommerce } from '../../../assets';

export default function SideBar({ getUser }) {

    const StyledMic = styled(Mic)`
    font-size: 35px; 
    color: deepskyblue; 
`;
    const StyledCart = styled(CartIcon)`
        font-size: 30px; 
        color: #1769aa; 
`;
    const { user, getUserDetails, loading, setLoading } = React.useContext(UserContext);
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => { setOpen(true); };
    const handleDrawerClose = () => { setOpen(false); };
    const Navbar = styled(AppBar)` background-color:white; backdrop-filter: blur(10px); color:black; `;
    const location = useLocation();
    const Navigate = useNavigate();
    const Navigation = (e) => { Navigate(e.target.id); setOpen(false); }
    const { cart, getCart } = React.useContext(ProductContext);
    React.useEffect(() => {
        getCart()
    }, [])

    const logout = async () => {
        await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/logout`, { withCredentials: true });
        await getUser();
        await getUserDetails();
        Navigate('/');
        window.location.reload();
    }
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname])


    return (
        <>{!(location.pathname.includes('admin')) ?
            <Box sx={{ display: 'flex' }}>
                <Navbar position="fixed" open={open}>
                    <Toolbar>
                        {(user?.success && user?.loggedInUser?.isAdmin === false && location.pathname !== "/login" && location.pathname !== "/signup") && <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start" sx={{ marginRight: { xs: '0', sm: '5' }, fontSize: 'large' }}><svg xmlns="http://www.w3.org/2000/svg" width={window.innerWidth >= 500 ? '30' : '24'} height={window.innerWidth >= 500 ? '34' : '24'} viewBox="0 0 16 16" fill="none" className="css-1170n61"><rect x="1" y="5" width="14" height="1.5" rx="1" fill="#007FFF"></rect><rect x="1" y="9" width="14" height="1.5" rx="1" fill="#007FFF"></rect></svg></IconButton>}
                        {/* <Typography textAlign={'center'} sx={{ flexGrow: 1, marginLeft: '5%', fontSize: 'large' }} noWrap component="div">{window.innerWidth >= 400 ? 'Voice Commerce' : <StyledMic />}</Typography> */}
                        <Typography textAlign={'center'} sx={{ flexGrow: 1, marginLeft: '5%', fontSize: 'large' }} noWrap component="div"><img height={'50px'} src={voiceCommerce} /></Typography>
                        {(user?.success && user?.loggedInUser?.isAdmin === false) && <Link to='/cart'><div style={{ color: 'black', cursor: 'pointer', textDecoration: 'none' }} className='ms-5' ><Badge badgeContent={cart?.products?.length} color="info">
                            <StyledCart fontSize='large' /></Badge></div></Link>}
                        <div className="dropdown smooth-drop text-primary" style={{ cursor: "pointer", justifySelf: 'flex-end' }}>
                            <div className="dropdown-toggle ms-2" id="triggerId" data-bs-toggle="dropdown" aria-haspopup="true"
                                aria-expanded="false">
                                <AccountCircleIcon fontSize='large' />
                            </div>
                            {(user?.success && user?.loggedInUser?.isAdmin === false) ?
                                <div className="dropdown-menu" aria-labelledby="triggerId">
                                    <Link style={{ textDecoration: 'none' }} to="/profile">
                                        <div className="dropdown-item" href="#">Profile</div>
                                    </Link>
                                    <div className="dropdown-item" href="#" onClick={logout}>Logout</div>
                                </div> :
                                <div className="dropdown-menu" aria-labelledby="triggerId">
                                    <Link style={{ textDecoration: 'none' }} to="/login">
                                        <div className="dropdown-item" href="#">Login</div>
                                    </Link>
                                    <Link style={{ textDecoration: 'none' }} to="/signup">
                                        <div className="dropdown-item" href="#">Register</div>
                                    </Link>
                                </div>
                            }
                        </div>
                    </Toolbar>
                </Navbar>

                {(user?.success && user?.loggedInUser?.isAdmin === false) ? <Drawer anchor="left" PaperProps={{ style: { backgroundColor: 'transparent', backdropFilter: 'blur(5px)' } }} BackdropProps={{ invisible: false, style: { opacity: 1, backgroundColor: "transparent" }, }} open={open} onClose={handleDrawerClose}>

                    <div style={{ alignSelf: 'flex-end', cursor: 'pointer', }}>
                        <CloseIcon sx={{ color: 'white', height: "40px", width: "40px", backgroundColor: '#1976d2' }} onClick={handleDrawerClose}>Close</CloseIcon>
                    </div>

                    <div style={{ backgroundColor: 'transparent', height: "100vh", width: "300px" }}>
                        <ul>
                            {arr.map((item, ind) => {
                                return (
                                    <li key={ind} id={item.path} className='AdminSideBarLink' style={location.pathname === item.path ? { backgroundColor: 'black', color: 'white' } : null} onClick={Navigation}>
                                        {item.logo}&nbsp;{item.title}
                                    </li>)
                            })}
                        </ul>
                    </div>
                </Drawer >
                    : null}

            </Box > : null
        }
        </>
    );
}