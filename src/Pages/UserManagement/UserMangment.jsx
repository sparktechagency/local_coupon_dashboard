import { Table } from "antd";
import React from "react";
import { CiSearch } from "react-icons/ci";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import img1 from "../../assets/images/user1.png";
import img2 from "../../assets/images/user2.png";
import { MdBlock } from "react-icons/md";
const UserManagement = () => {
  const columns = [
    {
      title: "SL No",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Full Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => {
        return (
          <div className="flex items-center gap-2">
            <img
              src={record?.img}
              className="w-[40px] h-[40px] rounded-[8px]"
              alt=""
            />
            <p className="font-medium">{record?.name}</p>
          </div>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: () => (
        <button className="bg-red-500 text-white p-2 rounded">
          <MdBlock size={20} />
        </button>
      ),
    },
  ];

  const dataSource = [
    {
      key: "#12333",
      name: "Kathryn Murphy",
      img: img1,
      email: "bockely@att.com",
      phone  :   "address",
      gender : 'Male',
      address : 'West Greenwich, R17'
     
    },
    {
      key: "#12333",
      name: "Kathryn Murphy",
      img: img2,
      email: "bockely@att.com",
      phone  :   "address",
      gender : 'Male',
      address : 'West Greenwich, R17'
     
    },
    {
      key: "#12333",
      name: "Kathryn Murphy",
      img: img2,
      email: "bockely@att.com",
      phone  :   "address",
      gender : 'Male',
      address : 'West Greenwich, R17'
    },
  
    
  ];

  return (
    <div className="p-5 bg-white rounded-md">
      <div className="flex justify-between item-center ">
        <div className="flex items-center gap-2">
          <Link to={-1}>
            <FaArrowLeft size={18} className="text-[var(--primary-color)] " />
          </Link>
          <span className="font-semibold text-[20px]">User</span>
        </div>
        <div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search here..."
              className="w-full pl-10 pr-4 py-1 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 "
            />
            <span className="absolute left-3 top-2.5 text-gray-400">
              <CiSearch />
            </span>
          </div>
        </div>
      </div>

      {/* User Management table */}
      <div className="mt-5">
        <Table
          dataSource={dataSource}
          columns={columns}
          className="custom-pagination"
          pagination={{
            pageSize: 5,
            showTotal: (total, range) =>
              `Showing ${range[0]}-${range[1]} out of ${total}`,
            locale: {
              items_per_page: "",
              prev_page: "Previous",
              next_page: "Next",
            },
          }}
        />
      </div>
    </div>
  );
};

export default UserManagement;
