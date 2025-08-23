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
                   
                   await axios.post("https://intercoin-web3.onrender.com/api/user", formData)
                  .then((response)=>{

                    console.log(response);
                     toast.success(response.data.message, {position:"top-right"});
                     console.log("user inserted");
                      navigate("/login");
                 

                  })
                  .catch((error)=>{
       
                 console.error("Register error:", error.response?.data || error.message);
    toast.error(error.response?.data?.errorMessage || 'Something went wrong', {position:"top-right"});

                      toast.error('Inputs cannot be empty', {position:"top-right"});

                  })

          


    }



    return <div style = {{ fontFamily:"EB Garamond,serif",height:"680px",
    backgroundColor:"rgba(232, 249, 255, 1)"}}> 

    <Container style={{ height:"600px"}}>
      <Row>
 <Col xs = {12}>
          
          <p style={{paddingTop:"80px", fontSize:"20px",fontWeight:"bold"}} >Create Your Account</p>
          <p style={{fontSize:"19px",color:"rgba(48, 27, 27, 1)",paddingTop:"0px", fontWeight:"lighter"}}>Join a secure and stable digital financial future..</p>
                    <p style={{fontSize:"17px",color:"rgba(48, 27, 27, 1)",paddingTop:"0px", fontWeight:"lighter"}}>Pegged to a basket of global currencies, InterCoin is immune to crypto market volatility..</p>




             
          </Col>
          </Row>
      <Row style={{marginTop:"0px", height:"430px", border:"none"}}>


        <Col style={{fontFamily:"EB Garamond,serif",
  border: "none",
  height:" 400px",
  marginTop: "260px",
    margin:"0px",
  color: "black",
}}>

         <br></br>
         
        <form onSubmit={handleSubmit} encType='multipart/form-data'>

         <label></label><br></br>
         <input 
         placeholder = 'Email'
         id='email'
         style = {{ width:"80%", height:"45px",backgroundColor:'white',
          border:"none",
           color:'black', borderRadius:"12px",paddingLeft:"10px"}}
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
         style = {{  width:"80%", height:"45px",backgroundColor:'white', 
          border:"none",
          color:'black', borderRadius:"12px",paddingLeft:"10px"}}
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
         style = {{fontSize:"16px",  width:"80%", height:"45px",backgroundColor:'white', color:"black"}}
         disabled = {loading}
        >
        {loading ? 'sending...' : 'Signup'}
        
        </button>
        <br></br>
          <br></br>
            <br></br>
              <br></br>

     <span style={{textAlign:"left", color:"black"}}>if you already have an account :</span> <button className = 'btn btn-sm btn-warning'
      style={{backgroundColor:"rgba(0, 12, 12, 1)", border:"1px solid rgba(26, 18, 92, 0.4)"}}> <Nav.Link href ="/login"  style = {{color:'white'}}>Signin</Nav.Link></button> 
             

        </form>
        
        </Col>
      </Row>
    </Container>
       
  </div>

}
     export default Register
