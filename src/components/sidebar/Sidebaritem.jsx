import {React,useState} from 'react'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { NavLink } from 'react-router-dom'

const activeSublink=({isActive})=>(isActive ? "active":"link")
const activeLink=({isActive})=>(isActive ? "active":"link")

//props from sidebar.jsx
const Sidebaritem = ({item,isOpen}) => {
  const [expandMenu, setExpandMenu] = useState(false)



  //checking the side bar has sub-catogery or not
  //this children is from sidebar.js check there
  if(item.children){
    return (
      <div className={expandMenu? "sidebar-item s-parent open": "sidebar-item s-parent"}>

          <div className="sidebar-title">
            <span>
                {item.icon &&  <div className='icon'>{item.icon}</div>}
                {isOpen && <div>{item.title}</div>}
            </span>
            <MdKeyboardArrowRight size={25} className='arrow-icon' onClick={()=>setExpandMenu(!expandMenu)}/>
          </div>
          <div className="sidebar-content">
              {item.children.map((child,i)=>{
                return (
                  <div key={i} className="s-child">
                    <NavLink to={child.path} className={activeSublink}>
                      <div className='sidebar-item'>
                        <div className="sidebar-title">
                          <span>
                            {child.icon && <div className="icon">{child.icon}</div>}
                            {isOpen && <div>{child.title}</div>}
                          </span>
                        </div>
                      </div>  
                    </NavLink>
                  </div>
                )
              })}
          </div>
      </div>
    )
  }
  else{
    return (
      <NavLink to={item.path} className={activeLink}>
         <div className='sidebar-item s-parent'>
            <div className="sidebar-title">
                <span>
                    {item.icon && <div className="icon">{item.icon}</div>}
                    {isOpen && <div>{item.title}</div>}
                </span>
              </div>
           </div>          
        </NavLink>
    )
  }

}

export default Sidebaritem