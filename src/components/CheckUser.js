import $, { post } from 'jquery'
import React, {useEffect, useState } from 'react'
import {json, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import "jquery-ui";

const CheckUser = ({ click }) => {
    const navigate = useNavigate()
    const[validate, setValidate] = useState(true)
    const[status, setStatus] = useState("checkUser")
    const [user, setUser] = useState({username: "", email: "", password: ""})
    const [logindata, setLogindata] = useState()
  
    
    const send = JSON.stringify(user)
    
    const Check = (e) => {
      if(status === "checkUser"){
      setUser({username : e, email: e})

      setValidate(true)
      }else if(status === "enterPassword"){
        setUser({username : user.username, email : user.email ,password : e})
        console.log(user)
        let pattern = (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(e))
        setValidate(pattern)
      }
    }
    var checkaccount_database_URL;
    var login_database_URL;
    if (process.env.NODE_ENV == 'production') {
      checkaccount_database_URL = "https://api.srv45036.seohost.com.pl/api/checkaccount"
      login_database_URL = "https://api.srv45036.seohost.com.pl/api/login"
    } else {
      checkaccount_database_URL = "http://localhost:3000/api/checkaccount"
      login_database_URL = "http://localhost:3000/api/login"
    }
    
    useEffect(() => {
      
      if(click === true && status === "checkUser"){
        console.log(send)
        $.ajax({
          url:checkaccount_database_URL,
          type:"POST",
          data: send,
          crossDomain: true,
          headers: {
            "accept": "application/json",
            "Access-Control-Allow-Origin":"*"
          },
          xhrFields: {cors: false},
          contentType:"application/json; charset=utf-8",
          dataType:"json",
        }).then((res)=>{
          console.log("niga")
          setValidate(true)
          setLogindata(res)
          //-----------------------
          $("#form-user > div").css("transition","ease-in-out 200ms").css("transform",'translateX(-100%)').css("opacity","0")
          let form =  $("#form-user > div").css('opacity')
          setTimeout(()=>{
            $("#form-user > div").css("transition","ease-in-out 0ms").css("transform",'translateX(0)')
          },200)
          setTimeout(()=>{
            $("#form-user > div").css("transition","ease-in-out 100ms").css('opacity',"1")
          },300)
          //---------------------
          setUser({password : "", username : user.username, email : user.email})
          setStatus("enterPassword")
          
        }).catch((err)=>{
          console.log(err.status)
          if(err.status === 409){
            setValidate(false)
          }
        })
      }else if (click === true && status === "enterPassword" && validate === true){
        var correctdata;
        if(logindata === "username"){
          correctdata = JSON.stringify({
            password : user.password,
            usertype : logindata,
            userdata : user.username
          })
        }else{
          correctdata = JSON.stringify({
            password : user.password,
            usertype : logindata,
            userdata : user.email,
          })
        }
        console.log(correctdata)
        $.ajax({
          url:login_database_URL,
          type:"POST",
          data: correctdata,
          crossDomain: true,
          headers: {
            "accept": "application/json",
            "Access-Control-Allow-Origin":"*"
          },
          xhrFields: {cors: false},
          contentType:"application/json; charset=utf-8",
          dataType:"json",
        }).then((res)=>{
          console.log(res)
          setValidate(res)
          if(res){
            console.log('niga')
          }
        })
      }
    })

    const [localpallete, setLocalpallete] = useState(JSON.parse(localStorage.getItem('Pallete')))
    useEffect(() => {
        const alertMessage = () => {
          //alert('localStorage changed!');
          setLocalpallete(JSON.parse(localStorage.getItem('Pallete')))
          console.log("localStorage changed!'")
        }
    
        //window.localStorage.setItem("item", 'val 1');
        window.addEventListener('Pallete', alertMessage);
    
        //Remove the event listener when the component unmounts
        return () => {
          window.removeEventListener("Pallete", alertMessage);
        }
      }, []);

      if(status === "checkUser"){
        return (
            <div className=''>
                <div className='flex flex-col items-center'>
                    <div onClick={()=> navigate("/")} className='sm:scale-[0.33] scale-[0.6] h-[130px] cursor-pointer'>
                    <Logo loaded={true}/>
                    </div>
                    <p style={{color: localpallete[1].color}} className='font-Poppins relative font-bold text-[27px] sm:text-[35px] sm:mx-[130px]  mb-8'>Log in</p>

                </div>
                <p className='font-Poppins font-bold text-black sm:text-[22px] text-[15px]'>Wpisz</p>
                <p className='font-Poppins text-black sm:text-[19px] text-[13px] mb-6'>nazwe użytkownika lub email</p>
                <div className='sm:h-[70px] h-[50px] mb-4'>
                    <input id='email-loginInput'  autoCapitalize='off' onChange={(e)=> Check(e.target.value)} value={user.username} type='email' autoCorrect='off'  className={`w-full h-full rounded-full text-[16px] p-4 font-Poppins bg-[#F2F2F2] ${
                    validate === true ? "text-black" : "text-red-600 autofilinputred"
                    }`}/>
                </div>
                <p style={{color: localpallete[1].color}} className='font-Poppins font-bold sm:text-[15px] text-[10px]'>nie pamiętasz ?</p>
                
            </div>
          )
      }else if(status === "enterPassword"){
        return (
            <div className=''>
                <div className='flex flex-col items-center'>
                    <div onClick={()=> navigate("/")} className='scale-[0.33] h-[130px] cursor-pointer'>
                    <Logo loaded={true}/>
                    </div>
                    <p style={{color: localpallete[1].color}} className='font-Poppins relative font-bold text-[35px] mx-[130px] mb-8'>Log in</p>
                </div>
                <p className='font-Poppins font-bold text-black text-[22px]'>Wpisz</p>
                <p className='font-Poppins text-black text-[19px] mb-6'>hasło</p>
                <div className='h-[70px] mb-4'>
                    <input id='password-loginInput' value={user.password}  autoCapitalize='off' onChange={(e)=> Check(e.target.value)} type='password' autoCorrect='off'  className={`w-full h-full rounded-full text-[16px] p-4 font-Poppins bg-[#F2F2F2] ${
                    validate === true ? "text-black" : "text-red-600 autofilinputred"
                    }`}/>
                </div>
                <p style={{color: localpallete[1].color}} className='font-Poppins font-bold text-[15px]'>nie pamiętasz ?</p>
                
            </div>
          )
      }
  
}

export default CheckUser