import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from "cookie-universal"
// import toast from 'react-hot-toast';
import {Button, Nav , Col, Row, Container} from 'react-bootstrap'
import toast from 'react-hot-toast';
import deposit from "../assets/depositMoney.png"


const cookies = new Cookies();
  const token = cookies.get("access-token");
    
    //  console.log(token);

function Login(){

   
    const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
   const [loading, setLoading] = useState(false)
   
    

   const navigate = useNavigate();
      const handleSubmit  = async(e) => {
                     e.preventDefault();

                     setLoading(true)

                     try{

                      const dataa = {
                                       "email":email,
                                       "password":password,
    
                                     }

                                      console.log(dataa);
  
                  
                     
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
                      console.log(error)
                    toast.error('wrong credentials', {position:"top-right"});
                       
                    }finally{

                      setLoading(false)
                    }
  
            
  
  
      }
   
             return <div className='loginHomeContainer' > 

               <Container fluid className ="loginCon">
          <Row className ="loginRow"> 
            <Col xs = {12} className ="loginCol"> 
          
        {/* <p className = "paragraph1" >Inter Coin Digital Money </p> 
          <p className = "pargraph2">InterCoin combines the benefits of blockchain with the reliability of fiat currency.
             Secure, low-cost, and instant global transactions.</p>  */}
    


             
          </Col>



          </Row>
                   <Row className ="loginRow2" >
            

                     <Col className ="loginCol2" >
       
        
        <form onSubmit={handleSubmit}>
 <h2 className='signin'>Sign in</h2>
         
         <p   style={{textAlign:"left", paddingLeft:"40px", fontSize:"14px"}}>Email</p>
          <img src ={deposit} style={{height:"15px",width:"15px", marginTop:"10px",marginRight:"5px"}} />
         <input 
         id='email'
         placeholder = 'Type your email'
         className='loginInput'
           type='email'  
          name ="email"
           value = {email} 
           onChange = {(e) => 
            setEmail(e.target.value)
          } 
           />
         <br></br>
         <br></br><br></br>
           

          <p style={{textAlign:"left", paddingLeft:"40px", fontSize:"14px"}}>Password</p> 
          <img src ={deposit} style={{height:"15px",width:"15px", marginTop:"10px", marginRight:"5px"}} />
         <input type='password' 
       
         className='loginInput2'
          placeholder = 'Type your password'
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
        <br></br>

        <button  type='submit' className='loginBtnn'
        disabled = {loading}
        >
         {loading ? 'sending...' : 'Login'}
        </button>
         <br></br>
         <br></br>
         <p   >Or</p> 
         {/* <button className = 'btn btn-sm bttn3'
   > <Nav.Link href ="/register"  style = {{color:'white'}}>SignUp</Nav.Link></button>  */}
          
            <br></br>
              <br></br>


        <br></br>
       
       
        </form>
       

       </Col>
      </Row>
    </Container>
       </div> }  

export default  Login
