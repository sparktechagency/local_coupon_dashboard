import { Modal, Form, Input } from "antd";
import { useEffect, useRef, useState } from "react";
import JoditEditor from "jodit-react";

const SubscriptionModal = ({
  openModal,
  setOpenModal,
  initialValues,
  isEditMode = false,
  onSubmit,
}) => {
  const [form] = Form.useForm();
  const editor = useRef(null);
  const [content, setContent] = useState("");


  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
      setContent(initialValues?.info?.join("<br/>") || "");
    }
  }, [initialValues, form]);

  const handleFinish = (values) => {
    const temp = document.createElement("div");
    temp.innerHTML = content;

    const paragraphs = Array.from(temp.childNodes)
      .map((node) => node.textContent.trim())
      .filter(Boolean);

    const formattedData = {
      ...values,
      priceInCents: Number(values.priceInCents),
      durationInMonths: Number(values.durationInMonths),
      info: paragraphs,
    };

    onSubmit(formattedData);
    form.resetFields();
    setContent("");
  };

  const handleClose = () => {
    setOpenModal(false);
    form.resetFields();
    setContent("");
  };

  return (
    <Modal
      title={isEditMode ? "Update Subscription" : "Create Subscription"}
      footer={false}
      open={openModal}
      onCancel={handleClose}
    >
      <Form onFinish={handleFinish} form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Subscription Plan Name"
          rules={[{ required: true, message: "Please enter Subscription plan name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="priceInCents"
          label="Price"
          rules={[{ required: true, message: "Please enter price" }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="durationInMonths"
          label="Duration"
          rules={[{ required: true, message: "Please enter duration" }]}
        >
          <Input type="number" />
        </Form.Item>

        <JoditEditor
          ref={editor}
          value={content}
          config={{ readonly: false }}
          tabIndex={1}
          onBlur={(newContent) => setContent(newContent)}
          onChange={() => {}}
        />

        <div className="flex items-center gap-3 mt-4">
          <button
            type="submit"
            className="bg-[var(--secondary-color)] text-white w-full py-2 rounded-sm"
          >
            {isEditMode ? "Update" : "Save"}
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="border bg-red-600 text-white w-full py-2 rounded-sm"
          >
            Cancel
          </button>
        </div>
      </Form>
    </Modal>
  );
};

export default SubscriptionModal;
