import React, { useState } from 'react'
import '../Auth/auth.scss';
import { Google } from '@mui/icons-material';
const Auth = () => {

  const [input, setInput] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
    console.log("input => " + input );
  }

  const handleSubmitClick = () =>{ 
    if(typeof window !== 'undefined'){
      localStorage.setItem('username' , input);

    }else localStorage.clear();
    window. location.reload();
  }
  

  return (
    <div className='auth-container'>
        <p>This is what others will see</p>
        <input type='text' placeholder='Username' 
         required
          value={input}
          onChange={(e) => handleInputChange(e)}
         />
        <button onClick={handleSubmitClick}>
           <Google fontSize='small'/>
           <h3>Google</h3>
        </button>
        
    </div>
  )
}

export default Auth;