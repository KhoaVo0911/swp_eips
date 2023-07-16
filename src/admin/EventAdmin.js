import React, { useEffect, useState } from 'react';
import '../css/styles.admin.css';
import { Link, useLocation, useParams } from 'react-router-dom';
import { PostShopAsyncApi, PutShopAsyncApi, ShopAction, getShopAsyncApi } from '../services/shop/shopSlice';
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
import { EventAction, getEventImgListAsyncApi } from '../services/event/eventSlice';
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
  console.log("haha", param)
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const location = useLocation();
  const eventCotent = location.state;
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const [isUpdate, setIsUpdate] = React.useState(false);
  const [idShop, setIdShop] = React.useState(0);
  const { eventListImg } = useSelector((state) => state.event)
  const { shopList } = useSelector((state) => state.shop)
  const { CardList } = useSelector((state) => state.card)
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [update50Card, setUpdate50Card] = React.useState(0);


  const handleClickOpenUpdate = (data) => {
    setOpenUpdate(true);
    setUpdate50Card(data)
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
    setUpdate50Card(0)
  };

  const settings = {
    dots: true, // Hiển thị chấm chỉ mục
    infinite: true, // Vòng lặp vô hạn
    slidesToShow: 3, // Số lượng slide hiển thị cùng lúc
    slidesToScroll: 1, // Số lượng slide được scroll mỗi lần
  };

  useEffect(() => {
    console.log("haha1", param)
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
    if (data.eventId) {
      setIsUpdate(true);
      setIdShop(data.id)
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
      let DataBody
      let DataBodyUpdate
      DataBody = {
        eventId: param.id,
        id: values.id,
        name: values.name,
        area: values.area,
        des: values.description,
        status: true
      }
      DataBodyUpdate = {
        eventId: param.id,
        id: values.id,
        name: values.name,
        area: values.area,
        des: values.description,
        status: values.status
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


      console.log("ngu", DataBody)
    },
  });
  return (
    <div>
      <Navbar />

      <div className="container-fluid">
        <div className="row">
          <main className="main-wrapper ms-sm-auto py-4 px-md-4 border-start">
            <div className="row my-4">
              <div className="col-lg-6 col-6">
                <div className="title-group mb-3" style={{ textAlign: 'center' }}>
                  <h1 className="h2 mb-0">{eventCotent != undefined ? eventCotent.name : null}</h1>
                </div>
                <div className='mb-10'>
                  <Slider {...settings}>
                    {eventListImg && eventListImg.map((item, index) => {
                      return (
                        <img src={item.img} className='h-52 w-32 p-1' />
                      )
                    })}
                  </Slider>
                </div>

              </div>
              <div className="col-lg-6 col-6" style={{ paddingRight: '300px' }}>
                <form className="custom-form input-group mb-3" action="#" method="get" role="form">
                  <input onChange={handleSearchInputChange} className="form-control" name="search" type="text" placeholder="Search" aria-label="Search" />
                  <button style={{ width: '100px' }} type="submit">
                    Search
                  </button>
                </form>

                <div>
                  <button className="nav-link form-control mb-3" style={{ textAlign: 'center' }} onClick={handleClickOpen}>
                    Create Shop
                  </button>
                </div>
                <div>
                  <button className="nav-link form-control mb-3" style={{ textAlign: 'center' }} onClick={() => handleClickOpenUpdate(1)}>
                    Create Card
                  </button>
                </div>
                <div>
                  <button className="nav-link form-control mb-3" style={{ textAlign: 'center' }} onClick={() => handleClickOpenUpdate(2)}>
                    Create 50 Cards
                  </button>
                </div>
              </div>

              <div className="custom-block bg-white">
                <h5 className="mb-4" style={{ textAlign: 'center' }}>List Shop</h5>

                <div className="table-responsive">
                  <table className="account-table table" style={{ textAlign: 'center' }}>
                    <thead>
                      <tr>
                        <th scope="col">Number</th>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Area</th>
                        <th scope="col">Status</th>
                        <th scope="col">View</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.des}</td>
                            <td>{item.area}</td>
                            <td>{item.status == true ? <Tooltip title="Public">
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
                            <td className='flex text-center justify-center items-center mx-auto'>
                              <Tooltip title="Product">
                                <Link to={{
                                  pathname: `/shopadmin/${item.id}`,

                                }}
                                  state={param.id}
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
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="custom-block bg-white">
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
                </div>
              </div>
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
      {/* <Dialog
        open={openCard}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        maxWidth="sm"
        className=""
        onClose={handleCloseCard}
        aria-describedby="alert-dialog-slide-description"
      >
        <table className="account-table table" style={{ textAlign: 'center' }}>
          <thead>
            <tr>
              <th scope="col">Number</th>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Area</th>
              <th scope="col">Status</th>
              <th scope="col">View</th>
            </tr>
          </thead>
          <tbody>
            {CardList.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.des}</td>
                  <td>{item.area}</td>
                  <td>{item.status == true ? <Tooltip title="Public">
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
                  <td className='flex text-center justify-center items-center mx-auto'>
                    <Tooltip title="Product">
                      <Link to={{
                        pathname: `/shopadmin/${item.id}`,

                      }}
                        state={param.id}
                      >
                        <IconButton >
                          <RemoveRedEyeIcon className="" />
                        </IconButton>
                      </Link>
                    </Tooltip>
                    <Tooltip title="Card">
                      <IconButton >
                        <ViewCarouselIcon className="" />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </Dialog> */}
    </div >
  );
}

export default EventAdmin;


