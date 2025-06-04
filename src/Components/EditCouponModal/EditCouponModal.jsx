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
import { useEffect, useState } from "react";
import { toast } from "sonner";
import dayjs from "dayjs";
import { useEditCouponsMutation } from "../../redux/api/couponManagement";
// import { useUpdateCouponMutation } from "../../redux/api/couponManagement";

const EditCouponModal = ({ open, setOpen, couponData, category }) => {
  const [fileList, setFileList] = useState([]);

  const [updateCoupon, { isLoading }] = useEditCouponsMutation();
  const [form] = Form.useForm();
  const [selectedType, setSelectedType] = useState(null);

  const categoryOptions = category?.map((cat) => ({
    key: cat?.id,
    label: cat?.name,
    value: cat?.id,
  }));

  // Prefill form when modal opens
  useEffect(() => {
    if (open && couponData) {
      // Set file list
      if (couponData?.photo_url) {
        setFileList([
          {
            uid: "-1",
            name: "coupon-image.jpg",
            status: "done",
            url: couponData?.photo_url,
          },
        ]);
      } else {
        setFileList([]); // Reset if no photo
      }

      // Determine type and set form values
      setSelectedType(
        couponData.discount_percentage
          ? "discount_percentage"
          : couponData.promo_title
          ? "promo_title"
          : "discount_amount"
      );

      form.setFieldsValue({
        ...couponData,
        category_id: couponData.category,
        start: couponData.start ? dayjs(couponData.start) : null,
        end: couponData.end ? dayjs(couponData.end) : null,
      });
    }
  }, [open, couponData, form]);

  console.log(couponData);

  const handleFormSubmit = (values) => {
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

    formData.append("id", couponData?._id);

    updateCoupon(formData)
      .unwrap()
      .then((res) => {
        toast.success(res?.message || "Coupon updated successfully!");
        form.resetFields();
        setOpen(false);
      })
      .catch((err) => {
        toast.error(err?.data?.message || "Update failed!");
      });
  };

  return (
    <Modal
      centered
      open={open}
      onCancel={() => {
        form.resetFields();
        setOpen(false);
      }}
      footer={false}
    >
      <p className="text-center text-xl font-semibold">Edit Coupon</p>

      <p className="mb-1">Select Coupon Type</p>
      <Select
        placeholder="Select type"
        style={{ width: "100%" }}
        onChange={(value) => setSelectedType(value)}
        value={selectedType}
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
            <Input type="number" placeholder="Discount percentage" />
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
            fileList={fileList}
            onChange={({ fileList }) => setFileList(fileList)}
            beforeUpload={() => false}
          >
            <button
              type="button"
              className="border border-[#cd9b3a] text-[#cd9b3a] px-4  rounded-sm"
            >
              <UploadOutlined /> Select File
            </button>
          </Upload>
        </Form.Item>
        <p className="text-gray-500 text-sm mb-5">
          Note: Please upload JPG or PNG JPEG files only.
        </p>

        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={() => {
              setOpen(false);
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
            {isLoading ? "Updating..." : "Update"}
          </button>
        </div>
      </Form>
    </Modal>
  );
};

export default EditCouponModal;
