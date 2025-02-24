import { Modal, Form, Input, Select, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";

export const AddVideoModal = ({ openAddVideoModal, setAddVideoModal }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const handleUpload = ({ fileList }) => setFileList(fileList);

  const handleFinish = (values) => {
    console.log("Form Values:", values);
    onSubmit(values);
    form.resetFields();
    setFileList([]);
  };

  return (
    <Modal
      title="Add Video"
      open={openAddVideoModal}
      onCancel={() => setAddVideoModal(false)}
      footer={false}
      centered
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          name="category"
          label="Tools Category"
          rules={[{ required: true, message: "Please select a category!" }]}
        >
          <Select placeholder="Select Category">
            <Select.Option value="Emotional Wellbeing">
              Emotional Wellbeing
            </Select.Option>
            <Select.Option value="Positive Mindset">
              Positive Mindset
            </Select.Option>
            <Select.Option value="Nutrition & Food">
              Nutrition & Food
            </Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please enter a title!" }]}
        >
          <Input placeholder="Input here" />
        </Form.Item>

        <Form.Item
          name="video"
          label="Video"
          rules={[{ required: true, message: "Please upload a video!" }]}
          className="w-full"
        >
          <div className="w-full">
            <Upload
              fileList={fileList}
              beforeUpload={() => false}
              onChange={handleUpload}
              listType="picture"
              className="w-full"
            >
              <div className="w-full">
                <Button
                  className="w-full flex items-center justify-center"
                  icon={<UploadOutlined />}
                >
                  Upload Video
                </Button>
              </div>
            </Upload>
          </div>
        </Form.Item>

        <div className="flex gap-3">
          <button className="border border-[var(--secondary-color)] text-[var(--secondary-color)] w-full py-2 rounded-sm">
            Cancel
          </button>
          <button className="bg-[var(--secondary-color)] text-white w-full py-2 rounded-sm">
            Add
          </button>
        </div>
      </Form>
    </Modal>
  );
};
