import React, { StrictMode, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import User from './components/User';
import RUser from './components/RUser';
import Auth from './components/Auth';
import Motiontest from './components/Motiontest';
import MainContainer from './components/NewProfile/MainContainer';



export const Index = () => {
  const navigate = useNavigate()
  useEffect(()=>{
    navigate("/")
  },[])
}

const root = ReactDOM.createRoot(document.getElementById('root'));

Auth();


root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
          <Route exact path='/' element={<App/>}></Route>
          <Route exact path='/login' element={<User/>}></Route>
          {/** eslint-disable-next-line*/}
          <Route exact path='/signup' element={<RUser/>}></Route>
          <Route exact path='/profile' element={<MainContainer/>}></Route>
          <Route exact path='/mm' element={<Motiontest/>}></Route>
          <Route path='*' element={<Index/>}/>
      </Routes>
  </BrowserRouter>
</StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

