import React from 'react'
import {useState , useEffect} from 'react'
import axios from 'axios';
import {Container, Row, Col, Nav,Card} from 'react-bootstrap'
import "../App.css"


import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';







function Swap({ onSwapSuccess }){
    const navigate = useNavigate();
   const [isLogged, setIsLogged] = useState(false)
        const [wallet, setWallet] = useState(null);

    const [fromCurrency, setFromCurrency] = useState('cNGN');
     const [toCurrency, setToCurrency] = useState('cXAF');
    const [amount, setAmount] = useState('');
    // const [message, setMessage] = useState('');
    // const [messageType, setMessageType] = useState(''); // 'success' or 'danger'
    const [loading, setLoading] = useState(false);

     
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

        setLoading(true)

           const userId =  localStorage.getItem("user-id")
         console.log(userId)
        if (!userId) {
            toast.error('User not authenticated. Please log in.');
            // setMessage('User not authenticated. Please log in.');
            // setMessageType('danger');
            setLoading(false);
            return;
        }


         const swapAmount = parseFloat(amount);
        // if (isNaN(swapAmount) || swapAmount <= 0) {

        //     console.log('Please enter a valid amount greater than zero.');
        //                 toast.error('Please enter a valid amount greater than zero.');

        //     // setMessageType('danger');
        //     setLoading(false);
        //     return;
        // }
        

        if(fromCurrency === toCurrency){

            console.log("you cant swap to the same currency")
             toast.error('you cant swap to the same currency');
            // setMessageType('danger');
           setLoading(false);
            return;
        }


        try{

             const swapData = {
                userId,
                fromCurrency,
                toCurrency,
                amount: swapAmount
            };

             const response = await axios.post("https://intercoin-web3.onrender.com/api/swap", swapData)

             console.log(response.data)
              toast.success('Swap Successful', {position:"top-left"});
                                      navigate("/TransactionHistory");

             if (onSwapSuccess) {
                onSwapSuccess();
            }

        }catch(error){
            console.log(error)
toast.error('Swap failed. Please try again.');
    

        }finally{


          setLoading(false)
        }
  }

    return (
                <div className='homeContainer'> 

                <Container fluid className='swapcashCon'>

                <Row className='swapcashRow'>
     <p style={{fontWeight:"bold", fontSize:"22px", fontFamily: "EB Garamond,serif", color:"black"}}> Swap funds</p>

                  <Col className='swapcashCol'> 
        

        {wallet && wallet.balances ? (
          <form onSubmit={handleSwap}>
         
                  <select
                   style={{width:"80%",height:"45px",backgroundColor:"white", color:"black", marginTop:"30px", borderRadius:"12px",paddingLeft:"7px"}}
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

           <select
              style={{width:"80%",height:"45px",backgroundColor:"white", color:"black", marginTop:"30px", borderRadius:"12px",paddingLeft:"7px"}}
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
         style={{width:"80%",height:"45px",backgroundColor:"white", color:"black", marginTop:"30px", borderRadius:"12px",paddingLeft:"7px"}}
         />
         <br></br>
         <br></br>
   <button type="submit" className='btn btn-outline-success btn-sm'
    style = {{height:"40px",border:"1px solid white", width:"80%",color:'white', backgroundColor:"rgba(0, 12, 12, 1)",marginTop:"30px",borderRadius:"12px",paddingLeft:"7px"}} 
    onClick={handleSwap}
    disabled = {loading}
    >{loading ?'wait, sending...' : 'send'}</button>
         
                </form>
        
            ) : (
        // Display a loading message while the data is being fetched.
        <p>Loading...</p>
      )} 

      </Col>
      </Row>
      </Container>
          </div> )



}


export default Swap
