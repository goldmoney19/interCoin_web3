import React from 'react'
import {useState , useEffect} from 'react'
import axios from 'axios';
import {Container, Row, Col, Nav,Card} from 'react-bootstrap'
import "../App.css"
import Cookies from "cookie-universal";


const cookies = new Cookies();



function Swap({ onSwapSuccess }){

        const [wallet, setWallet] = useState(null);

    const [fromCurrency, setFromCurrency] = useState('cNGN');
     const [toCurrency, setToCurrency] = useState('cXAF');
    const [amount, setAmount] = useState('');
    // const [message, setMessage] = useState('');
    // const [messageType, setMessageType] = useState(''); // 'success' or 'danger'
    // const [loading, setLoading] = useState(false);


  useEffect(() => {

         const fetchCurrency = async () => {
       try{
        const response = await axios.get("http://localhost:8000/api/getCurrency")

                if (response.data && response.data.length > 0) {
            const fetchedWallet = response.data[0]; 
            setWallet(fetchedWallet);
    
            // Get the list of currencies from the balances object keys.
            const currencies = Object.keys(fetchedWallet.balances);
    
            // Set initial values for the dropdowns once data is available.
            if (currencies.length > 0) {
              setFromCurrency(currencies[0]);
            }
            if (currencies.length > 1) {
              setToCurrency(currencies[1]);
            }
        }

         }catch(error){

              console.log(error)
         }
        }
         fetchCurrency()
  }, [])
    


  const handleSwap = async (e) => {
        e.preventDefault()

         const userId = cookies.get("user-id");
         console.log(userId)
        if (!userId) {
            setMessage('User not authenticated. Please log in.');
            setMessageType('danger');
            setLoading(false);
            return;
        }


         const swapAmount = parseFloat(amount);
        if (isNaN(swapAmount) || swapAmount <= 0) {
            console.log('Please enter a valid amount greater than zero.');
            // setMessageType('danger');
            // setLoading(false);
            return;
        }
        

        if(fromCurrency === toCurrency){

            console.log("you cant swap to the same currency")
            // setMessageType('danger');
            // setLoading(false);
            return;
        }


        try{

             const swapData = {
                userId,
                fromCurrency,
                toCurrency,
                amount: swapAmount
            };

             const response = await axios.post("http://localhost:8000/api/swap", swapData)

             console.log(response.data)

             if (onSwapSuccess) {
                onSwapSuccess();
            }

        }catch(error){

      console.log(error)

        }
  }

    return (
                <div className='homeContainer'> 

                <Container fluid className='swapCon'>

                <Row className='swapRow'>

                  <Col className='swapCol'> 
         <p style={{fontWeight:"bold"}}>Swap</p>

        {wallet && wallet.balances ? (
          <form onSubmit={handleSwap}>
         
                  <label>From wallet : </label> <select
                   style={{backgroundColor:"white", color:"black", marginTop:"30px", borderRadius:"12px",paddingLeft:"7px"}}
                   value={fromCurrency}
                   onChange={(e) =>setFromCurrency(e.target.value)}>
            
             {Object.keys(wallet.balances).map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
         
                   </select>
         <br></br>
         <br></br>

          <label>To wallet : </label>  <select
              style={{backgroundColor:"white", color:"black", marginTop:"30px", borderRadius:"12px",paddingLeft:"7px"}}
                   value={toCurrency}
                   onChange={(e) =>setToCurrency(e.target.value)}>
          
          
           {Object.keys(wallet.balances).map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              
         
                   </select>
         <br></br>
         <br></br>
         
         <input type='Number'
         value={amount}
         onChange={(e) =>setAmount(e.target.value)}
         placeholder='Enter Amount'
         style={{backgroundColor:"white", color:"black", marginTop:"30px", borderRadius:"12px",paddingLeft:"7px"}}
         />
         <br></br>
         <br></br>
   <button type="submit" className='btn btn-outline-success btn-sm'
    style = {{border:"1px solid white", width:"99px",color:'white', backgroundColor:"rgba(37, 55, 95, 0.6)",marginTop:"30px",borderRadius:"12px",paddingLeft:"7px"}} 
    onClick={handleSwap}><Nav.Link>send</Nav.Link></button>
         
                </form>
        
            ) : (
        // Display a loading message while the data is being fetched.
        <p>Loading currencies...</p>
      )} 

      </Col>
      </Row>
      </Container>
          </div> )



}


export default Swap
