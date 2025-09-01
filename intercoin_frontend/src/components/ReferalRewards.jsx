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

                <Col style={{border:"2px solid white",paddingTop:"0px", height:"23px",
                    textAlign:"left",boxShadow:"0.5px 0.5px black",borderRadius:"12px",
     fontFamily: "EB Garamond,serif",fontSize:"14px",fontWeight:"bold"

                }}>

                <p>Referral alerts, earn <span style={{color:"blue"}}>20%  p.a interest</span></p>
                
                </Col>
             </Row>

               </Container>
         
            
          </div> )



}


export default ReferalRewards
