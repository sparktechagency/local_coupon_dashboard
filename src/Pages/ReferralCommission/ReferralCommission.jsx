import { Button, Form, Input, Modal, Table } from "antd";
import TextArea from "antd/es/input/TextArea";
import JoditEditor from "jodit-react";
import React, { useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaArrowLeft } from "react-icons/fa";
import { IoAdd } from "react-icons/io5";
import { Link } from "react-router-dom";

const ReferralCommission = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [form] = Form.useForm();
  const [openViewModal, setViewModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const config = {
    readonly: false,
    placeholder: 'Start typings...',
    style: {
        height: 200,
    },
    buttons: [
        'image', 'fontsize', 'bold', 'italic', 'underline', '|',
        'font', 'brush',
        'align'
    ]
}

  const columns = [
    {
      title: "SL No.",
      dataIndex: "slNo",
      key: "slNo",
    },
    {
      title: "Subscription Name",
      dataIndex: "subscription",
      key: "subscription",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Subscription Fee",
      dataIndex: "fee",
      key: "fee",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (_, render) => {
        return (
          <div>
            <button
              onClick={() => setViewModal(true)}
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
      render: (_, record) => (
        <button
          onClick={() => setOpenModal(true)}
          className="text-[var(--secondary-color)]  px-6 py-2 rounded-full"
        >
          Edit
        </button>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      slNo: "01",
      subscription: "Gold",
      fee: "$09.00",
      duration: "Monthly",
    },
    {
      key: "2",
      slNo: "02",
      subscription: "Diamond",
      fee: "$99.99",
      duration: "Yearly",
    },
  ];

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
          
          <Table scroll={{ x: 800 }}  columns={columns} dataSource={data} pagination={false} />;
      </div>

      {/* Description Modal */}

      <Modal
        centered
        footer={false}
        open={openViewModal}
        onCancel={() => setViewModal(false)}
      >
        <div className="ml-10">
          <p className="mt-5">1. Unlock 3 exclusive deals</p>
          <p>2. extended redemption period</p>
          <p>3. Bonus Saving opportunity </p>
          <p>4. Access to premium coupons</p>
        </div>
      </Modal>

      <Modal
        title="Edit"
        footer={false}
        open={openModal}
        onCancel={() => setOpenModal(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="Subscription Plan Name"
            label="Subscription Plan Name"
            rules={[
              {
                required: true,
                message: "Please enter Subscription plan name",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please enter price" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Duration"
            label="Duration"
            rules={[{ required: true, message: "Please enter duration" }]}
          >
            <Input />
          </Form.Item>
          {/* <Form.Item
            name="Duration"
            label="Points Range"
            rules={[{ required: true, message: "Please enter duration" }]}
          >
            <TextArea />
          </Form.Item> */}
          <JoditEditor
            ref={editor}
            value={content}
            config={config}
            tabIndex={1}
            // onBlur={newContent => setContent(newContent)}
            onChange={(newContent) => {}}
          />
          <div className="flex items-center gap-3">
            <button className="bg-[var(--secondary-color)] text-white w-full py-2 rounded-sm">
              Save
            </button>
            <button className="border bg-red-600 text-white w-full py-2 rounded-sm">
              Cancel
            </button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default ReferralCommission;
