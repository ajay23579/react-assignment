import React from "react";
import "../styles/StudentCard.css";

function StudentCard({ student, maxGPA, toggleAbsent, handleDelete, updateStudent }) {
  const { sid, name, batch, course, gpa, absent } = student;

  return (
    <div className="student-card">
      <div className="card-top">
        <span className="card-name">{name}</span>
        {parseFloat(gpa) === maxGPA && <span className="top-badge">🏆</span>}
      </div>

      <div className="card-info">
        <span><strong>SID:</strong> {sid}</span>
        <span><strong>Batch:</strong> {batch}</span>
        <span><strong>Course:</strong> {course}</span>
        <span className="gpa"><strong>GPA:</strong> {gpa}</span>
        <span className={`status ${absent ? "absent" : "present"}`}>{absent ? "Absent" : "Present"}</span>
      </div>

      <div className="card-actions">
        <button className="toggle-btn" onClick={() => toggleAbsent(sid)}>
          {absent ? "Mark Present" : "Mark Absent"}
        </button>
        <button className="delete-btn" onClick={() => handleDelete(sid)}>Delete</button>
      </div>
    </div>
  );
}

export default StudentCard;