import React from "react";
import "./Dashboard.css";
import { getFavorites, searchName } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProfileStatus from "../ProfileStatus/ProfileStatus";

function Dashboard() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const cart = useSelector((state) => state.cart);
  const allUsers = useSelector((state) => state.allUsers);

  const allCategories = useSelector((state) => state.categories);
  const allProducts = useSelector((state) => state.products);
  const myOrders = useSelector((state) => state.orderDetail);

  const favorites = useSelector((state) => state.favorites);
  let user = JSON.parse(localStorage.getItem("loggedUser"));

  // actualiza el componente para cargar el length del array de favoritos cuando agregamos o eliminamos uno
  useEffect(() => {
    if (user) dispatch(getFavorites(user.email, user.name));
  }, [dispatch]);

  let myFavs =
    favorites["Favorites"] !== undefined ? favorites["Favorites"].length : "0";

  let myCategories = allCategories !== undefined ? allCategories.length : "0";

  let myProducts = allProducts !== undefined ? allProducts.length : "0";

  const myUsers = allUsers !== undefined ? allUsers.length : "0";

  let orders = myOrders !== undefined ? myOrders.length : "0"

  const [showModal, setShowModal] = useState(false);

  const handleSearch = (e) => {
    dispatch(searchName(e));
    setName(e);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const actualUser = useSelector((state) => state.user);
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(actualUser));
  }, [actualUser]);

  return (
    <div className="container">
      <ProfileStatus showModal={showModal} closeModal={closeModal} />

      <div className="container mt-4">
        <div className="col-lg-9 my-lg-0 my-1">
          <div id="main-content" className="bg-white border">
            <div className="d-flex flex-column">
              <div className="h5">
                Hello...
                <h6>{actualUser.data.searchUser.username}</h6>
                <img
                  src="https://www.soyvisual.org/sites/default/files/styles/twitter_card/public/images/photos/jue_0023-p.jpg?itok=rIHptSTm"
                  style={{ width: "60px", height: "60px" }}
                  alt="profile-img"
                  className="profile-img-card"
                />
                <h6>{actualUser.data.searchUser.firstname}</h6>
                <h6>{actualUser.data.searchUser.lastname}</h6>
                Logged in as:
                <h6>{actualUser.data.searchUser.email}</h6>
              </div>
              <div className="wrap">
                <h3>Select the card of your interest</h3>
              </div>
            </div>

            <div
              className="d-flex my-4 flex-wrap"
              style={{ justifyContent: "space-around" }}
            >
              <div className="box me-4 my-1 bg-light">
                <img
                  src="https://www.freepnglogos.com/uploads/box-png/cardboard-box-brown-vector-graphic-pixabay-2.png"
                  alt=""
                />
                <div className="d-flex align-items-center mt-2">
                  <div className="tag"></div>
                  <Link
                    to={"/userhistory"}
                    style={{
                      fontSize: "14px",
                      color: "black",
                      marginTop: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    Orders placed
                  </Link>
                  <div className="ms-auto number"><p>{orders}</p></div>
                </div>
              </div>
              <div className="box me-4 my-1 bg-light">
                <img
                  src="https://www.freepnglogos.com/uploads/shopping-cart-png/shopping-cart-campus-recreation-university-nebraska-lincoln-30.png"
                  alt=""
                />
                <div className="d-flex align-items-center mt-2">
                  <div className="tag"></div>
                  <Link
                    to={"/shop/cart"}
                    style={{
                      fontSize: "14px",
                      color: "black",
                      marginTop: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    Cart details
                  </Link>

                  <div className="ms-auto number">
                    <p>{cart.length}</p>
                  </div>
                </div>
              </div>
              <div className="box me-4 my-1 bg-light">
                <img
                  src="https://www.freepnglogos.com/uploads/love-png/love-png-heart-symbol-wikipedia-11.png"
                  alt=""
                />
                <div className="d-flex align-items-center mt-2">
                  <div className="tag"></div>
                  <Link
                    to={"/wishlist"}
                    style={{
                      fontSize: "14px",
                      color: "black",
                      marginTop: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    Wishlist details
                  </Link>

                  <div className="ms-auto number">
                    <p>{myFavs}</p>
                  </div>
                </div>
              </div>
            </div>
            {actualUser.data.searchUser.id === 1 ? (
              <div
                className="d-flex my-4 flex-wrap"
                style={{ justifyContent: "space-around" }}
              >
                <div className="box me-4 my-1 bg-light">
                  <img
                    src="https://e7.pngegg.com/pngimages/522/207/png-clipart-profile-icon-computer-icons-business-management-social-media-service-people-icon-blue-company.png"
                    alt=""
                  />
                  <div className="d-flex align-items-center mt-2">
                    <div className="tag" style={{ marginTop: "20px" }}></div>
                    <Link
                      to={"/users/"}
                      style={{
                        fontSize: "14px",
                        color: "black",
                        marginTop: "20px",
                        fontWeight: "bold",
                      }}
                    >
                      Users details
                    </Link>

                    <div className="ms-auto number">
                      <p>{myUsers}</p>
                    </div>
                  </div>
                </div>

                <div className="box me-4 my-1 bg-light">
                  <img
                    src="https://e7.pngegg.com/pngimages/252/907/png-clipart-infographic-circle-icon-circles-and-triangles-infographics-ppt-01-05-text-blue-angle.png"
                    alt=""
                  />
                  <div className="d-flex align-items-center mt-2">
                    <div className="tag" style={{ marginTop: "20px" }}></div>
                    <Link
                      to={"/category/"}
                      style={{
                        fontSize: "14px",
                        color: "black",
                        marginTop: "20px",
                        fontWeight: "bold",
                      }}
                    >
                      Categories details
                    </Link>
                    <div className="ms-auto number">
                      <p>{myCategories}</p>
                    </div>
                  </div>
                </div>
                <div className="box me-4 my-1 bg-light">
                  <img
                    src="https://e7.pngegg.com/pngimages/485/1000/png-clipart-brown-cardboard-boxes-paper-mover-box-packaging-and-labeling-box-miscellaneous-freight-transport.png"
                    alt=""
                  />
                  <div className="d-flex align-items-center mt-2">
                    <div className="tag" style={{ marginTop: "20px" }}></div>
                    <Link
                      to={"/updateproduct/"}
                      style={{
                        fontSize: "14px",
                        color: "black",
                        marginTop: "20px",
                        fontWeight: "bold",
                      }}
                    >
                      Products details
                    </Link>

                    <div className="ms-auto number">
                      <p>{myProducts}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : actualUser.data.searchUser.admin ? (
              <div
                className="d-flex my-4 flex-wrap"
                style={{ justifyContent: "space-around" }}
              >
                <div className="box me-4 my-1 bg-light">
                  <img
                    src="https://e7.pngegg.com/pngimages/252/907/png-clipart-infographic-circle-icon-circles-and-triangles-infographics-ppt-01-05-text-blue-angle.png"
                    alt=""
                  />
                  <div className="d-flex align-items-center mt-2">
                    <div className="tag" style={{ marginTop: "20px" }}></div>
                    <Link
                      to={"/category/"}
                      style={{
                        fontSize: "14px",
                        color: "black",
                        marginTop: "20px",
                        fontWeight: "bold",
                      }}
                    >
                      Categories details
                    </Link>
                    <div className="ms-auto number">
                      <p>{myCategories}</p>
                    </div>
                  </div>
                </div>
                <div className="box me-4 my-1 bg-light">
                  <img
                    src="https://e7.pngegg.com/pngimages/485/1000/png-clipart-brown-cardboard-boxes-paper-mover-box-packaging-and-labeling-box-miscellaneous-freight-transport.png"
                    alt=""
                  />
                  <div className="d-flex align-items-center mt-2">
                    <div className="tag" style={{ marginTop: "20px" }}></div>
                    <Link
                      to={"/updateproduct/"}
                      style={{
                        fontSize: "14px",
                        color: "black",
                        marginTop: "20px",
                        fontWeight: "bold",
                      }}
                    >
                      Products details
                    </Link>

                    <div className="ms-auto number">
                      <p>{myProducts}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
