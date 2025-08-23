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
   
             return <div style = {{ fontFamily:"EB Garamond,serif",height:"690px",
             backgroundColor:"rgb(239,242,255)"}}> 

               <Container style={{height:"680px", border:"none"}}>
          <Row>
            <Col xs = {12}>
          
          <p style={{paddingTop:"80px", fontSize:"20px",fontWeight:"bold"}} >The Future of Digital Money is Inter Coin.</p>
          <p style={{fontSize:"15.5px",color:"rgba(48, 27, 27, 1)",paddingTop:"0px", fontWeight:"lighter"}}>InterCoin combines the benefits of blockchain with the reliability of fiat currency.
             Secure, low-cost, and instant global transactions.</p>



             
          </Col>



          </Row>
                   <Row style={{marginTop:"0px", height:"450px",  border: "none",}}>
              <h2 style={{color:"black",paddingTop:"20px",fontSize:"19px"}}>Sign in</h2>

                     <Col style={{fontFamily:"EB Garamond,serif",
  border: "none",
  height:" 360px",
  marginTop: "20px",
    margin:"16px",
  color: "black",
  // boxShadow:" 4px 4px rgb(117, 65, 65)",
   borderRadius: "12px"
}}>
       
        
        <form onSubmit={handleSubmit}>

         
         <input 
         id='email'
         placeholder = 'Email'
          style = {{ width:"80%",height:"45px",backgroundColor:'white',
            border:"none", 
            color:'black' , borderRadius:"12px",paddingLeft:"10px"}}
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
          style = {{width:"80%",height:"45px", backgroundColor:'white',
            border:"none",
             color:'black',  borderRadius:"12px",paddingLeft:"10px"}}
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
        style = {{width:"70%",height:"45px", backgroundColor:'white', 
          color:"black",border:"1px solid black" }}
        disabled = {loading}
        >
         {loading ? 'sending...' : 'login'}
        </button>
         <br></br>
          <br></br>
            <br></br>
              <br></br>

<span style={{textAlign:"left", color:"black"}}>if you don't have an account :</span> <button className = 'btn btn-sm btn-warning'
   style={{backgroundColor:"rgba(0, 12, 12, 1)", border:"1px solid rgba(26, 18, 92, 0.4)"}}> <Nav.Link href ="/register"  style = {{color:'white'}}>SignUp</Nav.Link></button> 
        <br></br>
       
       
        </form>
       

       </Col>
      </Row>
    </Container>
       </div> }  

export default  Login
