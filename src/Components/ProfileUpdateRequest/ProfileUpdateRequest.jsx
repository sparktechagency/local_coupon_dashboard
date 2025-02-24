import { Modal, Table } from 'antd';
import React, { useState } from 'react'
import { IoEyeOutline } from 'react-icons/io5';
import { MdBlockFlipped } from 'react-icons/md';
import { Link } from 'react-router-dom';
import kfc from '../../assets/images/kfc.png'

const ProfileUpdateRequest = ({ dataSource }) => {
    // console.log(pagination)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [requestUser, setRequestuser] = useState({})

    const handleShowRequestUserDelails = (data) => {
        setIsModalOpen(true)
        setRequestuser(data)
    }
    console.log(requestUser);

   // Table data
   const columns = [
     {
       title: "SL No.",
       dataIndex: "key",
       key: "key",
     },
  
     {
       title: "User Name",
       dataIndex: "useName",
       key: "useName",
       render: (_, record) => {
         return (
           <div className="flex items-center gap-2">
          
             <p className="font-medium">{record?.useName}</p>
           </div>
         );
       },
     },
     {
       title : 'Company Name',
       dataIndex : 'companyName',
       key : 'companyName'
     },
     {
       title : 'Coupon',
       dataIndex : 'coupon',
       key : 'coupon',
       render : (_,record)=>{
         return (
           <div className="border border-dashed px-2 flex items-center justify-between max-w-[300px] ">
               <div className="my-auto">
                 <img src={kfc} className="h-10 mt-2" alt="" />
                 <p className="mt-1">Expires 17 Jan 2025</p>
               </div>
               <div>
                 <p className="font-bold text-xl">12% off</p>
               </div>
           </div>
         )
       }
     },
     {
       title : 'Download',
       dataIndex : 'download',
       key : 'download'
     },
     {
       title : 'Share',
       dataIndex : 'share',
       key : 'share'
     },
     {
       title : 'Date',
       dataIndex : 'date',
       key : 'date'
     },
    
     {
       title: "Action",
       dataIndex: "action",
       key: "action",
       render : (_, record)=>{
         return (
           <div>
             <button className="bg-red-600 p-1 rounded-md shadow-md text-white"><MdBlockFlipped size={25} /></button>
           </div>
         )
       }
     },
   ];
 
    return (
        <div className=''>
            <Table dataSource={dataSource} columns={columns} className="custom-pagination" pagination={false} />
            <Modal open={isModalOpen} centered footer={false} onCancel={() => setIsModalOpen(false)}>
                <div className='flex flex-col items-center justify-center '>
                    <img src={requestUser.img} className='w-[80px] h-[80px] rounded-full' alt="" />
                    <p className='mt-5 font-semibold text-2xl'>{requestUser?.name}</p>
                    <p>{requestUser?.email}</p>
                    <div className='w-full'>
                        <div className='flex justify-between items-center'>
                            <p className='font-semibold mt-5'>Phone Number:</p>
                            <p>{requestUser?.contact}</p>
                        </div>
                        <div className='flex justify-between items-center'>
                            <p className='font-semibold mt-5'>National ID/ Passport No:</p>
                            <p>{requestUser?.passport}</p>
                        </div>
                        <div className='flex justify-between items-center'>
                            <p className='font-semibold mt-5'>Vehicle Type:</p>
                            <p>{requestUser?.vichelType}</p>
                        </div>
                        <div className='flex justify-between items-center'>
                            <p className='font-semibold mt-5'>Vehicle Number:</p>
                            <p>{requestUser?.vichelNumber}</p>
                        </div>
                        <div className='flex justify-between items-center'>
                            <p className='font-semibold mt-5'>Location:</p>
                            <p>{requestUser?.location}</p>
                        </div>
                        <div className=''>
                            <p className='font-semibold mt-5'>Driving License:</p>
                            <img src={requestUser?.drivingLicense} className='mx-auto mt-5' alt="" />
                        </div>
                        <div className=''>
                            <p className='font-semibold mt-5'>Vehicle Photo:</p>
                            <img src={requestUser?.vichelImg} className='mx-auto mt-5' alt="" />
                        </div>
                    </div>
                </div>

            </Modal>
        </div>
    )
}

export default ProfileUpdateRequest