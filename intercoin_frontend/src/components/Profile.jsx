import React from 'react'
import {useState , useEffect} from 'react'
import axios from 'axios';
import {Container, Row, Col, Nav,Card} from 'react-bootstrap'
import "../App.css"
import Cookies from "cookie-universal";





function Profile(){

    return (
                <div className='homeContainer'> 
                  <Container fluid className='swapCon'>

                <Row className='swapRow'>

                  <Col sm = {2} style = {{border:'1px solid grey',height:'450px'}}>
                         <div>
       
        <div style={{border:'1px solid grey',color:"white"}}>
                    <Nav.Link href ="/profile_page" >Panel</Nav.Link>
        </div>
<br></br>
        <div style={{border:'1px solid grey',color:"white"}}>
                    <Nav.Link href ="#" >My Orders</Nav.Link>
        </div>
         <br></br>
            <div style={{border:'1px solid grey',color:"white"}}>
                    <Nav.Link href ="#"  >Edit Profile</Nav.Link>

          </div>
          <br></br>

            <div style={{border:'1px solid grey',color:"white",backgroundColor:"red"}}>
                    <Nav.Link href ="#"  >Logout</Nav.Link>

          </div>
          <br></br>
          <div style={{border:'1px solid grey'}}>
                  
            {/* <Nav.Link href ="" onClick={LogoutUser}>logout</Nav.Link> */}

          </div>

         
                    </div>
              </Col>

           <br></br>
            <Col sm = {10} style = {{border:'1px solid grey',height:'500px',overflowY:'scroll'}}>
     
        
   <h2> My Profile </h2>
         </Col>
      </Row>
      </Container>
           
          </div> )



}


export default Profile
