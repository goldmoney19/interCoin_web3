import React from 'react'
import {useState , useEffect} from 'react'
import Balance from './Balance'
import "../App.css"
import axios from 'axios';
import { Form, Button, Row, Col, Alert ,Nav, Container} from 'react-bootstrap';
import Cookies from "cookie-universal";


const cookies = new Cookies();



function Deposit({ onDepositSuccess }) {

    const [currency, setCurrency] = useState('cNGN');
    const [amount, setAmount] = useState('');

const currencies = ['cNGN', 'cXAF', 'USDx', 'EURx'];

    const handleDeposit = async (e) => {
        e.preventDefault();

        const userId = cookies.get("user-id");
        if (!userId) {
            console.log({'User not authenticated. Please log in.':userId});
            // setMessageType('danger');
            // setLoading(false);
            return;
        }


        const depositAmount = amount;
        if(isNaN(depositAmount) || depositAmount <= 0) {

            console.log('Please enter a valid amount greater than zero.');
            // setMessageType('danger');
            // setLoading(false);
        }

        try{

                 const _data = {

                     userId,
                currency,
                amount: depositAmount

                 }
                   console.log(userId,currency,amount)
                 const response = await axios.post("http://localhost:8000/api/deposit ",  _data)

                              console.log( response.data)
                              console.log(`Successfully deposited ${depositAmount} ${currency}`)
                              setAmount('');

                                 if (onDepositSuccess) {
                               onDepositSuccess();
                                       }

        }
        catch(error){

            console.log(error);
            //   const errorMessage = err.response?.data?.message || err.message;
            // setMessage(`Deposit failed: ${errorMessage}`);
            // setMessageType('danger');
             console.error("Deposit error:", error);
    
        }


    }

    return (<div className='homeContainer'> 

      <Container fluid className='depositCon'>
  
                <Row className='depositRow'>

                  <Col className='depositCol'> 
         <p style={{fontWeight:"bold",paddingBottom:"30px"}}> deposit funds</p>


       <Form onSubmit={handleDeposit}>

        <label>To wallet : </label>   <select
          style={{backgroundColor:"white", color:"black", marginTop:"30px", borderRadius:"12px",paddingLeft:"7px"}}
          value={currency}
          onChange={(e) =>setCurrency(e.target.value)}>
   {

      currencies.map(item =>(
               <option key={item._id} value={item}>{item}</option>
      ))
   }
    

          </select>
<br></br>
<br></br>

<input type='Number'
  style={{backgroundColor:"white", color:"black", marginTop:"30px", borderRadius:"12px",paddingLeft:"7px"}}
  placeholder='Amount'
value={amount}
onChange={(e) =>setAmount(e.target.value)}
/>
<br></br>
<br></br>
<br></br>
     <button type="submit" className='btn btn-outline-success btn-sm'
     style = {{border:"1px solid white", width:"99px",color:'white', backgroundColor:"rgba(37, 55, 95, 0.6)", borderRadius:"12px",paddingLeft:"7px"}} 

     onClick={handleDeposit}><Nav.Link>send</Nav.Link></button>

       </Form>



  </Col>
      </Row>
      </Container>

          </div> )



}


export default Deposit
