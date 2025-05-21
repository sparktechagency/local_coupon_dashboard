import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGetAllCouponQuery } from "../../redux/api/couponManagement";
import { Pagination, Table } from "antd";
import { MdAdd } from "react-icons/md";
import { useGetAllCategoryQuery } from "../../redux/api/categoryApi";
import { useState } from "react";
import AddCouponModal from "../../Components/AddCouponModal/AddCouponModal";

const CouponManagement = () => {
  const [openCouponModal , setOpenCouponModal] = useState(false)
  const { data: allCoupons } = useGetAllCouponQuery();
  const {data :  getCategory } = useGetAllCategoryQuery()

  // console.log(getCategory?.data);

  // table data
  const formattedData = allCoupons?.data?.map((transaction) => {
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
    <div className="bg-white shadow-md p-4 rounded-md">
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-2 mb-5">
          <Link to={-1}>
            <FaArrowLeft size={18} className="text-[var(--secondary-color)] " />
          </Link>
          <span className="md:font-semibold text-sm md:text-[20px]">
            Coupon Management
          </span>
        </div>
        <button onClick={()=> setOpenCouponModal(true)} className="bg-[#CD9B3A] text-white px-4 py-2 rounded-md shadow-md flex items-center gap-2"><MdAdd size={20} />Add Coupon</button>
      </div>
      <Table
        dataSource={formattedData}
        columns={columns}
        className="custom-pagination"
        pagination={false}
        scroll={{ x: 800 }}
      />

      <div className="mt-2 flex items-center justify-center">
        {/* <Pagination
          current={page}
          onChange={onChange}
          total={recentTransaction?.meta?.total}
          pageSize={recentTransaction?.meta?.limit}
          showSizeChanger={false}
          showTotal={(total, range) =>
            `Showing ${range[0]}-${range[1]} out of ${total}`
          }
        /> */}
      </div>
      <AddCouponModal openCouponModal={openCouponModal} setOpenCouponModal={setOpenCouponModal} category={getCategory?.data} />
    </div>
  );
};

export default CouponManagement;
