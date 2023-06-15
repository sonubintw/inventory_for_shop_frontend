import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "../src/pages/Home/Home"
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Forgot from "./pages/auth/Forgot";
import Reset from "./pages/auth/Reset";
import Sidebar from "./components/sidebar/Sidebar";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/dashboard/Dashboard";
import axios from "axios";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getLoginStatus } from "./services/authService";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { SET_LOGIN } from "./redux/features/auth/authSlice";
import AddProduct from "./pages/addProduct/Addproduct"
import ProductDetails from "./components/product/productDetails/ProductDetails";
import EditProduct from "./pages/editProduct/EditProduct";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";
import ReportBug from "./pages/Bug/ReportBug";


//this make sure that you are able tosave the credi.. across the whole app. Becoz of this you can skip it and not write after every axios request in an individual request
//a boolean value that indicates whether or not cross-site Access-Control requests should be made using credentials such as cookies, authorization headers or TLS client certificates.
axios.defaults.withCredentials = true

function App() {
  const dispatch = useDispatch()

  //to the the login status of the user at the very start of the loading of the site
  useEffect(() => {
    async function loginStatus() {
      const status = await getLoginStatus()
      // console.log(status)
      dispatch(SET_LOGIN(status))
    }

    loginStatus()
  }, [dispatch])

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        {/* //had to change the routes according to backend */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/resetpassword/:resetToken" element={<Reset />} />

        <Route path="/dashboard" element={
          <Sidebar>
            <Layout>
              <Dashboard />
            </Layout>
          </Sidebar>
        } />

        <Route path="/add-product" element={
          <Sidebar>
            <Layout>
              <AddProduct />
            </Layout>
          </Sidebar>
        } />

        <Route path="/product-details/:id" element={
          <Sidebar>
            <Layout>
              <ProductDetails />
            </Layout>
          </Sidebar>
        } />

        <Route path="/product-update/:id" element={
          <Sidebar>
            <Layout>
              <EditProduct />
            </Layout>
          </Sidebar>
        } />

        <Route path="/profile" element={
          <Sidebar>
            <Layout>
              <Profile />
            </Layout>
          </Sidebar>
        } />


        <Route path="/edit-profile" element={
          <Sidebar>
            <Layout>
              <EditProfile />
            </Layout>
          </Sidebar>
        } />

        <Route path="/contact-us" element={
          <Sidebar>
            <Layout>
              <ReportBug />
            </Layout>
          </Sidebar>
        } />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
