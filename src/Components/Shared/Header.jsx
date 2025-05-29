import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "antd";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useTranslation } from "react-i18next";
import {
  useGetNotificationCountQuery,
  useGetProfileQuery,
} from "../../redux/api/authApi";
import { useAppContext } from "../../context/AppContext";
const Header = () => {
  const {currency , setCurrency} = useAppContext()


  const navigate = useNavigate();
  const { data: getAdminProfile } = useGetProfileQuery();
  const { data: count } = useGetNotificationCountQuery();

  const { i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang); 
  };


  return (
    <div className="w-full py-4 bg-[var(--primary-color)] flex justify-end items-center  gap-4">

      <select 
      onChange={(e)=> setCurrency(e.target.value)}
      className="bg-white border px-2 py-1 rounded">
        <option value={"us"}>Dollar</option>
        <option value={"peso"}>Mexican Peso</option>
      </select>

      <select
        onChange={(e) => changeLanguage(e.target.value)}
        value={i18n.language}
        className="bg-white border px-2 py-1 rounded"
      >
        <option value="en">English</option>
        <option value="fr">Français</option>
        <option value="es">Español</option>
      </select>



      {getAdminProfile?.data?.role === "admin" && (
        <div className="relative">
          <Link
            to="/notification"
            style={{ boxShadow: "0px 0px 10px 2px rgba(0,0,0,0.24)" }}
            className=" bg-[#F2F2F2] h-10 flex  items-center w-10 rounded-full p-2"
          >
            <Badge>
              <IoIosNotificationsOutline
                className="text-[var(--secondary-color)]"
                size={25}
              />
            </Badge>
          </Link>
          <p className="absolute top-0 -right-3 bg-[#cd9b3a] p-1 rounded-full h-6 w-6 text-center">
            {count?.data?.count}
          </p>
        </div>
      )}

      <div
        onClick={() => navigate("/profile")}
        className="flex justify-end items-center gap-1 border-[var(--secondary-color)]  px-4 rounded-md cursor-pointer"
      >
        <img
          className="h-10 w-10 rounded-full object-cover"
          src={getAdminProfile?.data?.picture}
          alt=""
        />
        <p className="font-medium text-white mt-5">
          {getAdminProfile?.data?.name}
        </p>
      </div>
    </div>
  );
};

export default Header;
