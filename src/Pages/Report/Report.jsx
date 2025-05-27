import { Link } from "react-router-dom";
import { useGetAllReportQuery } from "../../redux/api/couponManagement";
import { FaArrowLeft } from "react-icons/fa";
import { Table } from "antd";
import { useState } from "react";
import RepostDetailsModal from "../../Components/RepostDetailsModal/RepostDetailsModal";

const Report = () => {
  const [details, setDetails] = useState("");
  const [openModal, setIsOpenModal] = useState(false);
  const { data: getReports } = useGetAllReportQuery();

  const columns = [
    {
      title: "SL No.",
      dataIndex: "slNo",
      key: "slNo",
    },
    {
      title: "Reported by",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Reported by Email",
      dataIndex: "reportedByEmail",
      key: "reportedByEmail",
    },
    {
      title: "Reported Against",
      dataIndex: "reportName",
      key: "reportName",
    },
    {
      title: "Reported Against Email",
      dataIndex: "reportEmail",
      key: "reportEmail",
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
    },

    {
      title: "Description",
      dataIndex: "details",
      key: "details",
      render: (_, record) => {
        return (
          <div>
            <button
              onClick={() => {
                setIsOpenModal(true);
                setDetails(record?.details);
              }}
              className="text-[var(--secondary-color)]"
            >
              View
            </button>
          </div>
        );
      },
    },
  ];


  console.log(getReports?.data);

  const formattedData = getReports?.data?.map((report, i) => {
    console.log(report?.details);



    return {
      key: report?._id,
      slNo: i + 1,
      name: report?.user?.name,
      reportedByEmail: report?.user?.email,
      reportName: report?.profile?.name || "N/A",
      reportEmail: report?.profile?.name || "N/A",
      reason: report?.reason,
      details: report?.details,
    };
  });

  return (
    <div className="bg-white p-4  rounded-md">
      <div>
        <div className="flex items-center gap-2">
          <Link to={-1}>
            <FaArrowLeft size={18} className="text-[var(--primary-color)] " />
          </Link>
          <span className="font-semibold text-[20px]">Reports</span>
        </div>
      </div>
      <div className="mt-5">
        <Table
          scroll={{ x: 800 }}
          columns={columns}
          dataSource={formattedData}
          pagination={false}
        />
      </div>
      <RepostDetailsModal
        openModal={openModal}
        setIsOpenModal={setIsOpenModal}
        details={details}
      />
    </div>
  );
};

export default Report;
