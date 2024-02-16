import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  EventAction,
  PostEventAsyncApi,
  PutEventAsyncApi,
  getEventAsyncApi,
} from "../services/event/eventSlice";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../config/FireBaseConfig";
import { useFormik } from "formik";
import DialogTitle from "@mui/material/DialogTitle";
import * as Yup from "yup";
import Navbar from "./Navbar";
import EditIcon from "@mui/icons-material/Edit";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import { accountAction } from "../services/account/accountSlice";
import { CardAction } from "../services/card/cardSlice";
import { ProductAction } from "../services/product/productSlice";
import { ShopAction } from "../services/shop/shopSlice";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function convertTimestampToDate(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // Tháng bắt đầu từ 0 (0 - 11), nên cần cộng thêm 1 và định dạng chuỗi thành 2 chữ số
  const day = ("0" + date.getDate()).slice(-2); // Định dạng chuỗi thành 2 chữ số
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

export default function Admin() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [isUpdate, setIsUpdate] = React.useState(false);
  const [idEvent, setIdEvent] = React.useState(0);
  const [img, setImg] = useState("");
  const [click, SetClick] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState();
  const [progresspercent, setProgresspercent] = useState(0);
  const [selectedValue, setSelectedValue] = React.useState([]);
  const [selectedDateBegin, setSelectedDateBegin] = useState(null);
  const [selectedDateEnd, setSelectedDateEnd] = useState(null);
  const [err, setErr] = useState();
  const handleDateBeginChange = (event) => {
    const date = event.target.value;
    console.log("ga3", date);
    setSelectedDateBegin(date);
  };
  const handleDateEndChange = (event) => {
    const date = event.target.value;
    setSelectedDateEnd(date);
  };
  const dispatch = useDispatch();
  const { eventList } = useSelector((state) => state.event);
  useEffect(() => {
    dispatch(getEventAsyncApi())
      .then((response) => {
        if (response.payload != undefined) {
          setFilteredData(response.payload);
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
  const handleClickOpen = (data) => {
    setOpen(true);

    if (data.id) {
      setIdEvent(data.id);
      setIsUpdate(true);
      setSelectedImage(data.img);
      setSelectedDateBegin(convertTimestampToDate(data.beginDate));
      setSelectedDateEnd(convertTimestampToDate(data.endDate));
      formik.setValues({
        name: data.name,
        description: data.description,
        beginDate: "",
        endDate: "",
        area: data.area,
        username: data.username,
      });
      console.log("ga3", data.beginDate, selectedDateBegin);
    } else {
      setIsUpdate(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setImg("");
    SetClick(false);
    setIsUpdate(false);
    setSelectedImage();
    setSelectedDateBegin(null);
    setSelectedDateEnd(null);
    formik.setValues({
      name: "",
      description: "",
      beginDate: "",
      endDate: "",
      area: "",
      img: "",
      username: "",
    });
    formik.setTouched({});
    formik.setErrors({});
  };

  function parseTimestamp(timestamp) {
    const date = new Date(timestamp);
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(
      date
    );
    return formattedDate;
  }

  function handleSearchInputChange(event) {
    const query = event.target.value;
    setSearchQuery(query);
    filterData(query);
  }
  function filterData(query) {
    const filteredResults = eventList.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filteredResults);
  }
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      beginDate: "",
      endDate: "",
      area: "",
      img: "",
      username: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().min(3, "Too Short!").max(4000, "Too Long!").required(),
      area: Yup.string().min(3, "Too Short!").max(4000, "Too Long!").required(),
      description: Yup.string()
        .min(5, "Too Short!")
        .max(4000, "Too Long!")
        .required(),
    }),
    onSubmit: (values) => {
      let DataBody;
      let DataBodyUpdate;
      const userString = localStorage.getItem("user");
      const userObject = JSON.parse(userString);
      const username = userObject.username;
      console.log("ngu1", username);
      if (click == false) {
        setImg(selectedImage);
        DataBodyUpdate = {
          id: idEvent,
          name: values.name,
          area: values.area,
          beginDate: selectedDateBegin,
          endDate: selectedDateEnd,
          description: values.description,
          img: selectedImage,
          username: username,
        };
        DataBody = {
          name: values.name,
          area: values.area,
          beginDate: selectedDateBegin,
          endDate: selectedDateEnd,
          description: values.description,
          img: selectedImage,
          username: username,
        };
        if (isUpdate == false) {
          dispatch(PostEventAsyncApi(DataBody))
            .then((response) => {
              console.log("dataane", response.payload, response.payload.mess);
              if (response.payload.mess == "Date not vaild") {
                setErr(response.payload.mess);
              } else if (response.payload != undefined) {
                setErr();
                setImg("");
                SetClick(false);
                setSelectedImage();
                setSelectedDateBegin(null);
                setSelectedDateEnd(null);
                setOpen(false);
                formik.setValues({
                  name: "",
                  description: "",
                  beginDate: "",
                  endDate: "",
                  area: "",
                  img: "",
                  username: "",
                });
                formik.setTouched({});
                formik.setErrors({});
                dispatch(getEventAsyncApi())
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
        } else {
          dispatch(PutEventAsyncApi(DataBodyUpdate))
            .then((response) => {
              console.log("dataane", response.payload, response.payload.mess);
              if (response.payload.mess == "Date not vaild") {
                setErr(response.payload.mess);
              } else if (response.payload != undefined) {
                setErr();
                setImg("");
                SetClick(false);
                setSelectedImage();
                setSelectedDateBegin(null);
                setSelectedDateEnd(null);
                setOpen(false);
                formik.setValues({
                  name: "",
                  description: "",
                  beginDate: "",
                  endDate: "",
                  area: "",
                  img: "",
                  username: "",
                });
                formik.setTouched({});
                formik.setErrors({});
                dispatch(getEventAsyncApi())
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
        }
      } else {
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
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                setImg(downloadURL);
                DataBodyUpdate = {
                  id: idEvent,
                  name: values.name,
                  area: values.area,
                  beginDate: selectedDateBegin,
                  endDate: selectedDateEnd,
                  description: values.description,
                  img: downloadURL,
                  username: username,
                };
                DataBody = {
                  name: values.name,
                  area: values.area,
                  beginDate: selectedDateBegin,
                  endDate: selectedDateEnd,
                  description: values.description,
                  img: downloadURL,
                  username: username,
                };
                if (isUpdate == false) {
                  dispatch(PostEventAsyncApi(DataBody))
                    .then((response) => {
                      console.log(
                        "dataane",
                        response.payload,
                        response.payload.mess
                      );
                      if (response.payload.mess == "Date not vaild") {
                        setErr(response.payload.mess);
                      } else if (response.payload != undefined) {
                        setErr();
                        setImg("");
                        SetClick(false);
                        setSelectedImage();
                        setSelectedDateBegin(null);
                        setSelectedDateEnd(null);
                        setOpen(false);
                        formik.setValues({
                          name: "",
                          description: "",
                          beginDate: "",
                          endDate: "",
                          area: "",
                          img: "",
                          username: "",
                        });
                        formik.setTouched({});
                        formik.setErrors({});
                        dispatch(getEventAsyncApi())
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
                } else {
                  dispatch(PutEventAsyncApi(DataBodyUpdate))
                    .then((response) => {
                      console.log(
                        "dataane",
                        response.payload,
                        response.payload.mess
                      );
                      if (response.payload.mess == "Date not vaild") {
                        setErr(response.payload.mess);
                      } else if (response.payload != undefined) {
                        setErr();
                        setImg("");
                        SetClick(false);
                        setSelectedImage();
                        setSelectedDateBegin(null);
                        setSelectedDateEnd(null);
                        setOpen(false);
                        formik.setValues({
                          name: "",
                          description: "",
                          beginDate: "",
                          endDate: "",
                          area: "",
                          img: "",
                          username: "",
                        });
                        formik.setTouched({});
                        formik.setErrors({});
                        dispatch(getEventAsyncApi())
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
                }
                console.log("ngu", DataBody);
              }
            );
          }
        );
      }
    },
  });
  console.log("ngu154", formik.errors, formik.onBlur);

  return (
    <div>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <main className="bg-gray-200 ms-sm-auto py-4 px-md-4 border-start">
            <div className="row my-4">
              <div className="col-lg-6 col-6">
                <div
                  className="title-group mb-3"
                  style={{ textAlign: "center" }}
                >
                  <h1 className="h2 mb-0">Event Admin</h1>
                  <small className="text-muted">Hello !!!</small>
                </div>
              </div>
              <div className="col-lg-6 col-6">
                <form
                  className="custom-form input-group mb-3"
                  action="#"
                  method="get"
                  role="form"
                >
                  <input
                    onChange={handleSearchInputChange}
                    value={searchQuery}
                    className="form-control"
                    name="search"
                    type="text"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <button style={{ width: 100 }} type="submit">
                    Search
                  </button>
                </form>
                <div>
                  <button
                    onClick={handleClickOpen}
                    className="nav-link form-control mb-3"
                    style={{ textAlign: "center" }}
                  >
                    Create Event
                  </button>
                </div>
              </div>
            </div>
          </main>
          <div className="custom-block bg-white">
            <h5 className="mb-4" style={{ textAlign: "center" }}>
              Event List
            </h5>
            <section className=" container grid grid-cols-3">
              {eventList.length > 0 &&
                filteredData.map((item, index) => {
                  return (
                    <div key={index}>
                      <Card sx={{ maxWidth: 345 }} className="my-2">
                      <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                        <CardMedia
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                          sx={{ height: 300, width: 400 }}
                          image={item.img}
                          title="green iguana"
                        />
                        </div>
                        <CardContent>
                          <Typography
                            gutterBottom
                            variant="h4"
                            className="text-center"
                          >
                            {item.name.length > 20
                              ? item.name.slice(0, 15) + "..."
                              : item.name}
                          </Typography>
                          <Typography>ID:{item.id}</Typography>
                          <Typography>Area: {item.area}</Typography>
                          <Typography component="div">
                            Description:{" "}
                            {item.description.length > 50
                              ? item.description.slice(0, 50) + "..."
                              : item.description}
                          </Typography>
                          <Typography>
                            Begin Date: {parseTimestamp(item.beginDate)}
                          </Typography>
                          <Typography>
                            End Date:{parseTimestamp(item.endDate)}
                          </Typography>
                          {/* <Typography className="flex gap-[2px]">
                            Status:{" "}
                            {item.status == true ? (  
                              <span className="text-green-400"> true </span>
                            ) : (
                              <span className="text-red-400"> false </span>
                            )}
                          </Typography> */}
                          <div className="flex justify-between ">
                            <Button
                              onClick={() => handleClickOpen(item)}
                              className="py-1"
                              size=""
                              color="warning"
                              variant="contained"
                              endIcon={<EditIcon />}
                            >
                              Edit
                            </Button>
                            <Link to={`/EventAdmin/${item.id}`} state={item}>
                              <Button
                                className="py-1 order-last  "
                                size=""
                                variant="contained"
                                endIcon={<ArrowForwardOutlinedIcon />}
                              >
                                Read more
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  );
                })}
            </section>
          </div>
        </div>
      </div>
      <Footer />
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        className=""
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        fullWidth
        maxWidth="sm"
      >
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle id="">
            {isUpdate == false ? "Create Event" : "Update Event"}
          </DialogTitle>
          <DialogContent dividers>
            {err && (
              <div className="text-2xl font-bold text-red-600 text-center">
                {err}
              </div>
            )}
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
            <div className="grid grid-cols-2 gap-5">
              <input
                className="h-12"
                type="date"
                label="Select a date"
                value={selectedDateBegin}
                onChange={handleDateBeginChange}
              />
              <input
                className="h-12"
                type="date"
                label="Select a date"
                value={selectedDateEnd}
                onChange={handleDateEndChange}
              />
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
              {/* {error && <div className='text mt-1 text-center text-xl text-red-600 my-3 font-semibold'>{error}</div>} */}
              <TextField
                id="outlined-basic"
                error={
                  formik.touched.area && formik.errors.area ? true : undefined
                }
                className="w-full"
                value={formik.values.area}
                name="area"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Area"
                variant="outlined"
              />
              {formik.errors.area && formik.touched.area && (
                <div className="text mt-1 text-red-600 font-semibold">
                  {formik.errors.area}
                </div>
              )}
            </div>
            <div className="max-w-5xl my-2 mx-auto">
              {formik.errors.description && formik.touched.description && (
                <div className="text mt-1 text-red-600 font-semibold">
                  {formik.errors.description}
                </div>
              )}
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                Description
              </label>
              <textarea
                value={formik.values.description}
                name="description"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="description"
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Your message..."
              ></textarea>
            </div>
          </DialogContent>
          <DialogActions>
            <Button type="submit">Save</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
