import {
  CLEAN,
  GET_ALL_PRODUCTS,
  GET_PRODUCT_DETAIL,
  SEARCH_NAME,
  GET_CATEGORIES,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  ORDERBYAZ,
  FILTER_CATEGORY,
  GET_PRODUCT_RATING,
  PRICE_FILTER,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  GET_ALL_USERS,
  GET_USER_BY_ID,
  PAYMENT_STRIPE,
  ADD_TO_CART,
  INCREASE_QUANTITY,
  DELETE_ONE_FROM_CART,
  DELETE_ALL_FROM_CART,
  CLEAR_CART,
  GET_FAVORITES,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_AUTH0,
  LOGIN_FAILURE,
  LOGOUT,
  GET_USER_PROFILE,
  DECREMENT_STOCK,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  CREATE_CATEGORIES,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  GET_FAVORITES_GMAIL,
  ADD_FAVORITE_GMAIL,
  REMOVE_FAVORITE_GMAIL,
  GET_USER_BY_EMAIL,
  SEND_EMAIL_REQUEST,
  SEND_EMAIL_FAILURE,
  SEND_EMAIL_SUCCESS,
  UPDATE_ORDER,
  DELETE_ORDER,
  GET_ORDER_BY_ID,
  POST_ORDER,
  GET_ORDERS,
  POST_COMMENTS,
  GET_ORDER_BY_EMAIL,
  CREATE_PRODUCT,
} from "../actions";

