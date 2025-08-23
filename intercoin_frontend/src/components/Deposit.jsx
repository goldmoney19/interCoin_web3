import React from 'react'
import {useState , useEffect} from 'react'
import Balance from './Balance'
import "../App.css"
import axios from 'axios';
import { Form, Button, Row, Col, Alert ,Nav, Container} from 'react-bootstrap';
import Cookies from "cookie-universal";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ChooseAction from './ChooseAction';


const cookies = new Cookies();



function Deposit({ onDepositSuccess }) {

 const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(false)
     const [loading, setLoading] = useState(false)
  

    const [currency, setCurrency] = useState('cNGN');
    const [amount, setAmount] = useState('');

const currencies = ['cNGN', 'cXAF', 'USDx', 'EURx'];



useEffect(() =>{
    

              const user =  localStorage.getItem("user-id")

               if(user === null){

                navigate("/login")
               }else{

                setIsLogged(true)
               }

         },[navigate] )



    const handleDeposit = async (e) => {
        e.preventDefault();

        setLoading(true)

        const userId = cookies.get("user-id");
        if (!userId) {
          toast.error('SUser not authenticated. Please log in');

            console.log({'User not authenticated. Please log in.':userId});
            
            // setMessageType('danger');
            setLoading(false);
            return;
        }


        const depositAmount = amount;
        if(isNaN(depositAmount) || depositAmount <= 0) {
          toast.error('Please enter a valid amount greater than zero.');

            console.log('Please enter a valid amount greater than zero.');
            // setMessageType('danger');
            setLoading(false);
        }




        

        try{

                 const _data = {

                     userId,
                currency,
                amount: depositAmount

                 }
        console.log(userId,currency,amount)
     const response = await axios.post("https://intercoin-web3.onrender.com/api/deposit ",  _data)

                              console.log( response.data)
                                toast.success('Deposit Successful', {position:"top-left"});
                                      navigate("/TransactionHistory");

                              console.log(`Successfully deposited ${depositAmount} ${currency}`)
                              // setAmount('');

                                 if (onDepositSuccess) {
                               onDepositSuccess();
                                       }

        }
        catch(error){
              toast.error('deposit error');

            console.log(error);
            //   const errorMessage = err.response?.data?.message || err.message;
            // setMessage(`Deposit failed: ${errorMessage}`);
            setLoading(false);
             console.error("Deposit error:", error);
    
        }{

          setLoading(false)
        }


    }

    return (<div className='deposithomeContainer'> 

      <Container className='depositCon' style={{width:"87%"}}>
  
                <Row className='depositRow'>
   <p style={{fontWeight:"lighter", fontSize:"20px",
    fontFamily: "EB Garamond,serif",  color:"black",paddingTop:"70px"}}> Deposit funds</p>

                  <Col className='depositCol' > 


       <Form onSubmit={handleDeposit}>
      {/* <p style={{textAlign:"left",paddingLeft:"20px"}}>To</p> */}
       <select
          style={{width:"90%",height:"45px",backgroundColor:"rgba(255, 255, 255, 1)", color:"black", 
            marginTop:"30px", borderRadius:"12px",paddingLeft:"7px",border:"none"}}
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
<br></br>
     

<input type='Number'
  style={{marginLeft:"0px",height:"45px",width:"90%",backgroundColor:"white", color:"black", 
    marginTop:"0px", borderRadius:"12px",paddingLeft:"7px",border:"none"}}
  placeholder='Amount'
value={amount}
onChange={(e) =>setAmount(e.target.value)}
/>
<br></br>
<br></br>
     <button type="submit" className='btn btn-outline-success btn-sm'
     style = {{marginTop:"30px", border:"1px solid white", width:"80%",
      color:'black', backgroundColor:"rgba(255, 255, 255, 1)", 
      paddingLeft:"7px", height:"35px",border:"1px solid black",fontSize:"18px"}} 

     onClick={handleDeposit}
     disabled = {loading}
     ><Nav.Link>{loading ? 'sending...' : 'send'}</Nav.Link></button>

       </Form>



  </Col>
      </Row>
    
      <Row>
               <ChooseAction />
              </Row>
      </Container>

          </div> )



}


export default Deposit
