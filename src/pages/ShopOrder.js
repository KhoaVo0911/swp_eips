import { useEffect, useState } from "react";
import Navbar from "../product/Navbar"
import { ShopAction, getShopByUsernameAsyncApi } from "../services/shop/shopSlice";
import { useDispatch, useSelector } from "react-redux";
import { cartAction } from "../services/cart/cartSlice";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { GetListProductOfSaleAsyncApi, ProductAction } from "../services/product/productSlice";
import SimpleSlider from "./SimpleSlider";
import { EventAction, getEventImgListAsyncApi } from "../services/event/eventSlice";
import { accountAction } from "../services/account/accountSlice";
import { CardAction } from "../services/card/cardSlice";

function parseToVND(number) {
  let strNumber = number.toString().replace(/[.,]/g, "");
  strNumber = strNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return strNumber;
}

export default function ShopOrder() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const userString = localStorage.getItem("user");
  const userObject = JSON.parse(userString);
  const dispatch = useDispatch();
  const { ProductOfSale } = useSelector((state) => state.product)
  const { arrCart } = useSelector((state) => state.cart)
  const handleClickAddToCart = (index) => {   
    dispatch(cartAction.addTocart(
      {
        quantity: parseInt(filteredData[index].quantity),
        name: filteredData[index].name,
        price: filteredData[index].price,
        category: filteredData[index].category,
        id: filteredData[index].id,
        image: filteredData[index].img,
      }
    ))
     
  };

  console.log("cart", arrCart)

  useEffect(() => {
    dispatch(getShopByUsernameAsyncApi(userObject.username)).then((response) => {
      if (response.payload != undefined) {
        dispatch(GetListProductOfSaleAsyncApi(response.payload.id)).then((response) => {
          if (response.payload != undefined) {
            const updatedArr = response.payload.map(item => {
              return {
                ...item,  // Giữ nguyên các thuộc tính hiện có
                quantity: 0  // Thêm thuộc tính mới
              };
            });
            setFilteredData(updatedArr)
          }
        }).catch((error) => {
        });
        dispatch(getEventImgListAsyncApi(response.payload.eventId)).then((response) => {
          if (response.payload != undefined) {
          }
        }).catch((error) => {
          // Handle failure case
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


  const handleChange = (e, data, index) => {
    const newArrayList = [...filteredData];
    newArrayList[index].quantity = e.target.value;
    setFilteredData(newArrayList);
  };
  console.log("adx", filteredData)
  return (
    <div className="bg-white">
      <Navbar />
      <SimpleSlider />
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h3 className=" font-bold  mb-0">PRODUCT</h3>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 ">
          {filteredData && filteredData.map((product, index) => (
            <div key={index} className="  border-2 p-2 ">
              <div className=" w-full overflow-hidden rounded-md bg-gray-200  group-hover:opacity-75 lg:h-80">
                <img
                  src={product.img}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <span aria-hidden="true" className=" inset-0" />
                    {product.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{parseToVND(product.price) + " Vnđ"}</p>
              </div>
              <div className="mt-2 flex relative z-10 justify-between">
                <div onClick={() => handleClickAddToCart(index)} className="cursor-pointer">
                  <ShoppingCartOutlinedIcon className="mt-[6px]" />
                </div>
                <div>
                  <input type="number" value={filteredData[index].quantity} onChange={(e) => handleChange(e, product, index)} className="cursor-pointer form-control" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}