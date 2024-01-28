import { useCallback, useEffect, useState } from 'react'
import './live.scss';
import ReactPlayer from 'react-player'
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import Person2RoundedIcon from '@mui/icons-material/Person2Rounded';
import { useSocket } from '../../context/socket'
import peer from '../../services/Peer';
import WaitingImg from '../../assets/images/live.png'

const Live = () => {
  const socket = useSocket();
  const [remoteUserId, setRemoteUserId] = useState(null);
  const [myStream, setMyStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);

  const handleUserJoined = useCallback(({username, id})=>{
        console.log(`Username ${username} joined room`);
        setRemoteUserId(id);
  },[])


  
  const handleCallUser = useCallback(async() =>{
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    // console.log("offer => " + JSON.stringify(offer));
    socket.emit('user-call', { to: remoteUserId, offer});
    setMyStream(stream);
  }, [socket, remoteUserId]);
  
  const handleIncomingCall = useCallback(
    async ({ from , offer }) =>{
    setRemoteUserId(from);
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    setMyStream(stream);
    // console.log();
    const ans = await peer.getAnswer(offer);
    socket.emit('call-accepted' , { to: from, ans})
  }, [])

  const sendStreams = useCallback(() =>{
    for (const track of myStream.getTracks()){
      console.log("track => " + track);
      peer.peer.addTrack(track, myStream);
    }
  }, [myStream])

    const handleCallAccepted = useCallback(
      ({from , ans}) =>{
        peer.setLocalDescription(ans);
        console.log("Call Accepted");
        sendStreams();
      }, [sendStreams])
      
      const handleNegoNeeded = useCallback(async ()=>{
          const offer = await peer.getOffer();
          socket.emit('peer-nego-needed', {offer, to: remoteUserId})
        }
      , [remoteUserId, socket]);

      useEffect(()=>{
        peer.peer.addEventListener('negotiationneeded',handleNegoNeeded)
        
        return ()=> peer.peer.removeEventListener('negotiationneeded',handleNegoNeeded)
      },[handleNegoNeeded])

    const handleNegoNeededIncoming = useCallback(async ({from, offer}) =>{
      const ans = await peer.getAnswer(offer);
      socket.emit('peer-nego-done', { to: from, ans})
    }, [socket])

    const handleNegoNeededFinal = useCallback( async({ ans })=>{
      await peer.setLocalDescription(ans)
    },)

    useEffect(() =>{
      peer.peer.addEventListener('track', async (ev) =>{
        const remoteStream = ev.streams;
        
        console.log("remote Stream" + remoteStream);
      setRemoteStream(remoteStream[0]);
    });
  }, [remoteStream])

  useEffect(()=>{
      socket.on('user-joined', handleUserJoined);
      socket.on('incoming-call', handleIncomingCall)
      socket.on('call-accepted', handleCallAccepted)
      socket.on('peer-nego-needed', handleNegoNeededIncoming)
      socket.on('peer-nego-final', handleNegoNeededFinal)
      // console.log("in useEffect ");
      return () =>{
        socket.off('user-joined', handleUserJoined);
        socket.off('incoming-call', handleIncomingCall);
        socket.off('call-accepted', handleCallAccepted)
        socket.off('peer-nego-needed', handleNegoNeededIncoming)
        socket.off('peer-nego-final', handleNegoNeededFinal)
      }
  },[socket, handleIncomingCall, handleUserJoined,handleNegoNeededIncoming,handleNegoNeededFinal])

  return (
    <div className='wrapper'>
          {remoteUserId ? <h1>User joined call them..</h1>
          :<h1>Waiting for other person to join</h1>}

          {remoteUserId ?
              <button className='call-btn' onClick={handleCallUser}>
              <CallRoundedIcon fontSize='large'/>
              </button> 
          :<div className='only-you'>   
            <img  src={WaitingImg}/>
          </div>}

          {myStream && <button className='send-stream' onClick={sendStreams}>Send Stream</button>}

       {remoteStream &&   <div className='video-stream-container'>
            {remoteStream &&
            <div className='remote-stream'>
              <p>Remote Stream</p>
              <ReactPlayer id= 'r-stream' playing width="600px" height= "500px"  muted = {false} url={remoteStream}/>

            </div>
            }

            {myStream &&
            <div>
              <p>My Stream</p>
              <ReactPlayer playing muted = {false} width="400px" height= "300px" url={myStream}/>
            </div>}
          </div>}
       

    </div>
  )
}

export default Live