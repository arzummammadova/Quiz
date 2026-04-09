export const quizData = {
  ui: {
    selectTitle: "Choose a category",
    back: "Back",
    result: "Results",
    score: "Your score",
    question: "Question"
  },
  categories: {
    frontend: [
      { id: 1, question: "What is the purpose of React's useState hook?", options: ["To fetch data", "To manage state", "To handle routing"], correctAnswer: "To manage state" },
      { id: 2, question: "Which CSS property is used for flexbox?", options: ["float", "display", "position"], correctAnswer: "display" },
      { id: 3, question: "What does JSX stand for?", options: ["JavaScript XML", "Java Syntax Extension", "JSON Xylophone"], correctAnswer: "JavaScript XML" },
      { id: 4, question: "Which hook is used for side effects?", options: ["useMemo", "useEffect", "useReducer"], correctAnswer: "useEffect" },
      { id: 5, question: "What is the virtual DOM?", options: ["A direct copy of the HTML", "A lightweight copy of the real DOM", "A server-side database"], correctAnswer: "A lightweight copy of the real DOM" },
      { id: 6, question: "Which command creates a Vite project?", options: ["npm create vite", "npx create-react-app", "npm start"], correctAnswer: "npm create vite" },
      { id: 7, question: "How do you pass data to a child component?", options: ["Using state", "Using props", "Using hooks"], correctAnswer: "Using props" },
      { id: 8, question: "What is the purpose of React.memo?", options: ["State management", "Component memoization", "Data fetching"], correctAnswer: "Component memoization" },
      { id: 9, question: "Which attribute is used to set a unique key in lists?", options: ["id", "key", "ref"], correctAnswer: "key" },
      { id: 10, question: "What is a 'fragment' in React?", options: ["A DOM node", "A way to group elements without extra DOM nodes", "A CSS selector"], correctAnswer: "A way to group elements without extra DOM nodes" }
    ],
    backend: [
      { id: 1, question: "Which HTTP method is used to create a resource?", options: ["GET", "POST", "DELETE"], correctAnswer: "POST" },
      { id: 2, question: "What is Node.js?", options: ["A DB", "A JS Runtime", "A CSS Library"], correctAnswer: "A JS Runtime" },
      { id: 3, question: "What does 'S' in SOLID stand for?", options: ["Simple", "Single Responsibility", "Server"], correctAnswer: "Single Responsibility" },
      { id: 4, question: "What is an API?", options: ["Interface", "Database", "Browser"], correctAnswer: "Interface" },
      { id: 5, question: "Which code represents 'Not Found'?", options: ["200", "404", "500"], correctAnswer: "404" },
      { id: 6, question: "What is SQL used for?", options: ["Styling", "Databases", "Routing"], correctAnswer: "Databases" },
      { id: 7, question: "What is Express?", options: ["A browser", "A web framework for Node.js", "A language"], correctAnswer: "A web framework for Node.js" },
      { id: 8, question: "Which status code means 'Unauthorized'?", options: ["401", "403", "404"], correctAnswer: "401" },
      { id: 9, question: "What is Middleware in Express?", options: ["Database", "Functions during request-cycle", "A UI component"], correctAnswer: "Functions during request-cycle" },
      { id: 10, question: "What is the primary use of JWT?", options: ["Styling", "Authentication", "Image compression"], correctAnswer: "Authentication" }
    ]
  }
};