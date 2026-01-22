import { useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../../axiosConfig";
import styles from "./QueDetailPostAns.module.css";

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

const EditDelete = ({ question, setQuestion, user }) => {
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(question.title);
  const [editDescription, setEditDescription] = useState(question.description);

const handleEdit = async () => {
  try {
    await instance.put(
      `/questions/${question.question_id}`,
      {title: editTitle,
        description: editDescription,
      });

    const res = await instance.get(`/questions/${question.question_id}`);
    setQuestion(res.data.question);
    setIsEditing(false);
    alert("Question updated successfully");
  } catch (error) {
    console.error(error.response || error);
    alert(error.response?.data?.msg || "Edit failed");
  }
};


const handleDelete = async () => {
  if (!window.confirm("Delete this question?")) return;

  try {
    await instance.delete(`/questions/${question.question_id}`);

    alert("Question deleted successfully");
    navigate("/");
  } catch (error) {
    console.error(error.response || error);
    alert(error.response?.data?.msg || "Delete failed");
  }
};

  // Check if current user is the owner of the question
  const isOwner = user && user.userId === question.user_id;

  return (
    <div className={styles.questionCard}>
      <div className={styles.questionHeader}>
        <div className={styles.avatarCircle}>
          {getInitial(question.username)}
        </div>
        <div className={styles.questionMeta}>
          <span className={styles.questionAuthor}>{question.username}</span>
          <span className={styles.questionTime}>{formatDate(question.created_at)}</span>
        </div>
      </div>

      {isEditing ? (
        <div className={styles.editBox}>
          <input
            type="text"
            className={styles.editTitle}
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Question title..."
          />
          <textarea
            className={styles.editTextarea}
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="Question description..."
          />
          <div className={styles.actionRow}>
            <button className={styles.saveBtn} onClick={handleEdit}>Save</button>
            <button className={styles.cancelBtn} onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <h1 className={styles.questionTitle}>{question.title}</h1>
          <p className={styles.questionDesc}>{question.description}</p>
          {isOwner && (
            <div className={styles.actionRow}>
              <button className={styles.editBtn} onClick={() => setIsEditing(true)}>Edit</button>
              <button className={styles.deleteBtn} onClick={handleDelete}>Delete</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EditDelete;
