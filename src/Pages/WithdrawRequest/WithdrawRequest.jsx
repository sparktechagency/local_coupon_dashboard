import React, { useState } from "react";
import { Table, Tag, Avatar, Pagination } from "antd";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { useGetPremiumUserQuery } from "../../redux/api/SubscriptionApi";
import { placeImage } from "../../redux/api/baseApi";

const columns = [
  {
    title: "SL No.",
    dataIndex: "slNo",
    key: "slNo",
  },
  {
    title: "User Name",
    dataIndex: "name",
    key: "name",
    render: (text, record) => (
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img className="h-14 w-14 rounded-md" src={record.avatar} />
        {text}
      </div>
    ),
  },
  {
    title: "Duration",
    dataIndex: "duration",
    key: "duration",
  },
  {
    title: "Subscription Plan",
    dataIndex: "plan",
    key: "plan",
  },

  {
    title: "Subscription Fee",
    dataIndex: "fee",
    key: "fee",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => (
      <p
        className={`${
          status === "Due"
            ? "border-red-500 border  text-red-600"
            : "border border-green-500 text-green-500"
        } text-center w-[80px] py-1 rounded-full`}
      >
        {status}
      </p>
    ),
  },
];

const WithdrawRequest = () => {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1);
  const { data: getPremiumUser } = useGetPremiumUserQuery({ page ,query });

  console.log(getPremiumUser);

  const formattedData = getPremiumUser?.data?.map((user) => {
    return {
      key: user?._id,
      slNo: user?._id,
      name: user?.name,
      avatar: user?.picture ? user?.picture : placeImage,
      duration: "Monthly",
      plan: "Gold",
      fee: "$10",
      status: user?.isSubscribed ? "Paid" : "Due",
    };
  });
  return (
    <div className="bg-white p-5">
      <div className="md:flex justify-between item-center my-2 ">
        <div className="flex items-center gap-2">
          <Link to={-1}>
            <FaArrowLeft size={18} className="text-[var(--primary-color)] " />
          </Link>
          <span className="font-semibold md:text-[20px]">
            Premium Subscribers
          </span>
        </div>
        <div>
          <div className="relative">
            <input
              type="text"
              onChange={(e)=> setQuery(e.target.value)}
              placeholder="Search here..."
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 "
            />
            <span className="absolute left-3 top-2.5 text-gray-400">
              <CiSearch />
            </span>
          </div>
        </div>
      </div>

      <Table
        dataSource={formattedData}
        scroll={{ x: 800 }}
        columns={columns}
        pagination={false}
      />
      <div className="mt-2 flex items-center justify-center ">
        <Pagination
            current={getPremiumUser?.meta?.currentPage}
            onChange={(page)=> setPage(page)}
          total={getPremiumUser?.meta?.totalUsers}
          pageSize={getPremiumUser?.meta?.limit}
          showSizeChanger={false}
          showTotal={(total, range) =>
            `Showing ${range[0]}-${range[1]} out of ${total}`
          }
        />
      </div>
    </div>
  );
};

export default WithdrawRequest;
