import { Table } from "antd";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import img1 from "../../assets/images/user1.png";
import img2 from "../../assets/images/user2.png";
import { MdBlock, MdBlockFlipped } from "react-icons/md";
import {
  useBlockUnblockUserMutation,
  useGetBusinessOwnerQuery,
} from "../../redux/api/usersApi";
import { placeImage } from "../../redux/api/baseApi";
import { toast } from "sonner";
const UserManagement = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [blockUnBlockUser] = useBlockUnblockUserMutation();
  const { data: getUsers } = useGetBusinessOwnerQuery({
    page,
    query,
    type: "user",
  });

  const data = getUsers?.data?.map((owner) => {
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
      gender: owner?.gender ? owner?.gender : "N/A",
    };
  });

  const handleBlockOwner = (id) => {
    const data = {
      user_id: id,
    };
    blockUnBlockUser(data)
      .unwrap()
      .then((payload) => toast.success(payload?.message))
      .catch((error) => toast.error(error?.data?.message));
  };

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
              src={record?.avatar}
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
      dataIndex: "contact",
      key: "contact",
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
      render: (_, record) => (
        <p
          onClick={() => handleBlockOwner(record?.key)}
          className={`p-1 rounded-md shadow-md inline-block cursor-pointer ${
            record?.isBanned ? "bg-gray-300" : "bg-red-500"
          }`}
        >
          <MdBlockFlipped size={25} />
        </p>
      ),
    },
  ];

  return (
    <div className="p-5 bg-white rounded-md">
      <div className="md:flex justify-between item-center ">
        <div className="flex items-center gap-2">
          <Link to={-1}>
            <FaArrowLeft size={18} className="text-[var(--primary-color)] " />
          </Link>
          <span className="font-semibold md:text-[20px] mb-2 md:mb-0">
            User Management
          </span>
        </div>
        <div>
          <div className="relative">
            <input
              type="text"
              onChange={(e)=> setQuery(e.target.value)}
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
          dataSource={data}
          columns={columns}
          className="custom-pagination"
          scroll={{ x: 800 }}
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
