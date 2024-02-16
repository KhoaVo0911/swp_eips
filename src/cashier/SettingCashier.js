import React, { useState } from "react";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { PutAccountAsyncApi } from "../services/account/accountSlice";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import {
  PostSearchCardAsyncApi,
  PutCardAsyncApi,
  PutDepositAsyncApi,
  PutWithdrawAsyncApi,
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

function parseToVND(number) {
  let strNumber = number.toString().replace(/[.,]/g, "");
  strNumber = strNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return strNumber;
}

export default function SettingCashier() {
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
  const [isUpdate, setIsUpdate] = useState(false);
  const dispatch = useDispatch();
  const { SearchCardList } = useSelector((state) => state.card);
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [img, setImg] = useState("");
  const [click, SetClick] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState();
  const [progresspercent, setProgresspercent] = useState(0);
  const [selectedValue, setSelectedValue] = React.useState([]);

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
  const handleOpenUpdateCardChange = () => {
    if (SearchCardList.status == true) {
      setIsUpdate(true);
      setDeposit(0);
      setMoney("");
    } else {
    }
  };
  const handleClearUpdate = () => {
    dispatch(PostSearchCardAsyncApi({ id: search }))
      .then((response) => {
        if (response.payload != undefined) {
          setUsername(response.payload.username);
          setPhone(response.payload.phoneNumber);
          setBalance(response.payload.balance);
        }
      })
      .catch((error) => {});
    setIsUpdate(false);
  };
  const handleUpdateCardChange = () => {
    dispatch(
      PutCardAsyncApi({
        id: SearchCardList.id,
        balance: balance,
        username: username,
        phoneNumber: phone,
        status: false,
      })
    );
    setIsUpdate(false);
  };
  const handleDeposit = () => {
    dispatch(
      PutDepositAsyncApi({
        id: SearchCardList.id,
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
                setUsername(response.payload.username);
                setPhone(response.payload.phoneNumber);
                setBalance(response.payload.balance);
              }
            })
            .catch((error) => {});
        }
      })
      .catch((error) => {});
  };
  const handleWithdraw = () => {
    dispatch(
      PutWithdrawAsyncApi({
        id: SearchCardList.id,
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
                setUsername(response.payload.username);
                setPhone(response.payload.phoneNumber);
                setBalance(response.payload.balance);
              }
            })
            .catch((error) => {});
        }
      })
      .catch((error) => {});
  };
  const handleDepositOpen = () => {
    if (isUpdate == false) {
      setDeposit(1);
      setOpenUpdate(false);
    }
  };
  const handleWithDrawOpen = () => {
    if (isUpdate == false) {
      setDeposit(2);
      setOpenUpdate(false);
    }
  };
  return (
    <div>
      <Navbar />
      <main className="main-wrapper">
        <div className="row">
          <div
            className="col-lg-9 col-9 mt-5 "
            style={{ margin: "auto" }}
          ></div>
        </div>
        <main style={{ textAlign: "center" }}>
          <div className="title-group mb-3 ">
            <h1 className="h2 py-4" style={{ textAlign: "center" }}>
              Profile
            </h1>
          </div>
          <div className="row">
            <div className="col-lg-9 col-9" style={{ margin: "auto" }}>
              <div className="custom-block custom-block-profile">
                <div className="row">
                  <div className="col-lg-12 col-12 mb-3">
                    <h6>General</h6>
                  </div>

                  <div className="grid grid-cols-4">
                    <div className="flex items-center justify-end">
                      <img src={userObject.image} className="h-48 w-48" />
                    </div>
                    <div className="mt-5">
                      <p className="">
                        <strong>Name:</strong>
                        <span>{userObject.name}</span>
                      </p>
                      <p className="">
                        <strong>Username:</strong>
                        <span>{userObject.username}</span>
                      </p>
                      <p className="">
                        <strong>Role:</strong>
                        <span>{userObject.role}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <div className="title-group mb-3">
          <h1 className="h2" style={{ textAlign: "center" }}>
            Settings
          </h1>
        </div>
        <div className="row">
          <div className="col-lg-9 col-9 " style={{ margin: "auto" }}>
            <div className="custom-block bg-white">
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="profile-tab-pane"
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                  tabIndex={0}
                >
                  <h6 className="mb-4">User Profile</h6>
                  <Button variant="contained" component="label">
                    New Avatar
                    <input
                      type="file"
                      hidden
                      onChange={(event) => {
                        setSelectedImage(event.target.files[0]);
                        SetClick(true);
                      }}
                    />
                  </Button>
                  <div className="max-w-5xl my-5 mx-auto">
                    {selectedImage == undefined ? (
                      <div></div>
                    ) : (
                      <img
                        alt=""
                        className="mx-auto h-48 w-48 my-2"
                        src={
                          click == false
                            ? selectedImage
                            : window.URL.createObjectURL(selectedImage)
                        }
                      />
                    )}
                  </div>
                  <input
                    className="form-control mt-4"
                    name="profile-email"
                    id="profile-email"
                    disabled
                    placeholder={userObject.username}
                  />
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control mt-4"
                    type="password"
                    name="profile-email"
                    id="profile-email"
                    placeholder="New Password"
                  />
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control mt-4"
                    type="text"
                    name="profile-name"
                    id="profile-name"
                    placeholder="New Name"
                  />

                  <div className="d-flex mt-4">
                    <Button
                      variant="contained"
                      color="inherit"
                      onClick={handleResetChange}
                      className="form-control me-3"
                    >
                      Reset
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={name == "" || password == "" ? true : false}
                      onClick={handleUpdateChange}
                      className=" w-full rounded-md bg-blue-400"
                    >
                      Update
                    </Button>
                  </div>
                </div>
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
