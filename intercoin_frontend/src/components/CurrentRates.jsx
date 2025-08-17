import React from 'react'
import {useState , useEffect} from 'react'
import "../App.css"
import {Container, Row, Col, Nav,Card} from 'react-bootstrap'

import { useNavigate } from 'react-router-dom';





function CurrentRates(){

    return (
                <div className='homeContainer'> 
       

            <Row className='current_rates'>

                <Col>
                      <h4 style={{  fontFamily:"EB Garamond,serif"}}>Current Rates</h4>
                
                </Col>
            </Row>
        
           
          </div> )



}


export default CurrentRates
