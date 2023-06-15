import {React,useState} from 'react'
import "./sidebar.scss"
import {FaTools} from "react-icons/fa"
import {HiMenuAlt3} from "react-icons/hi"
import menu from '../../data/sidebar'//this is JSON file that containts sidebar details with icon 
import Sidebaritem from './Sidebaritem'
import { useNavigate } from 'react-router-dom'

//props from App.js
const Sidebar = ({children}) => {

    const [isOpen, setIsOpen] = useState(true)
    const toggle=()=>{
        setIsOpen(!isOpen)
    }

    const navigate=useNavigate()

    const goHome=()=>{
        navigate("/")
    }

  return (
    <div className='layout'>
        <div className="sidebar" style={{width:isOpen?"230px":"60px"}}>
            
            <div className="top_section">
                <div className="logo" style={{display:isOpen ? "block":"none"}}>
                <FaTools size={32} style={{cursor:"pointer"}} onClick={goHome}/>
                </div>
                <div className='bars' style={{marginLeft:isOpen ? "120px":"0px"}}>
                <HiMenuAlt3 size={30} onClick={toggle}/>
                </div>
            </div>
        
        {menu.map((item,i)=>{
            return  <Sidebaritem key={i} item={item} isOpen={isOpen}/>
        })}
       
        </div>
        <main style={{paddingLeft: isOpen ? "230px" :"60px",transition:"all .5s"}}>{children}</main>
    </div>
  )
}

export default Sidebar