import React, { useState } from 'react';
import AddStudent from './AddStudent';
import ArrangeStudent from './ArrangeStudent';
import SearchStudent from './SearchStudent';
import Pagination from './Paganitation';
import TableStudent from './TableStudent';

//gọi kiểu dữ liệu cho student
type Student = {
  name: string;
  id: string;
  studentCode: string;
  birth: string;
  email: string;
  status:boolean;
};

export default function Students() {
    //gọi mảng students trên local
  const [students, setStudents] = useState<Student[]>(() => {
    const studentLocal = localStorage.getItem("students");
    return studentLocal ? JSON.parse(studentLocal) : [];
  });

  //Hàm lưu dữ liệu lên local
  const saveLocal = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  //Hàm thêm student vào mảng và lưu lên local
  const addStudent = (student: Student) => {
    const newStudents = [...students, student];
    setStudents(newStudents);
    saveLocal("students", newStudents);
  };

  //Hàm update cho mảng student
  const updateStudents = (updatedStudents: Student[]) => {
    setStudents(updatedStudents);
    saveLocal("students", updatedStudents);
  };

  return (
    <div className='students'>
      <AddStudent students={students} addStudent={addStudent} />
      <div className='arrangeAndSearch'>
        <ArrangeStudent />
        <SearchStudent />
      </div>
      <br />
      <TableStudent students={students} setStudents = {updateStudents}/>
      <Pagination />
    </div>
  );
}
