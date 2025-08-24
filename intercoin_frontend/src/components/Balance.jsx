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

           <Container className='balance_con' >
                    
                  
 <p style={{paddingLeft:"15px",textAlign:"left",fontWeight:"lighter",color:"black",
  fontSize:"18px", fontFamily:"EB Garamond,serif", paddingBottom:"0px",paddingTop:"49px"
}}>Wallet Balance</p>
                 <Row>
               <CurrencyBalance />
              </Row>
                       
   <br></br>
    
                <Row>
               <ChooseAction />
              </Row>


               <br></br>

                <Row>
               <CompleteProfile />
              </Row> 

              <br></br>

              <Row>
               <CurrentRates />
              </Row> 

              <br></br>
            
             <Row>
              <Nav.Link href = "/interCoinAi">
              <button style={{width:"90%",margin:"auto", backgroundColor:"rgba(5, 12, 12, 0.8)"}}>
                  Chat with Ai</button></Nav.Link> 
              </Row> 

           

                    </Container>
    
          </div> 



}


export default Balance
