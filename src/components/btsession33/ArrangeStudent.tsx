import React from 'react'

export default function ArrangeStudent() {

  const handleChange = (e:React.ChangeEvent<HTMLSelectElement>)=>{
    console.log(e.target.value);
    
  }
  return (
    <div>
      <select onChange={handleChange} name="" id="">
        <option value="Sắp xếp theo tuổi">Sắp xếp theo tuổi</option>
        <option value="Khác">Khác</option>
      </select>
    </div>
  )
}
