import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  Routes,
  Route
} from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import User from './components/User';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
          <Route exact path='/' element={<App/>}></Route>
          <Route exact path='/login' element={<User/>}></Route>
          <Route exact path='/signup' element={<App/>}></Route>
          {/** <Route path='*' element={<NotFound/>}/>*/}
      </Routes>
  </BrowserRouter>
</StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
