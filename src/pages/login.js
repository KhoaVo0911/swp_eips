import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { LoginOwner, loginAsyncApi, loginSuccess } from "../services/login/loginSlice";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../api/LoginApi";
import { useAppSelector } from "../Hook/useAppSelector";
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';



function Login() {
  let navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = () => {
    navigate("/product");
  };
  const userString = localStorage.getItem("user");
  const userObject = JSON.parse(userString);
  useEffect(() => {


    if (userObject && userObject.role == "admin") {
      navigate("/admin")
    }
    if (userObject && userObject.role == "sale") {
      navigate("/product")
    }
    if (userObject && userObject.role == "cashier") {
      navigate("/SettingCashier")
    }

  }, []);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.login)
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values, formikHelpers) => {
      console.log("1", values, user);
      dispatch(loginAsyncApi(values)).then((response) => {
        if (response.meta.requestStatus == "rejected") {
          setError(true)
        }
        if (response.payload != undefined) {
          setError(false)
          localStorage.setItem('user', JSON.stringify(response.payload));
          // Redirect to the dashboard page after login

          const role = (response.payload.role);

          let url = '/';
          switch (role) {
            case 'sale':
              url = '/product';
              break;
            case 'admin':
              url = '/Admin';
              break;
            case 'cashier':
              url = '/SettingCashier';
              break;
            default:
              url = '/';
              break;
          }
          navigate(url);
        }
      }).catch((error) => {

      });
      //formikHelpers.resetForm();
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Please Enter your Username"),
      password: Yup.string().required("Please Enter your Password"),
    }),
  });

  return (
    <div className="min-h-screen flex">
      {/* Background image */}
      <div className="w-1/2 bg-cover bg-center relative" style={{ backgroundImage: `url('https://i.chungta.vn/2020/02/17/1-1581877487_1200x0.jpg')` }}>
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <img
            className="text-center justify-center items-center mx-auto"
            src="Image/Screenshot_2023-05-24_082524-removebg-preview.png"
            alt="EVENT IMMEDIATE PAYMENT CARD"
          />
          <h3 className="text-white text-4xl text-center font-bold mt-6 mx-12">  EVENT IMMEDIATE PAYMENT CARD</h3>
        </div>
      </div>
      {/* Login form */}
      <div className="w-1/2 flex items-center justify-center">
        <form className=' z-10 px-10 py-5 h-[540px] w-[400px] bg-white rounded-lg' onSubmit={formik.handleSubmit}>
          <div className='text-center'>
            <h3 className='text-3xl font-bold'>ĐĂNG NHẬP</h3>
          </div>
          {error && <div className='text mt-1 text-red-600 font-semibold'>Username or Password valid</div>}
          <div className='my-5'>
            {/* {error && <div className='text mt-1 text-center text-xl text-red-600 my-3 font-semibold'>{error}</div>} */}
            <TextField id="outlined-basic" error={formik.touched.username && formik.errors.username ? true : undefined}
              className='w-full' name="username" onChange={formik.handleChange} onBlur={formik.handleBlur} label="username" variant="outlined" />
            {formik.errors.username && formik.touched.username && <div className='text mt-1 text-red-600 font-semibold'>{formik.errors.username}</div>}
          </div>
          <div className='mt-5 mb-1'>
            <FormControl error={formik.touched.password && formik.errors.password ? true : undefined} className="w-full" variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                className='w-full'
                name="password"
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                onChange={formik.handleChange} onBlur={formik.handleBlur} label="Password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            {formik.errors.password && formik.touched.password && <div className='text mt-1 text-red-600 font-semibold'>{formik.errors.password}</div>}
          </div>
          <div className='text-center pt-2 mt-2'>
            <button className='px-10 py-3 bg-blue-600 w-full rounded-xl text-white' type='submit'>Đăng nhập</button>
          </div>
          {/* <Link to='/forgetpassword' className='text-sm text-gray-400 mt-3 block text-center'>Quên mật khẩu?</Link> */}
        </form>
      </div>
    </div>
  );
}

export default Login;