const initialState = {
  data: {},
  products: [],
  detail: [],
  copyProducts: [],
  categories: [],
  rating: [],
  favorites: [],
  allUsers: [],
  userDetail: [],
  stripe: [],
  cart: JSON.parse(localStorage.getItem("cart")) || [],
  login: [],
  user: JSON.parse(localStorage.getItem("user")) || [],
  isLoading: false,
  isAuthenticated: localStorage.getItem("logged") || false,
  error: "",
  userProfile: [],
  userEmail: [],
  allOrders: [],
  orderDetail: {},
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        copyProducts: action.payload,
      };
    case GET_PRODUCT_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };
    case SEARCH_NAME: {
      const all = state.products;
      const search = all.filter((f) =>
        f.name.toLowerCase().includes(action.payload.toLowerCase())
      );

      return {
        ...state,
        copyProducts: search,
      };
    }
    case CLEAN:
      return {
        ...state,
        detail: [],
      };

    case "CREATE_PRODUCT":
      return { ...state };

    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };

    case UPDATE_PRODUCT:
      console.log(action.payload.product, 24);
      return { ...state };

    case DELETE_PRODUCT:
      return action.payload;

    // CASE para traer el rating desde el reduce/index y poder ordenarlos de mayor a menor y de menor a mayor
    case GET_PRODUCT_RATING: {
      let filterorderrating = [...state.products];
      let filterproductrating = [...state.copyProducts];
      if (action.payload === "all") {
        return {
          ...state,
          copyProducts: filterorderrating,
        };
      }
      if (action.payload === "asc") {
        const data = filterproductrating.sort((a, b) =>
          a.rating > b.rating ? 1 : -1
        );
        return {
          ...state,
          copyProducts: data,
        };
      }

      const data = filterproductrating.sort((a, b) =>
        a.rating > b.rating ? -1 : 1
      );
      return {
        ...state,
        copyProducts: data,
      };
    }

    // CASE para traer el precio desde el reduce/index y poder ordenarlos de mayor a menor y de menor a mayor
    case PRICE_FILTER: {
      let filterorderprice = [...state.products];
      let filterproductprice = [...state.copyProducts];
      if (action.payload === "all") {
        return {
          ...state,
          copyProducts: filterorderprice,
        };
      }
      if (action.payload === "asc") {
        const data = filterproductprice.sort((a, b) => {
          let priceA = parseInt(a.price);
          let priceB = parseInt(b.price);
          if (priceA > priceB) return 1;
          if (priceA < priceB) return -1;
          else return 0;
        });
        return {
          ...state,
          copyProducts: data,
        };
      }

      const data = filterproductprice.sort((a, b) => {
        let pesoA = parseInt(a.price);
        let pesoB = parseInt(b.price);
        if (pesoA > pesoB) return -1;
        if (pesoA < pesoB) return 1;
        else return 0;
      });
      return {
        ...state,
        copyProducts: data,
      };
    }

    case ORDERBYAZ: {
      let filterorder = [...state.products];
      let filterproduct = [...state.copyProducts];
      if (action.payload === "all") {
        return {
          ...state,
          copyProducts: filterorder,
        };
      }

      if (action.payload === "asc") {
        const data = filterproduct.sort((a, b) =>
          a.name?.toUpperCase() > b.name?.toUpperCase() ? 1 : -1
        );
        return {
          ...state,
          copyProducts: data,
        };
      }

      const data = filterproduct.sort((a, b) =>
        a.name?.toUpperCase() > b.name?.toUpperCase() ? -1 : 1
      );

      return {
        ...state,
        copyProducts: data,
      };
    }

    case FILTER_CATEGORY: {
      let allProducts = state.products;
      let aux2 =
        action.payload === "All"
          ? allProducts
          : allProducts.filter((el) =>
              el.CategoryProduct[0].name?.includes(action.payload)
            );
      return {
        ...state,
        copyProducts: aux2,
      };
    }
    case GET_FAVORITES: {
      return {
        ...state,
        favorites: action.payload,
      };
    }

    case GET_FAVORITES_GMAIL: {
      return {
        ...state,
        favorites: action.payload,
      };
    }

    case ADD_FAVORITE: {
      return {
        ...state,
        favorites: action.payload,
      };
    }

    case ADD_FAVORITE_GMAIL: {
      return {
        ...state,
        favorites: action.payload,
      };
    }

    case REMOVE_FAVORITE: {
      return {
        ...state,
        favorites: action.payload,
      };
    }

    case REMOVE_FAVORITE_GMAIL: {
      return {
        ...state,
        favorites: action.payload,
      };
    }

    case GET_ALL_USERS: {
      return {
        ...state,
        allUsers: action.payload,
      };
    }

    case GET_USER_BY_ID: {
      return {
        ...state,
        userDetail: action.payload,
      };
    }

    case PAYMENT_STRIPE: {
      return {
        ...state,
        stripe: action.payload,
      };
    }
    case ADD_TO_CART: {
      let newItem = state.products.find(
        (product) => product.id === action.payload
      );
      let itemInCart = state.cart.find((item) => item.id == newItem.id);
      return itemInCart
        ? {
            ...state,
            cart: state.cart.map((item) =>
              item.id === newItem.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          }
        : {
            ...state,
            cart: [...state.cart, { ...newItem, quantity: 1 }],
          };
    }
    case DELETE_ONE_FROM_CART: {
      let itemToDelete = state.cart.find((item) => item.id === action.payload);
      return itemToDelete.quantity > 1
        ? {
            ...state,
            cart: state.cart.map((item) =>
              item.id === action.payload
                ? { ...item, quantity: item.quantity - 1 }
                : item
            ),
          }
        : {
            ...state,
            cart: state.cart.filter((item) => item.id !== action.payload),
          };
    }

    case DELETE_ALL_FROM_CART: {
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    }

    case INCREASE_QUANTITY: {
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    }

    case CLEAR_CART: {
      return {
        ...state,
        cart: [],
      };
    }

    case DECREMENT_STOCK: {
    }

    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
      };

    case LOGIN_AUTH0:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: {},
        favorites: {},
        userEmail: {},
      };

    case GET_USER_PROFILE:
      return {
        ...state,
        userProfile: action.payload,
      };

    case GET_USER_BY_EMAIL:
      return {
        ...state,
        userEmail: action.payload,
      };

    case UPDATE_CATEGORY:
      return action.payload;

    case DELETE_CATEGORY:
      return action.payload;

    case CREATE_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };

    case CREATE_USER: {
      return {
        ...state,
        allUsers: [...allUsers, action.payload],
      };
    }

    case UPDATE_USER:
      return {
        ...state,
        data: action.payload,
      };

    case DELETE_USER:
      return action.payload;

    case POST_COMMENTS:
      return { ...state };

    case SEND_EMAIL_REQUEST:
      return { ...state, isLoading: true };
    case SEND_EMAIL_SUCCESS:
      return { ...state, isLoading: false, error: null };
    case SEND_EMAIL_FAILURE:
      return { ...state, isLoading: false, error: action.payload };

    case UPDATE_ORDER:
      return {
        ...state,
        orderDetail: state.orderDetail,
      };
    case DELETE_ORDER:
      return action.payload;
    case GET_ORDER_BY_ID:
      return {
        ...state,
        orderDetail: action.payload,
      };
    case GET_ORDER_BY_EMAIL:
      return {
        ...state,
        orderDetail: action.payload.data,
      };
    case POST_ORDER: {
      return {
        ...state,
        allOrders: action.payload,
      };
    }

    case GET_ORDERS:
      return {
        ...state,
        allOrders: action.payload,
      };

    default:
      return { ...state };
  }
}

export default rootReducer;
