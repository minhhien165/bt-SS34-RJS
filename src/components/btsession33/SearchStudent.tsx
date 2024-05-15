import React from 'react'

export default function SearchStudent() {

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    console.log(e.target.value);
    
  }
  return (
    <div>
      <input placeholder='Tìm kiếm theo tên hoặc email' onChange={handleChange} type="search" />
    </div>
  )
}
