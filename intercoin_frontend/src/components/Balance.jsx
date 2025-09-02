import React from 'react'
import {useState , useEffect} from 'react'
import axios from 'axios';
import {Container, Row, Col, Nav,Card} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import CompleteProfile from './CompleteProfile';
import ChooseAction from './ChooseAction';
import ChooseAction2 from './ChooseAction2';
import CurrentRates from './CurrentRates';
import CurrencyBalance from './CurrencyBalance'
import InterCoinAi from './InterCoinAi'
import SaveMore from './SaveMore'
import ReferalRewards from './ReferalRewards';






 import Cookies from "cookie-universal"


 const cookies = new Cookies();




function Balance(){

 
     return  <div className='balance_cover'  >

           <Container fluid className='balance_con' >
          <br></br>  
           <br></br>       

                 <Row>
               <CurrencyBalance />
              </Row>
       <br></br>                 

     <Row>
               <ReferalRewards />
              </Row>

   <br></br>
    
                <Row>
               <ChooseAction />
              </Row>
  

                <Row>
               <SaveMore />
              </Row>


               <br></br>

                  <Row>
               <ChooseAction2 />
              </Row>
               <br></br>
                <Row>
               <CompleteProfile />
              </Row> 

              <br></br>
{/* 
            //   <Row>
            //    <CurrentRates />
            //   </Row>  */}

              <br></br>
            
             <Row>
              <Nav.Link href = "/interCoinAi">
              <button className='aiButton' style={{ backgroundColor:"rgba(2, 8, 37,1)"}}>
                  Chat with Ai</button></Nav.Link> 
              </Row> 

           

                    </Container>
    
          </div> 



}


export default Balance
