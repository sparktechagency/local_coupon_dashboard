import income from "./assets/images/coupon.png";
import profileUser from "./assets/images/profileuser.png";
import DailyOverViewChart from "./Components/DailyOverViewChart/DailyOverViewChart";
import IncomeOverview from "./Components/IncomeOverview/IncomeOverview";
import { Link } from "react-router-dom";
import "./app.css";
import img1 from "./assets/images/user1.png";
import img2 from "./assets/images/user2.png";
import activeUser from "./assets/images/premium.png";
import referrals from "./assets/images/business.png";
import { Table } from "antd";
import kfc from "./assets/images/kfc.png";
import { MdBlockFlipped } from "react-icons/md";
import {
  useGetDashboardQuery,
  useRecentTransactionQuery,
} from "./redux/api/dahsboadHomeApi";
import { useState } from "react";
function App() {
  const [subscriptionYear, setSubscriptionYear] = useState(
    new Date().getFullYear()
  );
  const [userYear, setUserYear] = useState(new Date().getFullYear());
  // Handle Subscription growth year
  const handleChangeYear = (value) => {
    setSubscriptionYear(value);
  };

  // Handle user growth year function

  const handleUserGrowth = (value) => {
    setUserYear(value);
  };

  const { data: getDashboardInfo } = useGetDashboardQuery({
    subscription_year: subscriptionYear,
    user_year: userYear,
  });
  const { data: recentTransaction } = useRecentTransactionQuery();
  console.log(recentTransaction?.data);
  //
  const data = [
    {
      title: "Total User",
      icon: profileUser,
      count: getDashboardInfo?.data?.total_users,
    },
    {
      title: "Premium User",
      icon: activeUser,
      count: getDashboardInfo?.data?.premium_users,
    },
    {
      title: "Total Business Owners",
      icon: referrals,
      count: getDashboardInfo?.data?.business_owners,
    },
    {
      title: "Total Coupon",
      icon: income,
      count: getDashboardInfo?.data?.coupons,
    },
  ];

  // table data
  const formattedData = recentTransaction?.data?.slice(0,3)?.map((transaction) => {
    console.log(transaction);
    return {
      key: transaction?._id,
      useName: "Devon Lane",
      companyName: "KFC",
      share: 10,
      download: 1,
      date: "16 Jan 2025",
      referrerImg: img1,
      refereeImg: img2,
      level: "Level 1",
    };
  });
 

  // Table data
  const columns = [
    {
      title: "SL No.",
      dataIndex: "key",
      key: "key",
    },

    {
      title: "User Name",
      dataIndex: "useName",
      key: "useName",
      render: (_, record) => {
        return (
          <div className="flex items-center gap-2">
            <p className="font-medium">{record?.useName}</p>
          </div>
        );
      },
    },
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
    },
    {
      title: "Coupon",
      dataIndex: "coupon",
      key: "coupon",
      render: (_, record) => {
        return (
          <div className="border border-dashed px-2 flex items-center justify-between max-w-[300px] ">
            <div className="my-auto">
              <img src={kfc} className="h-10 mt-2" alt="" />
              <p className="mt-1">Expires 17 Jan 2025</p>
            </div>
            <div>
              <p className="font-bold text-xl">12% off</p>
            </div>
          </div>
        );
      },
    },
    {
      title: "Download",
      dataIndex: "download",
      key: "download",
    },
    {
      title: "Share",
      dataIndex: "share",
      key: "share",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
  ];

  return (
    <div>
      {/*  statistics card for dashboard home page */}
      <div className="grid grid-cols-1 md:grid-cols-4 justify-center items-center gap-5">
        {data?.map((item, index) => (
          <div
            className="w-full h-full flex justify-center items-center  flex-col gap-3 py-7 bg-[#FEFEFE] p-2 rounded-md"
            key={index}
          >
            <p className="text-2xl font-medium">{item?.title}</p>
            <img src={item?.icon} className="my-[5px]" />
            <p className="text-3xl font-semibold">{item?.count}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-5">
        <div className="w-full h-full bg-white p-0 md:p-4 rounded-md">
          <IncomeOverview
            subscriptionGrowth={getDashboardInfo?.data?.subscription_growth}
            handleChangeYear={handleChangeYear}
          />
        </div>
        <div className="w-full h-full bg-white p-0 md:p-4 rounded-md">
          <DailyOverViewChart
            userGrowth={getDashboardInfo?.data?.user_growth}
            handleUserGrowth={handleUserGrowth}
          />
        </div>
      </div>

      <div className="bg-white shadow-md p-0 md:p-4 mt-5 rounded-md">
        {/* Referral Overview section */}
        <div className="flex  justify-between items-center my-5 px-2 ">
          <p className="text-xl font-semibold">Recent Transactions Coupons</p>{" "}
          <Link to={`/all-referral`}>View all</Link>
        </div>
        <Table
          dataSource={formattedData}
          columns={columns}
          className="custom-pagination"
          pagination={false}
          scroll={{ x: 800 }}
        />
      </div>
    </div>
  );
}

export default App;
