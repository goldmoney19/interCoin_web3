import React from 'react'
import {useState , useEffect} from 'react'
import axios from 'axios';
import {Container, Row, Col, Nav,Card} from 'react-bootstrap'
import "../App.css"
import ChooseAction from './ChooseAction';


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

     
useEffect(() =>{
    

              const user =  localStorage.getItem("user-id")

               if(user === null){

                navigate("/login")
               }else{

                setIsLogged(true)
               }

         },[navigate] )







  useEffect(() => {

         const fetchCurrency = async () => {
       try{
        const response = await axios.get("https://intercoin-web3.onrender.com/api/getCurrency")

                if (response.data && response.data.length > 0) {
            const fetchedWallet = response.data; 
            setWallet(fetchedWallet);
    
       
            
    
           
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

         const swapData = {
                userId,
                fromCurrency,
                toCurrency,
                amount: swapAmount
            };
   

        try{

            

              const response = await axios.post("https://intercoin-web3.onrender.com/api/swap", swapData)

             console.log(response.data)
              toast.success('Swap Successful', {position:"top-left"});
                                      navigate("/TransactionHistory");

             if (onSwapSuccess) {
                onSwapSuccess();
            }

        }catch(error){
            console.error(error.message)
toast.error('Swap failed. Please try again.');
    

        }finally{


          setLoading(false)
        }
  }

    return (
                <div className='swaphomeContainer' > 

                <Container className='swapcashCon'>

                <Row className='swapcashRow'>
     <p style={{fontWeight:"lighter", fontSize:"20px",paddingTop:"50px", fontFamily: "EB Garamond,serif", 
      color:"black"}}> Swap funds</p>

                  <Col className='swapcashCol'> 
        

        {wallet && wallet.length > 0 ? (
          <form onSubmit={handleSwap}>
               
               <p style={{textAlign:"left",paddingLeft:"37px"}}>From</p>
                  <select
                   style={{border:"none",width:"80%",height:"45px",backgroundColor:"white",
                     color:"black", marginTop:"0px", borderRadius:"12px",paddingLeft:"7px"}}
                   value={fromCurrency}
                   onChange={(e) =>setFromCurrency(e.target.value)}>
            
             {wallet.map((currency) => (
                  <option key={currency._id} value={currency.currencyName}>
                    {currency.currencyName}
                  </option>
                ))}
         
                   </select>
 
       
                          <p style={{paddingTop:"20px",textAlign:"left",paddingLeft:"37px"}}>To</p>

           <select
              style={{width:"80%",height:"45px",backgroundColor:"white", color:"black", 
                marginTop:"0px", borderRadius:"12px",paddingLeft:"7px", border:"none"}}
                   value={toCurrency}
                   onChange={(e) =>setToCurrency(e.target.value)}>
          
          
           {wallet.map((currency) => (
                  <option key={currency._id} value={currency.currencyName}>
                    {currency.currencyName}
                  </option>
                ))}
              
         
                   </select>
         <br></br>
         
         
         <input type='Number'
         value={amount}
         onChange={(e) =>setAmount(e.target.value)}
         placeholder='Enter Amount'
         style={{border:"none",width:"80%",height:"45px",backgroundColor:"white",
           color:"black",
           marginTop:"30px", borderRadius:"0px",paddingLeft:"7px"}}
         />
         <br></br>
         <br></br>
   <button type="submit" className='btn btn-outline-success btn-sm'
    style = {{fontSize:"17px",height:"36px",border:"1px solid black", width:"80%",
      color:'black', backgroundColor:"white",marginTop:"20px",paddingLeft:"7px"}} 
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

        <Row>
               <ChooseAction />
              </Row>
      </Container>
          </div> )



}


export default Swap
