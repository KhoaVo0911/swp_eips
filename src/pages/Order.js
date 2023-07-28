import React, { useEffect, useState } from "react";
import Navbar from "../product/Navbar";
import {
  getOrderByEventAsyncApi,
  getOrderByShopAsyncApi,
} from "../services/product/productSlice";
import {
  GetListOrderAsyncApi,
  getShopByUsernameAsyncApi,
} from "../services/shop/shopSlice";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import { useFormik } from "formik";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DialogContentText from "@mui/material/DialogContentText";

function parseToVND(number) {
  let strNumber = number.toString().replace(/[.,]/g, "");
  strNumber = strNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return strNumber;
}

function parseTimestamp(timestamp) {
  const date = new Date(timestamp);
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(date);
  return formattedDate;
}

export default function Order() {
  const userString = localStorage.getItem("user");
  const userObject = JSON.parse(userString);
  const dispatch = useDispatch();
  const { shopByUsername, OrerList } = useSelector((state) => state.shop);
  const { OrderByEvent } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getShopByUsernameAsyncApi(userObject.username))
      .then((response) => {
        if (response.payload != undefined) {
          // dispatch(getAllProductAsyncApi({ shopId: response.payload.id })).then((response) => {
          dispatch(GetListOrderAsyncApi(response.payload.id))
            .then((response) => {
              if (response.payload != undefined) {
              }
            })
            .catch((error) => {});
        }
      })
      .catch((error) => {});
    return () => {
      // dispatch(accountAction.clearAccount())
      // dispatch(CardAction.clearCard())
      // dispatch(EventAction.clearEvent())
      // dispatch(ProductAction.clearProduct())
      // dispatch(ShopAction.clearShop())
    };
  }, []);
  const [openOrder, setOpenOrder] = useState(false);

  const handleClickOpenOrder = (item) => {
    setOpenOrder(true);
    dispatch(getOrderByShopAsyncApi({ id: item.id, shopId: shopByUsername.id }))
      .then((response) => {
        if (response.payload != undefined) {
        }
      })
      .catch((error) => {
        // Handle failure case
      });
  };
  const handleCloseOrder = () => {
    setOpenOrder(false);
  };
  return (
    <div>
      <Navbar />
      <div className="container-fluid">
        <div className="">
          <main className="main-wrapper ms-sm-auto py-4 px-md-4 border-start">
            <div className="title-group mb-3" style={{ textAlign: "center" }}>
              <h3 className=" font-bold  mb-0">ORDER</h3>
              <small className="text-muted" />
            </div>
            <div className="table-responsive">
              <table
                className="account-table table"
                style={{ textAlign: "center" }}
              >
                <thead>
                  <tr>
                    <th className="text-base" scope="col">
                      Number
                    </th>
                    <th className="text-base" scope="col">
                      ID
                    </th>
                    <th className="text-base" scope="col">
                      Shop Id
                    </th>
                    <th className="text-base" scope="col">
                      Card Id
                    </th>
                    <th className="text-base" scope="col">
                      Time
                    </th>
                    <th className="text-base" scope="col">
                      Total
                    </th>
                    <th className="text-base" scope="col">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {OrerList.length > 0 &&
                    OrerList.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td className="font-bold text-base">{index + 1}</td>
                          <td className="text-base">{item.id}</td>
                          <td className="text-base">{item.shopId}</td>
                          <td className="text-base">{item.cardId}</td>
                          <td className="text-base">
                            {parseTimestamp(item.beginDate)}
                          </td>
                          <td className="">
                            {parseToVND(item.total) + " Vnđ"}
                          </td>
                          <td className="">
                            <Tooltip
                              onClick={() => handleClickOpenOrder(item)}
                              title="view"
                            >
                              <IconButton>
                                <RemoveRedEyeIcon color="success" />
                              </IconButton>
                            </Tooltip>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
      <Dialog
        open={openOrder}
        onClose={handleCloseOrder}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        size="xl"
      >
        <DialogTitle id="">List Order</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <table
              className="account-table table"
              style={{ textAlign: "center" }}
            >
              <thead>
                <tr>
                  <th className="text-base" scope="col">
                    Card Id
                  </th>
                  <th className="text-base" scope="col">
                    Category
                  </th>
                  <th className="text-base" scope="col">
                    productId
                  </th>
                  <th className="text-base" scope="col">
                    Quantity
                  </th>
                  <th className="text-base" scope="col">
                    Price
                  </th>
                  <th className="text-base" scope="col">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {OrderByEvent.length > 0 &&
                  OrderByEvent.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className="text-base">{item.cardId}</td>
                        <td className="text-base">{item.category}</td>
                        <td className="text-base">{item.productId}</td>
                        <td className="text-base">{item.quantity}</td>
                        <td className="">{parseToVND(item.price) + " Vnđ"}</td>
                        <td className="">{parseToVND(item.total) + " Vnđ"}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
