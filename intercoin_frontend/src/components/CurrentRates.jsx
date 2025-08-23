import React from 'react'
import {useState , useEffect} from 'react'
import "../App.css"
import {Container, Row, Col, Nav,Card} from 'react-bootstrap'

import { useNavigate } from 'react-router-dom';






function CurrentRates(){



    return (
                <div className='homeContainer'> 

                    

                        <Row className='conversionRow' >

                            <Col sm = {12} className='conversionCol'  >

         
         <p className='conversionText2' >Currency conversion</p>
          <span><button className='conversionbtnn'>check</button></span>
                    </Col>
                        </Row>
                    
           
          </div> )



}


export default CurrentRates
