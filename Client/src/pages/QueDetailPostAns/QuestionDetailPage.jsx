import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import instance from "../../axiosConfig";
import styles from "./QueDetailPostAns.module.css";  
import EditDelete from "./EditDelete";
import AnswerList from "./AnswerList";
import PostAnswerForm from "./PostAnswerForm";
import { AppState } from "../../App";

const QuestionDetailPage = () => {
  const { question_id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AppState);
  
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);

  // Auth
  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/login");
  }, [navigate]);

  // Fetch single question
  useEffect(() => {
    instance.get(`/questions/${question_id}`).then((res) => {
      setQuestion(res.data.question);
    });
  }, [question_id]);

  // Fetch all answers for that question.
  const fetchAnswers = async () => {
    const res = await instance.get(`/answers/${question_id}`);
    setAnswers(res.data.answers || []);
  };

  useEffect(() => {
    fetchAnswers();
  }, [question_id]);

  if (!question) {
    return (
      <div className={styles.loadingContainer}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <EditDelete question={question} setQuestion={setQuestion} user={user} />

      <div className={styles.answersSection}>
        <h2 className={styles.sectionTitle}>
          Answers ({answers.length})
        </h2>
        <AnswerList answers={answers} refreshAnswers={fetchAnswers} />
      </div>

      <PostAnswerForm question_id={question_id} refreshAnswers={fetchAnswers} />
    </div>
  );
};

export default QuestionDetailPage;
