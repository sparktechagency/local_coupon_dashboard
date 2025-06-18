import { Navigate, useLocation } from "react-router-dom";
import { Skeleton } from "antd";
import { useGetProfileQuery } from "../../redux/api/authApi";

const PrivateRoutes = ({ children }) => {
  const location = useLocation();
  const token = JSON.parse(localStorage.getItem("coupon_token"));
  const {
    data: getUserInfo,
    isError,
    isLoading,
  } = useGetProfileQuery(undefined, {
    skip: !token, 
  });
   // When no token at all, send to login
  if (!token) {
    return <Navigate to="/auth/login" state={{ from: location }} />;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Skeleton active />
      </div>
    );
  }

  const role = getUserInfo?.data?.role;

  if (isError || (role !== "admin" && role !== "business")) {
    return <Navigate to="/auth/login" state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoutes;
