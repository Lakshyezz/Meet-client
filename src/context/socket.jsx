"use-client"

import { createContext, useContext, useMemo, useState } from 'react'
import { io }from 'socket.io-client'


const SocketContext = createContext(null);

export const useSocket = () => {
        const socket =  useContext(SocketContext);
        return socket;
    }

export const SocketProvider = ( props ) =>{
    const { children } = props;
    // const [socket, setSocket] = useState(null);
    const socket = useMemo(()=> io("localhost:8000")
    , [])
    
    return (    
        <SocketContext.Provider value={ socket }> 
            {children}
        </SocketContext.Provider>
    )
}