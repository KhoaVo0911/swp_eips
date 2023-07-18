import React, { useEffect, useState } from 'react';
import '../css/styles.admin.css';
import { Link, useLocation, useParams } from 'react-router-dom';
import { PostShopAsyncApi, ShopAction, getShopAsyncApi } from '../services/shop/shopSlice';
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
import { CardAction, PostCard50AsyncApi, PostCardAsyncApi } from '../services/card/cardSlice';
import { PostRevenueAsyncApi, ProductAction, getProductAsyncApi } from '../services/product/productSlice';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { GetAccountNotRelationAsyncApi, PostAccountAsyncApi, PostAccountForSaleAsyncApi, PostShopAccountSetAsyncApi, accountAction } from '../services/account/accountSlice';
import {
  InputLabel,
  MenuItem,
  Select,
  FormControl
} from "@mui/material";
import dayjs from 'dayjs';
import Navbar from './Navbar';
import { EventAction } from '../services/event/eventSlice';
import Typography from '@mui/material/Typography';

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function parseToVND(number) {
  let strNumber = number.toString().replace(/[.,]/g, "");
  strNumber = strNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return strNumber;
}


function ShopAdmin() {
  const param = useParams();
  console.log("haha", param)
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [openSet, setOpenSet] = React.useState(false);

  const [selectedDateStart, setSelectedDateStart] = useState(null);
  const [selectedDateEnd, setSelectedDateEnd] = useState(null);
  const [accountSet, setAccountSet] = useState('');
  console.log("accountset", accountSet)
  const location = useLocation();
  const additionalData = location.state;
  console.log('location', additionalData);
  const handleDateStartChange = (date) => {
    const day = dayjs(date).format('YYYY-MM-DD');
    setSelectedDateStart(day);
  };
  const handleDateEndChange = (date) => {
    const day = dayjs(date).format('YYYY-MM-DD');
    setSelectedDateEnd(day);
  };

  const dispatch = useDispatch();
  const { ProductList, Revenue } = useSelector((state) => state.product)
  const { AccountNotRelation } = useSelector((state) => state.acc)
  useEffect(() => {
    dispatch(GetAccountNotRelationAsyncApi())
    dispatch(getProductAsyncApi(param.id)).then((response) => {
      if (response.payload != undefined) {
        setFilteredData(response.payload)
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
  useEffect(() => {
    let body = { shopId: param.id, beginDate: selectedDateStart, endDate: selectedDateEnd }
    dispatch(PostRevenueAsyncApi(body))
    console.log("ngu123", selectedDateEnd, selectedDateStart)
  }, [selectedDateEnd, selectedDateStart]);

  console.log("haha1", ProductList)
  const handleSetAccountShop = () => {
    dispatch(PostShopAccountSetAsyncApi({ username: accountSet, shopId: param.id }))
  };
  function handleSearchInputChange(event) {
    const query = event.target.value;
    setSearchQuery(query);
    filterData(query);
  }
  function filterData(query) {
    const filteredResults = ProductList.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filteredResults);
  }
  const hanleClickCard = () => {
    setOpenSet(!openSet)
  };


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    formik.setValues(
      {
        username: "",
        password: "",
        name: "",
      }
    );
    formik.setTouched({});
    formik.setErrors({});
  };



  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      name: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().min(2, "Too Short!").max(4000, "Too Long!").required(),
      password: Yup.string().min(5, "Too Short!").max(4000, "Too Long!").required(),
      name: Yup.string().min(5, "Too Short!").max(4000, "Too Long!").required(),
    }), onSubmit: values => {
      let DataBody

      DataBody = {
        username: values.username,
        password: values.password,
        name: values.name,
        role: "sale",
        shopId: param.id
      }
      dispatch(PostAccountForSaleAsyncApi(DataBody)).then((response) => {
        setOpen(false);
        formik.setValues(
          {
            username: "",
            password: "",
            name: "",
          }
        );
        formik.setTouched({});
        formik.setErrors({});
        if (response.payload != undefined) {
          dispatch(getProductAsyncApi(param.id)).then((response) => {
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
              <div className="col-lg-6 col-6 bg-white mb-4 p-2">
                <div className="title-group mb-3" style={{ textAlign: 'center' }}>
                  <h3 className="h4 mb-0">{additionalData.eventName} - {additionalData.shopDetail.name}</h3>
                  <div className='grid grid-cols-2'>
                    <div>
                      <img src={additionalData.shopDetail.image} className='h-32 w-32 mx-auto  mt-[18px]' />
                    </div>
                    <div className='text-left'>
                      <Typography variant="h6">
                        <strong>Id:</strong>    {additionalData.shopDetail.id}
                      </Typography>
                      <Typography variant="h6">
                        <strong>Event Id:</strong>    {additionalData.shopDetail.eventId}
                      </Typography>
                      <Typography variant="h6">
                        <strong>Area:</strong> {additionalData.shopDetail.area}
                      </Typography>
                      <Typography variant="h6">
                        <strong>Description:</strong>{additionalData.shopDetail.des}
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-6" style={{ paddingRight: '300px' }}>
                {/* <form className="custom-form input-group mb-3" action="#" method="get" role="form">
                  <input onChange={handleSearchInputChange} className="form-control" name="search" type="text" placeholder="Search" aria-label="Search" />
                  <button style={{ width: '100px' }} type="submit">
                    Search
                  </button>
                </form> */}
                <div>
                  <button className="nav-link form-control mb-3" style={{ textAlign: 'center' }} onClick={handleClickOpen}>
                    Create Account
                  </button>
                </div>
                <div>
                  <button className="nav-link form-control mb-3" style={{ textAlign: 'center' }} onClick={hanleClickCard}>
                    Set Account Shop
                  </button>
                  {
                    openSet == true ? <>   <FormControl className="w-full bg-white mb-3">
                      <InputLabel size="small">Account</InputLabel>
                      <Select
                        size="small"
                        value={accountSet}
                        onChange={(e) => setAccountSet(e.target.value)}
                        label="Account"
                      >
                        {AccountNotRelation && AccountNotRelation.map((item, index) => {
                          return (
                            <MenuItem key={index} value={item.username}>{item.username}</MenuItem>
                          )
                        })}
                      </Select>
                    </FormControl>
                      <Button onClick={handleSetAccountShop} variant='contained' className='mb-3'>
                        submit
                      </Button></> : null
                  }

                </div>
              </div>

              <div className="custom-block bg-white">
                <div className='flex gap-5'>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Start Date"
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
                  <div>
                    <p className='text-2xl font-bold mt-[10px]'>Total Revenue: {parseToVND(Revenue) + " VNĐ"}</p>
                  </div>
                </div>

                <h5 className="mb-4" style={{ textAlign: 'center' }}>Product</h5>

                <div className="table-responsive">
                  <table className="account-table table" style={{ textAlign: 'center' }}>
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Image</th>
                        <th scope="col">Description</th>
                        <th scope="col">Price</th>
                        <th scope="col">Category</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData && filteredData.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                              <img className='w-32 h-32' src={item.img} alt="Product Image" />
                            </td>
                            <td>{item.description}</td>
                            <td>{parseToVND(item.price) + " VNĐ"}</td>
                            <td >
                              {item.category}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-2">
              <Link className="nav-link form-control mb-3" style={{ textAlign: 'center' }} to={`/EventAdmin/${additionalData}`}>
                Previous
              </Link>
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
          <DialogTitle id="" >
            Create Shop
          </DialogTitle>
          <DialogContent dividers >
            <div className='max-w-5xl my-2 mx-auto'>
              <TextField id="outlined-basic" error={formik.touched.username && formik.errors.username ? true : undefined} value={formik.values.username}
                className='w-full' name="username" onChange={formik.handleChange} onBlur={formik.handleBlur} label="Username" variant="outlined" />
              {formik.errors.username && formik.touched.username && <div className='text mt-1 text-red-600 font-semibold'>{formik.errors.username}</div>}
            </div>
            <div className='max-w-5xl my-2 mx-auto'>
              <TextField type='password' id="outlined-basic" error={formik.touched.password && formik.errors.password ? true : undefined} value={formik.values.password}
                className='w-full' name="password" onChange={formik.handleChange} onBlur={formik.handleBlur} label="Password" variant="outlined" />
              {formik.errors.password && formik.touched.password && <div className='text mt-1 text-red-600 font-semibold'>{formik.errors.password}</div>}
            </div>
            <div className='max-w-5xl my-2 mx-auto'>
              {/* {error && <div className='text mt-1 text-center text-xl text-red-600 my-3 font-semibold'>{error}</div>} */}
              <TextField id="outlined-basic" error={formik.touched.name && formik.errors.name ? true : undefined}
                className='w-full' value={formik.values.name} name="name" onChange={formik.handleChange} onBlur={formik.handleBlur} label="Name" variant="outlined" />
              {formik.errors.name && formik.touched.name && <div className='text mt-1 text-red-600 font-semibold'>{formik.errors.name}</div>}
            </div>
            <div className='max-w-5xl my-2 mx-auto'>
              <TextField id="outlined-basic"
                className='w-full' disabled value="sale" label="role" variant="outlined"
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button type='submit' >
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default ShopAdmin;


