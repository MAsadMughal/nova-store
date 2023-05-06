import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CategoryIcon from '@mui/icons-material/Category';
import HomeLogo from "@mui/icons-material/Home";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import WidgetsIcon from '@mui/icons-material/Widgets';
export const arr = [
    { logo: <HomeLogo />, title: "Home", path: "/" },
    { logo: <AccountBoxIcon />, title: "Profile", path: "/profile" },
    { logo: <CategoryIcon />, title: "Categories", path: "/categories" },
    { logo: <WidgetsIcon />, title: "Products", path: "/products" },
    { logo: <ShoppingCart />, title: "My Cart", path: "/cart" },
    { logo: <ShoppingCartCheckoutIcon />, title: "My Orders", path: "/myorders" }
];
