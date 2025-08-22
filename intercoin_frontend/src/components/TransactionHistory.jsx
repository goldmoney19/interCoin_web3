import React from 'react'
import {useState , useEffect} from 'react'
import Balance from './Balance'
import "../App.css"
import axios from 'axios';
import Cookies from "cookie-universal";
import { Container, Row, Col ,Nav} from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';


const cookies = new Cookies();



function TransactionHistory(){
   const navigate = useNavigate();
   const [isLogged, setIsLogged] = useState(false)

  const userId = cookies.get("user-id");
   const [penthause, setPenthause] = useState([]);





useEffect(() =>{
    

              const user =  localStorage.getItem("user-id")

               if(user === null){

                navigate("/login")
               }else{

                setIsLogged(true)
               }

         },[navigate] )










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

            <Row className='transactionHistoryRow'>
 {/* <p style={{fontWeight:"bold", fontSize:"22px", fontFamily: "EB Garamond,serif", textShadow:"3px 3px rgba(223, 190, 190, 1)", color:"black"}}>Transaction History</p> */}
               { penthause? (
                <Col className='transactionHistoryCol'>
                   
                    
                        
                             {penthause.map((item) => (


 <Nav.Link href ={`/transactionDetailsById/` +item._id} type='button'>
   
    <div style={{border:"1px solid white", height:"60px",borderRadius:"25px", 
   marginTop:"30px", backgroundColor:"rgba(27, 3, 24, 0.79)"}}>
      
      <Row>
          <Col xs = {6}>
         <p style={{fontSize:"16px", fontFamily:"EB Garamond,serif"}}>{item.type}</p> 
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
