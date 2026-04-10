import { Button, Modal } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

const QuizPage = () => {

    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    const topic = searchParams.get('topic');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [result,setResult]=useState(null);
    


    const showModal = () => {
        setIsModalOpen(true);
    };


    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const getQuestions = async () => {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/quiz/questions?category=${category}&topic=${topic}`)
            console.log(res.data.questions);
            setQuestions(res.data.questions);
            setResult(res.data.result);

        }

        getQuestions()
    }, [])

    const handleCheckQuestion = (question) => {
        const res = axios.post(`${import.meta.env.VITE_BASE_URL}/api/quiz/check`,
            {

                answers: [
                    {
                        questionId: question._id,
                        selectedOption: question.options
                    }
                ]

            },
            { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        )
        console.log(res.data);

    }

    return (
        <div>

            <h1 className='text-4xl uppercase text-center mt-10 px-8' >Quiz</h1>



            <div className='mx-auto px-7 py-8 border border-white-400 rounded-xl px-7 py-7'>
                {
                    questions.map((question) => (
                        <div key={question._id}>

                            <p>{question.question}</p>

                            {
                                question?.options?.map((option) => (
                                    <div key={option} className='flex gap-5'>
                                        <input type="radio" name="option" id="option" />
                                        <label htmlFor="option">{option}</label>
                                    </div>
                                ))
                            }


                            <Button size="large" onClick={() => { handleCheckQuestion(question); showModal() }} className='mt-5'>Submit</Button>

                        </div>
                    ))
                }
            </div>
            <Modal
                title="Basic Modal"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                

                { 
                    result  &&(
                        <>
                        <p>{result.isCorrect}</p>
                        <p>{result.correctOption}</p>
                        </>
                    )
                } 
               
            </Modal>


        </div>
    )
}

export default QuizPage