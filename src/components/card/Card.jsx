import React from 'react'
import styles from "./Card.module.scss"

//this component card is the structure for evey card style pages like login, forgot, register etc
//what ever the material is present inside the Card body i.e the children will be displayed
//props from so many components 
const Card = ({children,cardClass}) => {
  return (
    <div className={`${styles.card} ${cardClass}`}>
        {children}
    </div>
  )
}

export default Card