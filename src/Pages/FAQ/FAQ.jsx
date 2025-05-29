import { Form, Input, Modal, Popconfirm } from "antd";
import React, { useState } from "react";
import { GoPlus } from "react-icons/go";
import { IoArrowBackSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useAddFaqMutation, useDeleteFaqMutation, useGetFaqQuery } from "../../redux/api/settingApi";
import { FiDelete } from "react-icons/fi";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
const { TextArea } = Input;
const FAQ = () => {
  const {t} = useTranslation()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: getFaq } = useGetFaqQuery();
  const [addFaq] = useAddFaqMutation();
  const [deleteFaq] = useDeleteFaqMutation()


  // console.log(getFaq?.data);
  // add question and answer modal function
  const handleAddFaq = () => {
    setIsModalOpen(true);
  };

  const onFinish = (values) => {
    addFaq(values)
      .unwrap()
      .then((payload) => {
        toast.success(payload?.message);
        setIsModalOpen(false);
      })
      .catch((error) => toast.error(error?.data?.message));
  };

  const handleDeleteFaq =(id)=>{
    const data = {
      id :  id
    }
    deleteFaq(data).unwrap()
    .then((payload) => toast.success(payload?.message))
    .catch((error) => toast.error(error?.data?.message));
  }
  return (
    <div className="bg-white rounded-md p-5">
      <div className="flex">
        <Link
          to={-1}
          className="py-1 px-2 rounded-md flex justify-start items-center gap-1  "
        >
          <IoArrowBackSharp className="text-[var(--primary-color)]" />
        </Link>{" "}
        <p className="font-semibold text-[18px]">FAQ</p>
      </div>

      {/* all question and answer */}

      <div className="grid grid-cols-2 gap-5 mt-2">
        {getFaq?.data?.map((question, i) => (
          <div key={i} className="p-2">
            <div className="flex justify-between items-center">
              <p className="pb-3">{t("questionNo")}: {i + 1}</p>
              <Popconfirm
              title="Are you sure delete this FAQ?"
              okText="Yes
              "
              onConfirm={()=> handleDeleteFaq(question?._id)}
              >
                <FiDelete size={22} className="text-red-500 cursor-pointer" />
              </Popconfirm>
            </div>
            <p className="bg-[#F2F2F2] p-2 rounded-md">{question?.question}</p>
            <p className="py-2">{t("answer")}</p>
            <p className="bg-[#F2F2F2] p-2 rounded-md">{question?.answer}</p>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center mt-20">
        <button
          onClick={() => handleAddFaq()}
          className="flex items-center gap-2 bg-[#CD9B3A] text-white px-10 py-2 rounded-3xl"
        >
          <GoPlus size={20} />
          <span>{t('addFAQ')}</span>
        </button>
      </div>

      {/* Modal  */}

      <Modal
        centered
        open={isModalOpen}
        footer={false}
        onCancel={() => setIsModalOpen(false)}
      >
        <p className="text-center font-semibold pb-5 text-xl">{t('addFAQ')}</p>
        <Form onFinish={onFinish}>
          <Form.Item name={"question"}>
            <Input placeholder="Type Answer Here.." variant="filled" />
          </Form.Item>
          <Form.Item name={"answer"}>
            <TextArea
              rows={4}
              placeholder="Type question here.."
              variant="filled"
              // maxLength={6}
            />
          </Form.Item>
          <div className="flex items-center justify-center mt-2">
            <button
              onClick={() => handleAddFaq()}
              className="flex w-full items-center justify-center gap-2 bg-[#CD9B3A] text-white px-10 py-2 text-xl rounded-3xl"
            >
              {" "}
              {t('save')}
            </button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default FAQ;
