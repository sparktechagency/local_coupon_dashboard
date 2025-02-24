import React from 'react'
import Sidebar from '../../Components/Shared/Sidebar'
import Header from '../../Components/Shared/Header'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
    return (
        <div className='flex justify-between items-center gap-0 bg-[#F2F2F2] '>

            <div className='w-[300px] bg-[var(--primary-color)]  h-screen overflow-y-scroll  '>
                <Sidebar />
            </div>
            
            <div className=' w-full h-screen  overflow-y-scroll'>
                <Header />
                <div className='p-6 bg-[#F2F2F2] '>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default MainLayout