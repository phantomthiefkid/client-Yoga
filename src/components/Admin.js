import { Link, useNavigate } from 'react-router-dom'

export default function Admin() {
    return (
        <div>
            <div className="text-center py-4">
                <span className='text-gray-500'>User <Link className='text-red-500' to="/showUser">Show </Link></span>
            </div>
            <div className="text-center py-4">
                <span className='text-gray-500'>Customers <Link className='text-red-500' to="/showCustomers">Show </Link></span>
            </div>
            <div className="text-center py-4">
                <span className='text-gray-500'>Staffs <Link className='text-red-500' to="/showStaffs">Show </Link></span>
            </div>
            <div className="text-center py-4">
                <span className='text-gray-500'>Mentors <Link className='text-red-500' to="/showMentors">Show </Link></span>
            </div>
            <div className="text-center py-4">
                <span className='text-gray-500'>Admins <Link className='text-red-500' to="/showAdmins">Show </Link></span>
            </div>
            <div className="text-center py-4">
                <span className='text-gray-500'>Booking <Link className='text-red-500' to="/booking">Show </Link></span>
            </div>
            <div className="text-center py-4">
                <span className='text-gray-500'>Grade <Link className='text-red-500' to="/grade">Show </Link></span>
            </div>
            <div className="text-center py-4">
                <span className='text-gray-500'>Blog <Link className='text-red-500' to="/blog">Show </Link></span>
            </div>
            <div className="text-center py-4">
                <span className='text-gray-500'>Course <Link className='text-red-500' to="/course">Show </Link></span>
            </div>
            <div className="text-center py-4">
                <span className='text-gray-500'>Class <Link className='text-red-500' to="/class">Show </Link></span>
            </div>
        </div>

    )
}
