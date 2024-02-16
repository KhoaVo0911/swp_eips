import React, { useState } from "react";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import {
  PutAccountAsyncApi,
  accountAction,
} from "../services/account/accountSlice";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import {
  CardAction,
  PostSearchCardAsyncApi,
  PutCardAsyncApi,
  PutDepositAsyncApi,
  PutWithdrawAsyncApi,
  getCardAsyncApi,
} from "../services/card/cardSlice";
import { Button, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import SouthIcon from "@mui/icons-material/South";
import DoneIcon from "@mui/icons-material/Done";
import PublicIcon from "@mui/icons-material/Public";
import PublicOffIcon from "@mui/icons-material/PublicOff";
import ClearIcon from "@mui/icons-material/Clear";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../config/FireBaseConfig";
import {
  EventAction,
  getEventCashierAsyncApi,
} from "../services/event/eventSlice";
import { ProductAction } from "../services/product/productSlice";
import { ShopAction } from "../services/shop/shopSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function parseToVND(number) {
  let strNumber = number.toString().replace(/[.,]/g, "");
  strNumber = strNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return strNumber;
}

export default function EventDetails() {
  const userString = localStorage.getItem("user");
  const userObject = JSON.parse(userString);
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [balance, setBalance] = useState("");
  const [money, setMoney] = useState("");
  const [deposit, setDeposit] = useState(0);
  const [isUpdate, setIsUpdate] = useState(-1);
  const dispatch = useDispatch();
  const { CardList } = useSelector((state) => state.card);
  const [cardLisst, setcardList] = React.useState([]);
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [img, setImg] = useState("");
  const [click, SetClick] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState();
  const [progresspercent, setProgresspercent] = useState(0);
  const [selectedValue, setSelectedValue] = React.useState([]);
  const [Id, setId] = useState();
  const param = useParams();
  useEffect(() => {
    dispatch(getCardAsyncApi(param.id))
      .then((response) => {
        if (response.payload != undefined) {
          setcardList(response.payload);
        }
      })
      .catch((error) => {
        // Handle failure case
      });
    return () => {
      dispatch(accountAction.clearAccount());
      dispatch(CardAction.clearCard());
      dispatch(EventAction.clearEvent());
      dispatch(ProductAction.clearProduct());
      dispatch(ShopAction.clearShop());
    };
  }, []);

  const handleClickOpenUpdate = (data) => {
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
    setDeposit(0);
    setMoney(0);
  };
  const handleChangeSearch = (item) => {
    setSearch(item);
    dispatch(PostSearchCardAsyncApi({ id: item }))
      .then((response) => {
        if (response.payload != undefined) {
          setUsername(response.payload.username);
          setPhone(response.payload.phoneNumber);
          setBalance(response.payload.balance);
        }
      })
      .catch((error) => {});
  };
  const handleUpdateChange = () => {
    const storageRef = ref(storage, `Package/${selectedImage.name}`);
    const uploadTask = uploadBytesResumable(storageRef, selectedImage);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          setImg(downloadURL);
          dispatch(
            PutAccountAsyncApi({
              username: userObject.username,
              role: userObject.role,
              image: downloadURL,
              password: password,
              name: name,
              status: true,
            })
          )
            .then((response) => {
              if (response.payload != undefined) {
                localStorage.clear();
                localStorage.setItem("user", JSON.stringify(response.payload));
                window.location.reload();
              }
            })
            .catch((error) => {
              // Handle failure case
            });
        });
      }
    );
  };
  const handleResetChange = () => {
    setName("");
    setPassword("");
  };
  const handleOpenUpdateCardChange = (e, index) => {
    if (cardLisst[index].status == false) {
      setIsUpdate(index);
      setDeposit(0);
      setMoney("");
    } else {
    }
  };
  const handleClearUpdate = () => {
    dispatch(PostSearchCardAsyncApi({ id: search }))
      .then((response) => {
        if (response.payload != undefined) {
          dispatch(getCardAsyncApi(param.id))
            .then((response) => {
              if (response.payload != undefined) {
              }
            })
            .catch((error) => {
              // Handle failure case
            });
        }
      })
      .catch((error) => {});
    setIsUpdate(-1);
  };
  const handleUpdateCardChange = (e) => {
    dispatch(
      PutCardAsyncApi({
        id: e.id,
        balance: balance,
        username: username,
        phoneNumber: phone,
        status: true,
      })
    );
    setIsUpdate(-1);
  };
  const handleDeposit = (e) => {
    dispatch(
      PutDepositAsyncApi({
        id: Id,
        balance: money,
      })
    )
      .then((response) => {
        setMoney("");
        setDeposit(0);
        setOpenUpdate(false);
        if (response.payload != undefined) {
          dispatch(PostSearchCardAsyncApi({ id: search }))
            .then((response) => {
              if (response.payload != undefined) {
                dispatch(getCardAsyncApi(param.id))
                  .then((response) => {
                    if (response.payload != undefined) {
                      setId();
                      setcardList(response.payload);
                    }
                  })
                  .catch((error) => {
                    // Handle failure case
                  });
              }
            })
            .catch((error) => {});
        }
      })
      .catch((error) => {});
  };
  const handleWithdraw = (e) => {
    dispatch(
      PutWithdrawAsyncApi({
        id: Id,
        balance: money,
      })
    )
      .then((response) => {
        setMoney("");
        setDeposit(0);
        setOpenUpdate(false);
        if (response.payload != undefined) {
          dispatch(PostSearchCardAsyncApi({ id: search }))
            .then((response) => {
              if (response.payload != undefined) {
                dispatch(getCardAsyncApi(param.id))
                  .then((response) => {
                    if (response.payload != undefined) {
                      setId();
                      setcardList(response.payload);
                    }
                  })
                  .catch((error) => {
                    // Handle failure case
                  });
              }
            })
            .catch((error) => {});
        }
      })
      .catch((error) => {});
  };
  const handleDepositOpen = (e) => {
    if (isUpdate == -1) {
      setId(e.id);
      setDeposit(1);
      setOpenUpdate(false);
    }
  };
  const handleWithDrawOpen = (e) => {
    if (isUpdate == -1) {
      setId(e.id);
      setDeposit(2);
      setOpenUpdate(false);
    }
  };
  console.log("cardlist", cardLisst);
  const handleUsernameChange = (index, newValue) => {
    setcardList((prevCardList) => {
      // Create a new array with the updated username
      const updatedCardList = [...prevCardList];
      updatedCardList[index] = {
        ...updatedCardList[index],
        username: newValue,
      };
      return updatedCardList;
    });
  };
  const handlePhoneNumberChange = (index, value) => {
    setcardList((prevCardList) => {
      const updatedCardList = [...prevCardList];
      updatedCardList[index] = {
        ...updatedCardList[index],
        phoneNumber: value,
      };
      return updatedCardList;
    });
  };

  const handleBalanceChange = (index, value) => {
    setcardList((prevCardList) => {
      const updatedCardList = [...prevCardList];
      updatedCardList[index] = { ...updatedCardList[index], balance: value };
      return updatedCardList;
    });
  };

  return (
    <div>
      <Navbar />
      <main className="main-wrapper">
        <div className="row">
          <div className="col-lg-9 col-9 mt-5 " style={{ margin: "auto" }}>
            <div className="custom-block bg-white">
              <div className="tab-content" id="myTabContent">
                <Paper
                  component="form"
                  sx={{
                    p: "2px 4px",
                    display: "flex",
                    alignItems: "center",
                    width: 300,
                  }}
                >
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search"
                    value={search}
                    onChange={(e) => handleChangeSearch(e.target.value)}
                  />
                  <IconButton className="" sx={{ p: "10px", outline: "none" }}>
                    <SearchIcon />
                  </IconButton>
                </Paper>
                <table
                  className="account-table table mt-2"
                  style={{ textAlign: "center" }}
                >
                  <thead>
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Username</th>
                      <th scope="col">Phone Number</th>
                      <th scope="col">Balance</th>
                      <th scope="col">Status</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CardList &&
                      cardLisst.map((item, index) => {
                        return (
                          <tr key={index}>
                            <th className="pt-4 text-xl w-10">{item.id}</th>
                            <th className="pt-4 text-xl w-44">
                              {isUpdate !== index ? (
                                item.username
                              ) : (
                                <div className="w-44 items-center text-center justify-center mx-auto">
                                  <input
                                    className="form-control w-32"
                                    value={item.username}
                                    onChange={(e) =>
                                      handleUsernameChange(
                                        index,
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                              )}
                            </th>
                            <th className="pt-4 text-xl w-44">
                              {isUpdate !== index ? (
                                item.phoneNumber
                              ) : (
                                <div className="w-44 items-center text-center justify-center mx-auto">
                                  <input
                                    className="form-control w-32"
                                    value={item.phoneNumber}
                                    onChange={(e) =>
                                      handlePhoneNumberChange(
                                        index,
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                              )}
                            </th>
                            <th className="pt-4 text-xl w-44">
                              {isUpdate !== index ? (
                                item.balance
                              ) : (
                                <div className="w-44 items-center text-center justify-center mx-auto">
                                  <input
                                    className="form-control w-32"
                                    value={item.balance}
                                    onChange={(e) =>
                                      handleBalanceChange(index, e.target.value)
                                    }
                                  />
                                </div>
                              )}
                            </th>
                            <th className="pt-4 text-xl w-44">
                              {item.status == true ? (
                                <PublicIcon />
                              ) : item.status == false ? (
                                <PublicOffIcon />
                              ) : null}
                            </th>

                            <th component="div" className="pt-4 text-xl w-32">
                              <div className="flex justify-center ">
                                <div></div>
                                <div>
                                  {isUpdate !== index ? (
                                    <Tooltip
                                      onClick={() =>
                                        handleOpenUpdateCardChange(item, index)
                                      }
                                      title="Edit"
                                      className="h-10 w-10"
                                    >
                                      <IconButton>
                                        <EditIcon className="" />
                                      </IconButton>
                                    </Tooltip>
                                  ) : (
                                    <div className="flex gap-3">
                                      <Tooltip
                                        onClick={handleClearUpdate}
                                        title="Clear"
                                        className="h-10 w-10"
                                      >
                                        <IconButton>
                                          <ClearIcon className="" />
                                        </IconButton>
                                      </Tooltip>
                                      <Tooltip
                                        onClick={() =>
                                          handleUpdateCardChange(item)
                                        }
                                        title="Done"
                                        className="h-10 w-10"
                                      >
                                        <IconButton>
                                          <DoneIcon className="" />
                                        </IconButton>
                                      </Tooltip>
                                    </div>
                                  )}
                                  {deposit == 1 ? (
                                    <Tooltip
                                      onClick={() =>
                                        handleClickOpenUpdate(item)
                                      }
                                      title="Done"
                                      className="h-10 w-10"
                                    >
                                      <IconButton>
                                        <DoneIcon className="" />
                                      </IconButton>
                                    </Tooltip>
                                  ) : (
                                    <Tooltip
                                      onClick={() => handleDepositOpen(item)}
                                      handle
                                      title="Deposit"
                                      className="h-10 w-10"
                                    >
                                      <IconButton>
                                        <LocalAtmIcon className="" />
                                      </IconButton>
                                    </Tooltip>
                                  )}
                                  {deposit == 2 ? (
                                    <Tooltip
                                      onClick={() =>
                                        handleClickOpenUpdate(item)
                                      }
                                      title="Done"
                                      className="h-10 w-10"
                                    >
                                      <IconButton>
                                        <DoneIcon className="" />
                                      </IconButton>
                                    </Tooltip>
                                  ) : (
                                    <Tooltip
                                      onClick={() => handleWithDrawOpen(item)}
                                      title="Withdraw"
                                      className="h-10 w-10"
                                    >
                                      <IconButton>
                                        <SouthIcon className="" />
                                      </IconButton>
                                    </Tooltip>
                                  )}
                                </div>
                                <div></div>
                              </div>
                            </th>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
                {deposit != 0 && (
                  <div>
                    <h6>Money Deposit</h6>
                    <div className="w-48">
                      <input
                        value={money}
                        onChange={(e) => setMoney(e.target.value)}
                        className="form-control"
                        placeholder="Money..."
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <Dialog
          open={openUpdate}
          onClose={handleCloseUpdate}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Notification"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to update the status of your Account and
              Shop?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseUpdate}>Disagree</Button>
            <Button
              onClick={
                deposit == 1
                  ? handleDeposit
                  : deposit == 2
                  ? handleWithdraw
                  : handleCloseUpdate
              }
              autoFocus
            >
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </main>
    </div>
  );
}
