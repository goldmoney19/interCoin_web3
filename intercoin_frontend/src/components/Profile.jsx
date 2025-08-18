import React from 'react'
import {useState , useEffect} from 'react'
import axios from 'axios';
import {Container, Row, Col, Nav,Card} from 'react-bootstrap'
import "../App.css"
import Cookies from "cookie-universal";
import { useNavigate } from 'react-router-dom';


 const user = localStorage.getItem('email');
const cookies = new Cookies();
import toast from 'react-hot-toast';



function Profile(){
  const [isLogged, setIsLogged] = useState(false)
const token = cookies.get("user-id");
const navigate = useNavigate();

  


useEffect(() =>{
              const user =  localStorage.getItem("user-id")

               if(user === null){

                navigate("/login")
               }else{

                setIsLogged(true)
               }

         },[navigate] )


              const LogoutUser = () => {

         
          cookies.remove("token");
          localStorage.removeItem("email");
           localStorage.removeItem("user");
            localStorage.removeItem("user-id");
        
         toast.success("Logout successful", {position:"top-right"});

          navigate("/login");

  }


    return (
                <div className='homeContainer'  style={{backgroundColor:"black", border:"none"}}> 
                  <Container fluid className='swapCon'  style={{border:"none"}}>

                <Row className='swapRow'>
                  <h6  style={{color:'white', fontFamily:"EB Garamond,serif",paddingBottom:"40px"}}> Account </h6>

                  <Col sm = {2} style = {{border:'1px solid grey',minHeight:'150px'}}>
                         <div>
       
        <div style={{border:'1px solid grey',color:"black",fontFamily:"EB Garamond,serif", backgroundColor:"white"}}>
                    <Nav.Link href ="#" >{user}</Nav.Link>
        </div>
<br></br>
        <div style={{border:'1px solid grey',color:"white",fontFamily:"EB Garamond,serif"}}>
                    <Nav.Link href ="/TransactionHistory" >Transaction History</Nav.Link>
        </div>
         <br></br>
            <div style={{border:'1px solid grey',color:"white", fontFamily:"EB Garamond,serif"}}>
                    <Nav.Link href ="#"  >Account settings</Nav.Link>

          </div>
          <br></br>

            <div style={{border:'1px solid grey',color:"white",backgroundColor:"red", fontFamily:"EB Garamond,serif"}}>
                    <Nav.Link href ="#" onClick={LogoutUser} >Logout</Nav.Link>

          </div>
          <br></br>
       
         
                    </div>
              </Col>

           <br></br>
            <Col sm = {10} style = {{border:'1px solid grey',height:'300px',overflowY:'scroll'}}>
     
        
   
         </Col>
      </Row>
      </Container>
           
          </div> )



}


export default Profile
