import { Form, Popconfirm } from "antd";
import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoryQuery,
  useUpdateCategoryMutation,
} from "../../redux/api/categoryApi";
import { toast } from "sonner";
import CategoryModal from "../../Components/CategoryModal/CategoryModal";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../../context/AppContext";
const ToolsCategory = () => {
  const { language } = useAppContext();

  console.log(language);

  const { t } = useTranslation();

  const { data: getAllCategory } = useGetAllCategoryQuery();
  const [createCategory, { isLoading: createLoading }] =
    useAddCategoryMutation();
  const [updateCategory, { isLoading: updateLoading }] =
    useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  console.log(getAllCategory?.data);
  const handleUploadCategory = (value) => {
    const formData = new FormData();
    formData.append("name", value?.categoryName);
    if (value.categoryIcon && value.categoryIcon.length > 0) {
      const file = value.categoryIcon[0].originFileObj;
      formData.append("icon", file);
    }
    if (selectedCategory?._id) {
      formData.append("id", selectedCategory._id);
      updateCategory(formData)
        .unwrap()
        .then((payload) => {
          toast.success(payload?.message);
          setOpenModal(false);
        })
        .catch((error) => toast.error(error?.data?.message));
    } else {
      createCategory(formData)
        .unwrap()
        .then((payload) => {
          toast.success(payload?.message);
          setOpenModal(false);
          setSelectedCategory(null);
        })
        .catch((error) => toast.error(error?.data?.message));
    }
  };

  // Handle Delete category functionality
  const handleDeleteCategory = (id) => {
    deleteCategory(id)
      .unwrap()
      .then((payload) => toast.success(payload?.message))
      .catch((error) => toast.error(error?.data?.message));
  };

  return (
    <div className=" p-5 rounded-md bg-white min-h-[85vh]">
      <div className="md:flex justify-between item-center ">
        <div className="flex items-center gap-2">
          <Link to={-1}>
            <FaArrowLeft size={18} className="text-[var(--secondary-color)] " />
          </Link>
          <span className="font-semibold text-[20px]">{t("addCategory")}</span>
        </div>
        <button
          onClick={() => {
            setOpenModal(true);
            // setCategoryName("Add New Category");
          }}
          className="flex  mt-5 bg-[var(--secondary-color)] text-white px-4 py-2 rounded-sm shadow-md"
        >
          <GoPlus />
          {t("addCategory")}
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
                <img
                  src={category?.icon_url}
                  className="h-14 w-14 rounded-full object-cover"
                  alt=""
                />
              </p>
              <p>
                {" "}
                {language === "en"
                  ? category?.name
                  : category?.translations?.find(
                      (t) => t.language_code === language
                    )?.name || category?.name}
              </p>
              <div className="space-x-4">
                <Popconfirm
                  title={
                    i === 0
                      ? "You can only edit first category!"
                      : "Are you sure you want to delete this category?"
                  }
                  okText="Yes"
                  cancelText="No"
                  disabled={i === 0}
                  onConfirm={() => handleDeleteCategory(category?.id)}
                >
                  <button className="border-[#CD9B3A] border px-3 py-2 rounded-lg bg-[#E6F0FF]">
                    {t("delete")}
                  </button>
                </Popconfirm>

                <button
                  onClick={() => {
                    setSelectedCategory({
                      categoryName: category?.name,
                      icon: [
                        {
                          uid: "-1",
                          name: "existing.png",
                          status: "done",
                          url: category?.icon_url,
                        },
                      ],
                      _id: category?._id,
                    });
                    setOpenModal(true);
                  }}
                  className="bg-[#CD9B3A] text-white px-6 py-2 rounded-lg"
                >
                  {t("edit")}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <CategoryModal
        open={openModal}
        onCancel={() => {
          setOpenModal(false);
          setSelectedCategory(null);
        }}
        onSubmit={handleUploadCategory}
        selectedCategory={selectedCategory}
        isLoading={createLoading || updateLoading}
        title={selectedCategory ? "Update Category" : "Add Category"}
        submitText={selectedCategory ? "Update" : "Add"}
      />
    </div>
  );
};

export default ToolsCategory;
