import { useEffect, useState } from 'react';
import './App.css';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import StudentCardList from './components/StudentCardList';
import StudentCard from './components/StudentCard';

function App() {
  const [view, setView] = useState('cards');
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('studentData');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('studentData', JSON.stringify(students));
  }, [students]);

  // Add a new student
  const addStudent = (newStudent) => {
    setStudents([...students, newStudent]);
    setView('cards');
  };

  // Update a student
  const updateStudent = (sid, updateData) => {
    setStudents(
      students.map((s) => (s.sid === sid ? { ...s, ...updateData } : s))
    );
  };

  // Delete student
  const deleteStudent = (sid) => {
    setStudents(students.filter((s) => s.sid !== sid));
  };

  // Toggle absent
  const toggleIsAbsent = (sid) => {
    setStudents(
      students.map((s) =>
        s.sid === sid ? { ...s, absent: !s.absent } : s
      )
    );
  };

  return (
    <div className="main">
      <header className="topbar">
        <h1 className="heading">Student Portal</h1>
        <nav className="nav-group">
          <button
            onClick={() => setView('cards')}
            className={`toggle-btn ${view === 'cards' ? 'active' : ''}`}
          >
            Cards
          </button>
          <button
            onClick={() => setView('list')}
            className={`toggle-btn ${view === 'list' ? 'active' : ''}`}
          >
            Student List
          </button>
          <button
            onClick={() => setView('add')}
            className={`toggle-btn ${view === 'add' ? 'active' : ''}`}
          >
            Add Student
          </button>
        </nav>
      </header>

      <main>
        {/* Add Student Form */}
        {view === 'add' && (
          <div className="form-container">
            <StudentForm onAdd={addStudent} allStudents={students} />
          </div>
        )}

        {/* Cards View */}
        {view === 'cards' && (
  <div className="main-content">
    <StudentCardList
      students={students}
      toggleAbsent={toggleIsAbsent}
      deleteStudent={deleteStudent}
      updateStudent={updateStudent}
    />
  </div>
)}

        {/* Table/List View */}
        {view === 'list' && (
          <div className="list-container">
            <StudentList
              students={students}
              setStudents={setStudents}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;