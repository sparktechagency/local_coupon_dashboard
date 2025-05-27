import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Pages/MainLayout/MainLayout";
import App from "../App";
import UserManagement from "../Pages/UserManagement/UserMangment";
import Profile from "../Pages/Profile/Profile";
import TremsCondition from "../Pages/TremsCondition/TremsCondition";
import PrivacyPolicy from "../Pages/PrivacyPolicy/PrivacyPolicy";
import FAQ from "../Pages/FAQ/FAQ";
import ProfileUpdatePage from "../Pages/ProfileUpdatePage/ProfileUpdatePage";
import Login from "../Pages/Login/Login";
import ForgetPassword from "../Pages/ForgetPassword/ForgetPassword";
import Otp from "../Pages/Otp/Otp";
import UpdatePassword from "../Pages/UpdatePassword/UpdatePassword";
import Notification from "../Pages/Notification/Notification";
import ToolsManagement from "../Pages/ToolsManagement/ToolsManagement";
import WithdrawRequest from "../Pages/WithdrawRequest/WithdrawRequest";
import ReferralCommission from "../Pages/ReferralCommission/ReferralCommission";
import ToolsCategory from "../Pages/ToolsCaregory/ToolsCategory";
import PrivateRoutes from "../Components/PrivateRoute/PrivateRoute";
import CouponManagement from "../Pages/CouponManagement/CouponManagement";
import Report from "../Pages/Report/Report";

export const router = createBrowserRouter([
    {
        path: '/',
        element:<MainLayout />,
        children: [
            {
                path: '/',
                element: <PrivateRoutes> <App /></PrivateRoutes>
            },
            {
                path: '/user-management',
                element: <UserManagement />
            },
          
            {
                path: '/business-owners',
                element: <ToolsManagement/>
            },
            
            {
                path : "/coupon-management",
                element : <CouponManagement/>
            },
            
            {
                path: '/premium-use',
                element: <WithdrawRequest/>
            },
            {
                path: '/subscriptions',
                element: <ReferralCommission/>
            },
            
            {
                path: '/tools-category',
                element: <ToolsCategory/>
            },
            
            {
                path: '/profile',
                element: <Profile />
            },
            {
                path: '/terms-condition',
                element: <TremsCondition />
            },
            {
                path: '/report',
                element: <Report/>
            },
            {
                path: '/faq',
                element: <FAQ />
            },
            {
                path: '/all-referral',
                element: <ProfileUpdatePage />
            },
            {
                path: '/privacy-policy',
                element: <PrivacyPolicy />
            },
            {
                path : "/notification",
                element : <Notification/>
            }


        ],


    },
    {
        path: '/auth/login',
        element: <Login />
    },
    {
        path: '/auth/forgot-password',
        element: <ForgetPassword />
    },
    {
        path: '/auth/otp',
        element: <Otp />
    },
    {
        path: '/auth/update-password',
        element: <UpdatePassword />
    },
    {
        path: '/auth/update-password',
        element: <UpdatePassword />
    }
])