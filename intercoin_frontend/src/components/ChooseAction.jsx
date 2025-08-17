import React from 'react'
import {useState , useEffect} from 'react'
import Balance from './Balance'
import "../App.css"
import {Container, Row, Col, Nav,Card} from 'react-bootstrap'






function ChooseAction(){

     const weOffer_info = [

            {   id:"/deposit",
                
             text:"Deposit",
            },

            {
                id:"/swap",
               
                text:"swap",
            },

            {
                id:"/transfer_funds",
               
                text:"transfer",
            },

              {
                id:"#",
               
                text:"invoice",
            },


           

         ];

    return (
                <div className='homeContainer'> 
          
 <Row className='chooseActionRow justify-content-center' >
                        {           
  weOffer_info.map((item) => (  
    <Col xs = {6} sm={3} className='chooseActionCol ' >
               
                   
                    
      <button 
       className='chooseActionbtn'
       >
        <Nav.Link href ={item.id} >{item.text}</Nav.Link></button>
                                    
                                  
        
    </Col>
      )) } 
                 </Row>
                 
           
          </div> )



}


export default ChooseAction
