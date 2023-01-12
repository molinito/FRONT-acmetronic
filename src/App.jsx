import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./Home/Home";
import About from "./components/About/About";
import Shop from "./components/Shop/Shop";
import Detail from "./components/Detail/Detail";
import Filter from "./components/Filter/Filter";
import Form from "./components/Form/Form";
import UpdateProduct from "./components/UpdateProductForm/UpdateProduct";
import WishList from "./components/WishList/WishList.jsx";
import Footer from "./components/Footer/Footer";
import Landing from "./components/Landing/Landing";
import Cart from "./components/Cart/Cart";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Reviews from "./components/Reviews/Reviews";
import Stripe from "./components/Stripe/Stripe";
import EditProfile from "./components/EditProfile/EditProfile";
import Dashboard from "./components/Dashboard/Dashboard";
import UpdateCategory from "./components/CategoryTable/Category.jsx";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import UsersTable from "./components/UsersTable/UsersTable";
import ContactUs from "./components/ContactUs/ContactUs";
import UserHistory from "./components/UserHistory/UserHistory";

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:id" element={<Detail />} />
        <Route path="/form" element={<Form />} />
        <Route path="/shop/filter" element={<Filter />} />
        <Route path="/shop/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/users" element={<UsersTable />} />
        <Route path="/contact" element={<ContactUs />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/category" element={<UpdateCategory />} />
          <Route path="/updateproduct" element={<UpdateProduct />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/stripe" element={<Stripe />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/userhistory" element={<UserHistory />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
