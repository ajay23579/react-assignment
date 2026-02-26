import React, { useState } from 'react'
import '../styles/StudentForm.css'
const StudentForm = ({onAdd, allStudent}) => {
    const [sid,setSid]=useState('')
    const [name,setName]=useState('')
    const [course,setCourse]=useState('')
    const [batch,setBatch]=useState('')
    const [gpa,setGpa]=useState('')
    const [isAbsent,setIsAbsent]=useState('')
    const handleSubmit=(e)=>{
        e.preventDefault();
        const isDuplicate = (allStudent || []).some(s => s.id === sid);
        
        if(!sid||!name||!course) return alert("Please Enter Name course and SID field ")
        if (isDuplicate) {
        alert(`Error adding student: SID "${sid}" already exists`);
        return;
        }
        onAdd({
            id: Date.now().toString(36),
            sid:parseInt(sid),
            name,
            course,
            batch,
            gpa:parseFloat(gpa)||0,
            isAbsent,
        })
        setSid('')
        setName('')
        setCourse('')
        setGpa('')
        setBatch('')
        setIsAbsent(false)
        
    }
  return (
    <form className="form" onSubmit={handleSubmit}>
         <label>
            SID
            <input type='number' value={sid} onChange={(e)=>setSid(e.target.value)}   placeholder="SID" />
        </label>
        <label>
            Name
            <input type='text' value={name} onChange={(e)=>setName(e.target.value)}   placeholder="Name" />
        </label>

        <label>
            Batch
            <input type='text' value={batch} onChange={(e)=>setBatch(e.target.value)}  placeholder="Batch" />
        </label>

        <label>
            Course
            <input type='text' value={course} onChange={(e)=>setCourse(e.target.value)}   placeholder="Course" />
        </label>

        <label>
            GPA
            <input type="number" value={gpa} onChange={(e)=>setGpa(e.target.value)}  step="0.01" placeholder="GPA" />
        </label>

        <label className="checkbox">
            Absent
            <input type="checkbox" value={isAbsent} onChange={(e)=>setCourse(e.target.value)}  />
        </label>
        <button type="submit" className="submit-btn">Submit</button>
    </form>
  )
}

export default StudentForm