import React from 'react'
import {useState , useEffect} from 'react'
import "../App.css"
import {Container, Row, Col, Nav,Card} from 'react-bootstrap'

import { useNavigate } from 'react-router-dom';






function CompleteProfile(){



    return (
                <div className='homeContainer'> 

                    

<Row className='profileSetRow' >

    <Col sm = {12} className='profileSetCol'  >

         
 <p className='profileSetText2' >Transaction history</p>
    <span><Nav.Link href='TransactionHistory'><button className='profileSetText2btnn'>view</button></Nav.Link></span>
             </Col>
                 </Row>
                    
           
     </div> )



}


export default CompleteProfile
