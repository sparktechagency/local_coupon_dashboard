import { Form,  Modal, Popconfirm, Table } from "antd";
import React, { useRef, useState } from "react";
import { FaArrowLeft, FaRegEdit } from "react-icons/fa";
import { IoAdd } from "react-icons/io5";
import { Link } from "react-router-dom";
import {
  useCreateSubscriptionMutation,
  useDeleteSubscriptionMutation,
  useGetSubscriptionQuery,
  useUpdateSubscriptionMutation,
} from "../../redux/api/SubscriptionApi";
import { toast } from "sonner";
import SubscriptionModal from "../../Components/SubscriptionModal/SubscriptionModal";
import { AiOutlineDelete } from "react-icons/ai";

const ReferralCommission = () => {
  const { data: getSubscription } = useGetSubscriptionQuery();
  const [createSubscription] = useCreateSubscriptionMutation();
  const [updateSubscription] = useUpdateSubscriptionMutation();
  const [deleteSubscription] = useDeleteSubscriptionMutation();
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [form] = Form.useForm();
  const [openViewModal, setViewModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [subscriptionDetails, setSubscriptionDetails] = useState([]);

  const handleDeleteSubscription = (id) => {
    const data = {
      id: id,
    };
    deleteSubscription(data)
      .unwrap()
      .then((payload) => toast.success(payload?.message))
      .catch((error) => toast.error(error?.data?.message));
  };
  const config = {
    readonly: false,
    placeholder: "Start typings...",
    style: {
      height: 200,
    },
    buttons: [
      "image",
      "fontsize",
      "bold",
      "italic",
      "underline",
      "|",
      "font",
      "brush",
      "align",
    ],
  };

  const columns = [
    {
      title: "SL No.",
      dataIndex: "slNo",
      key: "slNo",
    },
    {
      title: "Subscription Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Duration",
      dataIndex: "durationInMonths",
      key: "durationInMonths",
    },
    {
      title: "Subscription Fee",
      dataIndex: "priceInCents",
      key: "priceInCents",
    },
    {
      title: "Subscription Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Description",
      dataIndex: "info",
      key: "info",
      render: (_, record) => {
        return (
          <div>
            <button
              onClick={() => {
                setViewModal(true);
                setSubscriptionDetails(record?.info);
              }}
              className="text-[var(--secondary-color)]"
            >
              View
            </button>
          </div>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => {
        return (
          <div className="flex items-center">
            <button
              onClick={() => {
                setOpenModal(true);
                setSelectedSubscription(record);
              }}
              className="text-[var(--secondary-color)]  px-6 py-2 rounded-full"
            >
              <FaRegEdit size={22} />
            </button>
            <Popconfirm
              title="Are you sure delete this subscription?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => handleDeleteSubscription(record?.key)}
            >
              <button><AiOutlineDelete size={22} color="red" /></button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];


  const formattedData = getSubscription?.data?.map((subscription, i) => {
    return {
      key: subscription?._id,
      slNo: i + 1,
      name: subscription?.name,
      priceInCents: subscription?.priceInCents,
      durationInMonths: subscription?.durationInMonths,
      info: subscription?.info,
      type : subscription?.type || "N/A"
    };
  });

  const handleCreate = (values) => {
    createSubscription(values)
      .unwrap()
      .then((payload) => {
        toast.success(payload?.message);
        setOpenModal(false);
        form.resetFields();
      })
      .catch((error) => console.error(error?.data?.message));
  };

  // for update
  const handleUpdate = (data) => {
    updateSubscription({ id: selectedSubscription?.key, ...data })
      .unwrap()
      .then((res) => {
        toast.success(res?.message);
        setOpenModal(false);
        form.resetFields()
      })
      .catch((err) => toast.error(err?.data?.message));
  };

  return (
    <div className="bg-white p-4 rounded-md">
      <div className="md:flex justify-between item-center ">
        <div>
          <div className="flex items-center gap-2">
            <Link to={-1}>
              <FaArrowLeft size={18} className="text-[var(--primary-color)] " />
            </Link>
            <span className="font-semibold text-[20px]">Subscription Plan</span>
          </div>
        </div>
        <button
          onClick={() => setOpenModal(true)}
          className="flex items-center mt-2 md:mt-0  gap-2 bg-[var(--secondary-color)] px-4 py-2 rounded-md text-white"
        >
          <IoAdd size={20} /> Subscription
        </button>
      </div>

      <div className="mt-5">
        <Table
          scroll={{ x: 800 }}
          columns={columns}
          dataSource={formattedData}
          pagination={false}
        />
      </div>

      {/* Description Modal */}

      <Modal
        centered
        footer={false}
        open={openViewModal}
        onCancel={() => setViewModal(false)}
      >
        <div className="ml-10 mt-5">
          {subscriptionDetails?.map((details, i) => {
            return (
              <p key={i + 1}>
                {i + 1}. {details}
              </p>
            );
          })}
        </div>
      </Modal>

      <SubscriptionModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        isEditMode={!!selectedSubscription}
        initialValues={selectedSubscription}
        setSelectedSubscription={setSelectedSubscription}
        onSubmit={selectedSubscription ? handleUpdate : handleCreate}
      />

    </div>
  );
};

export default ReferralCommission;
