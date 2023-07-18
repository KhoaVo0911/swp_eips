import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from React Router if using it
import "../css/styles.css";
import "../css/bootstrap.min.css";
import "../css/bootstrap-icons.css";
import axios from "axios";
import Navbar from "../product/Navbar";
import { PostComboProductAsyncApi, PostProductAsyncApi, PostRevenueAsyncApi, ProductAction, PutProductAsyncApi, getAllProductAsyncApi, getProductAsyncApi, getProductSoldAsyncApi } from "../services/product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { GetListOrderAsyncApi, ShopAction, getShopByUsernameAsyncApi } from "../services/shop/shopSlice";
import PublicIcon from '@mui/icons-material/Public';
import PublicOffIcon from '@mui/icons-material/PublicOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import { Tooltip } from '@mui/material';
import IconButton from "@mui/material/IconButton";
import Slide from '@mui/material/Slide';
import { useFormik } from 'formik';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage"
import { storage } from '../config/FireBaseConfig';
import {
  InputLabel,
  MenuItem,
  Select,
  FormControl
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddIcon from '@mui/icons-material/Add';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import BarChartIcon from '@mui/icons-material/BarChart';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import * as Yup from "yup";
import { CycloneOutlined } from "@mui/icons-material";
import { accountAction } from "../services/account/accountSlice";
import { CardAction } from "../services/card/cardSlice";
import { EventAction } from "../services/event/eventSlice";
import GetEventApi from "../api/EventApi";
import DialogContentText from '@mui/material/DialogContentText';

function parseToVND(number) {
  let strNumber = number.toString().replace(/[.,]/g, "");
  strNumber = strNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return strNumber;
}

function parseTimestamp(timestamp) {
  const date = new Date(timestamp);
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(date);
  return formattedDate;
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Product() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [openCombo, setOpenCombo] = React.useState(false);
  const [click, SetClick] = React.useState(false);
  const [img, setImg] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [selectedImage, setSelectedImage] = React.useState();
  const [progresspercent, setProgresspercent] = useState(0);
  const [productId, setProductId] = useState(0);
  const [selectedValue, setSelectedValue] = React.useState([]);
  const [nameCombo, setNameCombo] = useState("");
  const [imageCombo, setImageCombo] = useState("");
  const [priceCombo, setPriceCombo] = useState("");
  const [descriptionCombo, setDescriptionCombo] = useState("");
  const [comboList, setComboList] = useState([]);
  const [selectedDateStart, setSelectedDateStart] = useState(null);
  const [selectedDateEnd, setSelectedDateEnd] = useState(null);
  const dispatch = useDispatch();
  const userString = localStorage.getItem("user");
  const userObject = JSON.parse(userString);
  const dataCategory = ["Food", "Drink", "Other"]
  const { ProductListAll, ProductSold, Revenue } = useSelector((state) => state.product)
  const { shopByUsername, OrerList } = useSelector((state) => state.shop)
  const [openOrder, setOpenOrder] = useState(false);

  const handleClickOpenOrder = () => {
    setOpenOrder(true);
    dispatch(GetListOrderAsyncApi(shopByUsername.id)).then((response) => {
      if (response.payload != undefined) {
      }
    }).catch((error) => {
      // Handle failure case
    });
  };
  const handleCloseOrder = () => {
    setOpenOrder(false);
  };
  const handleDateStartChange = (date) => {
    const day = dayjs(date).format('YYYY-MM-DD');
    setSelectedDateStart(day);
  };
  const handleDateEndChange = (date) => {
    const day = dayjs(date).format('YYYY-MM-DD');
    setSelectedDateEnd(day);
  };
  useEffect(() => {
    if (shopByUsername.id) {
      let body = { shopId: shopByUsername.id, beginDate: selectedDateStart, endDate: selectedDateEnd }
      dispatch(PostRevenueAsyncApi(body))
    }
    console.log("ngu123", selectedDateEnd, selectedDateStart)
  }, [selectedDateEnd, selectedDateStart]);
  useEffect(() => {
    dispatch(getShopByUsernameAsyncApi(userObject.username)).then((response) => {
      if (response.payload != undefined) {
        // dispatch(getAllProductAsyncApi({ shopId: response.payload.id })).then((response) => {
        dispatch(getAllProductAsyncApi(response.payload.id)).then((response) => {
          if (response.payload != undefined) {
            setFilteredData(response.payload)
          }
        }).catch((error) => {
        });
        dispatch(getProductSoldAsyncApi(response.payload.id)).then((response) => {
          if (response.payload != undefined) {

          }
        }).catch((error) => {
        });
      }
    }).catch((error) => {
    });
    return () => {
      dispatch(accountAction.clearAccount())
      dispatch(CardAction.clearCard())
      dispatch(EventAction.clearEvent())
      dispatch(ProductAction.clearProduct())
      dispatch(ShopAction.clearShop())
    }
  }, []);
  console.log("hehe", shopByUsername.id)
  function handleSearchInputChange(event) {
    const query = event.target.value;
    setSearchQuery(query);
    filterData(query);
  }
  function filterData(query) {
    const filteredResults = ProductListAll.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filteredResults);
  }
  const handleClickOpen = (data) => {
    setOpen(true);
    setOpenCombo(false)
    setSelectedImage()
    setIsUpdate(false)
    if (data.id) {
      setIsUpdate(true)
      setProductId(data.id)
      formik.setValues(
        {
          category: data.category,
          description: data.description,
          name: data.name,
          price: data.price,
          status: true
        }
      );
      setSelectedImage(data.img)
      console.log(selectedImage, data.img)
    } else {

    }
  };
  const handleClickOpenCombo = () => {
    setOpenCombo(!openCombo);
  };
  const handleClickSubmitCombo = () => {
    let DataBody;
    if (click == false) { setImg(selectedImage) }
    else {
      const storageRef = ref(storage, `Package/${selectedImage.name}`);
      const uploadTask = uploadBytesResumable(storageRef, selectedImage);
      uploadTask.on("state_changed",
        (snapshot) => {
          const progress =
            Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgresspercent(progress);
        },
        (error) => {
          alert(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            setImg(downloadURL)
            DataBody = [
              {
                shopId: shopByUsername.id,
                name: nameCombo,
                price: priceCombo,
                img: downloadURL,
                description: descriptionCombo,
                category: "Combo"
              },
              comboList.map(item => {
                return {
                  idMake: item.id,
                  quantity: item.quantity
                };
              })
            ];

            const newDataBody = [
              DataBody[0],
              ...DataBody[1].flat()
            ];

            dispatch(PostComboProductAsyncApi(newDataBody)).then((response) => {
              setComboList([])
              setNameCombo('')
              setImageCombo('')
              setDescriptionCombo('')
              setPriceCombo('')
              setOpenCombo(false)
              setImg('')
              SetClick(false)
              setSelectedImage()
              setOpen(false);
              formik.setValues(
                {
                  category: "",
                  description: "",
                  name: "",
                  price: "",
                  status: true
                }
              );
              formik.setTouched({});
              formik.setErrors({});
              if (response.payload != undefined) {
                //dispatch(getAllProductAsyncApi({ shopId: shopByUsername.id })).then((response) => {
                dispatch(getAllProductAsyncApi(shopByUsername.id)).then((response) => {
                  if (response.payload != undefined) {
                    setFilteredData(response.payload)
                  }
                }).catch((error) => {
                });
              }
            }).catch((error) => {
              // Handle failure case
            });
          });
        }
      );
    }



  };
  const handleIncrease = (data) => {
    const newArrayList = [...comboList];
    const exist = newArrayList.find(item => item.id === data.id)
    const objIndex = newArrayList.findIndex((obj => obj.id == data.id));
    if (exist) newArrayList[objIndex].quantity = exist.quantity + 1;
    setComboList(newArrayList)
  }

  const handleDecrease = (data) => {
    const newArrayList = [...comboList];
    const exist = newArrayList.find(item => item.id === data.id)
    const objIndex = newArrayList.findIndex((obj => obj.id == data.id));
    if (exist) {
      newArrayList[objIndex].quantity > 1
        ? newArrayList[objIndex].quantity = exist.quantity - 1
        : newArrayList.splice(objIndex, 1)
    }
    setComboList(newArrayList)
  }
  const handleClickAddCombo = (data) => {
    const comboIndex = comboList.findIndex((item) => item.name === data.name);
    if (comboIndex !== -1) {
      const newArrayList = [...comboList];
      newArrayList[comboIndex].quantity += 1;
      setComboList(newArrayList);
    } else {
      const newArrayList = [...comboList];
      const newDataList = {
        id: data.id,
        name: data.name,
        quantity: 1,
      };
      newArrayList.push(newDataList);
      setComboList(newArrayList);
    }
  };
  console.log("combolist", comboList)
  const handleClose = () => {
    setOpen(false);
    formik.setValues(
      {
        category: "",
        description: "",
        name: "",
        price: "",
        status: true
      }
    );
    formik.setTouched({});
    formik.setErrors({});
    setSelectedImage(undefined)
    setSelectedValue([])
  };

  const formik = useFormik({
    initialValues: {
      category: "",
      description: "",
      name: "",
      price: "",
      status: true
    },
    validationSchema: Yup.object({
      category: Yup.string().min(2, "Too Short!").max(4000, "Too Long!").required(),
      description: Yup.string().required(),
      name: Yup.string().min(5, "Too Short!").max(4000, "Too Long!").required(),
      price: Yup.string().required(),
    }), onSubmit: values => {
      let DataBody
      let DataBodyUpdate
      const userString = localStorage.getItem("user");
      const userObject = JSON.parse(userString);
      const username = userObject.username;
      console.log("ngu1", username)
      if (click == false) {
        setImg(selectedImage)
        DataBody = {
          shopId: shopByUsername.id,
          name: values.name,
          price: values.price,
          img: selectedImage,
          description: values.description,
          category: values.category,
        }
        DataBodyUpdate = {
          id: productId,
          name: values.name,
          price: values.price,
          img: selectedImage,
          description: values.description,
          status: values.status,
        }
        if (isUpdate == false) {
          dispatch(PostProductAsyncApi(DataBody)).then((response) => {
            setImg('')
            SetClick(false)
            setSelectedImage()
            setOpen(false);
            formik.setValues(
              {
                category: "",
                description: "",
                name: "",
                price: "",
                status: true
              }
            );
            formik.setTouched({});
            formik.setErrors({});
            if (response.payload != undefined) {
              // dispatch(getAllProductAsyncApi({ shopId: shopByUsername.id })).then((response) => {
              dispatch(getAllProductAsyncApi(shopByUsername)).then((response) => {
                if (response.payload != undefined) {
                  setFilteredData(response.payload)
                }
              }).catch((error) => {
              });
            }
          }).catch((error) => {
            // Handle failure case
          });
        } else {
          dispatch(PutProductAsyncApi(DataBodyUpdate)).then((response) => {
            setImg('')
            SetClick(false)
            setSelectedImage()
            setOpen(false);
            formik.setValues(
              {
                category: "",
                description: "",
                name: "",
                price: "",
              }
            );
            formik.setTouched({});
            formik.setErrors({});
            if (response.payload != undefined) {
              //  dispatch(getAllProductAsyncApi({ shopId: shopByUsername.id })).then((response) => {
              dispatch(getAllProductAsyncApi(shopByUsername.id)).then((response) => {
                if (response.payload != undefined) {
                  setFilteredData(response.payload)
                }
              }).catch((error) => {
              });
            }
          }).catch((error) => {
            // Handle failure case
          });
        }
      }
      else {
        const storageRef = ref(storage, `Package/${selectedImage.name}`);
        const uploadTask = uploadBytesResumable(storageRef, selectedImage);
        uploadTask.on("state_changed",
          (snapshot) => {
            const progress =
              Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgresspercent(progress);
          },
          (error) => {
            alert(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
              setImg(downloadURL)
              DataBody = {
                shopId: shopByUsername.id,
                name: values.name,
                price: values.price,
                img: downloadURL,
                description: values.description,
                category: values.category,
              }
              DataBodyUpdate = {
                id: productId,
                name: values.name,
                price: values.price,
                img: downloadURL,
                description: values.description,
                status: values.status,
              }
              if (isUpdate == false) {
                dispatch(PostProductAsyncApi(DataBody)).then((response) => {
                  setImg('')
                  SetClick(false)
                  setSelectedImage()
                  setOpen(false);
                  formik.setValues(
                    {
                      category: "",
                      description: "",
                      name: "",
                      price: "",
                      status: true
                    }
                  );
                  formik.setTouched({});
                  formik.setErrors({});
                  if (response.payload != undefined) {
                    //dispatch(getAllProductAsyncApi({ shopId: shopByUsername.id })).then((response) => {
                    dispatch(getAllProductAsyncApi(shopByUsername.id)).then((response) => {
                      if (response.payload != undefined) {
                        setFilteredData(response.payload)
                      }
                    }).catch((error) => {
                    });
                  }
                }).catch((error) => {
                  // Handle failure case
                });
              } else {
                dispatch(PutProductAsyncApi(DataBodyUpdate)).then((response) => {
                  setImg('')
                  SetClick(false)
                  setSelectedImage()
                  setOpen(false);
                  formik.setValues(
                    {
                      category: "",
                      description: "",
                      name: "",
                      price: "",
                    }
                  );
                  formik.setTouched({});
                  formik.setErrors({});
                  if (response.payload != undefined) {
                    //dispatch(getAllProductAsyncApi({ shopId: shopByUsername.id })).then((response) => {
                    dispatch(getAllProductAsyncApi(shopByUsername.id)).then((response) => {
                      if (response.payload != undefined) {
                        setFilteredData(response.payload)
                      }
                    }).catch((error) => {
                    });
                  }
                }).catch((error) => {
                  // Handle failure case
                });
              }

              console.log("ngu", DataBody)
            });
          }
        );
      }
    },
  });

  return (
    <div>
      <Navbar />

      <div className="container-fluid">
        <div className="">
          <main className="main-wrapper ms-sm-auto py-4 px-md-4 border-start">

            <div className="title-group mb-3" style={{ textAlign: "center" }}>
              <h3 className=" font-bold  mb-0">UPDATE PRODUCT</h3>
              <small className="text-muted" />
            </div>
            <div className="row my-4">
              <div className="col-lg-6 col-6">
                <form
                  className="custom-form input-group mb-3"
                  action="#"
                  method="get"
                  role="form"
                >
                  <input
                    className="form-control"
                    name="search"
                    type="text"
                    placeholder="Search Product"
                    aria-label="Search"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                  />
                  <button style={{ width: "100px" }} type="submit">
                    Search
                  </button>
                </form>
                <div className="my-4 float-right">
                  <Stack direction="row" spacing={2}>
                    <Button onClick={handleClickOpenOrder} variant="contained" startIcon={<BarChartIcon />}>
                      Order List
                    </Button>
                    <Button onClick={handleClickOpen} color="success" variant="contained" startIcon={<AddIcon />}>
                      Create Product
                    </Button>
                    <Button onClick={handleClickOpenCombo} color="success" variant="contained" startIcon={<PlaylistAddIcon />}>
                      Create Combo
                    </Button>
                  </Stack>
                </div>

                <div className="custom-block bg-white clear-right">
                  <h5 className="mb-4 uppercase">Product</h5>
                  <div className="table-responsive">
                    <table
                      className="account-table table"
                      style={{ textAlign: "center" }}
                    >
                      <thead>
                        <tr>
                          <th scope="col">No</th>
                          <th scope="col">ID</th>
                          <th scope="col">Name</th>
                          <th scope="col">Image</th>
                          <th scope="col">Description</th>
                          <th scope="col">Price</th>
                          <th scope="col">Category</th>
                          <th scope="col">Status</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredData.length > 0 && filteredData.map((products, index) => (
                          <tr key={products.id}>
                            <td itemScope="row">{index + 1}</td>
                            <td itemScope="row">{products.id}</td>
                            <td itemScope="row">{products.name}</td>
                            <td itemScope="row">
                              <img
                                className="w-32 h-32 "
                                src={products.img}
                                alt={products.Name}
                              ></img>
                            </td>
                            <td itemScope="row">{products.description}</td>
                            <td itemScope="row">{parseToVND(products.price) + " VNĐ"}</td>
                            <td className="text-danger" itemScope="row">{products.category}
                              <span className="me-1"></span>
                            </td>
                            <td>{products.status == true ? <Tooltip title="Public">
                              <IconButton >
                                <PublicIcon className="" />
                              </IconButton>
                            </Tooltip>
                              : <Tooltip title="Non Public">
                                <IconButton >
                                  <PublicOffIcon className="" />
                                </IconButton>
                              </Tooltip>
                            } </td>
                            <td itemScope="row" className="cursor-pointer">
                              {openCombo == false ? <Tooltip onClick={() => handleClickOpen(products)} title="Edit">
                                <IconButton>
                                  <EditIcon color="success" />
                                </IconButton>
                              </Tooltip> : products.category == "Combo" ? null : <Tooltip onClick={() => handleClickAddCombo(products)} title="Add Combo">
                                <IconButton>
                                  <AddCircleIcon color="success" />
                                </IconButton>
                              </Tooltip>}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              {openCombo == false ?
                <div className="col-lg-6 col-6" style={{ paddingTop: "145px" }}>
                  <div className="custom-block bg-white">
                    <div className='flex gap-5'>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Start Date"
                          size="small"
                          value={selectedDateStart}
                          onChange={handleDateStartChange}
                        />
                      </LocalizationProvider>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="End Date"
                          value={selectedDateEnd}
                          onChange={handleDateEndChange}
                        />
                      </LocalizationProvider>
                    </div>
                    <div className="mb-2 float-right">
                      <p className='text-xl uppercase font-bold mt-[10px]'>Total Revenue: {parseToVND(Revenue) + " VNĐ"}</p>
                    </div>
                    <h5 className="mb-4 uppercase clear-right">Product Sold</h5>
                    <form >
                      <table
                        className="account-table table"
                        style={{ textAlign: "center" }}
                      >
                        <thead>
                          <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Image</th>
                            <th scope="col">Description</th>
                            <th scope="col">Catagory</th>
                            <th scope="col">Quantity</th>
                          </tr>
                        </thead>
                        <tbody>

                          {ProductSold && ProductSold.map((item, index) => {
                            return (
                              <tr index={index} style={{ textAlign: "center" }}>
                                <td scope="row" className="mx-2 px-2">
                                  {item.name}
                                </td>
                                <td scope="row" className="mx-2 px-2">
                                  <img src={item.img} className="h-32 w-32" />
                                </td>
                                <td scope="row" className="mx-2 px-2">
                                  {item.description}
                                </td>
                                <td scope="row" className="mx-2 px-2">
                                  {item.category}
                                </td>
                                <td scope="row" className="mx-2 px-2">
                                  {item.quantity}
                                </td>
                              </tr>
                            )
                          })}

                        </tbody>
                      </table>
                    </form>
                  </div>
                </div>
                : <div className="col-lg-6 col-6" style={{ paddingTop: "145px" }}>
                  <div className="custom-block bg-white">
                    <h5 className="mb-4">COMBO</h5>
                    <form >
                      <table
                        className="account-table table"
                        style={{ textAlign: "center" }}
                      >
                        <thead>
                          <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Image</th>
                            <th scope="col">Description</th>
                            <th scope="col">Price</th>
                            <th scope="col">Catagory</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr style={{ textAlign: "center" }}>
                            <td scope="row" className="mx-2 px-2">
                              <input
                                className="form-control"
                                type="text"
                                name="Name"
                                value={nameCombo}
                                onChange={(e) => setNameCombo(e.target.value)}
                              />
                            </td>
                            <td scope="row" className="mx-2 px-2">
                              <Button
                                variant="contained"
                                component="label"
                                className="h-[38px]"
                              >
                                Image
                                <input
                                  type="file"
                                  hidden
                                  onChange={(event) => {
                                    setSelectedImage(event.target.files[0]);
                                    SetClick(true);
                                  }}

                                />
                              </Button>

                              <div className='max-w-5xl my-5 mx-auto'>
                                {selectedImage == undefined ? <div></div> : <img alt="" className='mx-auto h-48 w-48 my-2' src={click == false ? selectedImage : window.URL.createObjectURL(selectedImage)} />}
                              </div>
                            </td>
                            <td scope="row" className="mx-2 px-2">
                              <input
                                className="form-control"
                                type="text"
                                name="Description"
                                value={descriptionCombo}
                                onChange={(e) => setDescriptionCombo(e.target.value)}
                              />
                            </td>
                            <td scope="row" className="mx-2 px-2">
                              <input
                                className="form-control"
                                type="number"
                                name="Price"
                                value={priceCombo}
                                onChange={(e) => setPriceCombo(e.target.value)}
                              />
                            </td>
                            <td scope="row">
                              <input
                                className="form-control"
                                name="Category"
                                value="COMBO"
                                disabled
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <table
                        className="account-table table"
                        style={{ textAlign: "center" }}
                      >
                        <thead>
                          <tr>
                            <th scope="col">No</th>
                            <th scope="col">ID Make</th>
                            <th scope="col">Name</th>
                            <th scope="col">Quantity</th>
                          </tr>
                        </thead>
                        <tbody>
                          {comboList.map((item, index) => {
                            return (
                              <tr key={index}>
                                <th>{index + 1}</th>
                                <th>{item.id}</th>
                                <th>{item.name}</th>
                                <th className="flex justify-center ">
                                  <div className="mt-[6px] cursor-pointer" onClick={() => handleDecrease(item)}>
                                    <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512"><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                                    </svg>
                                  </div>
                                  <p className="mx-3 text-black "   >{item.quantity} </p>
                                  <div className="mt-[6px] cursor-pointer" onClick={() => handleIncrease(item)} >
                                    <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                                      <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                                    </svg>
                                  </div>
                                </th>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                      <div className="float-right">
                        <Button disabled={comboList.length > 0 ? false : true} onClick={handleClickSubmitCombo} color="primary" variant="contained" >
                          Submit
                        </Button>
                      </div>

                    </form>
                  </div>
                </div>}


            </div>

          </main>

        </div>

      </div >
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
          <DialogTitle id="" >
            {isUpdate == true ? "Update Product" : "Create Product"}
          </DialogTitle>
          <DialogContent dividers >
            <div className='max-w-5xl mb-5 mx-auto'>
              <Button
                variant="contained"
                component="label"
              >
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
            <div className='max-w-5xl my-5 mx-auto'>
              {selectedImage == undefined ? <div></div> : <img alt="" className='mx-auto h-48 w-48 my-2' src={click == false ? selectedImage : window.URL.createObjectURL(selectedImage)} />}
            </div>
            <div className='max-w-5xl my-2 mx-auto'>
              {/* {error && <div className='text mt-1 text-center text-xl text-red-600 my-3 font-semibold'>{error}</div>} */}
              <TextField id="outlined-basic" error={formik.touched.name && formik.errors.name ? true : undefined}
                className='w-full' value={formik.values.name} name="name" onChange={formik.handleChange} onBlur={formik.handleBlur} label="Name" variant="outlined" />
              {formik.errors.name && formik.touched.name && <div className='text mt-1 text-red-600 font-semibold'>{formik.errors.name}</div>}
            </div>
            <div className='max-w-5xl my-2 mx-auto'>
              <TextField id="outlined-basic" error={formik.touched.price && formik.errors.price ? true : undefined} value={formik.values.price}
                type="number" className='w-full' name="price" onChange={formik.handleChange} onBlur={formik.handleBlur} label="price" variant="outlined" />
              {formik.errors.price && formik.touched.price && <div className='text mt-1 text-red-600 font-semibold'>{formik.errors.price}</div>}
            </div>
            <div className='max-w-5xl my-2 mx-auto'>
              <FormControl className="w-full">
                <InputLabel size="small">Category</InputLabel>
                <Select
                  size="small"
                  value={
                    formik.values.category || ""
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  label={"Category"}
                  name="category"
                >
                  {dataCategory.map((model) => (
                    <MenuItem key={model} value={model}>
                      {model}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className='max-w-5xl my-2 mx-auto'>
              <FormControl className="w-full">
                <InputLabel size="small">Status</InputLabel>
                <Select
                  size="small"
                  value={formik.values.status ?? false}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  label="Status"
                  name="status"
                >
                  <MenuItem value={true}>True</MenuItem>
                  <MenuItem value={false}>False</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className='max-w-5xl my-2 mx-auto'>
              {formik.errors.description && formik.touched.description && <div className='text mt-1 text-red-600 font-semibold'>{formik.errors.description}</div>}
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Description</label>
              <textarea value={formik.values.description} name="description" onChange={formik.handleChange} onBlur={formik.handleBlur} rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></textarea>
            </div>
          </DialogContent>
          <DialogActions>
            <Button type='submit' >
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Dialog
        open={openOrder}
        onClose={handleCloseOrder}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        size="xl"
      >
        <DialogTitle id="" >
          List Order
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className="table-responsive">
              <table className="account-table table" style={{ textAlign: 'center' }}>
                <thead>
                  <tr>
                    <th className='text-base' scope="col">Number</th>
                    <th className='text-base' scope="col">ID</th>
                    <th className='text-base' scope="col">Shop Id</th>
                    <th className='text-base' scope="col">Card Id</th>
                    <th className='text-base' scope="col">Time</th>
                    <th className='text-base' scope="col">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {OrerList && OrerList.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className='font-bold text-base'>{index + 1}</td>
                        <td className='text-base'>{item.id}</td>
                        <td className='text-base'>{item.shopId}</td>
                        <td className='text-base'>{item.cardId}</td>
                        <td className='text-base'>{parseTimestamp(item.beginDate)}</td>
                        <td className=''>
                          {parseToVND(item.total) + " Vnđ"}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div >
  );
}

export default Product;
