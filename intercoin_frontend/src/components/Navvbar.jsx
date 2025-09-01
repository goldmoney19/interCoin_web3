import React, { useState, useEffect } from 'react'

import {Container, Nav, Navbar} from 'react-bootstrap'
import {Link, useNavigate} from 'react-router-dom'
import Cookies from "cookie-universal"
import deposit from "../assets/depositMoney.png"
import send from "../assets/sendMoney.png"
import profile from "../assets/profilePic2.jpg"
import profile_img from "../assets/profile_img.jpg"
import notification from "../assets/notification.jpg"



const cookies = new Cookies();
      
  


function Navvbar() {

  const token = document.cookie
 const navigate = useNavigate();

     const [isLogged, setIsLogged ] = useState(false)
 
            useEffect(() => {
 
                  const user = localStorage.getItem("user-id");
                     if(!user === null){
 
                        
                        setIsLogged(true)
 
                     }
 
 
            }, [navigate])
 
  // const LogoutUser = () => {

  //         cookies.remove("PHPSESSID");
  //         cookies.remove("access-token");
  //         localStorage.removeItem("email");
  //          localStorage.removeItem("user");
  //           localStorage.removeItem("user-id");
        
  //        toast.success("Logout successful", {position:"top-right"});

  //         navigate("/");

  // }
      
      return( <div>

<Navbar collapseOnSelect expand="lg" className="navbar navbar-light navCover" fixed="top" >
      <Container fluid style={{fontFamily: "EB Garamond,serif"  ,border:"none"}}>
        <Navbar href="/" className='naviBrand'>InterCoinx</Navbar>
         <Navbar href="/" className='imageProf'>
         <img src =  {notification} className='profImage' />
       
        {isLogged ? (
                   <img src =  {profile} className='profImage1' />

        ):(

                    <img src =  {profile_img} className='profImage1' />

        )}

         </Navbar>

      
        <Navbar.Toggle aria-controls="responsive-navbar-nav"   style={{border:"none",backgroundColor:"white", color:"black",height:"35px",width:"54px"}}/>
        <Navbar.Collapse id="responsive-navbar-nav" >
          <Nav className="me-auto text-primary">
          <Nav.Link href ="/"><span className='navlinkHome'>Home</span></Nav.Link>
          
          <Nav.Link href ="/profile_page" ><span className='navlinkProfile' >Profile</span></Nav.Link>
            {/* <Nav.Link href ="/TransactionHistory" style={{color:"white" ,fontSize:"21px",borderBottom:"0.1px solid rgba(107, 59, 59, 1)"}}><span style={{color:"black"}}>Transaction history</span></Nav.Link> */}
            
         
            {/* <Nav.Link href ="/currencyBalancePage" style={{color:"white" ,fontSize:"21px",borderBottom:"none"}}><span style={{color:"black" ,fontSize:"18px"}}>Balance</span></Nav.Link> */}
            
            {/*<Nav.Link href ="" onClick={LogoutUser}>logout</Nav.Link>*/}
            
       <Nav.Link href ="/exchangeRateCalculate"  ><span className='navlinkRate'>Rate Calculator</span></Nav.Link>
   
   {/* <Nav.Link href ="/deposit"  style={{color:"white" ,fontSize:"21px",borderBottom:"none"}}><span style={{color:"black" ,fontSize:"18px"}}>Deposit</span></Nav.Link> */}

    {/* <Nav.Link href ="/transfer_funds"  style={{color:"white" ,fontSize:"21px",borderBottom:"0.1px solid rgba(107, 59, 59, 1)"}}><span style={{color:"black" ,fontSize:"18px"}}>Transfer</span></Nav.Link> */}

     {/* <Nav.Link href ="/swap" style={{color:"white" ,fontSize:"21px",borderBottom:"none"}} ><span style={{color:"black" ,fontSize:"18px"}}>Swap</span></Nav.Link> */}

      {/* <Nav.Link href ="/login"  style={{color:"white" ,fontSize:"21px",borderBottom:"0.1px solid rgba(107, 59, 59, 1)"}}><span style={{color:"black" ,fontSize:"18px"}}>Login</span></Nav.Link> */}


         

          </Nav>
        
        </Navbar.Collapse>
      </Container>
    </Navbar>
        </div>
        
     

      )

}

export default Navvbar