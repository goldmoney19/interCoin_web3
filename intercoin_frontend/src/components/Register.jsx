import React from 'react'
import {useState , useEffect} from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import toast from 'react-hot-toast';
import {Container, Col, Row }from 'react-bootstrap';






function Register(props){

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

   
  const navigate = useNavigate();
  
    const handleSubmit  = async(e) => {
                   e.preventDefault();

 
  const formData = {
    "email":email,
    "password":password
  }

console.log(formData);

                    const portf = {email , password}
                   
                   await axios.post(" https://intercoin-web3.onrender.com/api/user", formData)
                  .then((response)=>{

                    console.log(response);
                     toast.success(response.data.message, {position:"top-right"});
                     console.log("user inserted");
                      navigate("/login");
                 

                    // toast.success(response.data.message, {position:"top-right"});
                    // navigate("/login");
                  })
                  .catch((error)=>{
        //    toast.error('Inputs cannot be empty', {position:"top-right"});

                     console.error(error)
                  })

          


    }



    return <div style = {{ fontFamily:"EB Garamond,serif",height:"700px"}}> 

    <Container style={{ height:"600px"}}>

      <Row style={{marginTop:"90px", height:"450px"}}>

        <Col >

         <br></br>
         <h2  style={{color:"white"}}>Sign up</h2>
        <form onSubmit={handleSubmit} encType='multipart/form-data'>

         <label></label><br></br>
         <input 
         placeholder = 'Email'
         id='email'
         style = {{ backgroundColor:'white', color:'black', borderRadius:"12px",paddingLeft:"10px"}}
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
         placeholder = 'password'
         style = {{ backgroundColor:'white', color:'black', borderRadius:"12px",paddingLeft:"10px"}}
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

        <button className = 'btn btn-sm btn-secondary'  type='submit' 
         style = {{ backgroundColor:'white', color:"black", width:"100px"}}
        >
        Signup
        
        </button>
        <br></br>
          <br></br>
            <br></br>
              <br></br>

     <span style={{textAlign:"left", color:"white"}}>if you already have an account :</span> <button className = 'btn btn-sm btn-warning'
      style={{backgroundColor:"rgba(26, 18, 92, 0.4)", border:"1px solid rgba(26, 18, 92, 0.4)"}}> <Nav.Link href ="/login"  style = {{color:'white'}}>login</Nav.Link></button> 
             

        </form>
        
        </Col>
      </Row>
    </Container>
       
  </div>

}
     export default Register
