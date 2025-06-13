import $ from 'jquery'
import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react'
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import "jquery-ui";
import Auth from './Auth';
import { usePallete } from '../Context/PalleteContext';

const CheckUser = forwardRef((props, ref) => {
    const navigate = useNavigate()
    const[validate, setValidate] = useState(true)
    const[status, setStatus] = useState("checkUser")
    const [user, setUser] = useState({username: "", email: "", password: ""})
    const [logindata, setLogindata] = useState()
  
    const {Pallete} = usePallete()
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
    if (process.env.NODE_ENV === 'production') {
      checkaccount_database_URL = "https://api.srv45036.seohost.com.pl/api/checkaccount"
      login_database_URL = "https://api.srv45036.seohost.com.pl/api/login"
    } else {
      checkaccount_database_URL = `${process.env.REACT_APP_TUNNEL_URL}/api/checkaccount`
      login_database_URL = `${process.env.REACT_APP_TUNNEL_URL}/api/login`
    }
    
    const getAuth = async () => {
      if(status === "checkUser"){
        console.log(send)
        const response = await fetch(checkaccount_database_URL, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
        },
          body: send
        });
        console.log(response)
        if (response.ok) {
          const data = await response.json();
          setValidate(true)
          setLogindata(data)

          $("#form-user > div").css("transition","ease-in-out 200ms").css("transform",'translateX(-100%)').css("opacity","0")
          //let form =  $("#form-user > div").css('opacity')
          setTimeout(()=>{
            $("#form-user > div").css("transition","ease-in-out 0ms").css("transform",'translateX(0)')
          },200)
          setTimeout(()=>{
            $("#form-user > div").css("transition","ease-in-out 100ms").css('opacity',"1")
          },300)

          setUser({password : "", username : user.username, email : user.email})
          setStatus("enterPassword")
          return true
        }else{
          setValidate(false)
          return false
        }
      }else if(status === "enterPassword" && validate === true){

        var correctdata = JSON.stringify({
          password : user.password,
          usertype : logindata,
          userdata : logindata === "username" ? user.username : user.email
        })
        console.log(correctdata)
        try{
          const response = await fetch(login_database_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
          },
            body: correctdata
          });
  
          if (response.ok) {
            const data = await response.json();
            console.log(data);
            localStorage.setItem('at', data?.at);
            localStorage.setItem('d_id', data?.device_id);
            const auth = await Auth("firstAuth" ,false, data?.at, data?.device_id)
            if(auth){
              console.log("niga")
              navigate('/')
              window.location.reload()
              return true
            }else{
              localStorage.removeItem("at")
              localStorage.removeItem("d_id")
              return false
            }
          } else {
            console.log(response)
            setValidate(false)
            return false
          }
        } catch (error) {
          console.error("Wystąpił błąd:", error);
          return false;
        }
        
      }
    }

     useImperativeHandle(ref, () => ({
          getAuth,
        }));
    
      

      if(status === "checkUser"){
        return (
            <div className=''>
                <div className='flex flex-col items-center'>
                    <div onClick={()=> navigate("/")} className='sm:scale-[0.33] scale-[0.6] h-[130px] cursor-pointer'>
                    <Logo loaded={true}/>
                    </div>
                    <p style={{color: Pallete[1]}} className='font-Poppins relative font-bold text-[27px] sm:text-[35px] sm:mx-[130px]  mb-8'>Log in</p>

                </div>
                <p className='font-Poppins font-bold text-black sm:text-[22px] text-[15px]'>Wpisz</p>
                <p className='font-Poppins text-black sm:text-[19px] text-[13px] mb-6'>nazwe użytkownika lub email</p>
                <div className='sm:h-[70px] h-[50px] mb-4'>
                    <input id='email-loginInput'  autoCapitalize='off' onChange={(e)=> Check(e.target.value)} value={user.username} type='email' autoCorrect='off'  className={`w-full h-full rounded-full text-[16px] p-4 font-Poppins bg-[#F2F2F2] ${
                    validate === true ? "text-black" : "text-red-600 autofilinputred"
                    }`}/>
                </div>
                <p style={{color: Pallete[1]}} className='font-Poppins font-bold sm:text-[15px] text-[10px]'>nie pamiętasz ?</p>
                
            </div>
          )
      }else if(status === "enterPassword"){
        return (
            <div className=''>
                <div className='flex flex-col items-center'>
                    <div onClick={()=> navigate("/")} className='scale-[0.33] h-[130px] cursor-pointer'>
                    <Logo loaded={true}/>
                    </div>
                    <p style={{color: Pallete[1]}} className='font-Poppins relative font-bold text-[35px] mx-[130px] mb-8'>Log in</p>
                </div>
                <p className='font-Poppins font-bold text-black text-[22px]'>Wpisz</p>
                <p className='font-Poppins text-black text-[19px] mb-6'>hasło</p>
                <div className='h-[70px] mb-4'>
                    <input id='password-loginInput' value={user.password}  autoCapitalize='off' onChange={(e)=> Check(e.target.value)} type='password' autoCorrect='off'  className={`w-full h-full rounded-full text-[16px] p-4 font-Poppins bg-[#F2F2F2] ${
                    validate === true ? "text-black" : "text-red-600 autofilinputred"
                    }`}/>
                </div>
                <p style={{color: Pallete[1]}} className='font-Poppins font-bold text-[15px]'>nie pamiętasz ?</p>
                
            </div>
          )
      }
  
});

export default CheckUser