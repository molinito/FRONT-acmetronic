import React, {useEffect} from "react";
import { useDispatch } from "react-redux";
import Slider from "react-slick";
import Card from "../Card/Card";
import { getFavorites, getFavoritesGmail } from "../../redux/actions";
import { useAuth0 } from '@auth0/auth0-react';

export const Ranking = ({allProducts}) => {

  const dispatch = useDispatch()
  const { user } = useAuth0();
  
  let userDb = JSON.parse(localStorage.getItem("loggedUser"))
  
  // actualiza el componente para cargar los iconos de favoritos
  useEffect(() => {
    if(userDb) dispatch(getFavorites(userDb.email))
    if (user) dispatch(getFavoritesGmail(user.email));
  }, [dispatch]);

    function NextArrow(props) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, display: "block", background: "green" }}
            onClick={onClick}
          />
        );
      }
      
      function PrevArrow(props) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, display: "block", background: "green" }}
            onClick={onClick}
          />
        );
      }
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 3,
        speed: 500,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
          {
            breakpoint: 1300,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 2,
                infinite: true,
                dots: true
            }
        },
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
              }
            },
            {
                breakpoint: 960,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                  infinite: true,
                  dots: true
                }             
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 1
              }
            },
          ]
    };
    return (
        <div>
        <Slider {...settings}>
        {  allProducts?.slice(0, 9).map((e) => {
          // se mappea los 10 primeros productos pero se muestra solo 5
          return (
            
              <div className="product-card" key={e.id}>
                <Card 

                  id={e.id}
                  name={e.name}
                  price={e.price}
                  rating={e.rating > 3 ? e.rating : 3}
                  image={e.image}
                  stock={e.stock}
                /> 
              </div>
          );
          
        })}
        </Slider>
      </div> 
    );
}

export default Ranking;