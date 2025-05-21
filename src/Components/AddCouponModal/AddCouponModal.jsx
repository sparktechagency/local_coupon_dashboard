import { Form, Input, Modal, Select } from "antd";

const AddCouponModal = ({ openCouponModal, setOpenCouponModal, category }) => {
  const categoryOptions = category?.map((cat) => {
    return {
      key: cat?._id,
      label: cat?.name,
      value: cat?._id,
    };
  });

  console.log(categoryOptions);

  //   Handle Select category
  const handleSelectCategory = (value) => {
    console.log(value);
  };
  return (
    <div>
      <Modal
        centered
        open={openCouponModal}
        onCancel={() => setOpenCouponModal(false)}
        footer={false}
      >
        <p className="text-center text-xl font-semibold">Add New Coupon</p>
        <p className="mb-1 ">Select Coupon Category</p>
        <Select
          defaultValue={"select Coupon Category"}
          options={categoryOptions}
          style={{ width: "100%" }}
          onChange={handleSelectCategory}
        />
        <Form className="mt-5" layout="vertical">
          <Form.Item label="Discount Percentage" name={"discount_percentage"}>
            <Input placeholder=" Discount percentage" />
          </Form.Item>
          <Form.Item label="Promo Title" name={"promo_title"}>
            <Input placeholder="Promo title" />
          </Form.Item>
          <div className="flex justify-between items-center gap-2">
            <Form.Item className="w-full" label="Regular Amount" name={"regular_amount"}>
              <Input placeholder="Regular amount"  />
            </Form.Item>
            <Form.Item className="w-full" label="Discount amount" name={"discount_amount"}>
              <Input placeholder="Discount amount"  />
            </Form.Item>
          </div>
          <Form.Item label="Mexican Amount" name={"mxn_amount"}>
            <Input placeholder="Mexican amount" />
          </Form.Item>
          <Form.Item label="More Details" name={"more_details"}>
            <Input placeholder="Details" />
          </Form.Item>
          <div className="flex items-center gap-5">
            <button className="w-full border border-[#cd9b3a] py-2 rounded-sm text-[#cd9b3a]">Cancel</button>
            <button className="w-full bg-[#cd9b3a] text-white py-2 rounded-sm">Add</button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default AddCouponModal;
