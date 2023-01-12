import React, { useState, useEffect } from "react";
import {
  getAllProducts,
  createProduct,
  getCategories,
} from "../../redux/actions/index";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Form.css";
import Swal from "sweetalert2";

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allCategories = useSelector((state) => state.categories);
  const allProducts = useSelector((state) => state.copyProducts);

  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    description: "",
    brand: "",
    price: "",
    stock: "",
    image: "",
    categories: [],
  });

  function handleChange(event) {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });

    setErrors(
      validation({
        ...input,
        [event.target.name]: event.target.value,
      })
    );
  }

  function handleSelect(event) {
    if (!input.categories.includes(event.target.value)) {
      setInput({
        ...input,
        categories: [...input.categories, event.target.value],
      });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (Object.keys(errors).length === 0) {
      Swal.fire({
        title: "The product was created succesfully",
        icon: "success",
      });
      dispatch(createProduct(input));

      setInput({
        name: "",
        description: "",
        brand: "",
        price: "",
        stock: "",
        image: "",
        categories: [],
      });
      navigate("/updateproduct");
    } else {
      Swal.fire({
        title: "Must complete all the information to upload the product",
        icon: "error",
      });
    }
  }

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  function validation(input) {
    let errors = {};

    if (!input.name) {
      errors.name = "Must insert the name of the product";
    }

    if (
      allProducts.find(
        (product) => product.name.toLowerCase() === input.name.toLowerCase()
      )
    )
      errors.name = "The product already exists in the database";

    if (!input.brand) {
      errors.brand = "Must insert the brand of the product";
    }

    if (!input.price) {
      errors.price = "Must insert the price of the product";
    }

    if (!input.stock) {
      errors.stock = "Must insert the stock.";
    }

    if (!input.image) {
      errors.image = "Must insert a link with the image of the product.";
    }

    if (input.image.length > 200) {
      errors.image = "Must insert a short link";
    }

    if (!input.description) {
      errors.description = "Must provide a description of the product";
    }

    return errors;
  }

  return (
    <>
      <div className="form">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              value={input.name}
              onChange={(e) => handleChange(e)}
            />

            {errors.name ? <p className="error">{errors.name}</p> : null}
          </div>
          <div>
            <label htmlFor="brand">Brand: </label>
            <input
              type="text"
              id="brand"
              name="brand"
              placeholder="Brand"
              value={input.brand}
              onChange={(e) => handleChange(e)}
            />

            {errors.brand && <p className="error">{errors.brand}</p>}
          </div>
          <div>
            <label htmlFor="stock">Stock: </label>
            <input
              type="number"
              id="stock"
              name="stock"
              placeholder="Stock"
              value={input.stock}
              onChange={(e) => handleChange(e)}
            />

            {errors.stock && <p className="error">{errors.stock}</p>}
          </div>
          <div>
            <label htmlFor="price">Price: </label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Price"
              value={input.price}
              onChange={(e) => handleChange(e)}
            />

            {errors.price && <p className="error">{errors.price}</p>}
          </div>
          <div>
            <label htmlFor="image">Image: </label>
            <input
              type="text"
              id="image"
              name="image"
              placeholder="Image"
              value={input.image}
              onChange={(e) => handleChange(e)}
            />

            {errors.image && <p className="error">{errors.image}</p>}
          </div>
          {input.image && (
            <img
              src={input.image}
              alt="Imagen del producto"
              height="200px"
              width="300px"
            />
          )}

          <div>
            <label htmlFor="image">Description: </label>

            <textarea
              type="text"
              id="description"
              name="description"
              cols="23"
              rows="10"
              placeholder="Description"
              value={input.description}
              onChange={(e) => handleChange(e)}
            />

            {errors.description && (
              <p className="error">{errors.description}</p>
            )}
          </div>
          <div>
            <select
              className="select"
              id="categories"
              name="categories"
              onChange={(event) => handleSelect(event)}
            >
              <option value="" hidden>
                Select Categories
              </option>

              {allCategories.map((category) => (
                <option
                  value={category.id}
                  key={category.id}
                  name={category.id}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">Add product</button>
          <button type="submit" onClick={"/updateproduct"}>Back to Edit Product</button>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
