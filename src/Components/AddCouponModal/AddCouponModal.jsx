import {
  Form,
  Input,
  Modal,
  Select,
  DatePicker,
  Switch,
  Upload,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useAddNewCouponsMutation } from "../../redux/api/couponManagement";
import { toast } from "sonner";

const AddCouponModal = ({ openCouponModal, setOpenCouponModal, category }) => {
  const [addCoupons, { isLoading }] = useAddNewCouponsMutation();
  const [form] = Form.useForm();
  const [selectedType, setSelectedType] = useState(null);

  // console.log(category);
  const categoryOptions = category?.map((cat) => ({
    key: cat?.id,
    label: cat?.name,
    value: cat?.id,
  }));

  const handleFormSubmit = (values) => {
    console.log(values);
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (key === "photo" && value?.file) {
        formData.append("photo", value.file);
      } else if (key === "start" || key === "end") {
        formData.append(key, value.format("DD/MM/YYYY"));
      } else {
        formData.append(key, value);
      }
    });

    // You can now send formData via RTK Query
    addCoupons(formData)
      .unwrap()
      .then((payload) => {
        toast.success(payload?.message);
        setOpenCouponModal(false);
        form.resetFields();
      })
      .catch((error) => toast.error(error?.data?.message));
  };

  // console.log(categoryOptions);

  return (
    <Modal
      centered
      open={openCouponModal}
      onCancel={() => {
        setOpenCouponModal(false);
        form.resetFields();
      }}
      footer={false}
    >
      <p className="text-center text-xl font-semibold">Add New Coupon</p>

      <p className="mb-1">Select Coupon Type</p>
      <Select
        placeholder="Select type to show specific field"
        style={{ width: "100%" }}
        onChange={(value) => setSelectedType(value)}
        options={[
          { label: "Discount Percentage", value: "discount_percentage" },
          { label: "Promo Title", value: "promo_title" },
          { label: "Discount Amount", value: "discount_amount" },
        ]}
      />

      <Form
        form={form}
        layout="vertical"
        className="mt-5"
        onFinish={handleFormSubmit}
        initialValues={{
          add_to_carousel: false,
        }}
      >
        <Form.Item
          label="Select Coupon Category"
          name="category_id"
          rules={[{ required: true, message: "Please select a category" }]}
        >
          <Select
            options={categoryOptions}
            style={{ width: "100%" }}
            placeholder="Select Coupon Category"
          />
        </Form.Item>
        {selectedType === "discount_percentage" && (
          <Form.Item label="Discount Percentage" name="discount_percentage">
            <Input placeholder="Discount percentage" />
          </Form.Item>
        )}

        {selectedType === "promo_title" && (
          <Form.Item label="Promo Title" name="promo_title">
            <Input placeholder="Promo title" />
          </Form.Item>
        )}

        {selectedType === "discount_amount" && (
          <>
            <div className="flex justify-between items-center gap-2">
              <Form.Item
                className="w-full"
                label="Regular Amount"
                name="regular_amount"
              >
                <Input type="number" placeholder="Regular amount" />
              </Form.Item>
              <Form.Item
                className="w-full"
                label="Discount Amount"
                name="discount_amount"
              >
                <Input type="number" placeholder="Discount amount" />
              </Form.Item>
            </div>
            <Form.Item label="Mexican Amount" name="mxn_amount">
              <Input type="number" placeholder="Mexican amount" />
            </Form.Item>
          </>
        )}

        <Form.Item label="More Details" name="more_details">
          <Input placeholder="Details" />
        </Form.Item>

        <Form.Item label="Start Date" name="start">
          <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
        </Form.Item>

        <Form.Item label="End Date" name="end">
          <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
        </Form.Item>

        <Form.Item
          label="Add to Carousel"
          name="add_to_carousel"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Form.Item
          label="Upload Photo"
          name="photo"
          valuePropName="file"
          getValueFromEvent={(e) => {
            if (Array.isArray(e)) return e;
            return e?.fileList?.[0] ? e : null;
          }}
        >
          <Upload
            accept=".jpg,.jpeg,.png"
            listType="picture"
            maxCount={1}
            beforeUpload={() => false}
          >
            <button
              type="button"
              className="border border-[#cd9b3a] text-[#cd9b3a] px-4 py-1 rounded-sm"
            >
              <UploadOutlined /> Select File
            </button>
          </Upload>
        </Form.Item>
         <p className="text-gray-500 text-sm mb-5">
            Note: Please upload JPG or PNG JPEG files only.
          </p>

        {/*         
         <Form.Item
          label="Upload Photo"
          name="photo"
          valuePropName="fileList"
          getValueFromEvent={(e) => {
            if (Array.isArray(e)) return e;
            return e?.fileList;
          }}
        >
          <Upload
            listType="picture"
            maxCount={1}
            beforeUpload={(file) => {
              const isJpgOrPng =
                file.type === "image/jpeg" ||
                file.type === "image/jpg" ||
                file.type === "image/png";
              if (!isJpgOrPng) {
                message.error("You can only upload JPG/PNG or JPEG files!");
                return Upload.LIST_IGNORE;
              }

              const isLt1M = file.size / 1024 / 1024 < 1;
              if (!isLt1M) {
                message.error("Image must be smaller than 1MB!");
                return Upload.LIST_IGNORE;
              }

              return file; // allow AntD to add it to fileList
            }}
            showUploadList={true}
          >
            <button
              type="button"
              className="border border-[#cd9b3a] text-[#cd9b3a] px-4 py-1 rounded-sm"
            >
              <UploadOutlined /> Select File
            </button>
          </Upload>
        </Form.Item> */}

        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={() => {
              setOpenCouponModal(false);
              form.resetFields();
            }}
            className="w-full border border-[#cd9b3a] py-2 rounded-sm text-[#cd9b3a]"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-[#cd9b3a] ${
              isLoading && "cursor-not-allowed bg-gray-500"
            } text-white py-2 rounded-sm`}
          >
            {isLoading ? "Adding..." : "Add"}
          </button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddCouponModal;
