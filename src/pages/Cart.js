
import { useState, useEffect } from "react";
import IconButton from '@mui/material/IconButton';
import { Link, NavLink } from 'react-router-dom';
import Navbar from "../product/Navbar";
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from "react-redux";
import { cartAction } from "../services/cart/cartSlice";
import { PostSearchCardAsyncApi } from "../services/card/cardSlice";
import { id } from "date-fns/locale";
import { getShopByUsernameAsyncApi } from "../services/shop/shopSlice";
import { PostOrderAsyncApi } from "../services/product/productSlice";

function parseToVND(number) {
    let strNumber = number.toString().replace(/[.,]/g, "");
    strNumber = strNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return strNumber;
}

export default function Cart() {
    const [dataAreas, setDataAreas] = useState([]);
    const [search, setSearch] = useState('');
    const userString = localStorage.getItem("user");
    const userObject = JSON.parse(userString);
    const username = userObject.username;
    const { arrCart } = useSelector((state) => state.cart);
    const { SearchCardList } = useSelector((state) => state.card);

    useEffect(() => {
        dispatch(getShopByUsernameAsyncApi(userObject.username)).then((response) => {
            if (response.payload != undefined) {

            }
        }).catch((error) => {
        });

    }, []);
    const { shopByUsername } = useSelector((state) => state.shop)
    const handleChangeSearch = (item) => {
        setSearch(item)
        dispatch(PostSearchCardAsyncApi({ id: item })).then((response) => {
            if (response.payload != undefined) {
            }
        }).catch((error) => {
        });
    }
    const handleCheckout = () => {
        let body
        body = [
            {
                shopId: shopByUsername.id,
                cardId: search,
                total: total
            },
            arrCart.map(item => {
                return {
                    productId: item.id,
                    quantity: item.quantity,
                    price: item.price,
                    category: item.category
                };
            })
        ]
        const newDataBody = [
            body[0],
            ...body[1].flat()
          ];
        dispatch(PostOrderAsyncApi(newDataBody)).then((response) => {
            if (response.payload != undefined) {
            }
        }).catch((error) => {
        });
    }

    const dispatch = useDispatch();
    const handleDeleteCart = (item) => {
        dispatch(cartAction.delteteTocart(
            {
                quantity: item?.quantity,
                name: item?.name,
                price: item?.price,
                category: item?.category,
                id: item?.id,
                image: item?.image,
            }
        ))
    }
    const handleIncrease = (item) => {

        dispatch(cartAction.increaseQuantityTocart(
            {
                quantity: item?.quantity,
                name: item?.name,
                price: item?.price,
                category: item?.category,
                id: item?.id,
                image: item?.image,
            }
        ))

    }

    const handleDecrease = (item) => {
        if (item.quantity > 1) {
            dispatch(cartAction.decreaseQuantityTocart(
                {
                    quantity: item?.quantity,
                    name: item?.name,
                    price: item?.price,
                    category: item?.category,
                    id: item?.id,
                    image: item?.image,
                }
            ))
        }

        else {
            dispatch(cartAction.delteteTocart(
                {
                    quantity: item?.quantity,
                    name: item?.name,
                    price: item?.price,
                    category: item?.category,
                    id: item?.id,
                    image: item?.image,
                }
            ))
        }

    }
    const total = arrCart.reduce((sum, item) => {
        return sum + (item.quantity * item.price);
    }, 0);

    return (
        <div>
            <Navbar />
            <div className="container mx-auto mt-10 ">
                <div className="flex shadow-md my-10">
                    <div className="w-3/4 bg-white px-10 py-10">
                        <div className=" justify-between border-b pb-8">
                            <div className="mb-3">
                                <h1 className="font-semibold text-2xl">Value Card</h1>

                                <Paper
                                    component="form"
                                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300 }}
                                >
                                    <InputBase
                                        sx={{ ml: 1, flex: 1 }}
                                        placeholder="Search"
                                        value={search}
                                        onChange={(e) => handleChangeSearch(e.target.value)}
                                    />
                                    <IconButton className='' sx={{ p: '10px', outline: "none" }} >
                                        <SearchIcon />
                                    </IconButton>
                                </Paper>

                            </div>
                            <table
                                className="account-table table"
                                style={{ textAlign: "center" }}
                            >
                                <thead>
                                    <tr>
                                        <th scope="col">EventId</th>
                                        <th scope="col">Username</th>
                                        <th scope="col">Phone Number</th>
                                        <th scope="col">Balance</th>
                                        <th scope="col">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="col">{SearchCardList.eventId}</th>
                                        <th scope="col">{SearchCardList.username}</th>
                                        <th scope="col">{SearchCardList.phoneNumber}</th>
                                        <th scope="col">{SearchCardList.balance}</th>
                                        <th scope="col">{SearchCardList.status == true ? "true" : SearchCardList.status == false ? "false" : null}</th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="flex justify-between border-b pb-8 pt-4">
                            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
                            <h2 className="font-semibold text-2xl">{arrCart.length} Items</h2>
                        </div>

                        <div className="flex mt-10 mb-5">
                            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
                            <h3 className="font-semibold  text-gray-600 text-xs uppercase w-1/5 text-center">Quantity</h3>
                            <h3 className="font-semibold  text-gray-600 text-xs uppercase w-1/5 text-center">Price</h3>
                            <h3 className="font-semibold  text-gray-600 text-xs uppercase w-1/5 text-center">Total</h3>
                        </div>
                        {arrCart.map((item, index) => {
                            return (
                                <div key={index} className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                                    <div className="flex w-2/5">
                                        <div className="w-20">
                                            <img className="h-24" src={item.image} alt="" />
                                        </div>
                                        <div className="flex flex-col justify-between ml-4 flex-grow">
                                            <span className="font-bold text-sm">{item.name}</span>
                                            <span className="text-red-500 text-xs">{item.category}</span>
                                            <p onClick={() => handleDeleteCart(item)} className="font-semibold cursor-pointer hover:text-red-500 text-gray-500 text-xs">Remove</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-center w-1/5">
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
                                    </div>
                                    <span className="text-center w-1/5 font-semibold text-sm">{parseToVND(item.price)} Vnđ</span>
                                    <span className="text-center w-1/5 font-semibold text-sm">{parseToVND(item.price * item.quantity)} Vnđ</span>
                                </div>
                            )
                        })}




                        <Link to="/ShopOrder" className="flex font-semibold text-indigo-600 text-sm mt-10">

                            <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" /></svg>
                            Continue Shopping
                        </Link>
                    </div>

                    <div id="summary" className="w-1/4 px-8 py-10">
                        <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
                        <div className="flex justify-between mt-10 mb-5">
                            <span className="font-semibold text-sm uppercase">{arrCart.length} Items</span>
                            <span className="font-semibold text-sm">{parseToVND(total)} Vnđ</span>
                        </div>
                        <div>

                        </div>
                        <div className="py-10">

                        </div>

                        <div className="border-t mt-8">
                            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                                <span>Total cost</span>
                                <span>{parseToVND(total)} Vnđ</span>
                            </div>
                            <button onClick={handleCheckout} className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">Checkout</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    );
}