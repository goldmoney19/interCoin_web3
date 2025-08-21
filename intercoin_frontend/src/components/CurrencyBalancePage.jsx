import React from 'react'
import {useState , useEffect} from 'react'
import axios from 'axios';
import {Container, Row, Col, Nav,Card} from 'react-bootstrap'
import "../App.css"
import Cookies from "cookie-universal";
import { useNavigate } from 'react-router-dom';

const cookies = new Cookies();


function CurrencyBalancePage(){
 const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(false)
    //  const userId = cookies.get("user-id");
    const userId = localStorage.getItem("user-id");

   const [penthause, setPenthause] = useState([]);
  
    
   


// useEffect(() =>{
    

//               const user =  localStorage.getItem("user-id")

//                if(user === null){

//                 navigate("/login")
//                }else{

//                 setIsLogged(true)
//                }

//          },[navigate] )




  

   useEffect(()=>{
    
    
        const userDataa = {user_id:userId}


     const fetchUsers = async() => {

                    try{
                        
            const response = await axios.post("https://intercoin-web3.onrender.com/api/userBalancePage", userDataa);

               const result = response.data
                             console.log(result)
                              setPenthause(result)
    }
                     catch (error) {
     console.log("cannot fetch", error) 
    }
     }
        
                    fetchUsers();
               }, [userId]);

    return (
                <div className='homeContainer' > 

                             
<Container style={{ height:"700px", marginTop:"170px"}}>
                                  
  <Row className='currencyBalancePageRow' >

           <p style={{fontWeight:"bold", fontSize:"22px", fontFamily: "EB Garamond,serif", textShadow:"3px 3px rgba(223, 190, 190, 1)", color:"black"
}}>Wallet Balance</p>

           <Col className='.currencyBalancePageCol'> 

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
                        
          </Container>
           
          </div> )



}


export default CurrencyBalancePage
