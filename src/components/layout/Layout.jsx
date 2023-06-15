//this is for layout for Dashboard and stuffs but present in app.js

import React from 'react'
import Header from '../header/Header'
import Footer from '../footer/Footer'

//props from App.js
const Layout = ({children}) => {
  return (
    <>
    <Header/>
    <div style={{minHeight:"80vh"}} className='--pad'>
        {children}
    </div>
    <Footer/>
    </>
  )
}

export default Layout