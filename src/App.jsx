import income from "./assets/images/coupon.png";
import profileUser from "./assets/images/profileuser.png";
import DailyOverViewChart from "./Components/DailyOverViewChart/DailyOverViewChart";
import IncomeOverview from "./Components/IncomeOverview/IncomeOverview";
import { Link } from "react-router-dom";
import ProfileUpdateRequest from "./Components/ProfileUpdateRequest/ProfileUpdateRequest";
import "./app.css";
import img1 from "./assets/images/user1.png";
import img2 from "./assets/images/user2.png";
import activeUser from "./assets/images/premium.png";
import referrals from "./assets/images/business.png";
import { Table } from "antd";
import kfc from './assets/images/kfc.png'
import { MdBlockFlipped } from "react-icons/md";
function App() {
  //
  const data = [
    {
      title: "Total User",
      icon: profileUser,
      count: "8250",
    },
    {
      title: "Premium User",
      icon: activeUser,
      count: "650",
    },
    {
      title: "Total Business Owners",
      icon: referrals,
      count: "52,650",
    },
    {
      title: "Total Coupon",
      icon: income,
      count: "82,650",
    },
  ];

  // table data
  const dataSource = [
    {
      key: "#12333",
      useName: "Devon Lane",
      companyName: "KFC",
      share : 10,
      download : 1,
      date  :'16 Jan 2025',
      referrerImg: img1,
      refereeImg: img2,
      level: "Level 1",
    },
    {
      key: "#12334",
      useName: "Devon Lane",
      companyName: "KFC",
      download : 2,
      share : 10,
      date :'16 Jan 2025',
      referrerImg: img2,
      refereeImg: img1,
      level: "Level 2",
    },
    {
      key: "#12335",
      useName: "Devon Lane",
      companyName: "KFC",
      download : 2,
      share : 10,
      date :'16 Jan 2025',
      referrerImg: img1,
      refereeImg: img2,
      level: "Level 1",
    },
  ];

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
      title : 'Company Name',
      dataIndex : 'companyName',
      key : 'companyName'
    },
    {
      title : 'Coupon',
      dataIndex : 'coupon',
      key : 'coupon',
      render : (_,record)=>{
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
        )
      }
    },
    {
      title : 'Download',
      dataIndex : 'download',
      key : 'download'
    },
    {
      title : 'Share',
      dataIndex : 'share',
      key : 'share'
    },
    {
      title : 'Date',
      dataIndex : 'date',
      key : 'date'
    },
   
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render : (_, record)=>{
        return (
          <div>
            <button className="bg-red-600 p-1 rounded-md shadow-md text-white"><MdBlockFlipped size={25} /></button>
          </div>
        )
      }
    },
  ];

  return (
    <div>
      {/*  statistics card for dashboard home page */}
      <div className="grid grid-cols-4 justify-center items-center gap-5">
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
      <div className="grid grid-cols-2 mt-5 gap-5">
        <div className="w-full h-full bg-white p-4 rounded-md">
          <IncomeOverview />
        </div>
        <div className="w-full h-full bg-white p-4 rounded-md">
          <DailyOverViewChart />
        </div>
      </div>

      <div className="bg-white shadow-md p-4 mt-5 rounded-md">
        {/* Referral Overview section */}
        <div className="flex  justify-between items-center my-5 px-2 ">
          <p className="text-xl font-semibold">Recent Transactions Coupons</p>{" "}
          <Link to={`/all-referral`}>View all</Link>
        </div>
        <Table
          dataSource={dataSource}
          columns={columns}
          className="custom-pagination"
          pagination={false}
        />
      </div>
    </div>
  );
}

export default App;
