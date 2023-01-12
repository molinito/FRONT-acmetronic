import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../redux/actions";
import Carousel from "../components/Carousel/Carousel";
import Card from "../components/Card/Card";
import "./Home.css";
import Ranking from "../components/Ranking/Ranking";
import { ToastContainer } from "react-toastify";


function Home() {
  const allProducts = useSelector((state) => state.copyProducts);
  const dispatch = useDispatch();
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3
  };
  useEffect(() => {
    dispatch(getAllProducts());
    // document.getElementById('search').value = ''   
  }, [dispatch]);

  return (
    <div className="background">
      <Carousel />

      <div className  ="container">
        <h2> Top 5 rated products </h2>
        </div>
      <Ranking allProducts={allProducts} />
      <div>    
      </div>
      <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
 
    </div>
    
  );
}

export default Home;