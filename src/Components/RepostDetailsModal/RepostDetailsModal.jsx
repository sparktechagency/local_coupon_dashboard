import { Modal } from 'antd'
import React from 'react'

const RepostDetailsModal = ({openModal , setIsOpenModal , details}) => {
  return (
    <Modal onCancel={()=>setIsOpenModal(false)} open={openModal} footer={false} centered>
        <p className='text-center'>Report Details</p>
        {
            details ? <p>{details}</p> : "No Report details"
        }
    </Modal>
  )
}

export default RepostDetailsModal