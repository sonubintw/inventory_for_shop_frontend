//info box for summary
import React from 'react'
import "./InfoBox.scss"

//props from ProductSummary.jsx
const InfoBox = ({bgColor,title,count,icon}) => {
  return (
    <div className={`info-box ${bgColor}`}>
        <span className='info-icon --color-white'>{icon}</span>
        <span className='info-text'>
            <p>{title}</p>
            <h4>{count}</h4>  
        </span>
    </div>
  )
}

export default InfoBox