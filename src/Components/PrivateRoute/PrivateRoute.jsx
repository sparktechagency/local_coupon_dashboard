import { Navigate, useLocation } from "react-router-dom";
import { Skeleton } from "antd";
import { useGetProfileQuery } from "../../redux/api/authApi";

const PrivateRoutes = ({ children }) => {
  const location = useLocation();
  const { data: getUserInfo, isError, isLoading } = useGetProfileQuery();

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen"><Skeleton active /></div>;
  }

  const role = getUserInfo?.data?.role;

  if (isError || (role !== "admin" && role !== "business")) {
    return <Navigate to="/auth/login" state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoutes;
