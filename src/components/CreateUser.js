import React, { useEffect, useState } from 'react'
import Logo from './Logo';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery'
import axios from 'axios';
import Auth from './Auth';


const CreateUser = ({click}) => {
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
      signup_database_URL = "http://localhost:3003/api/signupuser"
      searchaccount_database_URL = "http://localhost:3003/api/searchaccount"
    }
    

     

      useEffect(() => {
        
        if(click === true && status === "createPass" && p_validate === true){
          console.log(signup_database_URL)
          $.ajax({
            url:signup_database_URL,
            type:"POST",
            data: CreateData,
            crossDomain: true,
            headers: {
              "accept": "application/json",
              "Access-Control-Allow-Origin":"*"
            },
            xhrFields: {cors: false},
            contentType:"application/json; charset=utf-8",
            dataType:"json",
          }).then((res)=>{

              // Set a cookie with the secure and HttpOnly flags
              console.log(res)
            localStorage.setItem("at",res?.access_token)
            Auth()
            navigate('/')
          })
        }
      
        if(click === true && status === "createUser" && e_validate === true && u_validate === true && val_element === ''){
          console.log(searchaccount_database_URL)
          $.ajax({
            url:searchaccount_database_URL,
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
          })
          .then((res)=>{ 
            
            if(res){
              console.log('res')
                $("#form-user > div").css("transition","ease-in-out 200ms").css("transform",'translateX(-100%)').css("opacity","0")
                let form =  $("#form-user > div").css('opacity')
                setTimeout(()=>{
                $("#form-user > div").css("transition","ease-in-out 0ms").css("transform",'translateX(0)')
                },200)
                setTimeout(()=>{
                $("#form-user > div").css("transition","ease-in-out 100ms").css('opacity',"1")
                },300)
                

                setStatus("createPass")
            } 
            
            
            
        })
        .catch((err)=>{
            setVal_element(err.responseJSON)
            console.log(err, "res")
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
    
  if(status === "createUser"){
    return (
      <div className=''>
          <div className='flex flex-col items-center'>
              <div onClick={()=> navigate("/")} className='sm:scale-[0.33] scale-[0.6] h-[130px] cursor-pointer'>
                  <Logo loaded={true}/>
              </div>
              <p style={{color: localpallete[1].color}} className='font-Poppins relative font-bold text-[24px] sm:text-[32px] sm:mx-[130px]  mb-5'>Sign Up</p>

          </div>
          <p className='font-Poppins font-bold text-black sm:text-[20px] text-[14px]'>Wpisz</p>
          <p className={`font-Poppins text-black sm:text-[17px] text-[12px] ease-in-out duration-200 mb-4 ${val_element === "email" ? "text-red-500" : "text-black"}`}>{val_element === "email" ? "Ten email jest juz zajęty" : "email"}</p>
          <div className='sm:h-[70px] h-[50px] mb-6 flex items-center'>
              <input id='email-registerInput'  autoCapitalize='off' onChange={(e)=> E_Check(e.target.value)} type='email' autoCorrect='off'  className={`w-full h-full rounded-full text-[14px] p-4 font-Poppins bg-[#F2F2F2] ${
              e_validate === true ? "text-black" : "text-red-600 autofilinputred"
              }`}/>
              <i className={`gg-close scale-[1.1] text-red-500 opacity-0 w-[0px] ease-in-out duration-300 ${
                  val_element === 'email' ? "w-auto opacity-100 ml-5 " : "opacity-0 w-[0px] ml-0"
              }`}></i>
          </div>

          <p className={`font-Poppins text-black sm:text-[17px] text-[12px] ease-in-out duration-200 mb-4 ${val_element === "username" ? "text-red-500" : "text-black"}`}>{val_element === "username" ? "Ta nazwa urzytkownika jest juz zajęta" : "nazwa urzytkownika"}</p>
          <div className='sm:h-[70px] h-[50px] mb-4 flex items-center'>
              <input id='username-registerInput'  autoCapitalize='off' value={user.username} onChange={(e)=> U_Check(e.target.value)} type='text' autoCorrect='off'  className={`w-auto min-w-[30px] max-w-[100%] h-full rounded-full text-[14px] p-4 font-Poppins bg-[#F2F2F2] ${
              u_validate === true ? "text-black" : "text-red-600 autofilinputred"
              }`}/>
              <i className={`gg-close scale-[1.1] text-red-500 opacity-0 w-[0px] ease-in-out duration-300 ${
                  val_element === 'username' ? "w-auto opacity-100 ml-5 " : "opacity-0 w-[0px] ml-0"
              }`}></i>
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
              <p style={{color: localpallete[1].color}} className='font-Poppins relative font-bold text-[24px] sm:text-[32px] sm:mx-[130px]  mb-5'>Sign Up</p>

          </div>
          <p className='font-Poppins font-bold text-black sm:text-[20px] text-[14px]'>Wpisz</p>
          <p className={`font-Poppins text-black sm:text-[17px] text-[12px] ease-in-out duration-200 mb-4`}>hasło</p>
          <p></p>
          <div className='sm:h-[70px] h-[50px] mb-6 flex items-center'>
              <input id='passwordd-registerInput' value={pass} autoCapitalize='off' onChange={(e)=> P_Check(e.target.value)} type='text' autoCorrect='off'  className={`w-full h-full rounded-full text-[14px] p-4 font-Poppins bg-[#F2F2F2] ${
              p_validate === true ? "text-black" : "text-red-600 autofilinputred"
              }`}/>
          </div>
          <p style={{color: localpallete[1].color}} className='font-Poppins text-[17px]'>Pamiętaj by hasło było <span className='font-bold'>silne</span></p>
      </div>
    )
  }
}

export default CreateUser