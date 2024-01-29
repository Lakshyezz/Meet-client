import React, { useCallback, useEffect, useState } from 'react'
import './hero.scss'
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import VideoCallRoundedIcon from '@mui/icons-material/VideoCallRounded';
import WavingHandRoundedIcon from '@mui/icons-material/WavingHandRounded';
import LaptopN from '../../assets/images/laptop-n.png'
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { Link, useNavigate } from 'react-router-dom';
import { useSocket } from '../../context/socket';


const Hero = () => {

  const [roomCode, setRoomCode] = useState('');
  const [username, setUsername] = useState('');

  useEffect(()=>{
    setUsername(localStorage.getItem('username'))
    // console.log("username => "  + username);
  }, [username])

  const handleCodeChange = (e) =>  setRoomCode(e.target.value);

  const socket = useSocket();
  const navigate = useNavigate();

  const handleMeetingClick = useCallback( (e)=>{
    e.preventDefault();
    socket.emit('room-join', {username, roomCode})
  }, [username, roomCode, socket]);

  const handleJoinRoom = useCallback(data => {
      const {username, roomCode} = data;
      console.log(username, roomCode);
      navigate(`/live/${roomCode}`)
  }, [navigate])
 
  useEffect(()=>{
    socket.on('room-join', handleJoinRoom)

    return () =>  socket.off('room-join' , handleJoinRoom);
  },[handleJoinRoom, socket] )

  return (
    <div className='container'>
      <div className='left-side'>
        <div className='hey-div'>
          <h3>Hey!</h3>
          <WavingHandRoundedIcon fontSize='small'/>
          <strong>
          {/* {localStorage.getItem('username')}, */}

          Enter Text
          </strong>
          <h3>Welcome!</h3>
        </div>
        <h1>Premium video meetings. Now free for everyone.</h1>
        <h4>Service built for secure business meetings, Meet, to make it free and available for all.</h4>
        <div className='new-meeting-enter-code-div'>
          <Link to= '/live'>
            <button onClick={handleMeetingClick}>
                <VideoCallRoundedIcon fontSize='small'/>
                New Meeting
            </button>
          </Link>
         <div className='input-div'>
          <MeetingRoomIcon fontSize='small'/>
          <input type='text' value={roomCode} onChange={handleCodeChange}  placeholder='Enter a code'/>
         </div>
        </div>
      </div>
      <div className='right-side'>
        <div className='change-image'>
       <ChevronLeftRoundedIcon/>
         <div className='hero-img'>
            <img  src={LaptopN} 
              />
         </div>
        <ChevronRightRoundedIcon/>
        </div>
        <h2>Get a link you can share</h2>
        <p>Click <strong className='strong'>New meeting</strong> to get a link you can send to people you want to meet with</p>
        <div className='dots'>
          <div className='dot-1'></div>
          <div className='dot-2'></div>
        </div>
      </div>  
    </div>
  )
}

export default Hero