import React, { useEffect, useState } from "react";
import "./UsersTable.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, updateUser } from "../../redux/actions";
import { Link } from "react-router-dom";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Modal,
  Button,
} from "@mui/material";

function UsersTable() {
  const dispatch = useDispatch();

  const allUsers = useSelector((state) => state.allUsers);
  const [selectedUser, setSelectedUser] = useState({
    firstname: "",
    lastname: "",
  });
  const [openAdmin, setOpenAdmin] = useState(false);
  const [openBanned, setOpenBanned] = useState(false);

  useEffect(() => {
    if (!openAdmin && !openBanned) {
      dispatch(getAllUsers());
    }
  }, [openAdmin, openBanned]);

  const handleOpenAdmin = (user) => {
    setSelectedUser(user);
    setOpenAdmin(true);
  };

  const handleCloseAdmin = () => {
    setOpenAdmin(false);
  };

  const handleOpenBanned = (user) => {
    setSelectedUser(user);
    setOpenBanned(true);
  };

  const handleCloseBanned = () => {
    setOpenBanned(false);
  };

  function handleAdmin() {
    const updatedUser = {
      ...selectedUser,
      admin: !selectedUser.admin,
    };

    dispatch(updateUser(selectedUser.id, updatedUser));
    setOpenAdmin(false);
  }

  function handleBanned() {
    const updatedUser = {
      ...selectedUser,
      banned: !selectedUser.banned,
    };

    dispatch(updateUser(selectedUser.id, updatedUser));
    setOpenBanned(false);
  }

  function getModalMessageAdmin() {
    if (selectedUser.admin) {
      return `Are you sure that you want to remove ${selectedUser.firstname} ${selectedUser.lastname} as an Admin on your website?`;
    } else {
      return `Are you sure that you want to make ${selectedUser.firstname} ${selectedUser.lastname} an Admin on your website?`;
    }
  }

  const editAdmin = (
    <div className="modal">
      <p>{getModalMessageAdmin()}</p>

      <div>
        <Button onClick={() => handleAdmin()}>YES</Button>
        <Button onClick={(e) => handleCloseAdmin(e)}> NO</Button>
      </div>
    </div>
  );

  function getModalMessageBanned() {
    if (selectedUser.banned) {
      return `Are you sure that you want to unbanned ${selectedUser.firstname} ${selectedUser.lastname} from your website?`;
    } else {
      return `Are you sure that you want to banned ${selectedUser.firstname} ${selectedUser.lastname} from your website?`;
    }
  }

  const editBanned = (
    <div className="modal">
      <p>
        {" "}
        Are you sure that you want to banned{" "}
        <b>
          {selectedUser && `${selectedUser.firstname} ${selectedUser.lastname}`}
        </b>{" "}
        on your website?
      </p>

      <div>
        <Button onClick={() => handleBanned()}>YES</Button>
        <Button onClick={(e) => handleCloseBanned(e)}> NO</Button>
      </div>
    </div>
  );

  return (
    <>
      <div className="container">
        <h1 className="title">List of Users</h1>
        <Button className="back">
          <Link to="/dashboard">
            <p>Back to Dashboard</p>
          </Link>
        </Button>
        <TableContainer>
          <Table className="table">
            <TableHead className="th">
              <TableRow>
                <TableCell className="cell">Profile Image</TableCell>
                <TableCell className="cell">ID</TableCell>
                <TableCell className="cell">Username</TableCell>
                <TableCell className="cell">First Name</TableCell>
                <TableCell className="cell">Last Name</TableCell>
                <TableCell className="cell">Email</TableCell>
                <TableCell className="cell">Admin</TableCell>
                <TableCell className="cell">Banned</TableCell>
              </TableRow>
            </TableHead>

            <TableBody className="tb">
              {allUsers &&
                allUsers?.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div>
                        <img
                          src={user.profileImage}
                          alt="profilepic"
                          width="80px"
                          height="80px"
                        />
                      </div>
                    </TableCell>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.firstname}</TableCell>
                    <TableCell>{user.lastname}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleOpenAdmin(user)}>
                        {user.admin ? "Unmake Admin" : "Make Admin"}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => handleOpenBanned(user)}>
                        {user.banned ? "Unban" : "Ban"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Modal open={openAdmin} onClose={handleCloseAdmin}>
          {editAdmin}
        </Modal>

        <Modal open={openBanned} onClose={handleCloseBanned}>
          {editBanned}
        </Modal>
      </div>
    </>
  );
}

export default UsersTable;
