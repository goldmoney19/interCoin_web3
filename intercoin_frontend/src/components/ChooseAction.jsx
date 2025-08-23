import React from 'react'
import {useState , useEffect} from 'react'
import Balance from './Balance'
import "../App.css"
import {Container, Row, Col, Nav,Card} from 'react-bootstrap'
import send from '../assets/sendMoney.png'
import deposit from '../assets/depositMoney.png'
import swap from '../assets/swapMoney.png'
import withdraw from '../assets/withdrawMoney.png'






function ChooseAction(){

     const weOffer_info = [

            {   id:"/deposit",
                 image:deposit,
             text:"Deposit",
            },

            {
                id:"/swap",
                 image:swap,
                text:"swap",
            },

            {
                id:"/transfer_funds",
                image:send,
                text:"transfer",
            },

              {
                id:"/exchangeRateCalculate",
                image:withdraw,
                text:"withdraw",
            },


           

         ];

    return (
                <div className='homeContainer'> 
           
 <Row className='chooseActionRow ' >
                        {           
  weOffer_info.map((item) => (  
    <Col xs = {2}className='chooseActionCol '  style={{width:"59px",height:"70px",
     
    }}>
               <Nav.Link href ={item.id} > <img src = {item.image} style={{width:"40px",height:"35px"}} /></Nav.Link>
                   
                    
     
                                  
     <Nav.Link href ={item.id} > <p style={{paddingTop:"20px",fontSize:"12px",paddingLeft:"0px"}}>{item.text}</p></Nav.Link>
        
    </Col>
      )) } 
                 </Row>
                 
           
          </div> )



}


export default ChooseAction
