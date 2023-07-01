
import React, { useState, useEffect } from 'react';
import { createCourse, deleteCourse, getAllCourses } from '../helper/courseHelper';

export default function Course() {
    const [data, setData] = useState([]);
    const [newData, setNewData] = useState({});
    const [showModal, setShowModal] = useState(false);


    const handleChange = (event) => {
        setNewData({ ...newData, [event.target.name]: event.target.value });
    }
    const fetchData = async () => {
        const response = await getAllCourses();
        console.log(response.data)
        setData(await response.data);
    }
    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await deleteCourse(id);
            fetchData()
        } catch (error) {
            console.error(error)
        }
    }

    const createModal = () => {
        setShowModal(true);
    }
    const handleCreate = async (event) => {
        event.preventDefault()
        try {
            const response = await createCourse(newData); // Call your update function to update the user data
            setShowModal(false);
            fetchData()
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='container mx-10 px-5 py-10'>
            <div className='max-w-4x2 mx-auto'>
                <div>
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => createModal()}>
                        New Course
                    </button>
                </div>
                <table className='w-full whitespace-nowrap bg-white overflow-hidden rounded-lg shadow-sm mb-8'>
                    <thead>
                        <tr className='text-left font-bold'>
                            
                            <th className='px-6 pt-5 pb-4'>Course Name</th>
                            <th className='px-6 pt-5 pb-4'>Price</th>
                            <th className='px-6 pt-5 pb-4'>Start</th>
                            <th className='px-6 pt-5 pb-4'>End</th>
                            <th className='px-6 pt-5 pb-4'>Action</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200'>
                        {data.map((course) => (
                            <tr key={course._id}>
                                
                                <td className='px-6 py-4'>{course.courseName}</td>
                                <td className='px-6 py-4'>{course.price}$</td>
                                <td className='px-6 py-4'>{course.startTime}</td>
                                <td className='px-6 py-4'>{course.endTime}</td>
                                <td className='px-6 py-4'>

                                    <button
                                        className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                                        onClick={() => handleDelete(course._id)}
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
                                            Create Course
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
                                            <label className="block text-gray-700 font-bold mb-2">Course Name:</label>
                                            <input type="text" name="courseName" onChange={handleChange}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label className="block text-gray-700 font-bold mb-2">Price :</label>
                                            <input type="text" name="price" onChange={handleChange}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label className="block text-gray-700 font-bold mb-2">Start Time:</label>
                                            <input type="date" name="startTime" onChange={handleChange}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 font-bold mb-2">End Time:</label>
                                            <input type="date" name="endTime" onChange={handleChange}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                        </div>
                                        <div className="flex items-center justify-end p- 6 border-t border-solid border-slate-200 rounded-b">
                                            <button
                                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={() => setShowModal(false)}
                                            >
                                                Close
                                            </button>
                                            <button
                                                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                onClick={(event) => handleCreate(event)}                                        >
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