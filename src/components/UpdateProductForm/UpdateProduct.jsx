import React, { useEffect, useState } from "react";
import "./UpdateProduct.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getAllProducts,
  updateProduct,
  deleteProduct,
  getCategories,
  createProduct,
} from "../../redux/actions/index";
import { Edit, Delete, Duo } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import {
  FormControl,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Modal,
  Button,
  TextField,
  OutlinedInput,
  Select,
  MenuItem,
} from "@mui/material";

function UpdateProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allProducts = useSelector((state) => state.products);
  const allCategories = useSelector((state) => state.categories);
  const [mAdd, setMAdd] = useState(false);
  const [input, setInput] = useState([]);
  const [mEdit, setMEdit] = useState(false);
  const [errors, setErrors] = useState({});

  const [modalDel, setModalDel] = useState(false);
  const [inputAdd, setInputAdd] = useState({
    name: "",
    description: "",
    brand: "",
    price: "",
    stock: "",
    image: "",
    categories: [],
  });

  const [selectedProduct, setSelectedProduct] = useState({
    id: "",
    name: "",
    brand: "",
    description: "",
    price: "",
    stock: "",
    image: "",
  });

  function handleSubmitAdd(event) {
    event.preventDefault();

    dispatch(createProduct(inputAdd));
    setInputAdd({
      name: "",
      description: "",
      brand: "",
      price: "",
      stock: "",
      image: "",
      categories: [],
    });
    dispatch(getAllProducts());
    modalAdd();
    reload();
    window.scroll(0.0);
  }

  function handleSubmit() {
    dispatch(updateProduct(selectedProduct));
    setInput(
      input.map((product) =>
        product.id === selectedProduct.id ? selectedProduct : product
      )
    );
    dispatch(getAllProducts());
    reload();
    modalEdit();
    window.scroll(0, 0);
  }

  function handleDelete() {
    setInput(input.filter((product) => product.id !== selectedProduct.id));
    dispatch(deleteProduct(selectedProduct.id));
    dispatch(getAllProducts());
    reload();
    modalDelete();
    window.scroll(0, 0);
  }

  function handleChange(event) {
    setSelectedProduct((prevS) => ({
      ...prevS,
      [event.target.name]: event.target.value,
    }));
  }

  const selectProduct = (product, situation) => {
    setSelectedProduct(product);
    situation === "Edit" ? modalEdit() : modalDelete();
  };

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getCategories());
  }, []); // acabo de agregar esto para que se actualice la pagina

  function modalEdit() {
    setMEdit((prevM) => !prevM);
  }

  function modalDelete() {
    setModalDel((prevM) => !prevM);
  }

  function modalAdd() {
    setMAdd((prevM) => !prevM);
  }

  function handleAddSelect(event) {
    if (!inputAdd.categories.includes(event.target.value)) {
      setInputAdd({
        ...inputAdd,
        categories: [...inputAdd.categories, event.target.value],
      });
    }
  }

  function handleChangeAdd(event) {
    setInputAdd({
      ...inputAdd,
      [event.target.name]: event.target.value,
    });
    setErrors(
      validation({
        ...inputAdd,
        [event.target.name]: event.target.value,
      })
    );
  }

  function validation(inputAdd) {
    let errors = {};

    if (!inputAdd.name) {
      errors.name = "Must insert the name of the product";
    }

    if (
      allProducts.find(
        (product) => product.name.toLowerCase() === inputAdd.name.toLowerCase()
      )
    )
      errors.name = "The product already exists in the database";

    if (!inputAdd.brand) {
      errors.brand = "Must insert the brand of the product";
    }

    if (!inputAdd.price) {
      errors.price = "Must insert the price of the product";
    }

    if (!inputAdd.stock) {
      errors.stock = "Must insert the stock.";
    }

    if (!inputAdd.image) {
      errors.image = "Must insert a link with the image of the product.";
    }

    if (inputAdd.image.length > 200) {
      errors.image = "Must insert a short link";
    }

    if (!inputAdd.description) {
      errors.description = "Must provide a description of the product";
    }

    return errors;
  }

  const addBody = (
    <div className="modal">
      <h6>Add New Product</h6>
      <FormControl>
        <div>
          <TextField
            type="text"
            className="input"
            name="name"
            label="Name"
            onChange={(e) => handleChangeAdd(e)}
            value={inputAdd.name}
          />
          {errors.name ? <p className="error">{errors.name}</p> : null}
        </div>

        <br />
        <div>
          <TextField
            type="text"
            className="input"
            name="brand"
            label="Brand"
            onChange={(e) => handleChangeAdd(e)}
            value={inputAdd.brand}
          />
          {errors.brand && <p className="error">{errors.brand}</p>}
        </div>
        <br />
        <div>
          <TextField
            type="number"
            className="input"
            name="price"
            label="Price"
            onChange={(e) => handleChangeAdd(e)}
            value={inputAdd.price}
          />
          {errors.price && <p className="error">{errors.price}</p>}
        </div>
        <br />
        <div>
          <TextField
            type="number"
            className="input"
            name="stock"
            label="Stock"
            onChange={(e) => handleChangeAdd(e)}
            value={inputAdd.stock}
          />
          {errors.stock && <p className="error">{errors.stock}</p>}
        </div>
        <br />
        <div>
          <TextField
            type="text"
            className="input"
            name="description"
            label="Description"
            onChange={(e) => handleChangeAdd(e)}
            value={inputAdd.description}
          />
          {errors.description && <p className="error">{errors.description}</p>}
        </div>
        <br />
        <div>
          <TextField
            type="text"
            className="input"
            name="image"
            label="Image"
            onChange={(e) => handleChangeAdd(e)}
            value={inputAdd.image}
          />
          {errors.image && <p className="error">{errors.image}</p>}
        </div>
        {inputAdd.image && (
          <img
            src={inputAdd.image}
            alt="Product pic"
            height="80px"
            width="80px"
          />
        )}

        <br />

        <Select
          className="input"
          name="categories"
          label="Select Category"
          onChange={(e) => handleAddSelect(e)}
        >
          {allCategories.map((category) => (
            <MenuItem value={category.id} key={category.id} name={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <br />
      <div>
        <Button onClick={(e) => handleSubmitAdd(e)}>Add</Button>
        <Button onClick={() => modalAdd()}>Cancel</Button>
      </div>
      <br />
    </div>
  );

  const editBody = (
    <div className="modal">
      <h2>Edit Product</h2>

      <TextField
        type="text"
        className="input"
        name="name"
        label="Name"
        onChange={(event) => handleChange(event)}
        value={selectedProduct && selectedProduct.name}
      />
      <br />

      <TextField
        className="input"
        type="text"
        name="brand"
        label="Brand"
        onChange={(event) => handleChange(event)}
        value={selectedProduct && selectedProduct.brand}
      />
      <br />

      <TextField
        type="number"
        className="input"
        name="price"
        label="Price"
        onChange={(event) => handleChange(event)}
        value={selectedProduct && selectedProduct.price}
      />
      <br />
      <TextField
        type="number"
        className="input"
        name="stock"
        label="Stock"
        onChange={(event) => handleChange(event)}
        value={selectedProduct && selectedProduct.stock}
      />
      <br />
      <TextField
        type="text"
        className="input"
        name="description"
        label="Description"
        onChange={(event) => handleChange(event)}
        value={selectedProduct && selectedProduct.description}
      />
      <br />

      <TextField
        type="text"
        className="input"
        name="image"
        label="Image"
        onChange={(event) => handleChange(event)}
        value={selectedProduct && selectedProduct.image}
      />
      <br />

      <br />

      <div>
        <Button onClick={(e) => handleSubmit(e)}>Edit</Button>
        <Button onClick={(e) => modalEdit(e)}>Cancel</Button>
      </div>

      <br />
    </div>
  );

  const deleteBody = (
    <div className="modal">
      <p>
        Are you sure that you want to eliminate the product
        <b> {selectedProduct && selectedProduct.name}</b>?
      </p>

      <div>
        <Button onClick={() => handleDelete()}>YES</Button>
        <Button onClick={() => modalDelete()}>NO</Button>
      </div>
    </div>
  );

  function reload() {
    window.location.reload();
  }

  const products = allProducts?.length;

  return (
    <>
      <div className="container">
        <h1 className="title">Edit Products</h1>

        <div className="add">
          <Button onClick={() => modalAdd()}>
            <p>Add Product</p>
          </Button>
          <br />
          <Button>
            <Link to="/dashboard">
              <p>Back to Dashboard</p>
            </Link>
          </Button>
        </div>

        <TableContainer>
          <Table className="table">
            <TableHead className="th">
              <TableRow>
                <TableCell className="cell">Image</TableCell>
                <TableCell className="cell">Name</TableCell>
                <TableCell className="cell">Brand</TableCell>
                <TableCell className="cell">Price</TableCell>
                <TableCell className="cell">Stock</TableCell>
                <TableCell className="cell">Description</TableCell>

                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>

            <TableBody className="tb">
              {allProducts &&
                allProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div>
                        <img
                          src={product.image}
                          alt="product image"
                          width="80px"
                          height="80px"
                        />
                      </div>
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.brand}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>{product.description}</TableCell>

                    <TableCell>
                      <Edit
                        size={"18px"}
                        onClick={(e) => selectProduct(product, "Edit")}
                      />
                    </TableCell>
                    <TableCell>
                      <Delete
                        size={"18px"}
                        onClick={(e) => selectProduct(product, "Delete")}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Modal
          open={mAdd}
          onClose={(e) => modalAdd(e)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "800px",
            top: "50%",
            left: "50%",
            transform: " translate(-50%, -50%)",
            overflow: "scroll",
            width: "800px",
          }}
        >
          {addBody}
        </Modal>
        <Modal
          keepMounted
          open={mEdit}
          onClose={(e) => modalEdit(e)}
          style={{ overflow: "scroll" }}
        >
          {editBody}
        </Modal>
        <Modal
          keepMounted
          open={modalDel}
          onClose={(e) => modalDelete(e)}
          style={{ overflow: "scroll" }}
        >
          {deleteBody}
        </Modal>
      </div>
    </>
  );
}

export default UpdateProduct;
