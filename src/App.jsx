import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/dist/dropdown';
import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, } from 'react-router-dom';
import './App.scss';
import AdminLogin from './Pages/Admin/Auth/Login';
import AdminProfile from './Pages/Admin/Auth/Profile';
import AddCategory from './Pages/Admin/Category/AddCategory';
import EditCategory from './Pages/Admin/Category/EditCategory';
import ShowCategories from './Pages/Admin/Category/ShowCategories';
import ShowCustomers from './Pages/Admin/Customers/ShowCustomers';
import Dashboard from './Pages/Admin/Dashboard/Dashboard';
import AdminSideBar from './Pages/Admin/Dashboard/SideBar';
import ShowOrders from './Pages/Admin/Orders/ShowOrders';
import AddProducts from './Pages/Admin/Products/AddProduct';
import EditProduct from './Pages/Admin/Products/EditProduct';
import ShowProducts from './Pages/Admin/Products/ShowProducts';
import Login from './Pages/User/Auth/Login';
import Signup from './Pages/User/Auth/Signup';
import UpdateProfile from './Pages/User/Auth/UpdateProfile';
import Cart from './Pages/User/Cart/Cart';
import AllCategories from './Pages/User/Category/AllCategories';
import SideBar from './Pages/User/Dashboard/SideBar';
import Home from './Pages/User/Home/Home';
import MyOrders from './Pages/User/Orders/MyOrders';
import OrderDetails from './Pages/User/Orders/OrderDetails';
import PlaceOrder from './Pages/User/Orders/PlaceOrder';
import ProductDetails from './Pages/User/ProductDetails/ProductDetails';
import Products from './Pages/User/Products/Products';
import User from './context/User/User';
import axios from 'axios';
import NotFound from './Pages/NotFound/NotFound';
import ProductState from './context/Product/ProductState';
import OrderDetail from './Pages/Admin/Orders/OrderDetail';
import WriteReview from './Pages/User/ProductDetails/WriteReviews';

axios.defaults.withCredentials = true;

function App() {

  let [user, setUser] = useState({});

  useEffect(() => {
    getUser();
  }, [])
  const getUser = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/me`, { withCredentials: true });
      setUser(data);
    } catch (error) {
    }
  }
  const nouser = user?.success ? false : true;
  const normaluser = user?.success && user?.loggedInUser?.isAdmin === false;
  const admin = user?.success && user?.loggedInUser?.isAdmin === true;


  return (
    <div>
      <BrowserRouter>
        <User>
          <ProductState>
            <AdminSideBar getUser={getUser} />
            <SideBar getUser={getUser} />
            {/* <div style={{ background: 'linear-gradient(#1845ad, #23a2f6)', width: "100%", height: "20px" }}>.</div> */}
            <Routes>
              <Route path='/' element={admin ? <Navigate to='/admin/dashboard' /> : normaluser ? <Home /> : <Home />} />
              <Route path='/login' element={nouser ? <Login getUser={getUser} /> : admin ? <Navigate to="/admin/dashboard" /> : <Navigate to='/' />} />
              <Route path='/signup' element={nouser ? <Signup getUser={getUser} /> : admin ? <Navigate to="/admin/dashboard" /> : <Navigate to='/' />} />
              <Route path='/profile' element={normaluser && <UpdateProfile />} />
              <Route path='/categories' element={normaluser && <AllCategories />} />
              <Route path='/products' element={normaluser && <Products />} />
              <Route path='/product/:id' element={normaluser && <ProductDetails />} />
              <Route path='/writeReview/:id' element={normaluser && <WriteReview />} />
              <Route path='/cart' element={normaluser && <Cart />} />
              <Route path='/myorders' element={normaluser && <MyOrders />} />
              <Route path='/orderdetails/:id' element={normaluser && <OrderDetails />} />
              <Route path='/checkout' element={normaluser && <PlaceOrder />} />


              <Route path='/admin/login' element={admin ? <Navigate to='/admin/dashboard' /> : normaluser ? <Navigate to='/' /> : <AdminLogin getUser={getUser} />} />
              <Route path='/admin/editproduct/:id' element={admin && <EditProduct />} />
              <Route path='/admin/dashboard' element={admin && <Dashboard />} />
              <Route path='/admin/profile' element={admin && <AdminProfile />} />
              <Route path='/admin/customers' element={admin && <ShowCustomers />} />
              <Route path='/admin/addproduct' element={admin && <AddProducts />} />
              <Route path='/admin/products' element={admin && <ShowProducts />} />
              <Route path='/admin/categories' element={admin && <ShowCategories />} />
              <Route path='/admin/addCategory' element={admin && <AddCategory />} />
              <Route path='/admin/editCategory/:id' element={admin && <EditCategory />} />
              <Route path='/admin/orders' element={admin && <ShowOrders />} />
              <Route path='/admin/orderDetail/:id' element={admin && <OrderDetail />} />
              <Route path='*' element={<Navigate to='/' />} />
            </Routes>
          </ProductState>
        </User>
      </BrowserRouter>
    </div>
  );
}

export default App;
