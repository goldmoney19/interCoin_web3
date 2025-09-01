import React from 'react'
import {useState , useEffect} from 'react'
import Balance from './Balance'
import "../App.css"
import {Container, Row, Col, Nav,Card} from 'react-bootstrap'
import send from '../assets/transfer2.jpg'
import deposit from '../assets/deposit3.png'
import swap from '../assets/swap3.jpg'
import withdraw from '../assets/trade2.png'






function ChooseAction(){

     const weOffer_info = [

            {   id:"/deposit",
                 image:deposit,
             text:"Deposit",
            },

            {
                id:"/swap",
                 image:swap,
                text:"Swap",
            },

            {
                id:"/transfer_funds",
                image:send,
                text:"Transfer",
            },

              {
                id:"#",
                image:withdraw,
                text:"Trade",
            },

           
           

         ];

    return (
                <div className='chooseHomeContainer'> 
           
 <Row className='chooseActionRow2' >
                        {           
  weOffer_info.map((item) => (  
    <Col xs = {3}  className='chooseActionCol2' style={{width:"20%"}} >
               <Nav.Link href ={item.id} > <img src = {item.image} className='chooseImage' /></Nav.Link>
                   
                    
     
                                  
     <Nav.Link href ={item.id} > <p className='chooseText'>{item.text}</p></Nav.Link>
        
    </Col>
      )) } 
                 </Row>
                 
           
          </div> )



}


export default ChooseAction
