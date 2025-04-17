import { Button, Table } from "antd";
import { IoArrowBackSharp } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useGetNotificationQuery } from "../../redux/api/authApi";
import { Link } from "react-router-dom";

const Notification = () => {
  const { data: getNotification } = useGetNotificationQuery();

  function getRelativeTime(dateString) {
    const now = new Date();
    const past = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

    const minutes = Math.floor(diffInSeconds / 60);
    const hours = Math.floor(diffInSeconds / 3600);
    const days = Math.floor(diffInSeconds / 86400);

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;
    return `${days} days ago`;
  }
  const columns = [
    {
      dataIndex: "notification",
      key: "notification",
      render: (_, record) => {
        return (
          <div>
            <p className="font-bold">{record?.title}</p>
            <p className="">{record?.notification}</p>
          </div>
        );
      },
    },
    {
      dataIndex: "time",
      key: "time",
      width: "150px",
      render: (text) => <span>{text}</span>,
    },
    // {
    //   key: "action",
    //   width: "50px",
    //   render: (text, record) => (
    //     <Button
    //       type="text"
    //       icon={<RiDeleteBin6Line size={20} className="text-[#D9000A]" />}
    //       onClick={() => handleDelete(record.key)}
    //     />
    //   ),
    // },
  ];

  const notificationData = getNotification?.data?.map((notification) => {
    return {
      key: notification?._id,
      title: notification?.title,
      notification: notification?.details,
      time: getRelativeTime(notification?.createdAt),
    };
  });
  const handleDelete = (key) => {
    console.log(`Delete notification with key: ${key}`);
  };
  return (
    <div>
      <div className="flex justify-between items-center gap-4">
        <h3 className="text-[#242424] text-[20px] font-semibold flex items-center gap-2">
          {" "}
          <Link to={-1}>
            <IoArrowBackSharp className="text-[#CD9B3A]" />
          </Link>
          Notifications
        </h3>
      </div>
      <div>
        <h2 className="text-[18px] font-semibold py-2">
          Total {getNotification?.data?.length} Notifications
        </h2>
        <Table
          columns={columns}
          scroll={{ x: 800 }}
          dataSource={notificationData}
          pagination={false}
          className="custom-pagination"
        />
      </div>
    </div>
  );
};

export default Notification;
