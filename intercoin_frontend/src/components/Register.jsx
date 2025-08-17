import React from 'react'
import {useState , useEffect} from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { Nav } from 'react-bootstrap';





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
                     console.log("user inserted");
                 

                    // toast.success(response.data.message, {position:"top-right"});
                    // navigate("/login");
                  })
                  .catch((error)=>{
        //    toast.error('Inputs cannot be empty', {position:"top-right"});

                     console.error(error)
                  })

          


    }



    return <div style = {{ fontFamily:' "EB Garamond",serif'}}> 
        <br></br>
         <h2 >Sign up</h2>
        <form onSubmit={handleSubmit} encType='multipart/form-data'>

         <label></label><br></br>
         <input 
         placeholder = 'Email'
         id='email'
         style = {{ backgroundColor:'white', color:'black'}}
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
         style = {{ backgroundColor:'white', color:'black'}}
         id="password"
          value ={password}
           name = "password"
           onChange = {(e) => 
            setPassword(e.target.value)
          }
           />
     
       
        <br></br>
        <br></br>

        <button className = 'btn btn-sm btn-secondary'  type='submit' >Signup</button>
        <br></br>
          <br></br>
            <br></br>
              <br></br>

      <button className = 'btn btn-sm btn-warning'> <Nav.Link href ="/login"  style = {{color:'white'}}>login</Nav.Link></button> 
             

        </form>
       
     
     





          </div>

}
     export default Register
