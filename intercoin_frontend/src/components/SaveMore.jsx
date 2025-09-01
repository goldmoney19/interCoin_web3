import React from 'react'
import {useState , useEffect} from 'react'
import Balance from './Balance'
import "../App.css"
import { useNavigate } from 'react-router-dom'
import { Container , Row, Col} from 'react-bootstrap'




function ReferalRewards(){


    return ( <div className='referalHomeDiv' > 
               
               <Container fluid>
             <Row>

                <Col style={{border:"2px solid white",paddingTop:"0px", height:"43px",
                    textAlign:"left",boxShadow:"0.5px 0.5px black",borderRadius:"12px",
     fontFamily: "EB Garamond,serif",fontSize:"14px",fontWeight:"bold"

                }}>

                <p style={{float:"left", color:"black", paddingTop:"13px"}}>Save smart, earn plus return, 30%</p>
                 <button style={{
                    
                    float:"right",
                    backgroundColor:"rgba(2, 8, 37,1)",
                    borderRadius:"16%",
                    height:"25px",paddingTop:"1px",marginTop:"10px"
                 }}>view</button>

                </Col>
             </Row>

               </Container>
         
            
          </div> )



}


export default ReferalRewards
