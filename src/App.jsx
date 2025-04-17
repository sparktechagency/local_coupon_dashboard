import income from "./assets/images/coupon.png";
import profileUser from "./assets/images/profileuser.png";
import DailyOverViewChart from "./Components/DailyOverViewChart/DailyOverViewChart";
import IncomeOverview from "./Components/IncomeOverview/IncomeOverview";
import { Link } from "react-router-dom";
import "./app.css";
import activeUser from "./assets/images/premium.png";
import referrals from "./assets/images/business.png";
import { Table } from "antd";
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
  const formattedData = recentTransaction?.data
    ?.slice(0, 3)
    ?.map((transaction) => {
      return {
        key: transaction?._id,
        useName: transaction?.user?.name,
        companyName: transaction?.coupon?.createdBy?.companyName,
        couponImage: transaction?.coupon?.photo_url,
        couponExpire: transaction?.coupon?.end?.split("T")?.[0],
        share: transaction?.coupon?.shareCount,
        download: transaction?.coupon?.redeemCount,
        promoTitle: transaction?.coupon?.promo_title,
        discountAmount: transaction?.coupon?.discount_amount,
        regularAmount: transaction?.coupon?.regular_amount,
        discountPercent: transaction?.coupon?.discount_percentage,
        date: transaction?.createdAt?.split("T")?.[0],
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
        const {
          couponImage,
          couponExpire,
          promoTitle,
          discountPercent,
          discountAmount,
          regularAmount,
        } = record;

        let displayText = "";

        if (promoTitle) {
          displayText = promoTitle;
        } else if (discountPercent) {
          displayText = `${discountPercent}% Off`;
        } else if (discountAmount) {
          displayText = `${discountAmount}`;
          if (regularAmount) {
            displayText += ` `;
          }
        }

        return (
          <div className="border border-dashed px-2 py-2 flex items-center justify-between max-w-[300px]">
            <div>
              <img src={couponImage} className="h-10 mt-2" alt="Coupon" />
              <p className="mt-1 text-sm text-gray-500">
                Expires {couponExpire}
              </p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-xl">
                {displayText}
                {discountAmount && regularAmount && (
                  <span className="text-gray-500 text-sm line-through ml-1">
                    {regularAmount}
                  </span>
                )}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      title: "RedeemCount",
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
