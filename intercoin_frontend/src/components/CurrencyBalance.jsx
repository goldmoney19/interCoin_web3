import React from 'react'
import {useState , useEffect} from 'react'
import axios from 'axios';
import {Container, Row, Col, Nav,Card} from 'react-bootstrap'
import "../App.css"
import Cookies from "cookie-universal";


const cookies = new Cookies();


function CurrencyBalance(){

     const userId = cookies.get("user-id");
    const email_user = localStorage.getItem("email");

   const [penthause, setPenthause] = useState([]);
  
    
   
  

   useEffect(()=>{
    
    
        const userDataa = {user_id:userId}


     const fetchUsers = async() => {
                    try{
            const response = await axios.post(" https://intercoin-web3.onrender.com/api/userBalance", userDataa);

               const result = await response.data;
                             console.log(result); 
                             setPenthause(result)
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

           <p style={{color:"white", fontSize:"18px", fontFamily:"EB Garamond,serif"
}}>Wallet Balance</p>

           <Col className='currencyBalanceCol'> 

<table className='tableStyle'>
                <br></br>         
    <thead>
          <tr className='tableRowKey' >
             {
                                              
               penthause.map((item) => (
                        
        Object.entries(item.balances).map(([key, value]) => (
                                                                    
                                                                      
            <td className='displayBalanceKeys'>{key}</td>
                                             
                                        
  ))  ))  }
             </tr>
    </thead>
                        
      <tbody>
          <tr className='tableRowValue' style = {{marginTop:"10px"}}>
       {
                                              
                penthause.map((item) => (
                        
         Object.entries(item.balances).map(([key, value]) => (
                                                                    
                                                                      
             <td className='displayBalanceValue' >{value}</td>
                                             
                                        
  )) )) }
       </tr>
    </tbody>
                        
    </table>
                                                
                                       
                                     


                 </Col>
                         </Row>
                        
          
           
          </div> )



}


export default CurrencyBalance
