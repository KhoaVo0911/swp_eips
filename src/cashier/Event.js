import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { EventAction, PostEventAsyncApi, PutEventAsyncApi, getEventAsyncApi, getEventCashierAsyncApi } from '../services/event/eventSlice';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage"
import { storage } from '../config/FireBaseConfig';
import { useFormik } from 'formik';
import DialogTitle from '@mui/material/DialogTitle';
import * as Yup from "yup";
import Navbar from './Navbar';
import EditIcon from '@mui/icons-material/Edit';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { accountAction } from '../services/account/accountSlice';
import { CardAction } from '../services/card/cardSlice';
import { ProductAction } from '../services/product/productSlice';
import { ShopAction } from '../services/shop/shopSlice';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function convertTimestampToDate(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2); // Tháng bắt đầu từ 0 (0 - 11), nên cần cộng thêm 1 và định dạng chuỗi thành 2 chữ số
  const day = ('0' + date.getDate()).slice(-2); // Định dạng chuỗi thành 2 chữ số
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

export default function Event() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [isUpdate, setIsUpdate] = React.useState(false);
  const [idEvent, setIdEvent] = React.useState(0);
  const [img, setImg] = useState("");
  const [click, SetClick] = React.useState(false)
  const [selectedImage, setSelectedImage] = React.useState();
  const [progresspercent, setProgresspercent] = useState(0);
  const [selectedValue, setSelectedValue] = React.useState([]);
  const [selectedDateBegin, setSelectedDateBegin] = useState(null);
  const [selectedDateEnd, setSelectedDateEnd] = useState(null);
  const [err, setErr] = useState();
  const {  eventCashier } = useSelector((state) => state.event);

  const handleDateBeginChange = (event) => {
    const date = event.target.value;
    console.log("ga3", date)
    setSelectedDateBegin(date);
  };
  const handleDateEndChange = (event) => {
    const date = event.target.value;
    setSelectedDateEnd(date);
  };
  const dispatch = useDispatch();
  const { eventList } = useSelector((state) => state.event)
  useEffect(() => {
    dispatch(getEventCashierAsyncApi()).then((response) => {
      if (response.payload != undefined) {
        setFilteredData(response.payload)
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
  

  function parseTimestamp(timestamp) {
    const date = new Date(timestamp);
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(date);
    return formattedDate;
  }

  function handleSearchInputChange(event) {
    const query = event.target.value;
    setSearchQuery(query);
    filterData(query);
  }
  function filterData(query) {
    const filteredResults = eventCashier.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filteredResults);
  }
  

  return (
    <div>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <main className="bg-gray-200 ms-sm-auto py-4 px-md-4 border-start">
            <div className="row my-4">
              <div className="col-lg-6 col-6">
                <div className="title-group mb-3" style={{ textAlign: 'center' }}>
                  <h1 className="h2 mb-0">Event Admin</h1>
                  <small className="text-muted">Hello !!!</small>
                </div>
              </div>
              <div className="col-lg-6 col-6">
                <form className="custom-form input-group mb-3" action="#" method="get" role="form">
                  <input onChange={handleSearchInputChange} value={searchQuery}
                    className="form-control" name="search" type="text" placeholder="Search" aria-label="Search" />
                  <button style={{ width: 100 }} type="submit">
                    Search
                  </button>
                </form>
             
              </div>

            </div>
          </main>
          <div className="custom-block bg-white">
            <h5 className="mb-4" style={{ textAlign: 'center' }}>Event List</h5>
            <section className=" container grid grid-cols-3">
              {eventList.length > 0 && filteredData.map((item, index) => {
                return (
                  <div key={index}>
                    <Card sx={{ maxWidth: 345 }} className="my-2">
                      <CardMedia
                        sx={{ height: 300, width: 400 }}
                        image={item.img}
                        title="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h4" className='text-center' >
                          {item.name.length > 20 ? item.name.slice(0, 15) + '...' : item.name}
                        </Typography>
                        <Typography >
                          ID:{item.id}
                        </Typography>
                        <Typography >
                          Area: {item.area}
                        </Typography>
                        <Typography component="div">
                          Description: {item.description.length > 20 ? item.description.slice(0, 20) + '...' : item.description}
                        </Typography>
                        <Typography >
                          Begin Date: {parseTimestamp(item.beginDate)}
                        </Typography>
                        <Typography >
                          End Date:{parseTimestamp(item.endDate)}
                        </Typography>
                        <Typography className='flex gap-[2px]'>
                          Status: {item.status == true ? <span className='text-green-400'> true </span> : <span className='text-red-400'> false </span>}
                        </Typography>
                        <div className='flex justify-between '>
                        
                          <Link to={`/EventDetails/${item.id}`} state={item}>
                            <Button className='py-1 order-last  ' size='' variant="contained" endIcon={<ArrowForwardOutlinedIcon />}>
                              Read more
                            </Button>
                          </Link>

                        </div>
                      </CardContent>
                    </Card>

                  </div>
                )
              })}

            </section>
          </div>
        </div>
      </div>
     
    </div>

  )
}


