import { useGlobalContext } from "./context";
import Loading from "./Loading";
import SetupForm from "./SetupForm";
import Modal from "./Modal";

import "./main.css";

const Main = () => {
  const { isSettingUp, isLoading, questions, index, isCorrect, error, quiz, isModalOpen } = useGlobalContext();

  if (isSettingUp) {
    return <SetupForm />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return <div>Main</div>;
};

export default Main;
