import React from 'react'
import {useState , useEffect} from 'react'
import axios from 'axios';
import {Container, Row, Col, Nav,Card} from 'react-bootstrap'
import "../App.css"
import Cookies from "cookie-universal";


const cookies = new Cookies();





function TransferFunds(){

    
    const [wallet, setWallet] = useState(null)

     const [fromCurrency, setFromCurrency] = useState("cNGN")
  const [toCurrency, setToCurrency] = useState("USDx")
        const [receiverId, setReceiverId] = useState("")
            const [amount, setAmount] = useState("")




useEffect(() => {
           
    const fetchCurrency = async () => {

                try{
           const response = await axios.get(" https://intercoin-web3.onrender.com/api/getCurrency")
                       
              // console.log(response.data)

              setWallet(response.data[0])

                }catch(error){

                 console.log(error)

                }

             }
   fetchCurrency()

}, [])



const handleTransfer = async (e) => {
    e.preventDefault();
         const senderId = cookies.get("user-id");

         if (!senderId ) {
            console.log('User not authenticated. Please log in.');
         
     
        }


         const transferAmount = parseFloat(amount);
        if (isNaN(transferAmount) || transferAmount <= 0) {
            console.log('Please enter a valid amount greater than zero.');
            // setMessageType('danger');
            // setLoading(false);
            return;
        }


   
    try{
      const _dataa = {
           
        senderId,
        receiverId,
        amount:transferAmount,
        fromCurrency,
        toCurrency
}

console.log(senderId,receiverId,amount,fromCurrency, toCurrency)

      const response = await axios.post(" https://intercoin-web3.onrender.com/api/transfer", _dataa)
             
      console.log(response.data);


    }catch(error){

    console.log(error);

    }
}



    return (
                <div className='homeContainer'> 

                  <Container fluid className='transferCon'>
                  
                                <Row className='transferRow'>
                
                                  <Col className='transferCol'> 
         <p>Transfer</p>

         { wallet && wallet.balances ?(
           
        <form onSubmit={handleTransfer}> 

            <input type='text'
         value={receiverId}
         placeholder='receiver id'
         style={{backgroundColor:"white", color:"black", borderRadius:"12px",paddingLeft:"7px"}}
         onChange={(e) =>setReceiverId(e.target.value)}
         />


         <br></br>
         <br></br>


        <label>From wallet : </label>  
          <select
          
           style={{backgroundColor:"white", color:"black", marginTop:"30px",borderRadius:"12px",paddingLeft:"7px"}}
          value={fromCurrency}
           onChange={(e) =>setFromCurrency(e.target.value)}>
      
           {Object.keys(wallet.balances).map((currency) =>(

                     <option key={currency} value={currency}>

                        {currency}
                        
                        </option>
                 )) }

           </select>

        
           <br></br>
         <br></br>

        <label>To wallet : </label>   
         <select
          style={{backgroundColor:"white", color:"black", marginTop:"30px" ,borderRadius:"12px",paddingLeft:"7px"}}
           value={toCurrency}
           onChange={(e) =>setToCurrency(e.target.value)}>
    
           {Object.keys(wallet.balances).map((currency) =>(

                     <option key={currency} value={currency}>

                        {currency}
                        
                        </option>
                 )) }

           </select>
         <br></br>
         <br></br>
         
         <input type='Number'
         value={amount}
          style={{backgroundColor:"white", color:"black", marginTop:"30px", borderRadius:"12px",paddingLeft:"7px"}}
          onChange={(e) =>setAmount(e.target.value)}
         placeholder='amount'
         />
         <br></br>
         <br></br>
     <button type="submit" className='btn btn-outline-success btn-sm' 
              style={{border:"1px solid white", width:"99px",backgroundColor:"rgba(37, 55, 95, 0.6)", color:"white", marginTop:"30px",borderRadius:"12px"}}
                onClick={handleTransfer}><Nav.Link>send</Nav.Link>
    </button>
         


        </form>
         ):(

            <p>loading details</p>

         )}


    </Col>
        </Row>
        </Container>
          </div> )



}


export default TransferFunds
