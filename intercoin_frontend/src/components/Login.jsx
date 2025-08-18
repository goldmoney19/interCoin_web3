import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from "cookie-universal"
// import toast from 'react-hot-toast';
import {Button, Nav , Col, Row, Container} from 'react-bootstrap'
import toast from 'react-hot-toast';


const cookies = new Cookies();
  const token = cookies.get("access-token");
    
    //  console.log(token);

function Login(){

   
    const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");

   
    

   const navigate = useNavigate();
      const handleSubmit  = async(e) => {
                     e.preventDefault();

                     try{

                      const dataa = {
                                       "email":email,
                                       "password":password,
    
                                     }

                                      console.log(dataa);
  
                    //   const portf = {title , description, design, image}
                     
                  const response =  await axios.post("https://intercoin-web3.onrender.com/api/login", dataa ,{
                          headers:{

                            "Content-Type":"application/json"
                          }

                     })
                   

//  localStorage.setItem("token", response.data.token)
                           //     cookies.set("access-token", response.data.token ,{ maxAge:60*60*24*30*1000 });
        cookies.set("user-id", response.data.userId ,{ maxAge:60*60*24*30*1000 }); 
        localStorage.setItem("user-id", response.data.userId);
        localStorage.setItem("user", response.data.useRole);
        localStorage.setItem("email", response.data.useEmail);
                        console.log(response);
                    //    navigate("/");
                      if(response.data.useRole== "admin"){
                         // toast.success('Login Successful', {position:"top-right"});
                        navigate("/admin_dashboard");
                      }else{
               toast.success('Login Successful', {position:"top-left"});
                         navigate("/");
                      }
                    
                     }

                     

                    
                    catch(error){
                    toast.success('wrong credentials', {position:"top-right"});
                       console.log(error)
                    }
  
            
  
  
      }
   
             return <div style = {{ fontFamily:"EB Garamond,serif",height:"700px"}}> 

               <Container style={{height:"600px"}}>
             
                   <Row style={{marginTop:"90px", height:"450px"}}>
             
                     <Col >
        <br></br>
         <h2 style={{color:"white"}}>Login</h2>
        <form onSubmit={handleSubmit}>

         <label></label><br></br>
         <input 
         id='email'
         placeholder = 'Email'
          style = {{ backgroundColor:'white', color:'black' , borderRadius:"12px",paddingLeft:"10px"}}
           type='email'  
          name ="email"
           value = {email} 
           onChange = {(e) => 
            setEmail(e.target.value)
          } 
           />
         <br></br>
         <br></br>

         <label></label><br></br>
         <input type='password' 
          style = {{ backgroundColor:'white', color:'black',  borderRadius:"12px",paddingLeft:"10px"}}
          placeholder = 'Password'
         id="password"
          value ={password}
           name = "password"
           onChange = {(e) => 
            setPassword(e.target.value)
          }
           />
           
        
        <br></br>
        <br></br>
        <br></br>

        <button  type='submit' className='btn btn-primary'
        style = {{ backgroundColor:'white', color:"black", width:"100px"}}
        >login
        </button>
         <br></br>
          <br></br>
            <br></br>
              <br></br>

          <span style={{textAlign:"left", color:"white"}}>if you don't have an account :</span> <button className = 'btn btn-sm btn-warning'
           style={{backgroundColor:"rgba(26, 18, 92, 0.4)", border:"1px solid rgba(26, 18, 92, 0.4)"}}> <Nav.Link href ="/register"  style = {{color:'white'}}>SignUp</Nav.Link></button> 
        <br></br>
       
       
        </form>
       

       </Col>
      </Row>
    </Container>
       </div> }  

export default  Login
