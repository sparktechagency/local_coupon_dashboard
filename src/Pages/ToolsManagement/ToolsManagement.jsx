import React, { useState } from "react";
import { Table, Button, Input, Modal, Form, Select, Upload, Avatar } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import "antd/dist/reset.css";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { AddVideoModal } from "../../Components/AddVideoModal/AddVideoModal";
import { MdBlockFlipped } from "react-icons/md";

const ToolsManagement = () => {
  const data = [
    {
      key: "1",
      sl: "#526525",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      name: "Jenny Wilson",
      company: "KFC",
      address: "3605 Parker Rd.",
      email: "weaver@example.com",
      contact: "(671) 555-0110",
      location: "Beijing, China",
    },
    {
      key: "2",
      sl: "#696589",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      name: "Wade Warren",
      company: "KFC",
      address: "3890 Poplar Dr.",
      email: "ennings@example.com",
      contact: "(205) 555-0100",
      location: "Barisal, Bangladesh",
    },
    {
      key: "3",
      sl: "#526587",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
      name: "Foysal Rahman",
      company: "KFC",
      address: "7529 E. Pecan St.",
      email: "cruz@example.com",
      contact: "(907) 555-0101",
      location: "Yangon, Myanmar",
    },
  ];

  const columns = [
    {
      title: "#Sl",
      dataIndex: "sl",
      key: "sl",
    },
    {
      title: "User Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div className="flex items-center space-x-2">
          <img className="h-12 w-12 rounded-md" src={record.avatar} />

          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Company name",
      dataIndex: "company",
      key: "company",
    },
    {
      title: "Company Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Contact Number",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Button
          type="primary"
          className="p-4"
          danger
          icon={<MdBlockFlipped size={25} />}
        />
      ),
    },
  ];
  return (
    <div className="bg-white shadow-md p-4 rounded-md">
      <div className="flex justify-between item-center ">
        <div className="flex items-center gap-2 mb-5">
          <Link to={-1}>
            <FaArrowLeft size={18} className="text-[var(--secondary-color)] " />
          </Link>
          <span className="font-semibold text-[20px]">Business Owner List</span>
        </div>
        <div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search here..."
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 "
            />
            <span className="absolute left-3 top-2.5 text-gray-400">
              <CiSearch />
            </span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            total: 1239,
            showTotal: (total, range) =>
              `Showing ${range[0]}-${range[1]} out of ${total}`,
            showSizeChanger: false,
            defaultCurrent: 1,
            pageSize: 11,
          }}
        />
      </div>
    </div>
  );
};

export default ToolsManagement;
