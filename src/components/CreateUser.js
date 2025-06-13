import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react'
import Logo from './Logo';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery'
import axios from 'axios';
import Auth from './Auth';
import { usePallete } from '../Context/PalleteContext';
import { X } from 'lucide-react';


const CreateUser = forwardRef((props, ref) => {
    const navigate = useNavigate();
    const [user, setUser] = useState({username: "", email: ""})
    const [pass, setPass] = useState('')
    const[e_validate, setEValidate] = useState(false)
    const[u_validate, setUValidate] = useState(false)
    const[p_validate, setPValidate] = useState(false)
    const[status, setStatus] = useState("createUser")
    const[val_element, setVal_element] = useState('')
    const send = JSON.stringify(user)
    const CreateData = JSON.stringify({
      email : user.email,
      username : user.username,
      password : pass
    })
    const {Pallete} = usePallete()
    const E_Check = (e) => {
        if(val_element === 'email'){
            setVal_element('')
        }
        
        //console.log(e,u)
        setUser({email : e, username : user.username})

        let e_pattern = !(!/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{1,})$/.test(e))
        setEValidate(e_pattern)
    }
    const U_Check = (e) => {
        if(val_element === 'username'){
            setVal_element('')
        }
        //console.log(e,u)
        setUser({email : user.email, username : e})

        let e_pattern = (/^[A-Za-z0-9_]{3,15}$/.test(e))
        //console.log(e, e_pattern)
        setUValidate(e_pattern)
    }
    const P_Check = (e) => {
      setPass(e)
      let e_pattern = (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(e))
      //console.log(e, e_pattern)
      setPValidate(e_pattern)
    }
    var signup_database_URL;
    var searchaccount_database_URL;
    if (process.env.NODE_ENV == 'production') {
      signup_database_URL = "https://api.srv45036.seohost.com.pl/api/signupuser"
      searchaccount_database_URL = "https://api.srv45036.seohost.com.pl/api/searchaccount"
    } else {
      signup_database_URL = `${process.env.REACT_APP_TUNNEL_URL}/api/signupuser`
      searchaccount_database_URL =`${process.env.REACT_APP_TUNNEL_URL}/api/searchaccount`
    }

    const getAuth = async () => {
      console.log("niger")
      if(status === "createPass"){
        if(p_validate === true){
          console.log(signup_database_URL)
          const response = await fetch(signup_database_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
          },
            body: CreateData
          });
          console.log(response)
          if (response.ok) {
            const data = await response.json();
            console.log(data)
            localStorage.setItem("at",data?.access_token)
            localStorage.setItem("d_id",data?.device_id)
            
            const auth = await Auth("firstAuth" ,false, data?.access_token, data?.device_id)

            if(auth){
              console.log("niga")
              navigate('/')
              window.location.reload()
              return true
            }else{
              console.log(auth)
              localStorage.removeItem("at")
              localStorage.removeItem("d_id")
              return false
            }
          } else {
              return false
          }

          // $.ajax({
          //   url:signup_database_URL,
          //   type:"POST",
          //   data: CreateData,
          //   crossDomain: true,
          //   headers: {
          //     "Content-Type": "application/json",
          //   },
          //   contentType:"application/json; charset=utf-8",
          //   dataType:"json",
          // }).then((res)=>{

          //     // Set a cookie with the secure and HttpOnly flags
          //     console.log(res)
          //   localStorage.setItem("at",res?.access_token)
          //   localStorage.setItem("d_id",res?.device_id)
          //   const auth = Auth("firstAuth")
          //   if(auth?.msg == "Authorized"){
          //     console.log("niga")
          //     navigate('/')
          //     return true
          //   }
          // })
        }
      }
      else if(status === "createUser"){
        if(e_validate === true && u_validate === true && val_element === ''){
          console.log(searchaccount_database_URL)
          const response = await fetch(searchaccount_database_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
          },
            body: send
          });
          if (response.ok) {
                $("#form-user > div").css("transition","ease-in-out 200ms").css("transform",'translateX(-100%)').css("opacity","0")
                let form =  $("#form-user > div").css('opacity')
                setTimeout(()=>{
                $("#form-user > div").css("transition","ease-in-out 0ms").css("transform",'translateX(0)')
                },200)
                setTimeout(()=>{
                $("#form-user > div").css("transition","ease-in-out 100ms").css('opacity',"1")
                },300)
                
                setStatus("createPass")
                return true
          }else{
            const data = await response.json()
            setVal_element(data)
            console.log(response, "res")
            return false
          }
          // $.ajax({
          //   url:searchaccount_database_URL,
          //   type:"POST",
          //   data: send,
          //   crossDomain: true,
          //   headers: {
          //     "Content-Type": "application/json"
          //   },
          //   contentType:"application/json; charset=utf-8",
          //   dataType:"json",
          // })
          // .then((res)=>{ 
            
          //   if(res){
          //     console.log('res')
          //       $("#form-user > div").css("transition","ease-in-out 200ms").css("transform",'translateX(-100%)').css("opacity","0")
          //       let form =  $("#form-user > div").css('opacity')
          //       setTimeout(()=>{
          //       $("#form-user > div").css("transition","ease-in-out 0ms").css("transform",'translateX(0)')
          //       },200)
          //       setTimeout(()=>{
          //       $("#form-user > div").css("transition","ease-in-out 100ms").css('opacity',"1")
          //       },300)
                
          //       setStatus("createPass")
          //       return true
          //   } 
            
          //   })
          //   .catch((err)=>{
          //       setVal_element(err.responseJSON)
          //       console.log(err, "res")
          //       return false

          //   })

        }else{
          
          return false
        }
        
      }

    }
    
    useImperativeHandle(ref, () => ({
      getAuth,
    }));



    
  if(status === "createUser"){
    return (
      <div className=''>
          <div className='flex flex-col items-center'>
              <div onClick={()=> navigate("/")} className='sm:scale-[0.33] scale-[0.6] h-[130px] cursor-pointer'>
                  <Logo loaded={true}/>
              </div>
              <p style={{color: Pallete[1]}} className='font-Poppins relative font-bold text-[24px] sm:text-[32px] sm:mx-[130px]  mb-5'>Sign Up</p>

          </div>
          <p className='font-Poppins font-bold text-black sm:text-[20px] text-[14px]'>Wpisz</p>
          <p className={`font-Poppins text-black sm:text-[17px] text-[12px] ease-in-out duration-200 mb-4 ${val_element === "email" ? "text-red-500" : "text-black"}`}>{val_element === "email" ? "Ten email jest juz zajęty" : "email"}</p>
          <div className='sm:h-[70px] h-[50px] mb-6 flex items-center'>
              <input id='email-registerInput'  autoCapitalize='off' onChange={(e)=> E_Check(e.target.value)} type='email' autoCorrect='off'  className={`w-full h-full rounded-full text-[14px] p-4 font-Poppins bg-[#F2F2F2] ${
              e_validate === true ? "text-black" : "text-red-600 autofilinputred"
              }`}/>
              <X className={`gg-close scale-[1.1] text-red-500 opacity-0 w-[0px] ease-in-out duration-300 ${
                  val_element === 'email' ? "w-auto opacity-100 ml-5 " : "opacity-0 w-[0px] ml-0"
              }`}/>
              
          </div>

          <p className={`font-Poppins text-black sm:text-[17px] text-[12px] ease-in-out duration-200 mb-4 ${val_element === "username" ? "text-red-500" : "text-black"}`}>{val_element === "username" ? "Ta nazwa urzytkownika jest juz zajęta" : "nazwa urzytkownika"}</p>
          <div className='sm:h-[70px] h-[50px] mb-4 flex items-center'>
              <input id='username-registerInput'  autoCapitalize='off' value={user.username} onChange={(e)=> U_Check(e.target.value)} type='text' autoCorrect='off'  className={`w-auto min-w-[30px] max-w-[100%] h-full rounded-full text-[14px] p-4 font-Poppins bg-[#F2F2F2] ${
              u_validate === true ? "text-black" : "text-red-600 autofilinputred"
              }`}/>
              <X className={`gg-close scale-[1.1] text-red-500 opacity-0 w-[0px] ease-in-out duration-300 ${
                  val_element === 'username' ? "w-auto opacity-100 ml-5 " : "opacity-0 w-[0px] ml-0"
              }`}/>
          </div>
          
      </div>
    )
  }else if(status === "createPass"){
    return (
      <div className=''>
          <div className='flex flex-col items-center'>
              <div onClick={()=> navigate("/")} className='sm:scale-[0.33] scale-[0.6] h-[130px] cursor-pointer'>
                  <Logo loaded={true}/>
              </div>
              <p style={{color: Pallete[1]}} className='font-Poppins relative font-bold text-[24px] sm:text-[32px] sm:mx-[130px]  mb-5'>Sign Up</p>

          </div>
          <p className='font-Poppins font-bold text-black sm:text-[20px] text-[14px]'>Wpisz</p>
          <p className={`font-Poppins text-black sm:text-[17px] text-[12px] ease-in-out duration-200 mb-4`}>hasło</p>
          <p></p>
          <div className='sm:h-[70px] h-[50px] mb-6 flex items-center'>
              <input id='passwordd-registerInput' value={pass} autoCapitalize='off' onChange={(e)=> P_Check(e.target.value)} type='text' autoCorrect='off'  className={`w-full h-full rounded-full text-[14px] p-4 font-Poppins bg-[#F2F2F2] ${
              p_validate === true ? "text-black" : "text-red-600 autofilinputred"
              }`}/>
          </div>
          <p style={{color: Pallete[1]}} className='font-Poppins text-[17px]'>Pamiętaj by hasło było <span className='font-bold'>silne</span></p>
      </div>
    )
  }
});

export default CreateUser