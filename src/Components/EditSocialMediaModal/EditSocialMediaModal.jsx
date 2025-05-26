import { Form, Input, Modal } from "antd";
import { useEffect } from "react";
import { useUpdateProfileMutation } from "../../redux/api/authApi";
import { toast } from "sonner";

const EditSocialMediaModal = ({
  openEditSocialMediaModal,
  setOpenSocialMediaModal,
  socialMediaLink,
  socialLinks,
}) => {
  const [form] = Form.useForm();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  // handle edit social media

  useEffect(() => {
    const data = {
      link: socialMediaLink.link,
    };
    form.setFieldsValue(data);
  }, [socialMediaLink]);
  const handleEditSocialMedia = (value) => {
    const updateLinks = {
      ...socialLinks,
      [socialMediaLink?.name]: value.link,
    };
    const formData = new FormData();
    formData.append("socials", JSON.stringify(updateLinks));

    updateProfile(formData)
      .unwrap()
      .then((res) => {
        toast.success(res?.message);
        setOpenSocialMediaModal(false); 
      })
      .catch((err) => {
        toast.error(err?.data?.message);
      });

    // console.log(socialLinks[socialMediaLink?.name])
  };
  return (
    <Modal
      centered
      footer={false}
      onCancel={() => setOpenSocialMediaModal(false)}
      open={openEditSocialMediaModal}
    >
      <p className="text-center text-xl">Edit Social Media</p>
      <Form form={form} onFinish={handleEditSocialMedia} layout="vertical">
        <Form.Item label={"Social Media Link"} name={"link"}>
          <Input />
        </Form.Item>
        <div className="flex justify-center ">
          <button className="bg-[#CD9B3A] text-white px-4 py-1 rounded-sm">
            Update
          </button>
        </div>
      </Form>
    </Modal>
  );
};

export default EditSocialMediaModal;
