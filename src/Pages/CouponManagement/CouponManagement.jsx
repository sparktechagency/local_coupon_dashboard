import { FaArrowLeft, FaDollarSign } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  useDeleteCouponsMutation,
  useGetAllCouponQuery,
  useGetSingleCouponQuery,
} from "../../redux/api/couponManagement";
import { Pagination, Popconfirm, Table } from "antd";
import { MdAdd } from "react-icons/md";
import { useGetAllCategoryQuery } from "../../redux/api/categoryApi";
import { useState } from "react";
import AddCouponModal from "../../Components/AddCouponModal/AddCouponModal";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { TbCurrencyPeso } from "react-icons/tb";
import { useAppContext } from "../../context/AppContext";
import { CiEdit } from "react-icons/ci";
import EditCouponModal from "../../Components/EditCouponModal/EditCouponModal";

const CouponManagement = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [openCouponModal, setOpenCouponModal] = useState(false);
  const { data: allCoupons } = useGetAllCouponQuery(page);
  const { data: getCategory } = useGetAllCategoryQuery();
  const [deleteCoupon] = useDeleteCouponsMutation();
  const { currency, setCurrency } = useAppContext();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState("");
  const {data : getSingleCoupon} = useGetSingleCouponQuery(selectedCoupon);

  // table data
  const formattedData = allCoupons?.data?.map((transaction) => {
    // console.log(transaction?.coupon?.createdBy?.companyName);
    return {
      key: transaction?._id,
      useName: transaction?.coupon?.createdBy?.name,
      companyName: transaction?.coupon?.createdBy?.companyName || "N/A",
      couponImage: transaction?.coupon?.photo_url,
      couponExpire: transaction?.coupon?.end?.split("T")?.[0],
      share: transaction?.coupon?.shareCount,
      download: transaction?.coupon?.redeemCount,
      promoTitle: transaction?.coupon?.promo_title,
      discountAmount: transaction?.coupon?.discount_amount,
      regularAmount: transaction?.coupon?.regular_amount,
      discountPercent: transaction?.coupon?.discount_percentage,
      date: transaction?.coupon?.start?.split("T")?.[0],
      mxnAmount: transaction?.coupon?.mxn_amount,
    };
  });

  // Table data
  const columns = [
    {
      title: <>{t("slNo")}</>,
      dataIndex: "key",
      key: "key",
    },

    {
      title: <>{t("userName")}</>,
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
      title: <>{t("companyName")}</>,
      dataIndex: "companyName",
      key: "companyName",
    },
    {
      title: <>{t("coupon")}</>,
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
          mxnAmount,
        } = record;

        let displayText = "";

        if (promoTitle) {
          displayText = promoTitle;
        } else if (discountPercent) {
          displayText = `${discountPercent}% Off`;
        } else if (discountAmount) {
          if (currency === "us") {
            displayText = (
              <div className="flex items-center">
                <FaDollarSign />
                {discountAmount}
              </div>
            );
          } else {
            displayText = (
              <div className="flex items-center">
                <TbCurrencyPeso /> {mxnAmount}
              </div>
            );
          }
        }

        return (
          <div className="border border-dashed px-2 py-2 flex items-center justify-between max-w-[300px]">
            <div>
              <img src={couponImage} className="h-10 w-12 mt-2" alt="Coupon" />
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
      title: <>{t("redeemCount")}</>,
      dataIndex: "download",
      key: "download",
    },
    {
      title: <>{t("share")}</>,
      dataIndex: "share",
      key: "share",
    },
    {
      title: <>{t("date")}</>,
      dataIndex: "date",
      key: "date",
    },

    {
      title: <>{t("action")}</>,
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <div className="flex items-center gap-2 ]">
          <p
            onClick={() => {
              setOpenEditModal(true);
              setSelectedCoupon(record?.key)
            }}
            className="cursor-pointer  text-[#CD9B3A] "
          >
            <CiEdit size={25} />
          </p>
          <Popconfirm
            title="Are you sure delete this coupon?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => handleDeleteCoupon(record?.key)}
          >
            <p className="cursor-pointer text-red-600">
              <RiDeleteBin6Line size={25} />
            </p>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const onChange = (page) => {
    setPage(page);
  };

  // Handle Delete Coupon

  const handleDeleteCoupon = (id) => {
    deleteCoupon(id)
      .unwrap()
      .then((payload) => toast.success(payload?.message))
      .catch((error) => toast.error(error?.data?.message));
  };
  return (
    <div className="bg-white shadow-md p-4 rounded-md">
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-2 mb-5">
          <Link to={-1}>
            <FaArrowLeft size={18} className="text-[var(--secondary-color)] " />
          </Link>
          <span className="md:font-semibold text-sm md:text-[20px]">
            {t("coupon_management")}
          </span>
        </div>
        <button
          onClick={() => setOpenCouponModal(true)}
          className="bg-[#CD9B3A] text-white px-4 py-2 rounded-md shadow-md flex items-center gap-2"
        >
          <MdAdd size={20} />
          {t("addCoupon")}
        </button>
      </div>
      <Table
        dataSource={formattedData}
        columns={columns}
        className="custom-pagination"
        pagination={false}
        scroll={{ x: 800 }}
      />

      <div className="mt-2 flex items-center justify-center">
        <Pagination
          current={page}
          onChange={onChange}
          total={allCoupons?.meta?.total}
          pageSize={allCoupons?.meta?.limit}
          showSizeChanger={false}
          showTotal={(total, range) =>
            `Showing ${range[0]}-${range[1]} out of ${total}`
          }
        />
      </div>
      <AddCouponModal
        openCouponModal={openCouponModal}
        setOpenCouponModal={setOpenCouponModal}
        category={getCategory?.data}
      />
      <EditCouponModal
        open={openEditModal}
        setOpen={setOpenEditModal}
        couponData={getSingleCoupon?.data}
        category={getCategory?.data}
      />
    </div>
  );
};

export default CouponManagement;
