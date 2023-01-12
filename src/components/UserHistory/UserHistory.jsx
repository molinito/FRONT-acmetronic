import React, { useEffect } from "react";
import "./UserHistory.css";
import { useDispatch, useSelector } from "react-redux";
import { getOrderByEmail, getOrders } from "../../redux/actions/index";
import { Link } from "react-router-dom";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Button,
} from "@mui/material";

export default function UserHistory() {
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.orderDetail);
  const user = useSelector((state) => state.user.data.searchUser);
  
  useEffect(() => {
    dispatch(getOrders())
    dispatch(getOrderByEmail(user.email));
  }, [dispatch]);


  return (
    <>
      <div className="container">
        <div className="title">
          <h1>Order History</h1>

          <div className="back">
            <Button>
              {" "}
              <Link to="/dashboard">
                <p>Back to Dashboard</p>
              </Link>
            </Button>
          </div>
          
        </div>
      
        <TableContainer>
          <Table className="table">
            <TableHead className="th">
              <TableRow>
                <TableCell className="cell ">ID</TableCell>
                <TableCell className="cell">Status</TableCell>
                <TableCell className="cell">Items</TableCell>
                <TableCell className="cell">Quantity</TableCell>
                <TableCell className="cell">Total</TableCell>
              </TableRow>
            </TableHead>

            <TableBody className="tb">
                {Object.values(orders).map(order => 
                   <TableRow key={order.id}>  
                    <TableCell><p>{order.id}</p></TableCell>
                  <TableCell><p>{order.status}</p></TableCell>
                  <TableCell>{order.items.map(el => <p>{el.slice(3,4)}</p>)}</TableCell>
                  <TableCell>{order.items.map(el => <p>{el[7]}</p>)}</TableCell>
                  <TableCell><p>$ {order.total}</p></TableCell>
                  </TableRow>
                )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

