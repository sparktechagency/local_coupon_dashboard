import { Button, Table } from 'antd';
import { IoArrowBackSharp } from 'react-icons/io5';
import { RiDeleteBin6Line } from 'react-icons/ri';



const data = [
    {
        key: '1',
        notification: 'A new user has applied for gold membership packages and waiting for approval, review the application for approval.',
        time: 'Just Now',
    },
    {
        key: '2',
        notification: 'Swap ID #12344 failed due to insufficient balance on User A\'s account. Swap ID #12344 failed due to insufficient balance on User A\'s account.',
        time: '30 min ago',
    },
    {
        key: '3',
        notification: 'Swap ID #12345 between User A and User B has been successfully completed. Swap ID #12345 between User A and User B has been successfully completed.',
        time: '6 hours ago',
    }
]

const Notification = () => {
    const columns = [
        {
            dataIndex: 'notification',
            key: 'notification',
            render: text => <span>{text}</span>,
        },
        {
            dataIndex: 'time',
            key: 'time',
            width: '150px',
            render: text => <span>{text}</span>,
        },
        {
            key: 'action',
            width: '50px',
            render: (text, record) => (
                <Button type="text" icon={<RiDeleteBin6Line size={20} className='text-[#D9000A]' />} onClick={() => handleDelete(record.key)} />
            ),
        },
    ];
    const handleDelete = key => {
        console.log(`Delete notification with key: ${key}`);
    }
    return (
        <div>
            <div className="flex justify-between items-center gap-4">
                <h3 className="text-[#242424] text-[20px] font-semibold flex items-center gap-2"> <IoArrowBackSharp className='text-[#2AB9A4]' />Notifications</h3>

            </div>
            <div>
                <h2 className='text-[18px] font-semibold py-2'>Total 128 Notifications</h2>
                <Table columns={columns} dataSource={data} pagination={false}
                    className="custom-pagination" />
            </div>
        </div>
    );
}

export default Notification;
