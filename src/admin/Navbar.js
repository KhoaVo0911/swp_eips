import React from "react";
import { Link } from "react-router-dom";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { NavLink } from "react-router-dom";
import WidgetsIcon from "@mui/icons-material/Widgets";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Navbar() {
  const handleOut = () => {
    localStorage.clear();
  };
  const userString = localStorage.getItem("user");
  const userObject = JSON.parse(userString);
  return (
    <div>
      <nav className="bg-[#A8DADC] border-gray-200 px-2 sm:px-4  rounded dark:bg-gray-900 shadow-md ">
        <div className="max-w-[1500px] flex flex-wrap items-center justify-between mx-auto">
          <Link to="/" className="flex items-center">
            <img
              className="w-[180] h-16"
              src="https://scontent.xx.fbcdn.net/v/t1.15752-9/361118940_244896404978263_8023005535970704477_n.png?_nc_cat=102&ccb=1-7&_nc_sid=aee45a&_nc_ohc=b7MH118u1r0AX-U6cCx&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdTc0570GlAZPKh8ZJpnBwqdB9VXAup3pJRRNIZtvXUmBA&oe=64D85491"
            />
          </Link>

          <NavLink
            style={({ isActive }) =>
              isActive ? { color: "#60a5fa" } : undefined
            }
            to="/Admin"
            className="text-black"
          >
            <div className="flex">
              <WidgetsIcon className="mr-2" />
              <h6>Event</h6>
            </div>
          </NavLink>

          <NavLink
            style={({ isActive }) =>
              isActive ? { color: "#60a5fa" } : undefined
            }
            to="/AccountAdmin"
            className="text-black"
          >
            <div className="flex">
              <PersonIcon className="mr-2" />
              <h6>Account</h6>
            </div>
          </NavLink>

          <NavLink
            style={({ isActive }) =>
              isActive ? { color: "#60a5fa" } : undefined
            }
            to="/SettingAdmin"
            className="text-black"
          >
            <div className="flex">
              <SettingsIcon className="mr-2" />
              <h6>Settings</h6>
            </div>
          </NavLink>
          <NavLink
            style={({ isActive }) =>
              isActive ? { color: "#60a5fa" } : undefined
            }
            to="/"
            className="text-black"
            onClick={handleOut}
          >
            <div className="flex">
              <LogoutIcon className="mr-2" />

              <h6>Logout</h6>
            </div>
          </NavLink>
          <div className="hidden w-full lg:block md:w-auto" id="navbar-default">
            <ul className="flex mt-4">
              <img
                src={userObject.image}
                className="-mt-[10px]  h-12 w-12 rounded-full"
              />
              <div>
                <p className="font-bold text-2xl ml-4">{userObject.name} </p>
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
