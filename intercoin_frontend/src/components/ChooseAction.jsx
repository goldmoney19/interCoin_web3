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
    <Col xs = {2}className='chooseActionCol '  style={{width:"63px",height:"70px",
      border:"1px solid red"
    }}>
               <Nav.Link href ={item.id} > <img src = {item.image} style={{width:"40px",height:"35px", border:"2px solid blue"}} /></Nav.Link>
                   
                    
      {/* <button 
       className='chooseActionbtn'
       >
        <Nav.Link href ={item.id} >{item.text}</Nav.Link></button>
                                     */}
                                  
    <p style={{paddingTop:"20px",fontSize:"12px",paddingLeft:"0px"}}>{item.text}</p>
        
    </Col>
      )) } 
                 </Row>
                 
           
          </div> )



}


export default ChooseAction
