import { Form, Input, Modal, Select } from "antd";
import { useUpdateProfileMutation } from "../../redux/api/authApi";
import { toast } from "sonner";

const AddSocialMediaModal = ({ isModalOpen, setIsModalOpen, socialLinks }) => {
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const [form] = Form.useForm();

  const handleAddSocialMedia = (value) => {
    const platformKeyMap = {
      facebook: "fb",
      instagram: "ig",
      whatsapp: "whatsapp",
      telegram: "telegram",
    };
    const key = platformKeyMap[value.socialName];
    const payload = {
      [key]: value.link,
    };
    const updatedSocials = {
      ...socialLinks,
      ...payload,
    };
    const formData = new FormData();
    formData.append("socials", JSON.stringify(updatedSocials));
    updateProfile(formData)
      .unwrap()
      .then((payload) => {
        toast.success(payload?.message)
        setIsModalOpen(false)
        form.resetFields()
      })
      .catch((error) => toast.error(error?.data?.message));
  };
  return (
    <Modal
      centered
      footer={false}
      open={isModalOpen}
      onCancel={() => {
        setIsModalOpen(false);
        form.resetFields();
      }}
    >
      <p className="text-center text-xl">Add Social Media</p>
      <Form layout="vertical" form={form} onFinish={handleAddSocialMedia}>
        <Form.Item label={"Select Social Media"} name={"socialName"}>
          <Select>
            <Select.Option value="facebook">Facebook</Select.Option>
            <Select.Option value="instagram">Instagram</Select.Option>
            <Select.Option value="whatsapp">WhatsApp</Select.Option>
            <Select.Option value="telegram">Telegram</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label={"Social Media Link"} name={"link"}>
          <Input placeholder="Enter your social media link" />
        </Form.Item>
        <div className="flex justify-center ">
          <button className="bg-[#CD9B3A] text-white px-4 py-1 rounded-sm">
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddSocialMediaModal;
