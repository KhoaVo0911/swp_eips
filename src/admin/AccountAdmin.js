import React, { useEffect, useState } from "react";
import "../css/styles.admin.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  PostAccountAsyncApi,
  PostShopAccountAsyncApi,
  PutAccountAsyncApi,
  accountAction,
  getAccountAsyncApi,
  getShopAccountAsyncApi,
} from "../services/account/accountSlice";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import EditAttributesOutlinedIcon from "@mui/icons-material/EditAttributesOutlined";
import { CardAction } from "../services/card/cardSlice";
import { EventAction } from "../services/event/eventSlice";
import { ProductAction } from "../services/product/productSlice";
import { ShopAction } from "../services/shop/shopSlice";
import Slide from "@mui/material/Slide";
import { useFormik } from "formik";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import * as Yup from "yup";
import PublicIcon from "@mui/icons-material/Public";
import PublicOffIcon from "@mui/icons-material/PublicOff";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../config/FireBaseConfig";
import { InputLabel, MenuItem, Select, FormControl } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AccountAdmin() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [updateData, setUpdateData] = useState();
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [isImg, setIsImg] = useState(false);
  const [click, SetClick] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState();
  const [progresspercent, setProgresspercent] = useState(0);
  const dataRole = ["cashier", "admin"];
  const userString = localStorage.getItem("user");
  const userObject = JSON.parse(userString);

  const handleClickOpenUpdate = (data) => {
    setOpenUpdate(true);
    setUpdateData(data);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    formik.setValues({
      username: "",
      password: "",
      name: "",
      role: "",
    });
    formik.setTouched({});
    formik.setErrors({});
  };
  const dispatch = useDispatch();
  const { AccountList, AccountShopList } = useSelector((state) => state.acc);
  useEffect(() => {
    dispatch(getAccountAsyncApi())
      .then((response) => {
        if (response.payload != undefined) {
          setFilteredData(response.payload);
        }
      })
      .catch((error) => {
        // Handle failure case
      });
    dispatch(getShopAccountAsyncApi())
      .then((response) => {
        if (response.payload != undefined) {
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
  function handleSearchInputChange(event) {
    const query = event.target.value;
    setSearchQuery(query);
    filterData(query);
  }
  console.log("hahaha", AccountList);

  function filterData(query) {
    const filteredResults = AccountList.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filteredResults);
  }
  const [editingIndex, setEditingIndex] = useState(-1);

  const handleUpdateStatus = () => {
    let body;
    body = {
      username: updateData.username,
      shopId: updateData.shopId,
      status: !updateData.status,
    };
    dispatch(PostShopAccountAsyncApi(body))
      .then((response) => {
        if (response.payload != undefined) {
          setOpenUpdate(false);
          dispatch(getShopAccountAsyncApi())
            .then((response) => {
              if (response.payload != undefined) {
              }
            })
            .catch((error) => {
              // Handle failure case
            });
        }
      })
      .catch((error) => {
        // Handle failure case
      });
  };
  const handleEdit = (index) => {
    if (editingIndex == -1) {
      setEditingIndex(index);
    }
  };
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      name: "",
      role: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(2, "Too Short!")
        .max(4000, "Too Long!")
        .required(),
      password: Yup.string()
        .min(5, "Too Short!")
        .max(4000, "Too Long!")
        .required(),
      name: Yup.string().min(5, "Too Short!").max(4000, "Too Long!").required(),
      role: Yup.string().required(),
    }),
    onSubmit: (values) => {
      let DataBody;
      console.log("dabam1");
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
          console.log("dabam2");
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log("dabam3");
            DataBody = {
              username: values.username,
              password: values.password,
              name: values.name,
              role: values.role,
              image: downloadURL,
            };
            dispatch(PostAccountAsyncApi(DataBody))
              .then((response) => {
                setOpen(false);
                formik.setValues({
                  username: "",
                  password: "",
                  name: "",
                  role: "",
                });
                formik.setTouched({});
                formik.setErrors({});
                if (response.payload != undefined) {
                  dispatch(getAccountAsyncApi())
                    .then((response) => {
                      if (response.payload != undefined) {
                        setFilteredData(response.payload);
                      }
                    })
                    .catch((error) => {
                      // Handle failure case
                    });
                }
              })
              .catch((error) => {
                // Handle failure case
              });
          });
        }
      );
    },
  });
  const handleClearUpdate = () => {
    setEditingIndex(-1);
    dispatch(getAccountAsyncApi())
      .then((response) => {
        if (response.payload != undefined) {
          setFilteredData(response.payload);
        }
      })
      .catch((error) => {
        // Handle failure case
      });
  };

  const handleUpdate = (index) => {
    setEditingIndex(-1);

    dispatch(PutAccountAsyncApi(filteredData[index]))
      .then((response) => {
        if (response.payload != undefined) {
          dispatch(getAccountAsyncApi())
            .then((response) => {
              if (response.payload != undefined) {
                setFilteredData(response.payload);
              }
            })
            .catch((error) => {
              // Handle failure case
            });
        }
      })
      .catch((error) => {
        // Handle failure case
      });
  };
  const handleChange = (e, index, field) => {
    const updatedData = [...filteredData];
    updatedData[index] = { ...updatedData[index] }; // Tạo bản sao của đối tượng dữ liệu
    updatedData[index][field] = e.target.value;
    setFilteredData(updatedData);
  };
  return (
    <div>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <main className="main-wrapper ms-sm-auto py-4 px-md-4 border-start">
            <div className="row my-4">
              <div className="col-lg-6 col-6">
                <div
                  className="title-group mb-3"
                  style={{ textAlign: "center" }}
                >
                  <h1 className="h2 mb-0">Account Manager</h1>
                </div>
              </div>
              <div className="col-lg-6 col-6">
                <form className="custom-form input-group mb-3">
                  <input
                    onChange={handleSearchInputChange}
                    value={searchQuery}
                    className="form-control"
                    name="search"
                    type="text"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <button
                    style={{ width: "100px", marginRight: "130px" }}
                    type="submit"
                  >
                    Search
                  </button>
                </form>
                <div className="mr-[130px]">
                  <button
                    className="nav-link form-control mb-3 "
                    style={{ textAlign: "center", marginRight: "130px" }}
                    onClick={handleClickOpen}
                  >
                    Create Account
                  </button>
                </div>
              </div>
            </div>

            <div className="row my-4 bg-white p-5 h-full">
              <div className="col-lg-6 col-6">
                <table
                  className="account-table table"
                  style={{ textAlign: "center" }}
                >
                  <thead>
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">Img</th>
                      <th scope="col">Username</th>
                      <th scope="col">Password</th>
                      <th scope="col">Name</th>
                      <th scope="col">Role</th>
                      <th scope="col">Status</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData &&
                      filteredData.map((item, index) => {
                        return (
                          item.username !== userObject.username && (
                            <tr key={index}>
                              <th>{index + 1}</th>
                              <th>
                                <img
                                  src={item.image}
                                  className="h-32 w-32 mx-auto"
                                />
                              </th>
                              <th>{item.username}</th>
                              <th>
                                {editingIndex === index ? (
                                  <input
                                    className="form-control"
                                    type="password"
                                    value={item.password}
                                    onChange={(e) =>
                                      handleChange(e, index, "password")
                                    }
                                  />
                                ) : (
                                  "*******"
                                )}
                              </th>
                              <th>
                                {editingIndex === index ? (
                                  <input
                                    className="form-control"
                                    type="text"
                                    value={item.name}
                                    onChange={(e) =>
                                      handleChange(e, index, "name")
                                    }
                                  />
                                ) : (
                                  item.name
                                )}
                              </th>
                              <th>{item.role}</th>
                              <th>
                                {item.status == true ? (
                                  <PublicIcon />
                                ) : (
                                  <PublicOffIcon />
                                )}
                              </th>
                              <th>
                                {editingIndex === index ? (
                                  <div className="flex gap-3">
                                    <button
                                      onClick={() => handleUpdate(index)}
                                      disabled={
                                        filteredData[index].name == "" ||
                                        filteredData[index].password == ""
                                          ? true
                                          : false
                                      }
                                    >
                                      <DoneIcon className="cursor-pointer" />
                                    </button>
                                    <ClearIcon
                                      onClick={() => handleClearUpdate()}
                                      className="cursor-pointer"
                                    />
                                  </div>
                                ) : (
                                  <EditIcon
                                    onClick={() => handleEdit(index)}
                                    className="cursor-pointer"
                                  />
                                )}
                              </th>
                            </tr>
                          )
                        );
                      })}
                  </tbody>
                </table>
              </div>

              <div className="col-lg-6 col-6">
                <table
                  className="account-table table"
                  style={{ textAlign: "center" }}
                >
                  <thead>
                    <tr>
                      <th scope="col">Username</th>
                      <th scope="col">ShopID</th>
                      <th scope="col">Status</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {AccountShopList &&
                      AccountShopList.map((item, index) => {
                        return (
                          <tr key={index} style={{}}>
                            <th scope="col">{item.username}</th>
                            <th scope="col">{item.shopId}</th>
                            <th scope="col">
                              {item.status == true ? (
                                <button className="border-2 cursor-none bg-blue-400 px-3 py-1 -mt-2">
                                  True
                                </button>
                              ) : (
                                <button className="border-2 cursor-none bg-yellow-400 px-3 py-2">
                                  False
                                </button>
                              )}
                            </th>
                            <th
                              scope="col"
                              onClick={() => handleClickOpenUpdate(item)}
                            >
                              <DeleteIcon className="cursor-pointer" />
                            </th>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        maxWidth="sm"
        className=""
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle id="">Create Shop</DialogTitle>
          <DialogContent dividers>
            <div className="max-w-5xl mb-5 mx-auto">
              <Button variant="contained" component="label">
                Upload Image
                <input
                  type="file"
                  hidden
                  onChange={(event) => {
                    setSelectedImage(event.target.files[0]);
                    SetClick(true);
                  }}
                />
              </Button>
            </div>
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
            <div className="max-w-5xl my-2 mx-auto">
              <TextField
                id="outlined-basic"
                error={
                  formik.touched.username && formik.errors.username
                    ? true
                    : undefined
                }
                value={formik.values.username}
                className="w-full"
                name="username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Username"
                variant="outlined"
              />
              {formik.errors.username && formik.touched.username && (
                <div className="text mt-1 text-red-600 font-semibold">
                  {formik.errors.username}
                </div>
              )}
            </div>
            <div className="max-w-5xl my-2 mx-auto">
              <TextField
                type="password"
                id="outlined-basic"
                error={
                  formik.touched.password && formik.errors.password
                    ? true
                    : undefined
                }
                value={formik.values.password}
                className="w-full"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Password"
                variant="outlined"
              />
              {formik.errors.password && formik.touched.password && (
                <div className="text mt-1 text-red-600 font-semibold">
                  {formik.errors.password}
                </div>
              )}
            </div>
            <div className="max-w-5xl my-2 mx-auto">
              {/* {error && <div className='text mt-1 text-center text-xl text-red-600 my-3 font-semibold'>{error}</div>} */}
              <TextField
                id="outlined-basic"
                error={
                  formik.touched.name && formik.errors.name ? true : undefined
                }
                className="w-full"
                value={formik.values.name}
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Name"
                variant="outlined"
              />
              {formik.errors.name && formik.touched.name && (
                <div className="text mt-1 text-red-600 font-semibold">
                  {formik.errors.name}
                </div>
              )}
            </div>
            <div className="max-w-5xl my-2 mx-auto">
              <FormControl className="w-full">
                <InputLabel size="small">Role</InputLabel>
                <Select
                  size="small"
                  value={formik.values.role || ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  label={"Role"}
                  name="role"
                >
                  {dataRole.map((model) => (
                    <MenuItem key={model} value={model}>
                      {model}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </DialogContent>
          <DialogActions>
            <Button type="submit">Save</Button>
          </DialogActions>
        </form>
      </Dialog>

      <Dialog
        open={openUpdate}
        onClose={handleCloseUpdate}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Notification"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to update the status of your Account and Shop?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdate}>Disagree</Button>
          <Button onClick={handleUpdateStatus} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Footer />
    </div>
  );
}

export default AccountAdmin;
