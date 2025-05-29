import { Modal, Table } from "antd";
import React, { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { MdBlockFlipped } from "react-icons/md";
import { Link } from "react-router-dom";
import kfc from "../../assets/images/kfc.png";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../../context/AppContext";
import { FaDollarSign } from "react-icons/fa";
import { TbCurrencyPeso } from "react-icons/tb";

const ProfileUpdateRequest = ({ dataSource }) => {
  const { t } = useTranslation();
  const { currency, setCurrency } = useAppContext();

  // console.log(currency);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requestUser, setRequestuser] = useState({});

  const handleShowRequestUserDelails = (data) => {
    setIsModalOpen(true);
    setRequestuser(data);
  };

  // Table data
  const columns = [
    {
      title: "SL No.",
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
      title: <> {t("coupon")}</>,
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
      title: <>{t("download")}</>,
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
  ];

  return (
    <div className="">
      <Table
        dataSource={dataSource}
        columns={columns}
        className="custom-pagination"
        pagination={false}
      />
      {/* <Modal open={isModalOpen} centered footer={false} onCancel={() => setIsModalOpen(false)}>
                <div className='flex flex-col items-center justify-center '>
                    <img src={requestUser.img} className='w-[80px] h-[80px] rounded-full' alt="" />
                    <p className='mt-5 font-semibold text-2xl'>{requestUser?.name}</p>
                    <p>{requestUser?.email}</p>
                    <div className='w-full'>
                        <div className='flex justify-between items-center'>
                            <p className='font-semibold mt-5'>Phone Number:</p>
                            <p>{requestUser?.contact}</p>
                        </div>
                        <div className='flex justify-between items-center'>
                            <p className='font-semibold mt-5'>National ID/ Passport No:</p>
                            <p>{requestUser?.passport}</p>
                        </div>
                        <div className='flex justify-between items-center'>
                            <p className='font-semibold mt-5'>Vehicle Type:</p>
                            <p>{requestUser?.vichelType}</p>
                        </div>
                        <div className='flex justify-between items-center'>
                            <p className='font-semibold mt-5'>Vehicle Number:</p>
                            <p>{requestUser?.vichelNumber}</p>
                        </div>
                        <div className='flex justify-between items-center'>
                            <p className='font-semibold mt-5'>Location:</p>
                            <p>{requestUser?.location}</p>
                        </div>
                        <div className=''>
                            <p className='font-semibold mt-5'>Driving License:</p>
                            <img src={requestUser?.drivingLicense} className='mx-auto mt-5' alt="" />
                        </div>
                        <div className=''>
                            <p className='font-semibold mt-5'>Vehicle Photo:</p>
                            <img src={requestUser?.vichelImg} className='mx-auto mt-5' alt="" />
                        </div>
                    </div>
                </div>

            </Modal> */}
    </div>
  );
};

export default ProfileUpdateRequest;
