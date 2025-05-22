import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "antd";
import { IoIosNotificationsOutline } from "react-icons/io";
import img from "../../assets/images/profile.png";
import {
  useGetNotificationCountQuery,
  useGetProfileQuery,
} from "../../redux/api/authApi";
const Header = () => {
  const navigate = useNavigate();
  const { data: getAdminProfile } = useGetProfileQuery();
  const { data: count } = useGetNotificationCountQuery();

  console.log(getAdminProfile?.data?.role);

  return (
    <div className="w-full py-4 bg-[var(--primary-color)] flex justify-end items-center  gap-4">
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
