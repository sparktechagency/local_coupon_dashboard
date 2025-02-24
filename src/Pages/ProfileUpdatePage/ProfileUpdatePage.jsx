import React, { useState } from "react";
import ProfileUpdateRequest from "../../Components/ProfileUpdateRequest/ProfileUpdateRequest";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Pagination } from "antd";
import img1 from "../../assets/images/user1.png";
import img2 from "../../assets/images/user2.png";
const ProfileUpdatePage = () => {
  const [current, setCurrent] = useState(1);

  const onChange = (page) => {
    setCurrent(page);
  };

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
 
  return (
    <div className="bg-white rounded-md p-5">
      <div className="flex items-center gap-2 py-2">
        <Link to={-1}>
          <FaArrowLeft className="text-[var(--primary-color)]" size={20} />
        </Link>
        <p className="font-semibold ">Referral Overview</p>
      </div>
      <ProfileUpdateRequest dataSource={dataSource} />
      <div className="mt-2 flex items-center justify-center">
        <Pagination
          current={current}
          onChange={onChange}
          total={11}
          pageSize={1}
          showSizeChanger={false}
          showTotal={(total, range) =>
            `Showing ${range[0]}-${range[1]} out of ${total}`
          }
        />
      </div>
    </div>
  );
};

export default ProfileUpdatePage;
