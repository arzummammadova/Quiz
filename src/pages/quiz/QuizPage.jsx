import { Button, Modal } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
const QuizPage = () => {
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    const topic = searchParams.get('topic');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [result, setResult] = useState(null);
    const [selectedAnswers, setSelectedAnswers] = useState({})
    const [modalLoading, setModalLoading] = useState(false)

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

    const handleCheckQuestion = async (question) => {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/quiz/check`,
            {

                answers: [
                    {
                        questionId: question._id,
                        selectedOption: selectedAnswers[question._id]

                    }
                ]

            },
            { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        )
        console.log(`res.data`, res.data.results);
        setResult(res.data);

    }

    return (
        <div className='text-white'>

            <h1 className='text-4xl uppercase text-center mt-10 px-8' >Quiz</h1>

            <Tabs defaultValue="account" className="w-full mx-auto px-4 py-7">
                <TabsList >
                    {
                        questions.map((question, index) => (
                            <TabsTrigger key={index} value={`q-${index}`}>{index + 1}</TabsTrigger>
                        ))
                    }

                </TabsList>
                {
                    questions.map((question, index) => (
                        <TabsContent value={`q-${index}`} key={index}>

                            <p>{question.question}</p>
                            {/* {console.log(question.options)} */}

                            {
                                question?.options?.map((option, index) => (
                                    <div key={index} className='flex gap-5'>
                                        <input
                                            type="radio"
                                            name={`option-${question._id}`}
                                            checked={selectedAnswers[question._id] === index + 1}
                                            onChange={() => {
                                                setSelectedAnswers(prev => ({
                                                    ...prev,
                                                    [question._id]: index + 1
                                                }))
                                            }}
                                        />

                                        <label htmlFor="option">{index + 1}.{option}</label>
                                    </div>
                                ))
                            }


                            <Button size="large" onClick={() => { handleCheckQuestion(question); showModal() }} className='mt-5'>Submit</Button>

                        </TabsContent>
                    ))
                }


            </Tabs>




            <Modal
                title="Result"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}

            >


                {
                    result && (
                        <>
                            {result.results.map((result, index) => (
                                <p className={`${result.isCorrect} ? 'text-green-500' : 'text-red-500'`} key={index}>{result.isCorrect ? "Correct" : "Incorrect"}</p>
                            ))}
                            {/* <p>{result.results[0].correctOption}</p> */}
                        </>
                    )
                }

            </Modal>


        </div>
    )
}

export default QuizPage