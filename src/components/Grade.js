import React, { useState, useEffect } from 'react';
import Select from 'react-select'
import { getMentors } from '../helper/helper';
import { getAllCourses } from '../helper/courseHelper';
import { deleteGrade, createGrade, getAllGrades } from '../helper/gradeHelper'


export default function Grade() {
    const [mentors, setMentor] = useState([])
    // const [customers, setCustomers] = useState([])
    const [courses, setCourses] = useState([])
    const [grades, setGrades] = useState([])
    const [newData, setNewData] = useState([])
    const [showModal, setShowModal] = useState(false);

    const fetchData = async () => {
        const courses = await getAllCourses();
        // const customers = await getCustomers();
        const mentors = await getMentors()
        const grades = await getAllGrades();
        setMentor(mentors.data);
        // setCustomers(customers.data);
        setCourses(courses.data)
        setGrades(grades.data)
        console.log(grades)
    }
    useEffect(() => {
        fetchData();
    }, []);
    const handleChange = (event) => {
        setNewData({ ...newData, [event.target.name]: event.target.value });
        // console.log(newData)
    }
    const handleCreate = async (event, data) => {
        event.preventDefault()
        try {
            const response = await createGrade(data);
            setShowModal(false);
            fetchData()
        } catch (error) {
            console.error(error)
        }
    }
    const handleDelete = async (id) => {
        try {
            const response = await deleteGrade(id);
            fetchData()
        } catch (error) {
            console.error(error)
        }
    }
    const createModal = () => {
        setShowModal(true);
    }
    // const handleSelectCustomer = (event, meta) => {
    //     // console.log(meta.name)
    //     setNewData({ ...newData, [meta.name]: event.value });
    // }
    const handleSelectMentor = (event, meta) => {
        // console.log(meta.name)
        setNewData({ ...newData, [meta.name]: event.value });
    }
    const handleSelectCourse = (event, meta) => {
        // console.log(meta.name)
        setNewData({ ...newData, [meta.name]: event.value });
    }
    // let optionsCustomer = customers.map(function (customers) {
    //     return { value: customers._id, label: customers.username };
    // })
    let optionsMentor = mentors.map(function (mentor) {
        return { value: mentor._id, label: mentor.username };
    })
    let optionsCourse = courses.map(function (course) {
        return { value: course._id, label: course.courseName };
    })
    return (
        <div className='container mx-10 px-5 py-10'>
            <div>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => createModal()}>
                    New Grade
                </button>
            </div>

            <div className='max-w-4x2 mx-auto'>
                <table className='w-full whitespace-nowrap bg-white overflow-hidden rounded-lg shadow-sm mb-8'>
                    <thead>
                        <tr className='text-left font-bold'>
                        
                            <th className='px-6 pt-5 pb-4'>Mentor</th>
                            <th className='px-6 pt-5 pb-4'>Number Of Student</th>
                            <th className='px-6 pt-5 pb-4'>Course</th>
                            <th className='px-6 pt-5 pb-4'>Grade Name</th>
                            <th className='px-6 pt-5 pb-4'>From</th>
                            <th className='px-6 pt-5 pb-4'>To</th>
                            <th className='px-6 pt-5 pb-4'>Action</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200'>
                        {grades.map((grade) => (
                            <tr key={grade._id}>
                                

                                <td className='px-6 py-4'>{mentors.map((mentor) => {
                                    // {
                                    //   if(data._id == user._id)  [user.username]
                                    // }
                                    if (grade.instructor == mentor._id)
                                        return mentor.username

                                    // data cua? booking
                                })}</td>
                                <td className='px-6 py-4'>{grade.nOfStudent}</td>
                                <td className='px-6 py-4'>{courses.map((course) => {
                                    // {
                                    //   if(data._id == user._id)  [user.username]
                                    // }
                                    if (grade.course == course._id)
                                        return course.courseName


                                })}</td>
                                <td className='px-6 py-4'>{grade.gradeName}</td>
                                <td className='px-6 py-4'>{grade.startTimeGrade}</td>
                                <td className='px-6 py-4'>{grade.endTimeGrade}</td>
                                <td className='px-6 py-4'>

                                    <button
                                        className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                                        onClick={() => handleDelete(grade._id)}
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
                                            Create Grade
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
                                            <Select options={optionsCourse} name="course" onChange={(event, meta) => handleSelectCourse(event, meta)} />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 font-bold mb-2">Mentor :</label>
                                            <Select options={optionsMentor} name="instructor" onChange={(event, meta) => handleSelectMentor(event, meta)} />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 font-bold mb-2">Grade Name :</label>
                                            <input type="text" name="gradeName" onChange={(event) => handleChange(event)} ></input>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 font-bold mb-2">Description :</label>
                                            <input type="text" name="description" onChange={(event) => handleChange(event)} ></input>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 font-bold mb-2">From :</label>
                                            <input type="time" name="startTimeGrade" onChange={(event) => handleChange(event)} ></input>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 font-bold mb-2">To :</label>
                                            <input type="time" name="endTimeGrade" onChange={(event) => handleChange(event)}></input>

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