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
          <Nav.Link href ="/"><span style={{color:"white"}}>Home</span></Nav.Link>
          
          <Nav.Link href ="/profile_page"><span style={{color:"white"}}>Profile</span></Nav.Link>
            <Nav.Link href ="/TransactionHistory"><span style={{color:"white"}}>Transactions</span></Nav.Link>
            
         
            <Nav.Link href ="/currencyBalancePage"><span style={{color:"white"}}>Balance</span></Nav.Link>
            
            {/*<Nav.Link href ="" onClick={LogoutUser}>logout</Nav.Link>*/}
            
       <Nav.Link href ="/exchangeRateCalculate" ><span style={{color:"white"}}>Rate Calculator</span></Nav.Link>
   
   <Nav.Link href ="/deposit" ><span style={{color:"white"}}>Deposit</span></Nav.Link>

    <Nav.Link href ="/transfer_funds" ><span style={{color:"white"}}>Transfer</span></Nav.Link>

     <Nav.Link href ="/swap" ><span style={{color:"white"}}>Swap</span></Nav.Link>

      <Nav.Link href ="/login" ><span style={{color:"white"}}>Login</span></Nav.Link>

             <Nav.Link href ="/register" ><span style={{color:"white"}}>Sign Up</span></Nav.Link>

         

          </Nav>
        
        </Navbar.Collapse>
      </Container>
    </Navbar>
        </div>
        
     

      )

}

export default Navvbar