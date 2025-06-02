import {
  DatePicker,
  Form,
  Input,
  Modal,
  Switch,
  Upload,
  Button,
  Select,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
import { useAddNewBusinessOwnerMutation } from "../../redux/api/usersApi";
import { toast } from "sonner";
const { Option } = Select;
const AddBusinessOwnerModal = ({ addModalOpen, setAddModal, role, title }) => {
  const [addUser, { isLoading }] = useAddNewBusinessOwnerMutation();
  const [form] = useForm();

  const handleSubmit = (values) => {
    const formData = new FormData();

    // Add text and date fields
    Object.keys(values).forEach((key) => {
      if (key === "subscriptionExpiry" || key === "dateOfBirth") {
        formData.append(key, values[key]?.format("MM/DD/YYYY"));
      } else if (
        key !== "picture" &&
        key !== "id_proof" &&
        key !== "verification_id"
      ) {
        formData.append(key, values[key]);
      }
    });

    // Add file fields
    ["picture", "id_proof", "verification_id"].forEach((field) => {
      if (values[field]?.[0]) {
        formData.append(field, values[field][0].originFileObj);
      }
    });
    addUser(formData)
      .unwrap()
      .then((payload) => {
        toast.success(payload?.message);
        form.resetFields();
        setAddModal(false);
      })
      .catch((error) => toast.error(error?.data?.message));
  };

  return (
    <Modal
      onCancel={() => setAddModal(false)}
      open={addModalOpen}
      centered
      width={700}
      footer={null}
    >
      <p className="text-center text-xl">{title}</p>
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        initialValues={{
          isSubscribed: false,
        }}
      >
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
          <Form.Item label="Password" name="password" className="w-full">
            <Input.Password placeholder="*********" />
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

        <Form.Item
          shouldUpdate={(prev, curr) => prev.isSubscribed !== curr.isSubscribed}
        >
          {({ getFieldValue }) =>
            getFieldValue("isSubscribed") ? (
              <Form.Item
                label="Subscription Expiry"
                name="subscriptionExpiry"
                rules={[
                  {
                    required: true,
                    message: "Please select a subscription expiry date",
                  },
                ]}
              >
                <DatePicker
                  className="w-full"
                  placeholder="Select expiry date"
                />
              </Form.Item>
            ) : null
          }
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

        {role === "business" && (
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
        )}
        {role === "business" && (
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
        )}

        <Form.Item>
          <Button
            disabled={isLoading}
            type="primary"
            style={{ backgroundColor: "#CD9B3A" }}
            htmlType="submit"
            block
          >
            {isLoading ? "submitting.." : "Submit"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddBusinessOwnerModal;
