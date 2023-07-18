import React, { useEffect, useState } from 'react';
import '../css/styles.admin.css';
import { Link, useLoaderData, useLocation, useParams } from 'react-router-dom';
import { GetListOrderAsyncApi, PostShopAsyncApi, PutShopAsyncApi, ShopAction, getShopAsyncApi } from '../services/shop/shopSlice';
import { useDispatch, useSelector } from 'react-redux';
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
import * as Yup from "yup";
import { CardAction, PostCard50AsyncApi, PostCardAsyncApi, getCardAsyncApi } from '../services/card/cardSlice';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Navbar from './Navbar';
import EditIcon from '@mui/icons-material/Edit';
import { EventAction, PostImgEventAsyncApi, getEventImgListAsyncApi } from '../services/event/eventSlice';
import {
  InputLabel,
  MenuItem,
  Select,
  FormControl
} from "@mui/material";
import "./Slider.css"
import { accountAction } from '../services/account/accountSlice';
import { ProductAction } from '../services/product/productSlice';
import DialogContentText from '@mui/material/DialogContentText';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage"
import { storage } from '../config/FireBaseConfig';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
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

function parseToVND(number) {
  let strNumber = number.toString().replace(/[.,]/g, "");
  strNumber = strNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return strNumber;
}

function EventAdmin() {
  const [openCard, setOpenCard] = React.useState(false);
  const param = useParams();
  const location = useLocation();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [search, setSearch] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const eventCotent = location.state;
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const [isUpdate, setIsUpdate] = React.useState(false);
  const [idShop, setIdShop] = React.useState(0);
  const { eventListImg } = useSelector((state) => state.event)
  const { shopList, OrerList } = useSelector((state) => state.shop)
  const { CardList } = useSelector((state) => state.card)
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [update50Card, setUpdate50Card] = React.useState(0);
  const [isImg, setIsImg] = useState(false);
  const [click, SetClick] = React.useState(false)
  const [selectedImage, setSelectedImage] = React.useState();
  const [progresspercent, setProgresspercent] = useState(0);
  const [openOrder, setOpenOrder] = useState(false);

  const handleClickOpenOrder = (data) => {
    setOpenOrder(true);
    dispatch(GetListOrderAsyncApi(data.id)).then((response) => {
      if (response.payload != undefined) {
      }
    }).catch((error) => {
      // Handle failure case
    });
  };
  const handleCloseOrder = () => {
    setOpenOrder(false);
    setUpdate50Card(0)
  };


  const handleClickOpenUpdate = (data) => {
    setOpenUpdate(true);
    setUpdate50Card(data)
  };
  const handleCloseUpdate = () => {
    setOpenUpdate(false);
    setUpdate50Card(0)
  };

  const handleClickOpenImage = (data) => {
    setIsImg(true);
    setSelectedImage()
  };
  const handleClickOpenClose = (data) => {
    setIsImg(false);
    setSelectedImage()
  };


  const settings = {
    dots: true, // Hiển thị chấm chỉ mục
    infinite: true, // Vòng lặp vô hạn
    slidesToShow: 3, // Số lượng slide hiển thị cùng lúc
    slidesToScroll: 1, // Số lượng slide được scroll mỗi lần
  };

  useEffect(() => {
    console.log("haha1", param, location)
    dispatch(getShopAsyncApi(param.id)).then((response) => {
      if (response.payload != undefined) {
        setFilteredData(response.payload)
      }
    }).catch((error) => {
      // Handle failure case
    });
    dispatch(getEventImgListAsyncApi(param.id)).then((response) => {
      if (response.payload != undefined) {

      }
    }).catch((error) => {
      // Handle failure case
    });
    dispatch(getCardAsyncApi(param.id)).then((response) => {
      if (response.payload != undefined) {
      }
    }).catch((error) => {
      // Handle failure case
    });
    return () => {
      dispatch(accountAction.clearAccount())
      dispatch(CardAction.clearCard())
      dispatch(EventAction.clearEvent())
      dispatch(ProductAction.clearProduct())
      dispatch(ShopAction.clearShop())
    }
  }, []);
  console.log("shop", shopList)
  function handleSearchInputChange(event) {
    const query = event.target.value;
    setSearchQuery(query);
    filterData(query);
  }
  function filterData(query) {
    const filteredResults = shopList.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filteredResults);
  }
  const hanleClickCard = () => {
    setOpenUpdate(false)
    setUpdate50Card(0)
    dispatch(PostCardAsyncApi({ eventId: param.id })).then((response) => {
      if (response.payload != undefined) {
        dispatch(getCardAsyncApi(param.id))
      }
    }).catch((error) => {
      // Handle failure case
    });
  };
  const hanleClick50Card = () => {
    setOpenUpdate(false)
    setUpdate50Card(0)
    dispatch(PostCard50AsyncApi({ eventId: param.id })).then((response) => {
      if (response.payload != undefined) {
        dispatch(getCardAsyncApi(param.id))
      }
    }).catch((error) => {
      // Handle failure case
    });
  };

  const handleClickOpen = (data) => {
    setOpen(true);
    setSelectedImage();
    setIsImg(false);
    SetClick(false)
    if (data.eventId) {
      setIsUpdate(true);
      setIdShop(data.id)
      setSelectedImage(data.image);
      formik.setValues(
        {
          id: data.id,
          name: data.name,
          description: data.des,
          area: data.area,
          status: data.status,
        }
      );
    } else {

    }
  };


  const handleClose = () => {
    setOpen(false);
    formik.setValues(
      {
        id: "",
        name: "",
        description: "",
        area: "",
        status: "",
      }
    );
    formik.setTouched({});
    formik.setErrors({});
  };

  const formik = useFormik({
    initialValues: {
      id: "",
      name: "",
      description: "",
      area: "",
      status: true

    },
    validationSchema: Yup.object({
      id: Yup.string().min(2, "Too Short!").max(4000, "Too Long!").required(),
      name: Yup.string().min(5, "Too Short!").max(4000, "Too Long!").required(),
      area: Yup.string().min(5, "Too Short!").max(4000, "Too Long!").required(),
      description: Yup.string().min(5, "Too Short!").max(4000, "Too Long!").required(),
    }), onSubmit: values => {
      let DataBodyUpdate
      let DataBody
      console.log("dabam1")
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
          console.log("dabam2")
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log("dabam3")
            DataBody = {
              eventId: param.id,
              id: values.id,
              name: values.name,
              area: values.area,
              des: values.description,
              status: true,
              image: click == true ? downloadURL : selectedImage,
            }
            DataBodyUpdate = {
              eventId: param.id,
              id: values.id,
              name: values.name,
              area: values.area,
              des: values.description,
              status: values.status,
              image: click == true ? downloadURL : selectedImage,
            }

            if (isUpdate == false) {
              dispatch(PostShopAsyncApi(DataBody)).then((response) => {
                setOpen(false);
                formik.setValues(
                  {
                    id: "",
                    name: "",
                    description: "",
                    area: "",
                    status: true
                  }
                );
                formik.setTouched({});
                formik.setErrors({});
                if (response.payload != undefined) {
                  dispatch(getShopAsyncApi(param.id)).then((response) => {
                    if (response.payload != undefined) {
                      setFilteredData(response.payload)
                    }
                  }).catch((error) => {
                    // Handle failure case
                  });
                }
              }).catch((error) => {
                // Handle failure case
              });
            } else {
              dispatch(PutShopAsyncApi(DataBodyUpdate)).then((response) => {
                setOpen(false);
                formik.setValues(
                  {
                    id: "",
                    name: "",
                    description: "",
                    area: "",
                    status: true
                  }
                );
                formik.setTouched({});
                formik.setErrors({});
                if (response.payload != undefined) {
                  dispatch(getShopAsyncApi(param.id)).then((response) => {
                    if (response.payload != undefined) {
                      setFilteredData(response.payload)
                    }
                  }).catch((error) => {
                    // Handle failure case
                  });
                }
              }).catch((error) => {
                // Handle failure case
              });
            }
          });
        }
      );
    },
  });

  const HandleUploadImgEvent = () => {
    let DataBody
    console.log("dabam1")
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
        console.log("dabam2")
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log("dabam3")
          DataBody = {
            eventId: param.id,
            img: downloadURL,
          }
          dispatch(PostImgEventAsyncApi(DataBody)).then((response) => {
            SetClick(false)
            setSelectedImage()
            setIsImg(false);
            if (response.payload != undefined) {
              dispatch(getEventImgListAsyncApi(param.id)).then((response) => {
                if (response.payload != undefined) {

                }
              }).catch((error) => {
                // Handle failure case
              });
            }
          }).catch((error) => {
            // Handle failure case
          });
          console.log("ngu", DataBody)
        });
      }
    );
  }
  return (
    <div>
      <Navbar />

      <div className="container-fluid">
        <div className="row">
          <main className="main-wrapper ms-sm-auto py-4 px-md-4 border-start">
            <div className="row my-4">
              <div className="grid grid-cols-2 gap-5">
                <div className='mb-10'>
                  <Slider {...settings}>
                    {eventListImg && eventListImg.map((item, index) => {
                      return (
                        <img src={item.img} className='h-64 w-44 p-1' />
                      )
                    })}
                  </Slider>
                </div>
                <div className="pb-5">

                  {eventCotent && <div className='bg-white px-4 py-1 mx-36'>
                    <Typography gutterBottom variant="h4" className='text-center' >
                      {eventCotent.name}
                    </Typography>
                    <Typography variant="h6">
                      <strong>ID:</strong>  {eventCotent.id}
                    </Typography>
                    <Typography variant="h6">
                      <strong>Area:</strong> {eventCotent.area}
                    </Typography>
                    <Typography variant="h6">
                      <strong>Description:</strong>{eventCotent.description.length > 20 ? eventCotent.description.slice(0, 20) + '...' : eventCotent.description}
                    </Typography>
                    <Typography variant="h6">
                      <strong>Begin Date:</strong> {parseTimestamp(eventCotent.beginDate)}
                    </Typography>
                    <Typography variant="h6">
                      <strong>End Date:</strong> {parseTimestamp(eventCotent.endDate)}
                    </Typography>
                    <Typography variant="h6" className='flex gap-[2px]'>
                      <strong>Status:</strong>  {eventCotent.status == true ? <span className='text-green-400'> true </span> : <span className='text-red-400'> false </span>}
                    </Typography>
                  </div>}
                </div>
              </div>

              <Box sx={{ width: '100%' }} className="bg-white">
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Shop" {...a11yProps(0)} />
                    <Tab label="Card" {...a11yProps(1)} />
                  </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>

                  <div className='flex gap-5'>
                    <button className="nav-link form-control mb-3" style={{ textAlign: 'center' }} onClick={handleClickOpen}>
                      Create Shop
                    </button>
                    <button className="nav-link form-control mb-3" style={{ textAlign: 'center' }} onClick={() => handleClickOpenUpdate(1)}>
                      Create Card
                    </button>
                    <button className="nav-link form-control mb-3" style={{ textAlign: 'center' }} onClick={() => handleClickOpenUpdate(2)}>
                      Create 50 Cards
                    </button>
                    <button className="nav-link form-control mb-3" style={{ textAlign: 'center' }} onClick={() => handleClickOpenImage()}>
                      Add Img to Event
                    </button>
                  </div>
                  {/* <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300 }}
                  >
                    <InputBase
                      sx={{ ml: 1, flex: 1 }}
                      placeholder="Search"
                      value={searchQuery}
                      onChange={handleSearchInputChange}
                    />
                    <IconButton className='' sx={{ p: '10px', outline: "none" }} >
                      <SearchIcon />
                    </IconButton>
                  </Paper> */}
                  <h5 className="mb-4 clear-right" style={{ textAlign: 'center' }}>List Shop</h5>
                  <div className="table-responsive">
                    <table className="account-table table" style={{ textAlign: 'center' }}>
                      <thead>
                        <tr>
                          <th className='text-base' scope="col">Number</th>
                          <th className='text-base' scope="col">ID</th>
                          <th className='text-base' scope="col">Img</th>
                          <th className='text-base' scope="col">Name</th>
                          <th className='text-base' scope="col">Description</th>
                          <th className='text-base' scope="col">Area</th>
                          <th className='text-base' scope="col">Status</th>
                          <th className='text-base' scope="col">View</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredData && filteredData.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td className='font-bold text-base'>{index + 1}</td>
                              <td className='text-base'>{item.id}</td>
                              <img src={item.image} className='h-32 w-32 mx-auto' />
                              <td className='text-base'>{item.name}</td>
                              <td className='text-base'>{item.des}</td>
                              <td className='text-base'>{item.area}</td>
                              <td >{item.status == true ? <Tooltip title="Public">
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
                              <td className=''>
                                <Tooltip title="Product">
                                  <Link to={{
                                    pathname: `/shopadmin/${item.id}`,
                                  }}
                                    state={{ id: param.id, eventName: eventCotent.name, shopDetail: item }}
                                  >
                                    <IconButton >
                                      <RemoveRedEyeIcon className="" />
                                    </IconButton>
                                  </Link>
                                </Tooltip>
                                <Tooltip onClick={() => handleClickOpen(item)} title="Edit">
                                  <IconButton >
                                    <EditIcon className="" />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip onClick={() => handleClickOpenOrder(item)} title="Order">
                                  <IconButton >
                                    < FactCheckOutlinedIcon className="" />
                                  </IconButton>
                                </Tooltip>

                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>

                  <h5 className="mb-4" style={{ textAlign: 'center' }}>List Card</h5>

                  <div className="table-responsive">
                    <table className="account-table table" style={{ textAlign: 'center' }}>
                      <thead>
                        <tr>
                          <th scope="col">Number</th>
                          <th scope="col">ID</th>
                          <th scope="col">username</th>
                          <th scope="col"> phoneNumber</th>
                          <th scope="col">balance</th>

                        </tr>
                      </thead>
                      <tbody>
                        {CardList && CardList.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{item.id}</td>
                              <td>{item.username == null ? null : item.username}</td>
                              <td>{item.phoneNumber == null ? null : item.phoneNumber}</td>
                              <td>{item.balance}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </CustomTabPanel>

              </Box>

            </div>
            <div className="col-2">
              <Link className="nav-link form-control mb-3" style={{ textAlign: 'center' }} to="/Admin">
                Previous
              </Link>
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
            {isUpdate == false ? "Create Shop" : "Update Shop"}
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
              <TextField disabled={isUpdate == true ? true : false} id="outlined-basic" error={formik.touched.id && formik.errors.id ? true : undefined} value={formik.values.id}
                className='w-full' name="id" onChange={formik.handleChange} onBlur={formik.handleBlur} label="id" variant="outlined" />
              {formik.errors.id && formik.touched.id && <div className='text mt-1 text-red-600 font-semibold'>{formik.errors.id}</div>}
            </div>
            <div className='max-w-5xl my-2 mx-auto'>
              <TextField id="outlined-basic" error={formik.touched.name && formik.errors.name ? true : undefined} value={formik.values.name}
                className='w-full' name="name" onChange={formik.handleChange} onBlur={formik.handleBlur} label="Name" variant="outlined" />
              {formik.errors.name && formik.touched.name && <div className='text mt-1 text-red-600 font-semibold'>{formik.errors.name}</div>}
            </div>
            <div className='max-w-5xl my-2 mx-auto'>
              <TextField id="outlined-basic" error={formik.touched.area && formik.errors.area ? true : undefined}
                className='w-full' name="area" onChange={formik.handleChange} onBlur={formik.handleBlur} label="Area" variant="outlined"
                value={formik.values.area} />
              {formik.errors.area && formik.touched.area && <div className='text mt-1 text-red-600 font-semibold'>{formik.errors.area}</div>}
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
              <textarea value={formik.values.description} name="description" onChange={formik.handleChange} onBlur={formik.handleBlur} id="description" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></textarea>
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
        open={openUpdate}
        onClose={handleCloseUpdate}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Notification"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to update the status of your Account and Shop?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdate}>Disagree</Button>
          <Button onClick={update50Card == 1 ? hanleClickCard : update50Card == 2 ? hanleClick50Card : handleCloseUpdate} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={isImg}
        onClose={handleClickOpenClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        size="xl"
      >
        <DialogTitle id="alert-dialog-title">
          {"Upload Image"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {isImg == true ? <div className='w-48'>
              <Button
                variant="contained"
                component="label"
                className='nav-link form-control mb-3 w-48'
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
            </div> : null}
            {isImg && selectedImage !== undefined && (
              <>
                <img
                  alt=""
                  className="mx-auto h-96 w-96 object-cover my-2"
                  src={
                    click === false
                      ? selectedImage
                      : window.URL.createObjectURL(selectedImage)
                  }
                />
                <Button
                  variant="contained"
                  component="label"
                  onClick={HandleUploadImgEvent}
                >
                  Update
                </Button>
              </>
            )}
          </DialogContentText>
        </DialogContent>
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

export default EventAdmin;


