import React, { Component } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";

export default function SimpleSlider() {
    const { eventListImg } = useSelector((state) => state.event)
    const settings = {
        dots: true, // Hiển thị chấm chỉ mục
        infinite: true, // Vòng lặp vô hạn
        slidesToShow: 3, // Số lượng slide hiển thị cùng lúc
        slidesToScroll: 1, // Số lượng slide được scroll mỗi lần
    };
    console.log("eventListImg", eventListImg)
    return (
        <div className="max-w-full ">
            <Slider  {...settings} className="">
                {eventListImg && eventListImg.map((item, index) => {
                    return (
                        <div key={index} className="relative pt-16  flex content-center items-center justify-centers ">
                            <div className=" bg-cover bg-center absolute top-0 w-full h-full" />
                            <div className="container max-w-8xl relative mx-auto">
                                <img src={item.img} />
                            </div>
                        </div>
                    )
                })}
            </Slider>
        </div>
    );
}