import React, { useEffect, useState } from "react";
import { Button, Form, Input, Popconfirm } from "antd";
import { IoCameraOutline } from "react-icons/io5";
import {
  useChangePasswordMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../redux/api/authApi";
import { toast } from "sonner";
import { RiDeleteBinLine, RiFacebookBoxFill } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { FaSquareInstagram, FaSquareWhatsapp } from "react-icons/fa6";
import { IoIosAddCircleOutline } from "react-icons/io";
import AddSocialMediaModal from "../../Components/AddSocialMediaModal/AddSocialMediaModal";
import { FaTelegram } from "react-icons/fa";
import EditSocialMediaModal from "../../Components/EditSocialMediaModal/EditSocialMediaModal";
import { useTranslation } from "react-i18next";
const admin = false;
const Profile = () => {
  const {t} = useTranslation()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [socialMediaLink, setSocialMediLink] = useState({});
  const [openEditSocialMediaModal, setOpenSocialMediaModal] = useState(false);
  const { data: getAdminProfile } = useGetProfileQuery();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const [changePassword] = useChangePasswordMutation();

  // console.log(socialMediaLink);
  // console.log(getAdminProfile?.data?.socials);

  const [image, setImage] = useState();
  const [form] = Form.useForm();
  const [tab, setTab] = useState(
    new URLSearchParams(window.location.search).get("tab") || "Profile"
  );
  const [passError, setPassError] = useState("");
  const handlePageChange = (tab) => {
    setTab(tab);
    const params = new URLSearchParams(window.location.search);
    params.set("tab", tab);
    window.history.pushState(null, "", `?${params.toString()}`);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  useEffect(() => {
    const data = {
      name: getAdminProfile?.data?.name,
      email: getAdminProfile?.data?.email,
      contact: getAdminProfile?.data?.phone,
      address: getAdminProfile?.data?.location || "N/A",
      companyName: getAdminProfile?.data?.companyName,
      companyAddress: getAdminProfile?.data?.companyAddress || "N/A",
    };
    form.setFieldsValue(data);
  }, [getAdminProfile]);

  const handleChangePassword = (values) => {
    if (values?.newPassword === values.oldPassword) {
      return setPassError("Your old password cannot be your new password");
    }
    if (values?.newPassword !== values?.confirmPassword) {
      return setPassError("Confirm password doesn't match");
    } else {
      setPassError("");
    }
    const data = {
      oldPassword: values?.oldPassword,
      newPassword: values?.newPassword,
    };
    changePassword(data)
      .unwrap()
      .then((payload) => toast.success(payload?.message))
      .catch((error) => toast.error(error?.data?.message));
  };

  const onEditProfile = (values) => {
    const formData = new FormData();

    if (image) {
      formData.append("picture", image);
    }
    formData.append("name", values?.name);
    formData.append("location", values?.address);
    formData.append("phone", values?.contact);
    if (values?.companyAddress) {
      formData.append("companyAddress", values?.companyAddress);
    }
    if (values?.companyName) {
      formData.append("companyName", values?.companyName);
    }
    updateProfile(formData)
      .unwrap()
      .then((payload) => toast.success(payload?.message))
      .catch((error) => toast.error(error?.data?.message));
  };

  // Handle Delete Social Media

  const handleSocialMedia = (socialMediaName) => {
    const currentSocials = getAdminProfile?.data?.socials || {};

    const updatedSocials = Object.fromEntries(
      Object.entries(currentSocials).filter(([key]) => key !== socialMediaName)
    );

    // console.log(updatedSocials);
    const formData = new FormData();
    formData.append("socials", JSON.stringify(updatedSocials));
    updateProfile(formData)
      .unwrap()
      .then((payload) => toast.success(payload?.message))
      .catch((error) => toast.error(error?.data?.message));
  };

  return (
    <div>
      <div className="rounded-md   bg-[#FEFEFE]">
        <div className=" py-9 px-10 rounded flex items-center justify-center flex-col gap-6">
          <div className="relative w-[140px] h-[124px] mx-auto">
            <input
              type="file"
              onInput={handleChange}
              id="img"
              style={{ display: "none" }}
            />
            <img
              style={{ width: 140, height: 140, borderRadius: "100%" }}
              src={`${
                image
                  ? URL.createObjectURL(image)
                  : `${getAdminProfile?.data?.picture}`
              }`}
              alt=""
            />

            {tab === "Profile" && (
              <label
                htmlFor="img"
                className="
                            absolute top-[80px] -right-2
                            bg-[#CD9B3A]
                            rounded-full
                            w-6 h-6
                            flex items-center justify-center
                            cursor-pointer
                        "
              >
                <IoCameraOutline className="text-white" />
              </label>
            )}
          </div>
          <div className="w-fit">
            <p className=" text-[#575757] text-[24px] leading-[32px] font-semibold">
              {getAdminProfile?.data?.name}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 mb-6">
          <p
            onClick={() => handlePageChange("Profile")}
            className={`
                        ${
                          tab === "Profile"
                            ? "border-[#CD9B3A] border-b-2 font-semibold text-[#CD9B3A]"
                            : "border-b-2 border-transparent font-normal text-gray-600"
                        }
                        cursor-pointer text-[16px] leading-5  
                    `}
          >
           {t("editProfile")}
          </p>
          <p
            onClick={() => handlePageChange("Change Password")}
            className={`
                        ${
                          tab === "Change Password"
                            ? "border-[#CD9B3A] border-b-2 font-semibold text-[#CD9B3A]"
                            : "border-b-2 border-transparent font-normal  text-gray-600"
                        }
                         cursor-pointer text-base leading-[18px]  
                    `}
          >
            {t("changePassword")}
          </p>
        </div>
        {tab === "Profile" ? (
          <div className="max-w-[480px] mx-auto rounded-lg p-6">
            <h1 className="text-center text-[#CD9B3A] leading-7 text-2xl font-medium mb-7">
              {t("editYourProfile")}
            </h1>
            <Form onFinish={onEditProfile} layout="vertical" form={form}>
              <Form.Item
                name="name"
                label={<p className="text-[16px]  font-normal">{t("userName")}</p>}
              >
                <Input
                  style={{
                    width: "100%",
                    height: 40,
                    border: "",
                    borderRadius: "5px",
                    color: "#919191",
                    outline: "none",
                  }}
                  className="text-[16px] leading-5 "
                  placeholder="Asadujjaman"
                />
              </Form.Item>
              <Form.Item
                name="email"
                label={<p className=" text-[16px] font-normal">{t("email")}</p>}
              >
                <Input
                  style={{
                    width: "100%",
                    height: 40,
                    borderRadius: "5px",
                    color: "#919191",
                    outline: "none",
                  }}
                  disabled
                  className="text-[16px] leading-5"
                  placeholder={`xyz@gmail.com`}
                />
              </Form.Item>

              <Form.Item
                name="contact"
                label={
                  <p className="text-[#919191] text-[16px] leading-5 font-normal">
                    {t("contactNo")}
                  </p>
                }
              >
                <Input
                  style={{
                    width: "100%",
                    height: 48,
                    borderRadius: "5px",
                    color: "#919191",
                    outline: "none",
                  }}
                  className="text-[16px] leading-5"
                  placeholder="+9900700007"
                />
              </Form.Item>
              <Form.Item
                name="address"
                label={
                  <p className="text-[#919191] text-[16px] leading-5 font-normal">
                    {t("address")}
                  </p>
                }
              >
                <Input
                  style={{
                    width: "100%",
                    height: 48,
                    borderRadius: "5px",
                    color: "#919191",
                    outline: "none",
                  }}
                  className="text-[16px] leading-5"
                  placeholder="79/A Joker Vila, Gotham City"
                />
              </Form.Item>
              {getAdminProfile?.data?.role === "business" && (
                <>
                  <Form.Item
                    label={
                      <p className="text-[#919191] text-[16px] leading-5 font-normal">
                        {t("companyName")}
                      </p>
                    }
                    name={"companyName"}
                  >
                    <Input className="h-[48px]" placeholder="Company Name" />
                  </Form.Item>
                  <Form.Item
                    label={
                      <p className="text-[#919191] text-[16px] leading-5 font-normal">
                        {t("companyAddress")}
                      </p>
                    }
                    name={"companyAddress"}
                  >
                    <Input className="h-[48px]" placeholder="Company Address" />
                  </Form.Item>
                  <div className="flex items-center justify-between">
                    <p className="text-xl">{t("socialMedia")}</p>
                    <p
                      onClick={() => setIsModalOpen(true)}
                      className="bg-[#CD9B3A] text-white p-1 rounded-full cursor-pointer"
                    >
                      <IoIosAddCircleOutline size={22} />
                    </p>
                  </div>
                  {getAdminProfile?.data?.socials?.fb && (
                    <div className="h-10 flex rounded-md items-center justify-between border mb-5">
                      <div className="flex items-center justify-between w-full px-2">
                        <RiFacebookBoxFill size={25} color="#2A73DE" />
                        <p className="mb-0">Facebook</p>
                        <div className="flex items-center gap-2">
                          <Popconfirm
                            title="Are you sure to delete this social media link?"
                            onConfirm={() => handleSocialMedia("fb")}
                            okText="Yes"
                            cancelText="No"
                          >
                            <RiDeleteBinLine
                              size={22}
                              className="cursor-pointer text-red-500"
                            />
                          </Popconfirm>

                          <CiEdit
                            size={22}
                            className="cursor-pointer text-[#CD9B3A]"
                            onClick={() => {
                              setOpenSocialMediaModal(true);
                              setSocialMediLink({
                                name: "fb",
                                link: getAdminProfile?.data?.socials?.fb,
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {getAdminProfile?.data?.socials?.ig && (
                    <div className="h-10 flex rounded-md items-center justify-between border mb-5">
                      <div className="flex items-center justify-between w-full px-2">
                        <FaSquareInstagram size={25} color="#EA076B" />
                        <p className="mb-0">Instagram</p>
                        <div className="flex items-center gap-2">
                          <Popconfirm
                            title="Are you sure to delete this social media link?"
                            onConfirm={() => handleSocialMedia("ig")}
                            okText="Yes"
                            cancelText="No"
                          >
                            <RiDeleteBinLine
                              size={22}
                              className="cursor-pointer text-red-500"
                            />
                          </Popconfirm>

                          <CiEdit
                            onClick={() => {
                              setOpenSocialMediaModal(true);
                              setSocialMediLink({
                                name: "ig",
                                link: getAdminProfile?.data?.socials?.ig,
                              });
                            }}
                            size={22}
                            className="cursor-pointer text-[#CD9B3A]"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {getAdminProfile?.data?.socials?.whatsapp && (
                    <div className="h-10 flex rounded-md items-center justify-between border mb-5">
                      <div className="flex items-center justify-between w-full px-2">
                        <FaSquareWhatsapp size={25} color="#24CC63" />
                        <p className="mb-0">What's App</p>
                        <div className="flex items-center gap-2">
                          <Popconfirm
                            title="Are you sure to delete this social media link?"
                            onConfirm={() => handleSocialMedia("whatsapp")}
                            okText="Yes"
                            cancelText="No"
                          >
                            <RiDeleteBinLine
                              size={22}
                              className="cursor-pointer text-red-500"
                            />
                          </Popconfirm>

                          <CiEdit
                            onClick={() => {
                              setOpenSocialMediaModal(true);
                              setSocialMediLink({
                                name: "whatsapp",
                                link: getAdminProfile?.data?.socials?.whatsapp,
                              });
                            }}
                            size={22}
                            className="cursor-pointer text-[#CD9B3A]"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {getAdminProfile?.data?.socials?.telegram && (
                    <div className="h-10 flex rounded-md items-center justify-between border mb-5">
                      <div className="flex items-center justify-between w-full px-2">
                        <FaTelegram size={25} color="#2597D2" />
                        <p className="mb-0">Telegram</p>
                        <div className="flex items-center gap-2">
                          <Popconfirm
                            title="Are you sure to delete this social media link?"
                            onConfirm={() => handleSocialMedia("telegram")}
                            okText="Yes"
                            cancelText="No"
                          >
                            <RiDeleteBinLine
                              size={22}
                              className="cursor-pointer text-red-500"
                            />
                          </Popconfirm>

                          <CiEdit
                            onClick={() => {
                              setOpenSocialMediaModal(true);
                              setSocialMediLink({
                                name: "telegram",
                                link: getAdminProfile?.data?.socials?.telegram,
                              });
                            }}
                            size={22}
                            className="cursor-pointer text-[#CD9B3A]"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
              <Form.Item
                style={{
                  marginBottom: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  style={{
                    width: 197,
                    height: 48,
                    color: "#FCFCFC",
                    backgroundColor: "#CD9B3A",
                  }}
                  className="font-normal text-[16px] leading-6 bg-[#CD9B3A] rounded-full"
                >
                  {isLoading ? "Updating.." : `${t("save")}`}
                </Button>
              </Form.Item>
            </Form>
          </div>
        ) : (
          <div className="max-w-[481px] mx-auto rounded-lg p-6">
            <h1 className="text-center text-[#CD9B3A] leading-7 text-2xl font-medium mb-7">
              {t("editYourProfile")}
            </h1>
            <Form layout="vertical" onFinish={handleChangePassword} form={form}>
              <Form.Item
                name="oldPassword"
                label={
                  <p className="text-[#415D71] text-sm leading-5 poppins-semibold">
                    {t("currentPassword")}
                  </p>
                }
                rules={[
                  {
                    required: true,
                    message: "Please Enter Current Password!",
                  },
                ]}
              >
                <Input.Password
                  style={{
                    width: "100%",
                    height: "42px",
                    borderRadius: "5px",
                    color: "black",
                    outline: "none",
                  }}
                  type="text"
                  placeholder="***************"
                />
              </Form.Item>

              <Form.Item
                name="newPassword"
                rules={[
                  {
                    required: true,
                    message: "Please Enter New Password!",
                  },
                ]}
                label={
                  <p className="text-[#415D71] text-sm leading-5 poppins-semibold">
                   {t("newPassword")}
                  </p>
                }
              >
                <Input.Password
                  style={{
                    width: "100%",
                    height: "42px",
                    borderRadius: "5px",
                    color: "black",
                    outline: "none",
                  }}
                  type="text"
                  placeholder="************"
                />
              </Form.Item>

              <Form.Item
                label={
                  <p className="text-[#415D71] text-sm leading-5 poppins-semibold">
                   {t('confirmPassword')}
                  </p>
                }
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: "Please Enter Confirm Password!",
                  },
                ]}
              >
                <Input.Password
                  style={{
                    width: "100%",
                    height: "42px",
                    borderRadius: "5px",
                    color: "black",
                    outline: "none",
                  }}
                  type="text"
                  placeholder="***************"
                />
              </Form.Item>
              {passError && (
                <p className="text-red-600 -mt-4 mb-2">{passError}</p>
              )}
              <Form.Item
                style={{
                  marginBottom: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  style={{
                    width: 197,
                    height: 48,
                    color: "#FFFFFF",
                    backgroundColor: "#CD9B3A",
                  }}
                  className="font-normal text-[16px] leading-6 bg-[var(--primary-color)] rounded-full"
                >
                  {t("saveChanges")}
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}
      </div>
      <AddSocialMediaModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        socialLinks={getAdminProfile?.data?.socials}
      />
      <EditSocialMediaModal
        openEditSocialMediaModal={openEditSocialMediaModal}
        setOpenSocialMediaModal={setOpenSocialMediaModal}
        socialMediaLink={socialMediaLink}
        socialLinks={getAdminProfile?.data?.socials}
      />
    </div>
  );
};

export default Profile;
