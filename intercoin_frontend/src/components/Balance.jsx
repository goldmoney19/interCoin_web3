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




 import Cookies from "cookie-universal"


 const cookies = new Cookies();




function Balance(){

 
     return  <div className='balance_cover'  >

           <Container fluid  className='balance_con' >
                    
                  
               
                 <Row>
               <CurrencyBalance />
              </Row>
                       
   <br></br>
    <br></br>
    <br></br>
              <Row>
               <CompleteProfile />
              </Row>
   <br></br>
    <br></br>
    <br></br>
               <Row>
               <ChooseAction />
              </Row>

               <Row>
               <InterCoinAi />
              </Row>

                    </Container>
    
          </div> 



}


export default Balance
