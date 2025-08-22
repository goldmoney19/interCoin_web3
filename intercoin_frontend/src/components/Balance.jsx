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
                    
                  
                 <p style={{paddingLeft:"15px",textAlign:"left",fontWeight:"lighter",color:"Black", fontSize:"18px", fontFamily:"EB Garamond,serif", paddingBottom:"0px"
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
   
<p style={{paddingLeft:"15px",textAlign:"left",fontWeight:"lighter",color:"Black", fontSize:"18px", fontFamily:"EB Garamond,serif", paddingBottom:"0px"
}}>Rate Conversion</p>
    <Row>
               <ExchangeRateCalculate />
              </Row>
<br></br>
     <Row style={{marginBottom:"30px"}}>
               <Nav.Link href ="/interCoinAi" ><button style={{width:"297px",height:"75px ",fontFamily:"EB Garamond,serif",
                  fontSize:"17px", backgroundColor:"rgba(1, 1, 1, 0.95)", borderRadius:"12px", boxShadow:"2px 2px rgba(100, 128, 206, 0.7)"}}>Chat Inter Coin AI</button></Nav.Link>
              </Row> 
   <br></br>
  
    <p style={{paddingLeft:"15px",textAlign:"left",fontWeight:"lighter",color:"Black", fontSize:"18px", fontFamily:"EB Garamond,serif", paddingBottom:"0px"
}}>Transaction History</p>
               <Row>
               <TransactionHistory />
              </Row> 
             <br></br>

                    </Container>
    
          </div> 



}


export default Balance
