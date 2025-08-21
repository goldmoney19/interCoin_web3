import React from 'react'
import {useState , useEffect} from 'react'
import axios from 'axios';
import {Container, Row, Col, Nav,Card} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import CompleteProfile from './CompleteProfile';
import ChooseAction from './ChooseAction';
import CurrentRates from './CurrentRates';
import CurrencyBalance from './CurrencyBalance';
import InterCoinAi from './InterCoinAi';
import ExchangeRateCalculate from './ExchangeRateCalculate';
import TransactionHistory from './TransactionHistory';




 import Cookies from "cookie-universal"


 const cookies = new Cookies();




function Balance(){

 
     return  <div className='balance_cover'  >

           <Container fluid  className='balance_con' >
                    
                  
                 <p style={{paddingLeft:"20px",textAlign:"center",fontWeight:"bold",color:"Black", fontSize:"18px", fontFamily:"EB Garamond,serif", paddingBottom:"20px"
}}>Wallet Balance</p>
                 <Row>
               <CurrencyBalance />
              </Row>
                       
   <br></br>
    
   <br></br>
              {/* <Row>
               <CompleteProfile />
              </Row> */}
  
               <Row>
               <ChooseAction />
              </Row>

<p style={{paddingLeft:"20px",paddingTop:"40px",textAlign:"left",fontWeight:"normal",
       fontSize:"20px", fontFamily: "EB Garamond,serif", textShadow:"2px 2px rgba(223, 190, 190, 1)", 
       color:"black"}}> Currency conversion</p>

            <Row>
               <ExchangeRateCalculate />
              </Row>

              <p style={{paddingLeft:"20px",paddingTop:"10px",textAlign:"left",fontWeight:"normal",
       fontSize:"20px", fontFamily: "EB Garamond,serif", textShadow:"2px 2px rgba(223, 190, 190, 1)", 
       color:"black"}}> Transaction History</p>
  

               <Row>
               <TransactionHistory />
              </Row> 

                    </Container>
    
          </div> 



}


export default Balance
