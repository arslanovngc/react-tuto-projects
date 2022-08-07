import "axios";
import { useState, useContext, useEffect, createContext } from "react";

const Endpoint = "https://opentdb.com/api.php?";

const url = "";
const tempUrl = "https://opentdb.com/api.php?amount=15&category=18&difficulty=easy&type=boolean";
const table = {
  computers: 18,
  sports: 21,
  history: 24,
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [isSettingUp, setIsSettingUp] = useState(true),
    [isLoading, setIsLoading] = useState(false),
    [questions, setQuestions] = useState([]),
    [index, setIndex] = useState(0),
    [correctAnswers, setIsCorrect] = useState(0),
    [error, setError] = useState(false),
    [quiz, setQuiz] = useState({
      amount: 15,
      category: "computers",
      difficulty: "easy",
    }),
    [isModalOpen, setIsModalOpen] = useState(false);

  const fetchQuestions = async (url) => {
    setIsLoading(true);
    setIsSettingUp(false);

    const resp = await axios(url).catch((e) => console.log(e));

    if (resp) {
      const data = resp.data.results;

      if (data.length > 0) {
        setQuestions(data);
        setIsLoading(false);
        setIsSettingUp(false);
        setError(false);
      } else {
        setIsSettingUp(true);
        setError(true);
      }
    } else {
      setIsSettingUp(true);
    }
  };

  const nextQuestion = () => {
    setIndex((oldIndex) => {
      const index = oldIndex + 1;
      if (index > questions.length - 1) {
        openModal();
        return 0;
      } else {
        return index;
      }
    });
  };

  const checkAnswer = (value) => {
    if (value) {
      setIsCorrect((old) => old + 1);
    }
    nextQuestion();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { amount, category, difficulty } = quiz;

    const url = `${Endpoint}amount=${amount}$difficulty=${difficulty}&category=${table[category]}&type=boolean`;
    fetchQuestions(url);
  };

  const providerValue = {
    isSettingUp,
    isLoading,
    questions,
    index,
    isCorrect,
    error,
    quiz,
    isModalOpen,
    handleSubmit,
    nextQuestion,
    checkAnswer,
    openModal,
  };

  return <AppContext.Provider value={providerValue}>{children}</AppContext.Provider>;
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { useGlobalContext, AppProvider };
