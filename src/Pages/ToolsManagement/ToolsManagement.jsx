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
  useGetSingleUserQuery,
} from "../../redux/api/usersApi";
import { placeImage } from "../../redux/api/baseApi";
import { toast } from "sonner";
import { RiDeleteBinLine } from "react-icons/ri";
import AddBusinessOwnerModal from "../../Components/AddBusinessOwnerModal/AddBusinessOwnerModal";
import { useTranslation } from "react-i18next";
import EditBusinessOwnerModal from "../../Components/EditBusinessOwnerModal/EditBusinessOwnerModal";

const ToolsManagement = () => {
  const {t} = useTranslation()
  const [openOwnerEditModal , setOpenOwnerEditModal] = useState(false)
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
  const [id , setOwnerId] = useState("")
  const {data :  getSingleUser} = useGetSingleUserQuery(id)


  // console.log(getSingleUser?.data);

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
      title: <>{t("slNo")}</>,
      dataIndex: "sl",
      key: "sl",
    },
    {
      title: <>{t("userName")}</>,
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
      title: <>{t("companyName")}</>,
      dataIndex: "company",
      key: "company",
    },
    {
      title:  <>{t("companyAddress")}</>,
      dataIndex: "address",
      key: "address",
    },
    {
      title:  <>{t("email")}</>,
      dataIndex: "email",
      key: "email",
    },
    {
      title:  <>{t("contactNumber")}</>,
      dataIndex: "contact",
      key: "contact",
    },
    {
      title:  <>{t("location")}</>,
      dataIndex: "location",
      key: "location",
    },
    {
      title: <>{t("action")}</>,
      key: "action",
      render: (_, record) => (
        <div className="flex items-center  gap-2">
          <p
            onClick={() =>{
               setOwnerId(record?.key)
               setOpenOwnerEditModal(true)
            }}
            className={`p-1 rounded-sm shadow-sm  inline-block text-white cursor-pointer  bg-[#CD9B3A]`}
          >
            <CiEdit size={20} />
          </p>
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
            {t("businessOwnerList")}
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
          <button onClick={()=>setAddModal(true)} className="bg-[#CD9B3A] text-white py-2 px-2 rounded-sm">{t("addBusinessOwner")}</button>
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

      <AddBusinessOwnerModal  addModalOpen={addModalOpen}   setAddModal={setAddModal} role={"business"} />
      <EditBusinessOwnerModal  openOwnerEditModal={openOwnerEditModal} setOpenOwnerEditModal={setOpenOwnerEditModal} role={"business"} />
    </div>
  );
};

export default ToolsManagement;
