import Select from 'react-select'
import React, { useState, useEffect } from 'react';
import {
    getAllBookings,
    createBooking,
    deleteBooking,
    updateBooking
} from '../helper/bookingHelper.js';
import {getAllUser}   from '../helper/helper.js';
import  {getAllCourses}  from '../helper/courseHelper.js';

export default function Dashboard() {
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newData, setNewData] = useState({})
    const [allUser, setAllUser] = useState([])
    const [courses, setCourses] = useState([])
    // const [options, setOptions] = useState([])
    // const handleChange = (event) => {
    //     setNewData({ ...newData, [event.target.name]: event.target.value });
    // }
    const handleSelectUser = (event, meta) => {
        // console.log(meta.name)
        setNewData({ ...newData, [meta.name]: event.value });
    }
    const handleSelectCourse = (event, meta) => {
        // console.log(meta.name)
        setNewData({ ...newData, [meta.name]: event.value });
    }
    let optionsUser = allUser.map(function (user) {
        return { value: user._id, label: user.username };
    })
    let optionsCourse = courses.map(function (course) {
        return { value: course._id, label: course.courseName };
    })
    // let username = allUser.map(function (user) {
    //     return  { value: user.username, label: 'username' };
    //   })
    const fetchData = async () => {
        const course = await getAllCourses()
        const user = await getAllUser()
        const response = await getAllBookings();
        setData(response.data);
        setAllUser(user.data);
        setCourses(course.data)

    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await deleteBooking(id);
            fetchData()
        } catch (error) {
            console.error(error)
        }
    }
    const handleCreate = async (event, data) => {
        event.preventDefault()
        try {
            const response = await createBooking(data);
            setShowModal(false);
            fetchData()
        } catch (error) {
            console.error(error)
        }
    }
    const createModal = () => {
        setShowModal(true);
    }
    const handleUpdate = async (event, id) => {
        event.preventDefault()
        try {
            const response = await updateBooking(id); // Call your update function to update the user data
            setShowModal(false);
            fetchData()
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <div>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => createModal()}>
                    New Booking
                </button>
            </div>

            <div className='max-w-4x2 mx-auto'>
                <table className='w-full whitespace-nowrap bg-white overflow-hidden rounded-lg shadow-sm mb-8'>
                    <thead>
                        <tr className='text-left font-bold'>
                            <th className='px-6 pt-5 pb-4'>ID Booking</th>
                            <th className='px-6 pt-5 pb-4'>Course Name (ID)</th>
                            <th className='px-6 pt-5 pb-4'>Username</th>
                            <th className='px-6 pt-5 pb-4'>Created At</th>
                            <th className='px-6 pt-5 pb-4'>Status</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200'>
                        {data.map((data) => (
                            <tr key={data._id}>
                                <td className='px-6 py-4'>{data._id}</td>

                                <td className='px-6 py-4'>{courses.map((course) => {
                                    // {
                                    //   if(data._id == user._id)  [user.username]
                                    // }
                                    if (data.courseId == course._id)
                                        return course.courseName

                                    // data cua? booking
                                })}</td>
                                <td className='px-6 py-4'>{allUser.map((user) => {
                                    // {
                                    //   if(data._id == user._id)  [user.username]
                                    // }
                                    if (data.user == user._id)
                                        return user.username

                                    // data cua? booking
                                })}</td>
                                <td className='px-6 py-4'>{data.createdAt}</td>
                                <td className='px-6 py-4'>{data.isAccepted}</td>
                                <td className='px-6 py-4'>
                                    <button
                                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2'
                                        onClick={(event) => handleUpdate(event, data._id)}
                                    >
                                        Accept
                                    </button>
                                    <button
                                        className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                                        onClick={() => handleDelete(data._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {showModal ? (
                    <>
                        <div

                            className="justify-center items-center  overflow-x-hidden overflow-y-auto fixed inset-1 z-50 outline-none focus:outline-none"
                        >
                            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                {/*content*/}
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                    {/*header*/}
                                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                        <h3 className="text-3xl font-semibold">
                                            Create Booking
                                        </h3>
                                        <button
                                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                            onClick={() => setShowModal(false)}
                                        >
                                            <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                ×
                                            </span>
                                        </button>
                                    </div>
                                    {/*body*/}
                                    <form>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 font-bold mb-2">Course :</label>
                                            <Select options={optionsCourse} name="courseId" onChange={(event, meta) => handleSelectCourse(event, meta)} />
                                        </div>


                                        <div className="mb-4">
                                            <label className="block text-gray-700 font-bold mb-2">User :</label>
                                            <Select options={optionsUser} name="user" onChange={(event, meta) => handleSelectUser(event, meta)} />
                                        </div>


                                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                            <button
                                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={() => setShowModal(false)}
                                            >
                                                Close
                                            </button>
                                            <button
                                                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                onClick={(event) => handleCreate(event, newData)}                                        >
                                                Create
                                            </button>
                                        </div>
                                        {/* <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        Update
                                    </button> */}
                                    </form>
                                    {/*footer*/}

                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : null}
            </div >

        </div>

    )
}