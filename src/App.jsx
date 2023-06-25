import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/dist/dropdown';
import { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, } from 'react-router-dom';
import { playstore, appstore, logowhite, voiceCommerce } from "./assets";

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
import Loader from './Components/utils/Loader/Loader';
import ShowBrands from './Pages/Admin/Brand/ShowBrands';
import AddBrand from './Pages/Admin/Brand/AddBrand';
import EditBrand from './Pages/Admin/Brand/EditBrand';
import ShowColors from './Pages/Admin/Color/ShowColors';
import AddColor from './Pages/Admin/Color/AddColor';
import EditColor from './Pages/Admin/Color/EditColor';
axios.defaults.withCredentials = true;

function App() {

  let [user, setUser] = useState({});
  let [loading, setLoading] = useState(false);
  useEffect(() => {
    getUser();
  }, [])
  const getUser = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/me`, { withCredentials: true });
      setUser(data);
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }
  const nouser = user?.success ? false : true;
  const normaluser = user?.success && user?.loggedInUser?.isAdmin === false;
  const admin = user?.success && user?.loggedInUser?.isAdmin === true;


  return (
    <div>
      {loading ? <Loader />
        :
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
                <Route path='/products' element={normaluser && <Products />} />
                <Route path='/product/:id' element={<ProductDetails />} />
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
                <Route path='/admin/brands' element={admin && <ShowBrands />} />
                <Route path='/admin/addBrand' element={admin && <AddBrand />} />
                <Route path='/admin/editBrand/:id' element={admin && <EditBrand />} />
                <Route path='/admin/colors' element={admin && <ShowColors />} />
                <Route path='/admin/addColor' element={admin && <AddColor />} />
                <Route path='/admin/editColor/:id' element={admin && <EditColor />} />
                <Route path='/admin/orders' element={admin && <ShowOrders />} />
                <Route path='/admin/orderDetail/:id' element={admin && <OrderDetail />} />
                <Route path='*' element={<NotFound />} />
              </Routes>
              <div className="foot">
                <div className="footer">
                  <div className="c2">
                    <img className='logowhite' src={voiceCommerce} alt="home" />
                  </div>
                  <div className="c1">
                    <h2 id="fh2">Download our app</h2>
                    <p id="fp2"> You can download our android and ios app.</p>
                    <img className='c1img' src={playstore} alt="home" />
                    <img className='c1img' src={appstore} alt="home" />

                  </div>

                  <div className="c3">
                    <h2 id="fh2">Useful Links</h2>
                    <ul id="ul">
                      <li className="lis" id="l1">About us</li>
                      <li className="lis" id="l2">Privacy policy</li>
                      <li className="lis" id="l3">Terms & conditions</li>
                      {/* <li className="lis" id="l4"></li> */}
                    </ul>
                  </div>

                  <div className="c4">
                    <h2 id="fh2">Follow Us</h2>
                    <ul id="ul">
                      <li className="lis" id="l1">Facebook</li>
                      <li className="lis" id="l2">Instagram</li>
                      <li className="lis" id="l3">Twitter</li>
                      <li className="lis" id="l4">Youtube </li>
                    </ul>

                  </div>
                </div>
                <div className="ft">
                  <hr id="lin" />
                  <p id="f2">Copyright &#169; 2023 - Voice Commerce</p>
                </div>
              </div>
            </ProductState>
          </User>
        </BrowserRouter>}
    </div>
  );
}

export default App;
