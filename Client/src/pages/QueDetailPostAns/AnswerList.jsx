import { useState, useContext } from "react";
import styles from "./QueDetailPostAns.module.css";
import instance from "../../axiosConfig";
import { AppState } from "../../App";

// Helper function to get first letter of username
const getInitial = (username) => {
  return username ? username.charAt(0).toUpperCase() : "?";
};

// Helper function to format date
const formatDate = (dateString) => {
  if (!dateString) return "Unknown";
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) return "just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  
  return date.toLocaleDateString();
};

const AnswerList = ({ answers, refreshAnswers }) => {
  const { user } = useContext(AppState);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  if (answers.length === 0) {
    return <p className={styles.noAnswer}>No answers yet.</p>;
  }

  const handleEdit = (answer) => {
    setEditingId(answer.answer_id);
    setEditText(answer.answer);
  };

  const handleSave = async (answerId) => {
    if (!editText.trim()) {
      alert("Answer cannot be empty");
      return;
    }

    try {
      await instance.put(`/answers/${answerId}`, {
        answer: editText.trim(),
      });
      setEditingId(null);
      setEditText("");
      refreshAnswers();
      alert("Answer updated successfully");
    } catch (error) {
      console.error(error.response || error);
      alert(error.response?.data?.msg || "Failed to update answer");
    }
  };

  const handleDelete = async (answerId) => {
    if (!window.confirm("Delete this answer?")) return;

    try {
      await instance.delete(`/answers/${answerId}`);
      refreshAnswers();
      alert("Answer deleted successfully");
    } catch (error) {
      console.error(error.response || error);
      alert(error.response?.data?.msg || "Failed to delete answer");
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditText("");
  };

  return answers.map((ans) => {
    const isOwner = user && user.userId === ans.user_id;
    const isEditing = editingId === ans.answer_id;

    return (
      <div className={styles.answerWrapper} key={ans.answer_id}>
        <div className={styles.answerLeft}>
          <div className={styles.avatarCircle}>
            {getInitial(ans.username)}
          </div>
          <div className={styles.answerMeta}>
            <p className={styles.username}>{ans.username}</p>
            <span className={styles.answerTime}>{formatDate(ans.created_at)}</span>
          </div>
        </div>
        <div className={styles.answerRight}>
          {isEditing ? (
            <div className={styles.editBox}>
              <textarea
                className={styles.editTextarea}
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                placeholder="Your answer..."
              />
              <div className={styles.actionRow}>
                <button className={styles.saveBtn} onClick={() => handleSave(ans.answer_id)}>Save</button>
                <button className={styles.cancelBtn} onClick={handleCancel}>Cancel</button>
              </div>
            </div>
          ) : (
            <>
              <p className={styles.answerText}>{ans.answer}</p>
              {isOwner && (
                <div className={styles.actionRow}>
                  <button className={styles.editBtn} onClick={() => handleEdit(ans)}>Edit</button>
                  <button className={styles.deleteBtn} onClick={() => handleDelete(ans.answer_id)}>Delete</button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  });
};

export default AnswerList;
