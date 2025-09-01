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

                <Col style={{border:"2px solid white",paddingTop:"0px", height:"31px",
                    textAlign:"left",boxShadow:"0.5px 0.5px black",borderRadius:"12px",
     fontFamily: "EB Garamond,serif",fontSize:"14px",fontWeight:"bold"

                }}>

                <p style={{float:"left"}}>Referral alerts, earn <span style={{color:"blue",fontWeight:"lighter"}}>20%  p.a interest</span></p>
                <span style={{float:"right"}}><button style={{ float:"right",
                    backgroundColor:"rgba(2, 8, 37,1)",
                    borderRadius:"16%",
                    height:"25px",paddingTop:"1px",marginTop:"0px"}}>check</button></span>
                </Col>
             </Row>

               </Container>
         
            
          </div> )



}


export default ReferalRewards
