import {  Button, Form, Input, Modal, Upload } from "antd";
import React, { useState } from "react";
import { FaArrowLeft} from "react-icons/fa";
import { Link } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import {
  useAddCategoryMutation,
  useGetAllCategoryQuery,
} from "../../redux/api/categoryApi";
import { UploadOutlined } from "@ant-design/icons";
import { toast } from "sonner";
const ToolsCategory = () => {
  const [form] = Form.useForm()
  const { data: getAllCategory } = useGetAllCategoryQuery();
  const [createCategory , {isLoading}] = useAddCategoryMutation();
  const [openModal, setOpenModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");

  // console.log(getAllCategory?.data);

  const handleUploadCategory = (value) => {
    const formData = new FormData();
    formData.append("name", value?.categoryName);
    if (value.categoryIcon && value.categoryIcon.length > 0) {
      const file = value.categoryIcon[0].originFileObj;
      formData.append("icon", file);
    }
    createCategory(formData)
      .unwrap()
      .then((payload) => {
        toast.success(payload?.message)
        setOpenModal(false)
        form.resetFields()
      })
      .catch((error) => toast.error(error?.data?.message));
  };

  return (
    <div className=" p-4 rounded-md">
      <div className="md:flex justify-between item-center ">
        <div className="flex items-center gap-2">
          <Link to={-1}>
            <FaArrowLeft size={18} className="text-[var(--secondary-color)] " />
          </Link>
          <span className="font-semibold text-[20px]">Add Category</span>
        </div>
        <button
          onClick={() => {
            setOpenModal(true);
            setCategoryName("Add New Category");
          }}
          className="flex  mt-5 bg-[var(--secondary-color)] text-white px-4 py-2 rounded-sm shadow-md"
        >
          <GoPlus /> Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-5 mt-10">
        {getAllCategory?.data?.map((category, i) => {
          return (
            <div
              key={i + 1}
              className="bg-white mx-auto rounded-md shadow-md w-full flex flex-col justify-center items-center py-10"
            >
              <p className="bg-[#ebd8b3] p-2 rounded-full">
                <img src={category?.icon_url} className="h-14 w-14" alt="" />
              </p>
              <p>{category?.name}</p>
              <div className="space-x-4">
                <button className="border-[#CD9B3A] border px-3 py-2 rounded-lg bg-[#E6F0FF]">
                  Delete
                </button>
                <button className="bg-[#CD9B3A] text-white px-6 py-2 rounded-lg">
                  Edit
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <Modal
        open={openModal}
        onCancel={() => {
          setOpenModal();
          form.resetFields()
        }}
        footer={false}
        centered
      >
        <p className="text-center text-[18px]">{categoryName}</p>
        <Form onFinish={handleUploadCategory} form={form} layout="vertical">
          <Form.Item name={"categoryName"} label="Category Name">
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
              beforeUpload={() => false} // prevent automatic upload
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
          <div className="flex items-center gap-3">
            <button type="button" onClick={()=> setOpenModal(false)} className="border border-[var(--secondary-color)] text-[var(--secondary-color)] w-full py-2 rounded-sm">
              Cancel
            </button>
            <button disabled={isLoading} className="bg-[var(--secondary-color)] text-white w-full py-2 rounded-sm">
              {isLoading ? "Uploading.." : "Add"}
            </button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default ToolsCategory;
