import React from 'react'
import {useState , useEffect} from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import toast from 'react-hot-toast';
import {Container, Col, Row }from 'react-bootstrap';

import deposit from "../assets/depositMoney.png"





function Register(props){

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
     const [loading, setLoading] = useState(false)
  

   
  const navigate = useNavigate();
  
    const handleSubmit  = async(e) => {
                   e.preventDefault();

                  
                 setLoading(true)


  const formData = {
    "email":email,
    "password":password
  }

console.log(formData);

                    const portf = {email , password}
                try{ 
       const response =  await axios.post("https://intercoin-web3.onrender.com/api/user", formData)
                  

                    console.log(response);
                     toast.success(response.data.message, {position:"top-right"});
                     console.log("user inserted");
                      // navigate("/login");
                 

                  }
                  catch(error){
       
                 console.error("Register error:", error.response?.data || error.message);
    toast.error(error.response?.data?.errorMessage || 'Something went wrong', {position:"top-right"});

                      toast.error('Inputs cannot be empty', {position:"top-right"});

                  }finally{

                      setLoading(false)
                    }

          


    }



    return <div style = {{ fontFamily:"EB Garamond,serif",height:"680px",
     backgroundColor:"rgb(31, 0, 46)"
}}> 

    <Container style={{ height:"600px"}}>
      <Row>
 <Col xs = {12} style={{border:"none",height:"80px"}}>
          
          {/* <p style={{paddingTop:"80px", fontSize:"20px",fontWeight:"bold"}} >Create Your Account</p> */}
          {/* <p style={{fontSize:"19px",color:"rgba(48, 27, 27, 1)",paddingTop:"0px", 
            fontWeight:"lighter"}}>Join a secure and stable digital financial future..</p>
                    <p style={{fontSize:"17px",color:"rgba(48, 27, 27, 1)",
                      paddingTop:"0px", fontWeight:"lighter"}}>Pegged to a basket of global currencies, InterCoin is immune to crypto market volatility..</p> */}




             
          </Col>
          </Row>
      <Row style={{marginTop:"0px", height:"430px", border:"none"}}>
          

        <Col style={{fontFamily:"EB Garamond,serif",
  border: "none",
  height:" 530px",
  marginTop: "260px",
    margin:"20px",
  color: "black",
  backgroundColor:"white",
  borderRadius:"12px"
}}>


 <p style={{paddingTop:"20px", fontSize:"20px",fontWeight:"bold"}} >
            Create Your Account</p> 
         <br></br>
         
        <form onSubmit={handleSubmit} encType='multipart/form-data'>

          <p style={{textAlign:"left", paddingLeft:"40px", fontSize:"14px"}}>Email</p> 
                  <img src ={deposit} style={{height:"15px",width:"15px", marginTop:"10px", marginRight:"5px"}} />
         <input 
         placeholder = 'Type your Email'
         id='email'
         style = {{ width:"80%", height:"45px",backgroundColor:'white',
          border:"none",boxShadow:"1px 1px black",
           color:'black', borderRadius:"12px",paddingLeft:"10px",}}
           type='email'  
          name ="email"
           value = {email} 
           onChange = {(e) => 
            setEmail(e.target.value)
          } 
           />
         <br></br>
         <br></br>

         <p style={{textAlign:"left", paddingLeft:"40px", fontSize:"14px"}}>Password</p> 
                  <img src ={deposit} style={{height:"15px",width:"15px", marginTop:"10px", marginRight:"5px"}} />
         
         <input type='password' 
         placeholder = 'Type your password'
         style = {{  width:"80%", height:"45px",backgroundColor:'white', 
          border:"none",boxShadow:"1px 1px black",
          color:'black', borderRadius:"12px",paddingLeft:"10px"}}
         id="password"
          value ={password}
           name = "password"
           onChange = {(e) => 
            setPassword(e.target.value)
          }
           />
     
       
        <br></br>
       

        <button className = 'btn btn-sm btn-secondary'  type='submit' 
         style = {{marginTop:"80px",fontSize:"16px",  width:"80%", 
          height:"45px",backgroundColor:'rgb(31, 0, 46)', color:"white"}}
         disabled = {loading}
        >
        {loading ? 'signing up...' : 'Signup'}
        
        </button>
        <br></br>
          <br></br>
            <br></br>
              <br></br>

     <span style={{textAlign:"left", color:"black"}}> or </span> <button className = 'btn btn-sm btn-warning'
      style={{backgroundColor:"rgba(0, 12, 12, 1)", border:"1px solid rgba(26, 18, 92, 0.4)"}}> <Nav.Link href ="/login"  style = {{color:'white'}}>Signin</Nav.Link></button>  
             

        </form>
        
        </Col>
      </Row>
    </Container>
       
  </div>

}
     export default Register
