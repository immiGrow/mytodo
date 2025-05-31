import React from 'react'
import { RiDeleteBinFill } from "react-icons/ri";
import { RiEditBoxFill } from "react-icons/ri";
import { IoTodaySharp } from "react-icons/io5";
import { SiNorton } from "react-icons/si";
import { MdCelebration } from "react-icons/md";

function Todo({handleComplete,item,deleteTodo,editTodo}) {
  return (
    <div key={item.id} className="todo  w-full bg-[#f06774]  rounded-lg items-center p-2 sm:p-3">
                                <div className="timing  w-full  flex justify-between items-center py-0.5 ">
                                  <div className="left text-[7px] sm:text-[9px] bg-[#bb343c] rounded-xl text-white flex items-center py-1 px-2 gap-1 ">
                                  <IoTodaySharp className=''/><span>{item.isDate}</span> 
                                    
                                  </div>
                                  {
                                    item.isDone? <div className="done  text-[7px] sm:text-[9px] sm:text-xs bg-[#bb343c] rounded-xl text-white flex items-center py-1 px-2 gap-1 ">
                                  <MdCelebration  className=''/><span>Done</span> 
                                    
                                  </div>:
                                <div onClick={()=>handleComplete(item.id)} className="right text-sm sm:text-lg mr-2 text-slate-900 hover:text-black cursor-pointer"><SiNorton /></div>
                                }
                                  </div>
                  <div className="flex justify-between">
    
                <div className="text w-[90%] text-slate-900 px-2 py-0.5">{item.todo}</div>
                <div className="btns flex gap-2 text-sm sm:text-lg items-center ">
                  <button onClick={()=>editTodo(item.id)}><RiEditBoxFill className='text-slate-900 hover:text-black cursor-pointer' /></button>
                  <button onClick={()=>deleteTodo(item.id)}><RiDeleteBinFill className='text-slate-900 hover:text-black cursor-pointer' /></button>
    
                </div>
                  </div>
    
              </div>
  )
}

export default Todo