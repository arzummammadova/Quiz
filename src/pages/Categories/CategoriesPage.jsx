import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const CategoriesPage = () => {

    const { category } = useParams();
    console.log(category);

    const [topics, setTopics] = useState([])
    const navigate = useNavigate();




    useEffect(() => {

        const getTopics = async () => {

            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/quiz/topics/${category}`)
            const topicsData = res.data.topics;
            setTopics(topicsData);
            console.log(topicsData)

        }
        getTopics();

    }, [])


    const handleGetQuestion = ({ category, topic }) => {
        navigate(`/quiz/questions?category=${category}&topic=${topic}`);
       

    }



    return (
        <div>

            <h1 className='text-4xl uppercase text-center'>{category}</h1>
            <div className='flex flex-wrap px-6 py-9 gap-4 justify-center'>
                {
                    topics.map((topic) => (
                        <div key={topic._id} onClick={() => { handleGetQuestion({ category, topic }) }} className='w-[500px] p-10 rounded-3xl shadow-lg text-2xl font-bold  uppercase text-center cursor-pointer hover:scale-105 transition-all duration-300 hover:bg-blue-500 hover:text-white'>
                            {topic}
                        </div>
                    ))
                }

            </div>




        </div>
    )
}

export default CategoriesPage