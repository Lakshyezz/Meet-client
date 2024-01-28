import { useState } from 'react'
import Land from '../src/Pages/Land/Land'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './Pages/Home/Home'
import Live from './Pages/Live/Live'





function App() {
  const [count, setCount] = useState(0)
// Something like that
// if(process.env.NODE_ENV === 'debug'){
//   setDebugLevel(1)
// }
  return (
    <>
    {/* <Live/> */}
      <Routes>
        <Route path='/' element = {<Land/>}/>
        <Route path='/home' element = {<HomePage/>}/>
        <Route path='/live/:roomId' element = {<Live/>}/>
      </Routes>
    </>
  )
}

export default App
