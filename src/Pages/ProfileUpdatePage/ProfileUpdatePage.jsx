import React, { useState } from "react";
import ProfileUpdateRequest from "../../Components/ProfileUpdateRequest/ProfileUpdateRequest";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Pagination } from "antd";
import { useRecentTransactionQuery } from "../../redux/api/dahsboadHomeApi";
const ProfileUpdatePage = () => {
  const [page, setCurrent] = useState(1);
  const { data: recentTransaction } = useRecentTransactionQuery(page);

  const onChange = (page) => {
    setCurrent(page);
  };

  // table data
  const formattedData = recentTransaction?.data?.map((transaction) => {
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

  return (
    <div className="bg-white rounded-md p-5">
      <div className="flex gap-2 ">
        <Link to={-1}>
          <FaArrowLeft className="text-[#CD9B3A]" size={20} />
        </Link>
        <p className="font-semibold ">Referral Overview</p>
      </div>
      <ProfileUpdateRequest dataSource={formattedData} />
      <div className="mt-2 flex items-center justify-center">
        <Pagination
          current={page}
          onChange={onChange}
          total={recentTransaction?.meta?.total}
          pageSize={recentTransaction?.meta?.limit}
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
