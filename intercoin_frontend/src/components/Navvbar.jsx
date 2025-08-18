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

<Navbar collapseOnSelect expand="lg" className="navbarr_body navbar navbar-dark " fixed="top" style={{backgroundColor:"black"}}>
      <Container style={{fontFamily: "EB Garamond,serif"}}>
        <Navbar.Brand href="/" >Inter Coin</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"  />
        <Navbar.Collapse id="responsive-navbar-nav" >
          <Nav className="me-auto text-primary">
          <Nav.Link href ="/">Home</Nav.Link>
          
          <Nav.Link href ="/profile_page">Profile</Nav.Link>
            <Nav.Link href ="/TransactionHistory">Transactions</Nav.Link>
            
         
            <Nav.Link href ="/currencyBalancePage">Balance</Nav.Link>
            
            {/*<Nav.Link href ="" onClick={LogoutUser}>logout</Nav.Link>*/}
            
       <Nav.Link href ="/contact" >Rate Calculator</Nav.Link>
   
   <Nav.Link href ="/deposit" >Deposit</Nav.Link>

    <Nav.Link href ="/transfer_funds" >Transfer</Nav.Link>

     <Nav.Link href ="/swap" >Swap</Nav.Link>

      <Nav.Link href ="/login" >Login</Nav.Link>

             <Nav.Link href ="/register" >Sign Up</Nav.Link>

         

          </Nav>
        
        </Navbar.Collapse>
      </Container>
    </Navbar>
        </div>
        
     

      )

}

export default Navvbar