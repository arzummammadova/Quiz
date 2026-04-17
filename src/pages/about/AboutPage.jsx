import React from 'react';

const AboutPage = () => {
  const highlights = [
    {
      title: 'Fast Quiz Flow',
      description:
        'Choose a category, pick a topic, and start answering questions with a clean and focused interface.',
    },
    {
      title: 'Progress Focused',
      description:
        'The platform is built to help users practice consistently and improve with every quiz session.',
    },
    {
      title: 'Modern Stack',
      description:
        'Built with React, Redux Toolkit, and Vite for a responsive and reliable user experience.',
    },
  ];

  return (
    <section className="w-full text-white">
      <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-[#16171d] p-8 shadow-2xl md:p-12">
        <p className="mb-2 text-sm uppercase tracking-[0.35em] text-cyan-300">
          About Quiz App
        </p>
        <h1 className="mb-4 text-3xl font-black tracking-tight md:text-5xl">
          Learn Faster Through Focused Quizzes
        </h1>
        <p className="max-w-3xl text-base leading-7 text-gray-300 md:text-lg">
          This project helps users sharpen knowledge in frontend and backend topics
          with short, practical quizzes. It is designed for quick sessions and
          steady progress rather than long, distracting study flows.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {highlights.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-white/10 bg-[#1d1f27] p-5"
            >
              <h2 className="mb-2 text-lg font-bold text-white">{item.title}</h2>
              <p className="text-sm leading-6 text-gray-300">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
