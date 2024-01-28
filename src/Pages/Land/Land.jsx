
import React, { useState } from 'react';
import EastRoundedIcon from '@mui/icons-material/EastRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import '../Land/land.scss';
import LandNotionImg from '../../assets/images/grill.png'
import { Link } from "react-router-dom";


const Land = () => {

    const [username, setUsername] = useState('');
    const handleUserNameChange = (e) => setUsername(e.target.value);
    
    const handleUsernameClick = () => {
        localStorage.setItem('username' , username)
        console.log(username);
    }
  return (
    <div className='land-container'>
        {/* ok */}
        <div className='land-left-side'>
            {/* <h1>
                <strong>Meet</strong>
            </h1> */}
            <img src={LandNotionImg}
                width='400px'
            />
        </div>
        <div className='land-right-side'>
            {/* <div style={{height: "100%", width: "12px"}}></div> */}
            <input type='text' value={username}
                onChange={(e) => handleUserNameChange(e)} 
                placeholder='Username'   
                />
           <Link to='/home' className='link-page'>
                <button  onClick={handleUsernameClick}>
                    {/* <ArrowForwardRoundedIcon/> */}
                    <EastRoundedIcon/>
                    Next
                </button>
           </Link>
        </div>

    </div>
  )
}

export default Land