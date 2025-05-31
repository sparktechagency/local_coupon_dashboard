import { Button, Form, Input, Modal, Upload } from "antd";
import React, { useEffect } from "react";
import { UploadOutlined } from "@ant-design/icons";

const CategoryModal = ({
  open,
  onCancel,
  onSubmit,
  isLoading,
  title = "Add Category",
  submitText = "Add",
  selectedCategory
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (selectedCategory) {
      form.setFieldsValue({
        categoryName: selectedCategory?.categoryName,
        categoryIcon: selectedCategory?.icon,
      });
    } else {
      form.resetFields();
    }
  }, [selectedCategory, form]);

  const handleClose = () => {
    onCancel();
    form.resetFields();
  };
  return (
    <Modal open={open} onCancel={handleClose} footer={false} centered>
      <p className="text-center text-[18px]">{title}</p>
      <Form onFinish={onSubmit} form={form} layout="vertical">
        <Form.Item name={"categoryName"} label="Category Name">
          <Input />
        </Form.Item>
        <Form.Item name={"es"} label="Spanish Category Name">
          <Input />
        </Form.Item>
        <Form.Item name={"fr"} label="Francis Category Name">
          <Input />
        </Form.Item>
        <Form.Item
          name="categoryIcon"
          label="Upload Category Icon"
          valuePropName="fileList"
          getValueFromEvent={(e) => e && e.fileList}
        >
          <Upload
            name="icon"
            listType="picture"
            maxCount={1}
            beforeUpload={() => false}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleClose}
            className="border border-[var(--secondary-color)] text-[var(--secondary-color)] w-full py-2 rounded-sm"
          >
            Cancel
          </button>
          <button
            disabled={isLoading}
            className="bg-[var(--secondary-color)] text-white w-full py-2 rounded-sm"
          >
            {isLoading ? "Uploading.." : submitText}
          </button>
        </div>
      </Form>
    </Modal>
  );
};

export default CategoryModal;
