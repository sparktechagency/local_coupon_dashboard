import { FaArrowLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useGetAllCouponQuery } from '../../redux/api/couponManagement'

const CouponManagement = () => {
    const {data : allCoupons} = useGetAllCouponQuery();

    console.log(allCoupons?.data);
  return (
    <div className="bg-white shadow-md p-4 rounded-md">
        <div className="flex items-center gap-2 mb-5">
          <Link to={-1}>
            <FaArrowLeft size={18} className="text-[var(--secondary-color)] " />
          </Link>
          <span className="md:font-semibold text-sm md:text-[20px]">
            Coupon Management
          </span>
        </div>
    </div>
  )
}

export default CouponManagement