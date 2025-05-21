import { Navigate, useLocation } from "react-router-dom"
import { Skeleton } from "antd";
import { useGetProfileQuery } from "../../redux/api/authApi";

 const PrivateRoutes = ({children}) =>{
    const location = useLocation()
    const { data: getUserInfo,isError, isLoading } = useGetProfileQuery();

    // console.log(getUserInfo?.data?.role);
    if(isLoading){
        return <div className="flex items-center justify-center"><Skeleton active /></div>;
    }
    if (isError || getUserInfo?.data?.role !== "admin" || getUserInfo?.data?.role !== "business") {
        return <Navigate to="/auth/login" state={{ from: location }} />;
      }
    
      return children;

}
export default PrivateRoutes;