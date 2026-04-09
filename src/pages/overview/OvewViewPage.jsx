import React, { useState } from 'react';
import { Card, Button, Progress, ConfigProvider, theme, Typography } from 'antd';
import { quizData } from "../../data/quizData";

const { Title, Text } = Typography;

const OvewViewPage = () => {
  const [category, setCategory] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const { ui, categories: categoriesAvailable } = quizData;
  const questions = category ? categoriesAvailable[category] : [];

  const handleStart = (cat) => {
    setCategory(cat);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsFinished(false);
  };

  const handleExit = () => {
    setCategory(null);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsFinished(false);
  };

  const handleAnswerClick = (option) => {
    if (selectedAnswer) return;
    const isCorrect = option === questions[currentQuestion].correctAnswer;
    setSelectedAnswer(option);
    if (isCorrect) setScore(prev => prev + 1);

    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
      } else {
        setIsFinished(true);
      }
    }, 800);
  };

  const getButtonClass = (option) => {
    const base = "h-12 md:h-14 text-sm md:text-base rounded-xl transition-all duration-300 border-2 w-full font-semibold mb-3 ";
    if (!selectedAnswer) return base + "bg-gray-50 border-gray-200 text-slate-700 hover:border-indigo-500 hover:bg-white";

    const isCorrect = option === questions[currentQuestion].correctAnswer;
    if (option === selectedAnswer) {
      return isCorrect ? base + "bg-green-500 border-green-500 text-white" : base + "bg-red-500 border-red-500 text-white";
    }
    return isCorrect ? base + "bg-transparent border-green-500 text-green-600" : base + "bg-gray-50 border-transparent text-gray-300 opacity-50";
  };

  return (
    <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>
      <div className="relative flex-1 flex flex-col h-[100dvh] overflow-hidden font-sans">
        
        <div className="h-20 flex items-center px-6 md:px-12 shrink-0">
          {category && (
            <Button
              type="text"
              onClick={handleExit}
              className="!text-gray-400 hover:!text-white flex items-center p-0 text-base border-none shadow-none transition-colors"
            >
              <span className="mr-2 text-xl">←</span> {ui.back}
            </Button>
          )}
        </div>

        <main className="flex-1 flex items-center justify-center p-4 min-h-0">
          {!category ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
              {Object.keys(categoriesAvailable).map(catKey => (
                <Card
                  key={catKey}
                  hoverable
                  onClick={() => handleStart(catKey)}
                  className="w-full cursor-pointer shadow-2xl border-none rounded-3xl bg-white"
                  styles={{ 
                    body: { 
                      padding: '40px 24px', 
                      textAlign: 'center',
                      minHeight: '200px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    } 
                  }}
                >
                  <Title level={2} className="!text-slate-800 !m-0 font-black uppercase tracking-widest">
                    {catKey}
                  </Title>
                </Card>
              ))}
            </div>
          ) : isFinished ? (
            <Card className="w-full max-w-sm border-none rounded-3xl text-center p-8 shadow-2xl bg-white">
              <Title level={3} className="!text-slate-800 !mb-6">{ui.result}</Title>
              <div className="flex justify-center mb-8">
                <Progress
                  type="circle"
                  percent={Math.round((score / questions.length) * 100)}
                  strokeColor="#6366f1"
                  width={130}
                  format={() => <span className="text-slate-800 text-2xl font-black">{score}/{questions.length}</span>}
                />
              </div>
              <Button
                type="primary"
                block
                onClick={handleExit}
                size="large"
                className="rounded-xl bg-indigo-600 hover:!bg-indigo-700 border-none font-bold h-12"
              >
                {ui.back}
              </Button>
            </Card>
          ) : (
            <Card className="w-full max-w-xl border-none rounded-3xl p-6 md:p-10 shadow-2xl bg-white">
              <div className="text-center mb-6">
                <div className="mb-2">
                  <Text className="text-indigo-600 font-bold uppercase text-[11px] tracking-widest">
                    {category} — {ui.score}: {score}
                  </Text>
                </div>
                <div className="min-h-[90px] flex flex-col items-center justify-center">
                  <span className="text-gray-400 text-xs mb-2 font-normal uppercase tracking-widest">
                    {ui.question} {currentQuestion + 1} / {questions.length}
                  </span>
                  <Title level={4} className="!text-slate-800 !m-0 text-center leading-snug">
                    {questions[currentQuestion].question}
                  </Title>
                </div>
              </div>
              <div className="flex flex-col">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerClick(option)}
                    className={getButtonClass(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </Card>
          )}
        </main>

        <div className="h-16 flex items-center justify-center shrink-0">
          {category && !isFinished && (
            <div className="w-full max-w-xl px-10">
              <Progress
                percent={Math.round(((currentQuestion + 1) / questions.length) * 100)}
                showInfo={false}
                strokeColor="#6366f1"
                trailColor="#2d313d"
                strokeWidth={6}
              />
            </div>
          )}
        </div>
      </div>
    </ConfigProvider>
  );
};

export default OvewViewPage;