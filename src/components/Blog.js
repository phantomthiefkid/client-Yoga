import React, { useState, useEffect } from 'react';
import { getAllBlogs, deleteBlog, createBlog } from '../helper/blogHelper.js'
import { uploadFile, getFile } from '../helper/upload.js';
import convertToBase64 from '../helper/convert';
import { getAllUser } from '../helper/helper.js';
import useFetch from '../hooks/fetch.hook';
export default function Blog() {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [newData, setNewData] = useState([])
    const [authors, setAuthors] = useState([])
    const [selectedFile, setSelectedFile] = useState();
    const [selectedFileUpload, setSelectedFileUpload] = useState();
    const [{ apiData }] = useFetch();
    let formData = new FormData();

    const fetchData = async () => {
        const blogs = await getAllBlogs();
        const authors = await getAllUser()
        setBlogs(blogs.data)
        setAuthors(authors.data)    
        console.log(blogs)
    }
    let id = '';
    // function handleChangeImg(event) {
    //     console.log(event)
    //     // uploadFile(event)
    // }
    useEffect(() => {
        
        fetchData();
    }, []);
    const handleChange = (event) => {
        setNewData({ ...newData, [event.target.name]: event.target.value });
        // console.log(newData)
    }
    
    const onUpload = async event => {
        const base64 = await convertToBase64(event.target.files[0]);
        setSelectedFileUpload(event.target.files[0]);
        // formData.append("file", event.target.files[0]);
        // let file = await uploadFile(formData)
        // id = file.data._id
        setSelectedFile(base64);
    }
    const handleDelete = async (event, id) => {
        event.currentTarget.disabled = true;
        try {
            const response = await deleteBlog(id);
            fetchData()
        } catch (error) {
            console.error(error)
        }
    }
    const showImg = (id)=>{
        return getFile(id)
    }
    const handleCreate = async (event, data) => {
        event.preventDefault()

        // let file = await uploadFile(formData)
        // console.log(file)
        // let id = file._id
        formData.append("file", selectedFileUpload);
        let file = await uploadFile(formData)
        id = file.data._id
        data.user = apiData._id
        data._image = id;

        try {
            const response = await createBlog(data);
            setShowModal(false);
            fetchData()
        } catch (error) {
            console.error(error)
        }
    }
    const createModal = () => {
        setShowModal(true);
    }
    return (
        <div class="container mx-10 px-5 py-10">
            <div>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => createModal()}>
                    New Blog
                </button>
            </div>

            <div className='max-w-4x2 mx-auto'>
                <table className='w-full whitespace-nowrap bg-white overflow-hidden rounded-lg shadow-sm mb-8'>
                    <thead>
                        <tr className='text-left font-bold'>
                            <th className='px-6 pt-5 pb-4'>Title</th>
                            <th className='px-6 pt-5 pb-4'>Author</th>
                            <th className='px-6 pt-5 pb-4'>Content</th>
                            <th className='px-6 pt-5 pb-4'>Image</th>
                            <th className='px-6 pt-5 pb-4'>Action</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200'>
                        {blogs.map((blog) => (
                            <tr key={blog._id}>
                                <td className='px-6 py-4'>{blog.title}</td>
                                {/* <td className='px-6 py-4'>{authors.map((author) => {
                                    if (author._id == blog.user._id) return author.username
                                })}</td> */}
                                <td className='px-6 py-4'>{blog.user.username}</td>
                                <td className='px-6 py-4'>{blog.content}</td>
                                <td className='px-6 py-4'><img src={showImg(blog._image)} ></img></td>
                                <td className='px-6 py-4'>
                                    <button
                                        className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                                        onClick={(event) => handleDelete(event, blog._id)}
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
                                            Create Blog
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
                                            <label className="block text-gray-700 font-bold mb-2">Title :</label>
                                            <input type="text" name="title" onChange={(event) => handleChange(event)} ></input>
                                        </div>
                                        <div class="mb-3">
                                            <label
                                                for="formFile"
                                                class="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
                                            >Click here to upload image</label
                                            >
                                            <input
                                                class="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                                                type="file"
                                                id="formFile"
                                                onChange={(event) => onUpload(event)} />
                                        </div>
                                        <img src={selectedFile}></img>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 font-bold mb-2">Content :</label>
                                            <input type="text" name="content" onChange={(event) => handleChange(event)} ></input>
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