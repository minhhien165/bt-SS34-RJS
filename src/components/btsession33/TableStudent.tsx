import React, { useState } from 'react';

type Student = {
    name: string;
    id: string;
    studentCode: string;
    birth: string;
    email: string;
    status:boolean;
};

type TableStudentProps = {
    students: Student[];
    setStudents: (students: Student[]) => void;
};

export default function TableStudent({ students, setStudents }: TableStudentProps) {
    //Sử lý Chặn sinh viên
    const [showNotification,setNotification] = useState<boolean>(false)
    const [currentStudentId,setCurrentStudentId] = useState<string|null>(null)
    //Sử lý Xóa sinh viên
    const [showNotifiDelete,setShowNotifiDelete] = useState<boolean>(false)
    const [currentStudentIdDelete,setCurrentStudentIdDelete] = useState<string|null>(null)

    //Hàm hiển thị thông báo Chặn (Block)
    const handleBlock = (id:string)=>{
        setCurrentStudentId(id)
        setNotification(true)
    }

    //Hàm Sửa
    const handleFix = (id:string)=>{}

    //hàm Xóa
    const handleDelete = (id:string)=>{
        setCurrentStudentIdDelete(id)
        setShowNotifiDelete(true)
    }

    //hàm Đóng cửa sổ
    const closeModal = ()=>{
        setNotification(false)
        setShowNotifiDelete(false)
    }

    /// Hàm xử lý khi xác nhận chặn
    const confirmBlock = () => {
        if (currentStudentId) {
            const updatedStudents = students.map(student => 
                student.id === currentStudentId ? { ...student, status: false } : student
            );
            setStudents(updatedStudents);
        }
        closeModal();
    };

    //Hàm sử lý xóa Sinh viên
    const confirmDelete = ()=>{
        if(currentStudentIdDelete){
            const updateDelete = students.filter(student => student.id !==currentStudentIdDelete)

            setStudents(updateDelete)
        }
        closeModal();
    }
    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Mã sinh viên</th>
                        <th scope="col">Tên sinh viên</th>
                        <th scope="col">Ngày sinh</th>
                        <th scope="col">Email</th>
                        <th scope="col">Trạng thái</th>
                        <th scope="col">Chức năng</th>
                    </tr>
                </thead>
                <tbody key="table-body">
                    {students.map((student, index) => (
                        <tr key={student.id}>
                            <td>{index + 1}</td>
                            <td>{student.studentCode}</td>
                            <td>{student.name}</td>
                            <td>{student.birth}</td>
                            <td>{student.email}</td>
                            <td>
                                {student.status === true ? (
                                    <button type="button" className="btn btn-success">Đang hoạt động</button>
                                ) : (
                                    <button type="button" className="btn btn-danger">Ngưng hoạt động</button>
                                )}
                            </td>
                            <td style={{display: "flex", flexDirection: "row", gap: "10px"}}>
                                <button onClick={() => handleBlock(student.id)} type="button" className="btn btn-outline-warning">Chặn</button>
                                <button onClick={() => handleFix(student.id)} type="button" className="btn btn-outline-info">Sửa</button>
                                <button onClick={() => handleDelete(student.id)} type="button" className="btn btn-outline-danger">Xóa</button>   
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modals for notifications */}
            {showNotification && (
                <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex={-1}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Chặn sinh viên</h5>
                                <button type="button" className="btn-close" aria-label="Close" onClick={closeModal}></button>
                            </div>
                            <div className="modal-body">
                                <p>Bạn có chắc chắn muốn chặn sinh viên này không?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>Hủy</button>
                                <button type="button" className="btn btn-primary" onClick={confirmBlock}>Xác nhận</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showNotifiDelete && (
                <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex={-1}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Xóa sinh viên</h5>
                                <button type="button" className="btn-close" aria-label="Close" onClick={closeModal}></button>
                            </div>
                            <div className="modal-body">
                                <p>Bạn có chắc muốn xóa sinh viên này không?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>Hủy</button>
                                <button type="button" className="btn btn-primary" onClick={confirmDelete}>Xác nhận</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}