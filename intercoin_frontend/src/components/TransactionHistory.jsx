import React from 'react'
import {useState , useEffect} from 'react'
import Balance from './Balance'
import "../App.css"
import axios from 'axios';
import Cookies from "cookie-universal";
import { Container, Row, Col ,Nav} from 'react-bootstrap';



const cookies = new Cookies();



function TransactionHistory(){

  const userId = cookies.get("user-id");
   const [penthause, setPenthause] = useState([]);
      useEffect(() => {


         const fetchTransactions = async () => {
            

             const userDataa = {user_id:userId}
                try{
         const  response = await axios.post("https://intercoin-web3.onrender.com/api/transactionHistory", userDataa)

                 const result = await response.data;
                             console.log(result); 
                             setPenthause(result)
                }catch(error){

                   console.log(error)
                }
         }

   fetchTransactions();

      }, [userId])




    return (
                <div className='homeContainer'> 
      

           <Container className='transactionHistoryCon'>

            <Row>

               { penthause? (
                <Col>
                    <p style={{fontFamily:"EB Garamond,serif"}}>Transaction History</p>
                    
                        
                             {penthause.map((item) => (


 <Nav.Link href ={`/transactionDetailsById/` +item._id} type='button'>
   
    <div style={{border:"1px solid white", height:"70px",borderRadius:"25px", 
   marginTop:"30px", backgroundColor:"rgba(55, 2, 102, 0.2)"}}>
      
      <Row>
          <Col xs = {6}>
         <p style={{fontSize:"14px", fontFamily:"EB Garamond,serif"}}>{item.type}</p> 
         <p style={{fontSize:"12px", fontFamily:"EB Garamond,serif"}}>{item.timestamp}</p> 
          </Col>

        <Col xs = {6} >
        <p style={{fontSize:"14px", fontFamily:"EB Garamond,serif", paddingTop:"22px"}}>{item.amountSent}</p> 
        
        </Col>
      </Row>
      
      
       </div>
                       
   </Nav.Link>





                  
                ))}
                                 
              </Col>

                  ) : (
        // Display a loading message while the data is being fetched.
        <p>Loading currencies...</p>
      )} 

      

            </Row>


           </Container>



           
          </div> )



}


export default TransactionHistory
