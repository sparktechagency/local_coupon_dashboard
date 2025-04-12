import { Form, Input, Modal } from "antd";
import React, { useState } from "react";
import { FaArrowLeft, FaBriefcaseMedical, FaHotel } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import { IoMdRestaurant } from "react-icons/io";
import { FaMartiniGlassEmpty } from "react-icons/fa6";
import { GiTravelDress } from "react-icons/gi";
import { MdSportsHandball } from "react-icons/md";
import { useGetAllCategoryQuery } from "../../redux/api/categoryApi";
const ToolsCategory = () => {
  const { data: getAllCategory } = useGetAllCategoryQuery();
  const [openModal, setOpenModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");

  console.log(getAllCategory?.data);

  return (
    <div className=" p-4 rounded-md">
      <div className="md:flex justify-between item-center ">
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

      <div className="grid grid-cols-1 md:grid-cols-6 gap-5 mt-10">
        {getAllCategory?.data?.map((category, i) => {
          return (
            <div key={i+1} className="bg-white mx-auto rounded-md shadow-md w-full flex flex-col justify-center items-center py-10">
              <p className="bg-[#ebd8b3] p-2 rounded-full">
                <img src={category?.icon_url}  className="h-14" alt="" />
              </p>
              <p>{category?.name}</p>
              <div className="space-x-4">
                <button className="border-[#CD9B3A] border px-3 py-2 rounded-lg bg-[#E6F0FF]">
                  Delete
                </button>
                <button className="bg-[#CD9B3A] text-white px-6 py-2 rounded-lg">
                  Edit
                </button>
              </div>
            </div>
          );
        })}
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
