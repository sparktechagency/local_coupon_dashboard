import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Switch,
  Upload,
} from "antd";
const { Option } = Select;
import { UploadOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import dayjs from "dayjs"

const EditBusinessOwnerModal = ({
  openOwnerEditModal,
  setOpenOwnerEditModal,
  role,
  singleUser,
}) => {
  const [form] = Form.useForm();

  console.log(singleUser);

  useEffect(() => {
    if (singleUser) {
      form.setFieldsValue({
        name: singleUser.name,
        email: singleUser.email,
        countryDialCode: singleUser.countryDialCode,
        phone: singleUser.phone,
        dateOfBirth: singleUser.dateOfBirth
          ? dayjs(singleUser.dateOfBirth)
          : null,
        gender: singleUser.gender,
        location: singleUser.location,
        role: singleUser.role,
        companyAddress: singleUser.companyAddress,
        companyName: singleUser.companyName,
        isSubscribed: singleUser.isSubscribed,
        subscriptionExpiry: singleUser.subscriptionExpiry
          ? dayjs(singleUser.subscriptionExpiry)
          : null,
        free_downloads: singleUser.remaining_downloads,
        free_uploads: singleUser.remaining_uploads,
        picture: singleUser.picture
          ? [
              {
                uid: "-1",
                name: "Profile Picture",
                status: "done",
                url: singleUser.picture,
              },
            ]
          : [],
        id_proof: singleUser.id_url
          ? [
              {
                uid: "-2",
                name: "ID Proof",
                status: "done",
                url: singleUser.id_url,
              },
            ]
          : [],
        verification_id: singleUser.verification_url
          ? [
              {
                uid: "-3",
                name: "Verification ID",
                status: "done",
                url: singleUser.verification_url,
              },
            ]
          : [],
      });
    }
  }, [singleUser, form]);

  const handleSubmit = (values) => {
    console.log(values);
  };
  return (
    <Modal
      onCancel={() => setOpenOwnerEditModal(false)}
      open={openOwnerEditModal}
      centered
      width={700}
      footer={null}
    >
      <p className="text-center text-xl">Edit Business Owner</p>
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item label="Name" name="name">
          <Input placeholder="Enter Name" />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input placeholder="example@gmail.com" />
        </Form.Item>

        <div className="flex items-center gap-2">
          <Form.Item
            label="Country Dial Code"
            name="countryDialCode"
            className="w-full"
          >
            <Input placeholder="Enter Code" />
          </Form.Item>
          <Form.Item label="Phone" name="phone" className="w-full">
            <Input placeholder="Enter phone number" />
          </Form.Item>
        </div>

        <div className="flex items-center gap-2">
          <Form.Item
            label="Date of Birth"
            name="dateOfBirth"
            className="w-full"
          >
            <DatePicker className="w-full" placeholder="Select date of birth" />
          </Form.Item>
          <Form.Item label="Gender" name="gender" className="w-full">
            <Select placeholder="Select gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
        </div>

        <div className="flex items-center gap-2">
          <Form.Item label="Location" name="location" className="w-full">
            <Input placeholder="Enter location" />
          </Form.Item>
        </div>

        <div className="flex items-center gap-2">
          <Form.Item
            label="Role"
            name="role"
            initialValue={role}
            className="w-full"
          >
            <Input placeholder="business" disabled />
          </Form.Item>
        </div>

        {role === "business" && (
          <>
            <Form.Item label="Company Address" name="companyAddress">
              <Input placeholder="Enter company address" />
            </Form.Item>
            <Form.Item
              label="Company Name"
              name="companyName"
              className="w-full"
            >
              <Input placeholder="Enter company name" />
            </Form.Item>
          </>
        )}

        {/* Additional Fields */}
        <Form.Item
          label="Is Subscribed"
          name="isSubscribed"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Form.Item label="Subscription Expiry" name="subscriptionExpiry">
          <DatePicker className="w-full" placeholder="Select expiry date" />
        </Form.Item>

        <Form.Item label="Free Downloads" name="free_downloads">
          <Input type="number" placeholder="Enter free downloads" />
        </Form.Item>

        <Form.Item label="Free Uploads" name="free_uploads">
          <Input type="number" placeholder="Enter free uploads" />
        </Form.Item>

        <Form.Item
          label="Picture"
          name="picture"
          valuePropName="fileList"
          getValueFromEvent={(e) => e && e.fileList}
        >
          <Upload beforeUpload={() => false} maxCount={1}>
            <Button icon={<UploadOutlined />}>Upload Picture</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label="ID Proof"
          name="id_proof"
          valuePropName="fileList"
          getValueFromEvent={(e) => e && e.fileList}
        >
          <Upload beforeUpload={() => false} maxCount={1}>
            <Button icon={<UploadOutlined />}>Upload ID Proof</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label="Verification ID"
          name="verification_id"
          valuePropName="fileList"
          getValueFromEvent={(e) => e && e.fileList}
        >
          <Upload beforeUpload={() => false} maxCount={1}>
            <Button icon={<UploadOutlined />}>Upload Verification ID</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button
            // disabled={isLoading}
            type="primary"
            style={{ backgroundColor: "#CD9B3A" }}
            htmlType="submit"
            block
          >
            {/* {isLoading ? "submitting.." : "Submit"} */}
            submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditBusinessOwnerModal;
