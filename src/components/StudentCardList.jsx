import React from "react";
import StudentCard from "./StudentCard";

function StudentCardList({ students, toggleAbsent, deleteStudent, updateStudent }) {
  if (!students || students.length === 0) {
    return <p style={{textAlign:"center", marginTop:"2rem"}}>No students available. Add some!</p>;
  }

  // Find max GPA
  const maxGPA = Math.max(...students.map(s => parseFloat(s.gpa) || 0));

  return (
    <div className="cards-container">
      {students.map(student => (
        <StudentCard
          key={student.sid}
          student={student}
          maxGPA={maxGPA}
          toggleAbsent={toggleAbsent}
          handleDelete={deleteStudent}
          updateStudent={updateStudent}
        />
      ))}
    </div>
  );
}

export default StudentCardList;