import React, { useEffect, useRef, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import {  LiaUserCogSolid } from "react-icons/lia";
import { MdOutlineCategory, MdOutlineDashboard } from "react-icons/md";
import { NavLink, useLocation } from "react-router-dom";
import img from "../../assets/images/logo.png";
import { PiToolboxDuotone } from "react-icons/pi";
import { GoDatabase } from "react-icons/go";
import { CiDollar } from "react-icons/ci";
import { TbFilePercent } from "react-icons/tb";
const Sidebar = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const contentRefs = useRef([]);
  const { pathname } = useLocation();

  const links = [
    {
      path: "/",
      label: "Dashboard",
      icon: <MdOutlineDashboard size={25} />,
      sub_menu: false,
    },
    {
      path: "/business-owners",
      label: "Business Owner",
      icon: <PiToolboxDuotone size={25} />,
      sub_menu: false,
    },
    {
      path: "/user-management",
      label: "User Management",
      icon: <FaRegUserCircle size={25} />,
      sub_menu: false,
    },
    {
      path: "/subscriptions",
      label: "Subscriptions",
      icon: <TbFilePercent size={25} />,
      sub_menu: false,
    },
   
    {
      path: "/premium-use",
      label: "Premium User",
      icon: <CiDollar size={25} />,
      sub_menu: false,
    },
    
    
    {
      path: "/tools-category",
      label: "Category Management",
      icon: <MdOutlineCategory size={25} />,
      sub_menu: false,
    },
    
    
    {
      path: "#",
      label: "Setting",
      icon: <IoSettingsOutline size={25} />,
      sub_menu: [
        {
          path: "/profile",
          label: "Profile",
          icon: <></>,
        },
        {
          path: "/faq",
          label: "FAQ",
          icon: <></>,
        },
        {
          path: "/terms-condition",
          label: "Terms & Condition",
          icon: <></>,
        },
        {
          path: "/privacy-policy",
          label: "Privacy Policy",
          icon: <></>,
        },
      ],
    },
  ];

  const toggleAccordion = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    if (openIndex !== null && contentRefs.current[openIndex]) {
      contentRefs.current[
        openIndex
      ].style.maxHeight = `${contentRefs.current[openIndex].scrollHeight}px`;
    }
    contentRefs.current.forEach((ref, index) => {
      if (ref && index !== openIndex) {
        ref.style.maxHeight = "0px";
      }
    });
  }, [openIndex]);

  return (
    <div id="sidebar" className="flex flex-col gap-5  mt-[20px]">
      <div className="flex  items-center my-auto justify-center">
        <img src={img} className="w-[50px]" alt="" />

      </div>
      {links?.map((item, index) => {
        const isActive = item.path === pathname;
        const isSubMenuActive =
          item.sub_menu &&
          item.sub_menu.some((subItem) => subItem.path === pathname);
        if (item?.sub_menu) {
          return (
            <div key={index}>
              <div
                onClick={() => toggleAccordion(index)}
                className={`cursor-pointer flex justify-start pl-8  mr-3 gap-2 items-center  ${
                  isSubMenuActive ? "bg-white text-black " : "text-white bg-[#CD9B3A]"
                } py-[12px] hover:bg-[#CD9B3A] hover:text-white   rounded-tr-md    text-[16px] mb-[1px]`}
              >
                {item?.icon}
                {item?.label}
                <IoIosArrowForward />
              </div>

              <div
                ref={(el) => (contentRefs.current[index] = el)}
                className="accordion-content mr-3 overflow-hidden transition-max-height duration-300 ease-in-out cursor-pointer  "
                style={{
                  maxHeight:
                    openIndex === index
                      ? `${contentRefs.current[index]?.scrollHeight}px`
                      : "0px",
                }}
              >
                {item?.sub_menu?.map((sub_item, subIndex) => {
                  const isSubItemActive = sub_item.path === pathname;
                  return (
                    <NavLink
                      to={sub_item?.path}
                      key={subIndex}
                      className={`flex justify-center items-center  ${
                        isSubItemActive
                          ? "bg-[#CD9B3A]  "
                          : "text-[#CD9B3A] bg-white "
                      }  px-2  w-full py-5 mb-[1px] cursor-pointer `}
                    >
                      {sub_item?.icon}
                      {sub_item?.label}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          );
        } else {
          return (
            <div key={index}>
              {/* {
                isActive ?  <div className='absolute left-0   bg-[#2A2A2A]  h-[48px] w-[6px]  ' style={{
                  borderRadius: "0 8px 8px 0",
                }}>
                </div> : ""
              } */}

              <NavLink
                className={`cursor-pointer flex justify-start  pl-8 mr-3 gap-2 items-center  ${
                  isActive ? "bg-[#CD9B3A] text-white " : "bg-white text-[#CD9B3A] "
                }  py-[12px] hover:bg-[#CD9B3A] hover:text-white  rounded-tr-md rounded-br-md font-medium text-[16px]`}
                to={item?.path}
              >
                {item?.icon}
                {item?.label}
              </NavLink>
            </div>
          );
        }
      })}
    </div>
  );
};

export default Sidebar;
