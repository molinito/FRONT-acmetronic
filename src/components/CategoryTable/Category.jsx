import React, { useState, useEffect } from "react";
import "./Category.css";
import { useDispatch, useSelector } from "react-redux";
import { Edit, Delete } from "@mui/icons-material";
import { Link } from "react-router-dom";

import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Button,
  Modal,
  TextField,
} from "@mui/material";
import {
  getCategories,
  updateCategory,
  deleteCategory,
  createCategories,
} from "../../redux/actions/index";

function UpdateCategory() {
  const dispatch = useDispatch();

  const allCategories = useSelector((state) => state.categories);

  console.log(allCategories);

  const [mAdd, setMAdd] = useState(false);
  const [mEdit, setMEdit] = useState(false);
  const [input, setInput] = useState(allCategories);

  const [inputAdd, setInputAdd] = useState({ name: "" });

  const [modalDel, setModalDel] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState({
    name: "",
  });
  function handleSubmit() {
    dispatch(updateCategory(selectedCategory));
    setInput(
      input.map((category) =>
        category.id === selectedCategory.id ? selectedCategory : category
      )
    );
    modalEdit();
    reload();
    window.scroll(0, 0);
  }

  function handleDelete() {
    setInput(input.filter((category) => category.id !== selectedCategory.id));
    dispatch(deleteCategory(selectedCategory.id));
    reload();
    modalDelete();
    window.scroll(0, 0);
  }

  function handleAdd(event) {
    event.preventDefault();
    dispatch(createCategories({ name: inputAdd.name }));
    setInputAdd({
      name: "",
    });
    reload();
    modalAdd();
    window.scroll(0, 0);
  }

  function handleChange(event) {
    setSelectedCategory({
      ...selectedCategory,
      [event.target.name]: event.target.value,
    });
  }

  function handleChangeAdd(event) {
    setInputAdd({
      ...inputAdd,
      [event.target.name]: event.target.value,
    });
  }

  const selectCategory = (category, situation) => {
    setSelectedCategory(category);
    situation === "Edit" ? modalEdit() : modalDelete();
  };
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  function modalEdit() {
    setMEdit((prevM) => !prevM);
  }
  function modalDelete() {
    setModalDel((prevM) => !prevM);
  }

  function modalAdd() {
    setMAdd((prevM) => !prevM);
  }

  const addBody = (
    <div className="modal">
      <h2>Add New Category</h2>
      <TextField
        type="text"
        className="input"
        name="name"
        label="New Category"
        onChange={(e) => handleChangeAdd(e)}
        value={inputAdd.name}
      />
      <br />
      <div>
        <Button onClick={(e) => handleAdd(e)}>Add</Button>
        <Button onClick={() => modalAdd()}>Cancel</Button>
      </div>
      <br />
    </div>
  );

  const editBody = (
    <div className="modal">
      <h2>Edit Category</h2>
      <TextField
        type="text"
        className="input"
        name="name"
        label="Edit Category"
        onChange={(event) => handleChange(event)}
        value={selectedCategory && selectedCategory.name}
      />
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
        Are you sure that you want to eliminate the category
        <b> {selectedCategory && selectedCategory.name}</b>?
      </p>
      <div>
        <Button onClick={() => handleDelete()}>YES</Button>
        <Button onClick={() => modalDel()}>NO</Button>
      </div>
    </div>
  );
  function reload() {
    window.location.reload();
  }

  return (
    <>
      <div className="container">
        <h1 className="title">Edit Categories</h1>
        <br />
        <Button>
          <Link to="/dashboard">
            <p>Back to Dashboard</p>
          </Link>
        </Button>
        <Button onClick={() => modalAdd()}>
          <p>Add a new Category</p>
        </Button>
        <TableContainer>
          <Table className="table">
            <TableHead className="th">
              <TableRow>
                <TableCell className="cell">Id</TableCell>
                <TableCell className="cell">Name</TableCell>
                <TableCell className="cell">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="tb">
              {allCategories &&
                allCategories?.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>{category.id}</TableCell>
                    <TableCell>{category.name}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => selectCategory(category, "Edit")}
                        className="button-table"
                      >
                        <Edit />
                      </Button>

                      <Button
                        onClick={() => selectCategory(category, "Delete")}
                        className="button-table"
                      >
                        <Delete />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Modal keepMounted open={mAdd} onClose={(e) => modalAdd(e)}>
          {addBody}
        </Modal>
        <Modal keepMounted open={mEdit} onClose={(e) => modalEdit(e)}>
          {editBody}
        </Modal>
        <Modal keepMounted open={modalDel} onClose={(e) => modalDelete(e)}>
          {deleteBody}
        </Modal>
      </div>
    </>
  );
}
export default UpdateCategory;
