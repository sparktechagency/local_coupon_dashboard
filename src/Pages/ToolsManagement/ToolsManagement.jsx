import React, { useState } from "react";
import { Table, Button, Pagination, Popconfirm } from "antd";
import "antd/dist/reset.css";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { CiEdit, CiSearch } from "react-icons/ci";
import { MdBlockFlipped } from "react-icons/md";
import {
  useBlockUnblockUserMutation,
  useDeleteUserMutation,
  useGetBusinessOwnerQuery,
} from "../../redux/api/usersApi";
import { placeImage } from "../../redux/api/baseApi";
import { toast } from "sonner";
import { RiDeleteBinLine } from "react-icons/ri";
import AddBusinessOwnerModal from "../../Components/AddBusinessOwnerModal/AddBusinessOwnerModal";

const ToolsManagement = () => {
  const [addModalOpen , setAddModal] = useState(false)
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [blockUnBlockUser] = useBlockUnblockUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const { data: getBusinessOwner } = useGetBusinessOwnerQuery({
    page,
    query,
    type: "business",
  });

  // console.log(getBusinessOwner?.data);

  const handleBlockOwner = (id) => {
    const data = {
      user_id: id,
    };
    blockUnBlockUser(data)
      .unwrap()
      .then((payload) => toast.success(payload?.message))
      .catch((error) => toast.error(error?.data?.message));
  };

  // Handle delete users
  const handleDeleteUser = (email) => {
    deleteUser(email)
      .unwrap()
      .then((payload) => toast.success(payload?.message))
      .catch((error) => toast.error(error?.data?.message));
  };

  const data = getBusinessOwner?.data?.map((owner) => {
    return {
      key: owner?._id,
      sl: owner?._id,
      avatar: owner?.picture ? owner?.picture : placeImage,
      name: owner?.name,
      company: owner?.companyName ? owner?.companyName : "N/A",
      address: owner?.companyAddress ? owner?.companyAddress : "N/A",
      email: owner?.email,
      contact: owner?.phone,
      location: owner?.location ? owner?.location : "N/A",
      isBanned: owner?.isBanned,
    };
  });

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
      render: (_, record) => (
        <div className="flex items-center  gap-2">
          <p
            onClick={() => handleBlockOwner(record?.key)}
            className={`p-1 rounded-sm shadow-sm  inline-block text-white cursor-pointer ${
              record?.isBanned ? "bg-gray-300" : "bg-red-500"
            }`}
          >
            <MdBlockFlipped size={20} />
          </p>
          <Popconfirm
            placement="topRight"
            title="Are you sure delete this user!"
            okText="Yes"
            cancelText="No"
            onConfirm={() => handleDeleteUser(record?.email)}
          >
            <p className="bg-red-500 p-1 rounded-sm cursor-pointer text-white">
              <RiDeleteBinLine size={20} />
            </p>
          </Popconfirm>
          {/* <p className="bg-[#CD9B3A] p-1 rounded-sm text-white cursor-pointer">
            <CiEdit size={20} />
          </p> */}
        </div>
      ),
    },
  ];
  return (
    <div className="bg-white shadow-md p-4 rounded-md">
      <div className="md:flex justify-between item-center ">
        <div className="flex items-center gap-2 mb-5">
          <Link to={-1}>
            <FaArrowLeft size={18} className="text-[var(--secondary-color)] " />
          </Link>
          <span className="md:font-semibold text-sm md:text-[20px]">
            Business Owner List
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              type="text"
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search here..."
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 "
            />
            <span className="absolute left-3 top-2.5 text-gray-400">
              <CiSearch />
            </span>
          </div>
          <button onClick={()=>setAddModal(true)} className="bg-[#CD9B3A] text-white py-2 px-2 rounded-sm">Add Business Owner</button>
        </div>
      </div>
      <div className="p-4">
        <Table
          columns={columns}
          dataSource={data}
          scroll={{ x: 800 }}
          pagination={{
            current: getBusinessOwner?.meta?.currentPage,
            pageSize: getBusinessOwner?.meta?.limit,
            total: getBusinessOwner?.meta?.totalUsers,
            showSizeChanger: false,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
            onChange: (page) => {
              setPage(page);
            },
          }}
        />
      </div>

      <AddBusinessOwnerModal  addModalOpen={addModalOpen}   setAddModal={setAddModal} />
    </div>
  );
};

export default ToolsManagement;
