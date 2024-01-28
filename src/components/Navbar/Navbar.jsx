

import React, { useEffect } from 'react'
import '../Navbar/navbar.scss'
import Logo from '../../assets/images/video.svg'
import QuestionImg from '../../assets/images/question.png'
import UserImg from '../../assets/images/profile.png'


const Navbar = () => {

  useEffect(()=>{
      localStorage.getItem('key');
  })

  return (
    <div className='navbar-container' >

      <div className='left-side'>
        <img  src={Logo}/>
        <h3>
       <strong>
            Meet
        {/* {localStorage.getItem('username')} */}
       </strong>
        </h3>
      </div>

      <div className='right-side'>
      
        <h3>3:19 AM • Sat, Jan 6</h3>
        <img src={QuestionImg}/>
        <img src={UserImg}/>

      </div>
    </div>
  )
}

export default Navbar