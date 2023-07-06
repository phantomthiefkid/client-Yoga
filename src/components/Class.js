import { getMentors } from '../helper/helper';
import { getAllGrades } from "../helper/gradeHelper";
import { getAllCourses } from '../helper/courseHelper';
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
export default function Class() {
    const [grades, setGrades] = useState([])
    const [mentors, setMentor] = useState([])
    const [courses, setCourses] = useState([])
    const fetchData = async () => {
        const mentors = await getMentors()
        const grades = await getAllGrades();
        const courses = await getAllCourses();

        setMentor(mentors.data);
        setGrades(grades.data);
        setCourses(courses.data);

        // console.log(grades)
    }
    useEffect(() => {
        fetchData();
    }, []);



    return (
        <div>
            <div className="grid grid-cols-4">
                <div className="bg-gray-200"><img className="w-auto h-auto" src="/image/poster1.png" alt="yoga" /></div>
                <div className="bg-gray-200"><img className="w-auto h-auto" src="/image/poster2.png" alt="yoga" /></div>
                <div className="bg-gray-200"><img className="w-auto h-auto" src="/image/poster3.png" alt="yoga" /></div>
                <div className="bg-gray-200"><img className="w-auto h-auto" src="/image/poster4.png" alt="yoga" /></div>
            </div>
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-6xl lg:px-8">
                <div className="space-y-2 mt-15 mb-18">
                    <h2 className="text-center text-5xl font-serif">Classes</h2>
                    <nav class="text-xl flex justify-center">
                        <ol class="list-none p-10 inline-flex">
                            <li class="flex items-center ms-4 " >
                                <a href="/class" class="text-gray-500">Yogamo</a>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400 mx-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M8.293 3.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L10.586 9H4a1 1 0 010-2h6.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                                </svg>
                            </li>
                            <li class="flex items-center ms-1">
                                <a href="#" className="text-gray-500">Classes</a>

                            </li>

                        </ol>
                    </nav>
                </div>


                <div className="grid grid-cols-3 gap-3 space-x-3">
                    {grades.map((grade) => (


                        <div className="bg-gray-100 box-content h-auto w-auto p-4" key={grade._id}>
                            <div className="aspect-h-1 aspect-w-1 w-50 overflow-hidden rounded-sm bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                <Link to={`/detail/${grade._id}`}><img className="w-auto h-auto" src="./image/yoga1.png" alt="no" /></Link>
                            </div>

                            <div className="mt-3">
                                <h5 className="text-center text-3xl font-serif">{grade.gradeName}</h5>
                                <p className="mt-4 font-serif">Time: {courses.map((course) => {
                                    // {
                                    //   if(data._id == user._id)  [user.username]
                                    // }
                                    if (grade.course == course._id) {
                                        return grade.startTimeGrade + " to " + grade.endTimeGrade
                                    }


                                    // data cua? booking
                                })}</p>
                                <p className="mt-4 font-serif">Capacity: 3 – 10</p>
                                <p className="mt-2 font-serif">Instructor: {mentors.map((mentor) => {
                                    // {
                                    //   if(data._id == user._id)  [user.username]
                                    // }
                                    if (grade.instructor == mentor._id)
                                        return mentor.username

                                    // data cua? booking
                                })}</p>
                                <p className="mt-4 text-xl font-serif">Price:<b> ${courses.map((course) => {
                                    // {
                                    //   if(data._id == user._id)  [user.username]
                                    // }
                                    if (grade.course == course._id)
                                        return course.price

                                    // data cua? booking
                                })}</b></p>

                                <Link to={`/detail/${grade._id}`}><button className="mt-3 font-serif bg-red-300 hover:bg-yellow-200 text-white font-bold py-2 px-4 rounded-xl w-40">Detail</button></Link>

                            </div>


                        </div>
                    ))}
                </div>
                <div className='grid grid-cols-2 mt-20 bg-gray-100'>
                    <img className='w-64 h-64 rounded-full' src='./image/yogaSlogan.png' />
                    <p className='text-lg font-serif mt-14 mr-14'>Yoga is the art of uniting the body, mind, and spirit to discover inner peace, embrace self-awareness, and unlock the limitless potential within.</p>
                </div>

            </div>

        </div>

    )
}