import React from 'react'
import {useState , useEffect} from 'react'
import axios from 'axios';
import {Container, Row, Col, Nav,Card} from 'react-bootstrap'
import "../App.css"
import Cookies from "cookie-universal";


const cookies = new Cookies();


function CurrencyBalance(){

     const userId = localStorage.getItem("user-id");
   //  const email_user = localStorage.getItem("email");

   const [wallets, setWallets] = useState([]);
  
    
   
  

   useEffect(()=>{
    
    
        const userDataa = {user_id:userId}


     const fetchUsers = async() => {
                    try{
            const response = await axios.post("https://intercoin-web3.onrender.com/api/userBalance", userDataa);

               const result = await response.data;
                             console.log(result); 
                             setWallets(result)
    }
                     catch (error) {
     console.log("cannot fetch", error) 
    }
     }
        
                    fetchUsers();
               }, [userId]);



    return (
                <div className='homeContainer'> 

                             

                                  
  <Row className='currencyBalanceRow' >

         

        


                   
   
             {
                                              
             
                        
       wallets.map((wallet) => (
                                                                    
<Col xs = {4} style={{textAlign:"left",border:"none",
    height:"45px", width:"100%", marginBottom:"0px", 
    borderRadius:"8px", boxShadow:"2px 2px grey", backgroundColor:"rgba(222, 235, 247, 0.99)",
    }}>      
      <img src = {wallet.imageUrl}
 style={{height: "35px", objectFit: "contain", 
 marginTop: "6px",width:"40px" }}   />
   <span style={{padding:"0px",fontSize:"15px",fontWeight:"lighter",fontFamily:"EB Garamond,serif"}}>  {wallet.currency}</span>

                 <span style={{paddingTop:"0px",fontSize:"19px",fontWeight:"lighter",fontFamily:"EB Garamond,serif"}}>  {wallet.balance.toLocaleString()}</span>
                    </Col>  

          
                                        
                                        
  )) 

               }

                      

              
                         </Row>
                        
          
           
          </div> )



}


export default CurrencyBalance
