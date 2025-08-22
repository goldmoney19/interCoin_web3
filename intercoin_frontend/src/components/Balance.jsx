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
                    
                  
                 <p style={{paddingLeft:"30px",textAlign:"left",fontWeight:"bold",color:"Black", fontSize:"18px", fontFamily:"EB Garamond,serif", paddingBottom:"20px"
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


               <br></br>
              <br></br>
   
<p style={{paddingLeft:"30px",textAlign:"left",fontWeight:"bold",color:"Black", fontSize:"18px", fontFamily:"EB Garamond,serif", paddingBottom:"20px"
}}>Rate Conversion</p>
    <Row>
               <ExchangeRateCalculate />
              </Row>


   <br></br>
  
    <p style={{paddingLeft:"30px",textAlign:"left",fontWeight:"bold",color:"Black", fontSize:"18px", fontFamily:"EB Garamond,serif", paddingBottom:"0px"
}}>Transaction History</p>
               <Row>
               <TransactionHistory />
              </Row> 

                    </Container>
    
          </div> 



}


export default Balance
