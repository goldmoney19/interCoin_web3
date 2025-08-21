import React from 'react'
import {useState , useEffect} from 'react'
import axios from 'axios';
import {Container, Row, Col, Nav,Card} from 'react-bootstrap'
import "../App.css"
import Cookies from "cookie-universal";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import rate from '../assets/swapImg.png'



const cookies = new Cookies();



function ExchangeRateCalculate({ onSwapSuccess }){
    const navigate = useNavigate();
   const [isLogged, setIsLogged] = useState(false)
        const [wallet, setWallet] = useState(null);

    const [fromCurrency, setFromCurrency] = useState('cNGN');
     const [toCurrency, setToCurrency] = useState('cXAF');
    const [amount, setAmount] = useState('');
    const [amountConverted, setAmountConverted] = useState('');

     
    // const [message, setMessage] = useState('');
    // const [messageType, setMessageType] = useState(''); // 'success' or 'danger'
    // const [loading, setLoading] = useState(false);


// useEffect(() =>{
    

//               const user =  localStorage.getItem("user-id")

//                if(user === null){

//                 navigate("/login")
//                }else{

//                 setIsLogged(true)
//                }

//          },[navigate] )







  useEffect(() => {

         const fetchCurrency = async () => {
       try{
        const response = await axios.get("https://intercoin-web3.onrender.com/api/getCurrency")

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

        const FX_RATES = {

               cNGN: {
        cXAF: 1.25,
        USDx: 0.0013,
        EURx: 0.0012
    },
    cXAF: {
        cNGN: 0.8,
        USDx: 0.0011,
        EURx: 0.0010
    },
    USDx: {
        cNGN: 760,
        cXAF: 910,
        EURx: 0.92
    },
    EURx: {
        cNGN: 820,
        cXAF: 990,
        USDx: 1.09
    }


    }

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

            // console.log(fromCurrency,toCurrency,swapAmount)


            const fx_rate = FX_RATES[fromCurrency][toCurrency];
            const convertedAmount = fx_rate * amount 
                          setAmountConverted(convertedAmount)

            console.log(convertedAmount)

            //  const response = await axios.post(" https://intercoin-web3.onrender.com/api/calculator", swapData)

            //  console.log(response.data)
            //   toast.success('Swap Successful', {position:"top-left"});
            //                           navigate("/TransactionHistory");

            //  if (onSwapSuccess) {
            //     onSwapSuccess();
            // }

        }catch(error){

      console.log(error)

        }
  }

    return (
                <div className='homeContainer'> 


                <Row className='rateRow'>

                  <Col className='rateCol'> 

        {wallet && wallet.balances ? (
          <form onSubmit={handleSwap}>
         
                 
                   <select
 style={{height:"35px",boxShadow:"2px 2px grey",backgroundColor:"white", color:"black", 
  marginTop:"0px", borderRadius:"12px",paddingLeft:"7px"}}
 value={fromCurrency}
 onChange={(e) =>setFromCurrency(e.target.value)}>
            
             {Object.keys(wallet.balances).map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
         
                   </select>

                   <input type='Number'
         value={amount}
         onChange={(e) =>setAmount(e.target.value)}
         placeholder='Enter Amount'
        
style={{height:"35px",boxShadow:"2px 2px grey",marginLeft:"25px",width:"100px",
  backgroundColor:"white", color:"black", marginTop:"30px", borderRadius:"12px",
  paddingLeft:"7px"}}
         />
         <br></br>
        <img src = {rate} style={{alignSelf:"flex-start", height:"30px",width:"30px",
    marginTop:"20px",marginRight:"10px"}}/> 
          <button   type="submit" className='btn btn-outline-success btn-sm'
    style = {{border:"1px solid white", width:"109px",height:"45px",color:'black', 
      backgroundColor:"rgba(55, 137, 175, 0.6)",marginTop:"20px",borderRadius:"12px",
      paddingLeft:"7px", fontSize:"17px"}} 
    onClick={handleSwap}><Nav.Link>calculate</Nav.Link></button>


<br></br>
           <select
              style={{height:"35px",boxShadow:"2px 2px grey",backgroundColor:"white", 
                color:"black", marginTop:"0px", borderRadius:"12px",paddingLeft:"7px"}}

                   value={toCurrency}
                   onChange={(e) =>setToCurrency(e.target.value)}>
          
          
           {Object.keys(wallet.balances).map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              
         
                   </select>

   <span style={{paddingLeft:"15px",}}><input
    disabled
   style={{height:"35px",boxShadow:"2px 2px grey",
   marginLeft:"15px",width:"100px",
    backgroundColor:"white", color:"black", marginTop:"10px", borderRadius:"12px",
    paddingLeft:"7px",fontWeight:"bold", fontSize:"18px"}} type = 'number' value = {amountConverted}/></span>
         <br></br>
         <br></br>

 
         
                </form>
        
            ) : (
        // Display a loading message while the data is being fetched.
        <p>Loading currencies...</p>
      )} 

      </Col>
      </Row>
          </div> )



}


export default ExchangeRateCalculate
