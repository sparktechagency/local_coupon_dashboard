import { Button, Form, Input, Modal, Table } from "antd";
import React, { useState } from "react";
import { CiEdit, CiSearch } from "react-icons/ci";
import { FaArrowLeft, FaBriefcaseMedical, FaHotel } from "react-icons/fa";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GoPlus } from "react-icons/go";
import { IoMdRestaurant } from "react-icons/io";
import { FaMartiniGlassEmpty } from "react-icons/fa6";
import { GiTravelDress } from "react-icons/gi";
import { MdSportsHandball } from "react-icons/md";
const ToolsCategory = () => {
  const [openModal, setOpenModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");

  return (
    <div className=" p-4 rounded-md">
      <div className="flex justify-between item-center ">
        <div className="flex items-center gap-2">
          <Link to={-1}>
            <FaArrowLeft size={18} className="text-[var(--secondary-color)] " />
          </Link>
          <span className="font-semibold text-[20px]">Add Category</span>
        </div>
        <button
          onClick={() => {
            setOpenModal(true);
            setCategoryName("Add New Category");
          }}
          className="flex  mt-5 bg-[var(--secondary-color)] text-white px-4 py-2 rounded-sm shadow-md"
        >
          <GoPlus /> Add Category
        </button>
      </div>

      <div className="grid grid-cols-6 gap-5 mt-10">
        <div className="bg-white mx-auto rounded-md shadow-md w-full flex flex-col justify-center items-center py-10">
          <p className="bg-[#ebd8b3] p-3 rounded-full"><IoMdRestaurant size={35} color="#CD9B3A" /></p>
          <p>Restaurant</p>
          <div className="space-x-4">
            <button className="border-[#CD9B3A] border px-3 py-2 rounded-lg bg-[#E6F0FF]">Delete</button>
            <button className="bg-[#CD9B3A] text-white px-6 py-2 rounded-lg">Edit</button>
          </div>
        </div>
        <div className="bg-white mx-auto rounded-md shadow-md w-full flex flex-col justify-center items-center py-10">
          <p className="bg-[#ebd8b3] p-3 rounded-full"><FaBriefcaseMedical size={35} color="#CD9B3A" /></p>
          <p>Medicine</p>
          <div className="space-x-4">
            <button className="border-[#CD9B3A] border px-3 py-2 rounded-lg bg-[#E6F0FF]">Delete</button>
            <button className="bg-[#CD9B3A] text-white px-6 py-2 rounded-lg">Edit</button>
          </div>
        </div>
        <div className="bg-white mx-auto rounded-md shadow-md w-full flex flex-col justify-center items-center py-10">
          <p className="bg-[#ebd8b3] p-3 rounded-full"><FaHotel size={35} color="#CD9B3A" /></p>
          <p>Hotel</p>
          <div className="space-x-4">
            <button className="border-[#CD9B3A] border px-3 py-2 rounded-lg bg-[#E6F0FF]">Delete</button>
            <button className="bg-[#CD9B3A] text-white px-6 py-2 rounded-lg">Edit</button>
          </div>
        </div>
       
        <div className="bg-white mx-auto rounded-md shadow-md w-full flex flex-col justify-center items-center py-10">
          <p className="bg-[#ebd8b3] p-3 rounded-full"><FaMartiniGlassEmpty size={35} color="#CD9B3A" /></p>
          <p>Bar</p>
          <div className="space-x-4">
            <button className="border-[#CD9B3A] border px-3 py-2 rounded-lg bg-[#E6F0FF]">Delete</button>
            <button className="bg-[#CD9B3A] text-white px-6 py-2 rounded-lg">Edit</button>
          </div>
        </div>
        <div className="bg-white mx-auto rounded-md shadow-md w-full flex flex-col justify-center items-center py-10">
          <p className="bg-[#ebd8b3] p-3 rounded-full"><GiTravelDress size={35} color="#CD9B3A" /></p>
          <p>Clothes</p>
          <div className="space-x-4">
            <button className="border-[#CD9B3A] border px-3 py-2 rounded-lg bg-[#E6F0FF]">Delete</button>
            <button className="bg-[#CD9B3A] text-white px-6 py-2 rounded-lg">Edit</button>
          </div>
        </div>
       
        <div className="bg-white mx-auto rounded-md shadow-md w-full flex flex-col justify-center items-center py-10">
          <p className="
          bg-[#ebd8b3] p-3 rounded-full"><MdSportsHandball size={35} color="#CD9B3A" /></p>
          <p>Sport</p>
          <div className="space-x-4">
            <button className="border-[#CD9B3A] border px-3 py-2 rounded-lg bg-[#E6F0FF]">Delete</button>
            <button className="bg-[#CD9B3A] text-white px-6 py-2 rounded-lg">Edit</button>
          </div>
        </div>
        <div className="bg-white mx-auto rounded-md shadow-md w-full flex flex-col justify-center items-center py-10">
          <p className="bg-[#ebd8b3] p-3 rounded-full"><IoMdRestaurant size={35} color="#CD9B3A" /></p>
          <p>Restaurant</p>
          <div className="space-x-4">
            <button className="border-[#CD9B3A] border px-3 py-2 rounded-lg bg-[#E6F0FF]">Delete</button>
            <button className="bg-[#CD9B3A] text-white px-6 py-2 rounded-lg">Edit</button>
          </div>
        </div>
        <div className="bg-white mx-auto rounded-md shadow-md w-full flex flex-col justify-center items-center py-10">
          <p className="bg-[#ebd8b3] p-3 rounded-full"><FaBriefcaseMedical size={35} color="#CD9B3A" /></p>
          <p>Medicine</p>
          <div className="space-x-4">
            <button className="border-[#CD9B3A] border px-3 py-2 rounded-lg bg-[#E6F0FF]">Delete</button>
            <button className="bg-[#CD9B3A] text-white px-6 py-2 rounded-lg">Edit</button>
          </div>
        </div>
        <div className="bg-white mx-auto rounded-md shadow-md w-full flex flex-col justify-center items-center py-10">
          <p className="bg-[#ebd8b3] p-3 rounded-full"><FaHotel size={35} color="#CD9B3A" /></p>
          <p>Hotel</p>
          <div className="space-x-4">
            <button className="border-[#CD9B3A] border px-3 py-2 rounded-lg bg-[#E6F0FF]">Delete</button>
            <button className="bg-[#CD9B3A] text-white px-6 py-2 rounded-lg">Edit</button>
          </div>
        </div>
       
        <div className="bg-white mx-auto rounded-md shadow-md w-full flex flex-col justify-center items-center py-10">
          <p className="bg-[#ebd8b3] p-3 rounded-full"><FaMartiniGlassEmpty size={35} color="#CD9B3A" /></p>
          <p>Bar</p>
          <div className="space-x-4">
            <button className="border-[#CD9B3A] border px-3 py-2 rounded-lg bg-[#E6F0FF]">Delete</button>
            <button className="bg-[#CD9B3A] text-white px-6 py-2 rounded-lg">Edit</button>
          </div>
        </div>
        <div className="bg-white mx-auto rounded-md shadow-md w-full flex flex-col justify-center items-center py-10">
          <p className="bg-[#ebd8b3] p-3 rounded-full"><GiTravelDress size={35} color="#CD9B3A" /></p>
          <p>Clothes</p>
          <div className="space-x-4">
            <button className="border-[#CD9B3A] border px-3 py-2 rounded-lg bg-[#E6F0FF]">Delete</button>
            <button className="bg-[#CD9B3A] text-white px-6 py-2 rounded-lg">Edit</button>
          </div>
        </div>
       
        <div className="bg-white mx-auto rounded-md shadow-md w-full flex flex-col justify-center items-center py-10">
          <p className="bg-[#ebd8b3] p-3 rounded-full"><MdSportsHandball size={35} color="#CD9B3A" /></p>
          <p>Sport</p>
          <div className="space-x-4">
            <button className="border-[#CD9B3A] border px-3 py-2 rounded-lg bg-[#E6F0FF]">Delete</button>
            <button className="bg-[#CD9B3A] text-white px-6 py-2 rounded-lg">Edit</button>
          </div>
        </div>
       
     
      </div>

      <Modal
        open={openModal}
        onCancel={() => setOpenModal()}
        footer={false}
        centered
      >
        <p className="text-center text-[18px]">{categoryName}</p>
        <Form layout="vertical">
          <Form.Item name={"categoryName"} label="Category Name">
            <Input />
          </Form.Item>
          <Form.Item name={"categoryName"} label="Upload Category Icon">
            <Input />
          </Form.Item>
          <div className="flex items-center gap-3">
            <button className="border border-[var(--secondary-color)] text-[var(--secondary-color)] w-full py-2 rounded-sm">
              Cancel
            </button>
            <button className="bg-[var(--secondary-color)] text-white w-full py-2 rounded-sm">
              Add
            </button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default ToolsCategory;
