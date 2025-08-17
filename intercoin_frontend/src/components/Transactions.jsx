import React from 'react'
import {useState , useEffect} from 'react'
import axios from 'axios';
import {Container, Row, Col, Nav,Card} from 'react-bootstrap'
import "../App.css"
import Cookies from "cookie-universal";





function Home(){

    return (
                <div className='homeContainer'> 
           <Balance />
           
          </div> )



}


export default Home
