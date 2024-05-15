import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
//định nghĩa kiểu dữ liệu
type Student = {
  name: string;
  id: string;
  studentCode: string;
  birth: string;
  email: string;
  status:boolean;
};

type AddStudentProps = {
  students: Student[];
  addStudent: (student: Student) => void;
};

export default function AddStudent({ students, addStudent }: AddStudentProps) {

  const [showForm, setShowForm] = useState<boolean>(false);
  const [newStudent, setNewStudent] = useState<Student>({
    name: '',
    id: uuidv4(),
    studentCode: '',
    birth: '',
    email: '',
    status:true
  });

  //HÀM hiển thị form
  const handleAddStudent = () => {
    setShowForm(!showForm);
  };

  //hàm lấy giá trị trong input gán cho newStudent
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  //hàm lưu newStudent và cập nhật lại các ô input
  const handleSubmit = () => {
    addStudent(newStudent);
    setNewStudent({ name: '', id: '', studentCode: '', birth: '', email: '' ,status:true});
    setShowForm(false);
  };

  return (
    <div>
      <button onClick={handleAddStudent} type="button" className="btn btn-primary">Thêm mới sinh viên</button>
      {showForm && (
        <div className="overlay">
          <div className='form-add-student'>
            <div className='button-close'>
              <span><h5>Thêm mới sinh viên</h5></span>
              <button type="button" className="btn-close" aria-label="Close" onClick={handleAddStudent}></button>
            </div>
            <label htmlFor="studentCode">Mã sinh viên</label>
            <input type="text" name="studentCode" value={newStudent.studentCode} onChange={handleChange} />
            <label htmlFor="name">Tên sinh viên</label>
            <input type="text" name="name" value={newStudent.name} onChange={handleChange} />
            <label htmlFor="birth">Ngày sinh</label>
            <input type="date" name="birth" value={newStudent.birth} onChange={handleChange} />
            <label htmlFor="email">Email</label>
            <input type="email" name="email" value={newStudent.email} onChange={handleChange} />
            <div className='button-form'>
              <button type="button" className="btn btn-light" onClick={handleAddStudent}>Hủy</button>
              <button type="button" className="btn btn-primary" onClick={handleSubmit}>Thêm mới</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}