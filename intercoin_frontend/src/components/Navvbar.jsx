import React from 'react'
import {Container, Nav, Navbar} from 'react-bootstrap'
import {Link, useNavigate} from 'react-router-dom'
import Cookies from "cookie-universal"


const cookies = new Cookies();
      
  


function Navvbar() {

  const token = document.cookie
 const navigate = useNavigate();

 
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

<Navbar collapseOnSelect expand="lg" className="navbarr_body navbar navbar-dark " fixed="top" style={{backgroundColor:"white"}}>
      <Container style={{fontFamily: "EB Garamond,serif"}}>
        <Navbar.Brand href="/" style={{color:"black",fontWeight:"bold",fontSize:"22px"}}>Inter- coin</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"   style={{backgroundColor:"rgba(54, 60, 63, 0.36)", color:"black"}}/>
        <Navbar.Collapse id="responsive-navbar-nav" >
          <Nav className="me-auto text-primary">
          <Nav.Link href ="/" style={{color:"white" ,fontSize:"21px",borderBottom:"1px solid rgba(107, 59, 59, 1)"}}><span style={{color:"black" ,fontSize:"18px"}}>Home</span></Nav.Link>
          
          <Nav.Link href ="/profile_page" style={{color:"white" ,fontSize:"21px",borderBottom:"none"}}><span style={{color:"black",fontSize:"18px"}}>Profile</span></Nav.Link>
            <Nav.Link href ="/TransactionHistory" style={{color:"white" ,fontSize:"21px",borderBottom:"0.1px solid rgba(107, 59, 59, 1)"}}><span style={{color:"black"}}>Transaction history</span></Nav.Link>
            
         
            <Nav.Link href ="/currencyBalancePage" style={{color:"white" ,fontSize:"21px",borderBottom:"none"}}><span style={{color:"black" ,fontSize:"18px"}}>Balance</span></Nav.Link>
            
            {/*<Nav.Link href ="" onClick={LogoutUser}>logout</Nav.Link>*/}
            
       <Nav.Link href ="/exchangeRateCalculate"  style={{color:"white" ,fontSize:"21px",borderBottom:"0.1px solid rgba(107, 59, 59, 1)"}}><span style={{color:"black" ,fontSize:"18px"}}>Rate Calculator</span></Nav.Link>
   
   <Nav.Link href ="/deposit"  style={{color:"white" ,fontSize:"21px",borderBottom:"none"}}><span style={{color:"black" ,fontSize:"18px"}}>Deposit</span></Nav.Link>

    <Nav.Link href ="/transfer_funds"  style={{color:"white" ,fontSize:"21px",borderBottom:"0.1px solid rgba(107, 59, 59, 1)"}}><span style={{color:"black" ,fontSize:"18px"}}>Transfer</span></Nav.Link>

     <Nav.Link href ="/swap" style={{color:"white" ,fontSize:"21px",borderBottom:"none"}} ><span style={{color:"black" ,fontSize:"18px"}}>Swap</span></Nav.Link>

      <Nav.Link href ="/login"  style={{color:"white" ,fontSize:"21px",borderBottom:"0.1px solid rgba(107, 59, 59, 1)"}}><span style={{color:"black" ,fontSize:"18px"}}>Login</span></Nav.Link>


         

          </Nav>
        
        </Navbar.Collapse>
      </Container>
    </Navbar>
        </div>
        
     

      )

}

export default Navvbar