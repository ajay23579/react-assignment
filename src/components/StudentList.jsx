import { useState } from "react";
import '../styles/StudentList.css';

function StudentList({ students, setStudents }) {
  const [search, setSearch] = useState("");
  const [filterAbsent, setFilterAbsent] = useState("all");
  const [sortBy, setSortBy] = useState("sid");

  const handleDelete = (sid) =>
    setStudents(students.filter(s => s.sid !== sid));

  const toggleAbsent = (sid) =>
    setStudents(students.map(s => s.sid === sid ? { ...s, absent: !s.absent } : s));

  const updateName = (sid, name) =>
    setStudents(students.map(s => s.sid === sid ? { ...s, name } : s));

  const maxGPA = students.length ? Math.max(...students.map(s => parseFloat(s.gpa) || 0)) : 0;

  const visibleStudents = students
    .filter(s =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      String(s.sid).toLowerCase().includes(search.toLowerCase())
    )
    .filter(s =>
      filterAbsent === "all" ? true :
      filterAbsent === "absent" ? s.absent : !s.absent
    )
    .sort((a, b) =>
      sortBy === "sid"
        ? String(a.sid).localeCompare(String(b.sid))
        : a.name.localeCompare(b.name)
    );

  return (
    <div className="student-list-container">

      {/* Controls */}
      <div className="controls">
        <input
          placeholder="Search SID or Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select onChange={(e) => setFilterAbsent(e.target.value)}>
          <option value="all">All</option>
          <option value="present">Present</option>
          <option value="absent">Absent</option>
        </select>
        <select onChange={(e) => setSortBy(e.target.value)}>
          <option value="sid">Sort by SID</option>
          <option value="name">Sort by Name</option>
        </select>
      </div>

      {/* Header */}
      <div className="row header">
        <span>SID</span>
        <span>Name</span>
        <span>Batch</span>
        <span>Course</span>
        <span>GPA</span>
        <span>Top Performer</span>
        <span>Absent</span>
        <span>Actions</span>
      </div>

      {/* Student rows */}
      {visibleStudents.map(s => (
        <div key={s.sid} className="row">
          <span>{s.sid}</span>

          <input
            value={s.name}
            onChange={(e) => updateName(s.sid, e.target.value)}
          />

          <span>{s.batch}</span>
          <span>{s.course}</span>
          <span>{s.gpa}</span>

          {/* Top Performer Badge */}
          <div style={{display:"flex", justifyContent:"center"}}>
            {parseFloat(s.gpa) === maxGPA && <span className="top-badge">🏆</span>}
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={s.absent}
                onChange={() => toggleAbsent(s.sid)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <button onClick={() => handleDelete(s.sid)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StudentList;