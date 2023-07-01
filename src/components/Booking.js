import Select from 'react-select'
import React, { useState, useEffect } from 'react';
import {
    getAllBookings,
    createBooking,
    deleteBooking,
    updateBooking
} from '../helper/bookingHelper.js';
import { getCustomers } from '../helper/helper.js';
import { getAllGrades } from '../helper/gradeHelper.js';


export default function Booking() {
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newData, setNewData] = useState({})
    const [customers, setCustomers] = useState([])
    const [grades, setGrade] = useState([])
    // const [disable,setDisable] = useState(false)
    // const [options, setOptions] = useState([])
    // const handleChange = (event) => {
    //     setNewData({ ...newData, [event.target.name]: event.target.value });
    // }
    const handleSelectCustomer = (event, meta) => {
        // console.log(meta.name)
        setNewData({ ...newData, [meta.name]: event.value });
        console.log(newData)
    }
    const handleSelectGrade = (event, meta) => {
        // console.log(meta.name)
        setNewData({ ...newData, [meta.name]: event.value });
        console.log(newData)
    }
    let optionsCustomer = customers.map(function (customer) {
        return { value: customer._id, label: customer.username };
    })
    let optionsGrade = grades.map(function (grade) {
        return { value: grade._id, label: grade.gradeName };
    })
    // let username = allUser.map(function (user) {
    //     return  { value: user.username, label: 'username' };
    //   })
    const fetchData = async () => {
        const grades = await getAllGrades()
        const customers = await getCustomers()
        const response = await getAllBookings();
        setData(response.data);
        setCustomers(customers.data);
        setGrade(grades.data)
        // console.log(data)

    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (event,id) => {
        event.currentTarget.disabled = true;
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
        event.currentTarget.disabled = true;
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
        <div class="container mx-10 px-5 py-10">
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
                            <th className='px-6 pt-5 pb-4'>Grade name</th>
                            <th className='px-6 pt-5 pb-4'>Username</th>
                            <th className='px-6 pt-5 pb-4'>Created At</th>
                            <th className='px-6 pt-5 pb-4'>Status</th>
                            <th className='px-6 pt-5 pb-4'>Action</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200'>
                        {data.map((data) => (
                            <tr key={data._id}>


                                <td className='px-6 py-4'>{grades.map((grade) => {
                                    // {
                                    //   if(data._id == user._id)  [user.username]
                                    // }
                                    if (data.grade == grade._id) // where dataid === courseid =
                                        return grade.gradeName

                                    // data cua? booking
                                })}</td>
                                <td className='px-6 py-4'>{customers.map((customer) => {
                                    // {
                                    //   if(data._id == user._id)  [user.username]
                                    // }
                                    if (data.user == customer._id)
                                        return customer.username

                                    // data cua? booking
                                })}</td>
                                <td className='px-6 py-4'>{data.createdAt}</td>
                                <td className='px-6 py-4'>{data.isAccepted}</td>
                                <td className='px-6 py-4'>
                                    {data.isAccepted == 0 &&
                                        <button
                                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2'
                                            onClick={(event) => handleUpdate(event, data._id)}
                                        >
                                            Accept
                                        </button>
                                    }

                                    <button
                                        className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                                        onClick={(event) => handleDelete(event,data._id)}
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
                                            <label className="block text-gray-700 font-bold mb-2">Grade :</label>
                                            <Select options={optionsGrade} name="grade" onChange={(event, meta) => handleSelectGrade(event, meta)} />
                                        </div>


                                        <div className="mb-4">
                                            <label className="block text-gray-700 font-bold mb-2">Customer :</label>
                                            <Select options={optionsCustomer} name="user" onChange={(event, meta) => handleSelectCustomer(event, meta)} />
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