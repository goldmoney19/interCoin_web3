import React from 'react'
import {useState , useEffect} from 'react'
import axios from 'axios';
import {Container, Row, Col, Nav,Card} from 'react-bootstrap'
import "../App.css"

import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';








function TransferFunds(){
  const navigate = useNavigate();
const [isLogged, setIsLogged] = useState(false)
    
    const [wallet, setWallet] = useState(null)
      const [loading, setLoading] = useState(false)

     const [fromCurrency, setFromCurrency] = useState("cNGN")
  const [toCurrency, setToCurrency] = useState("USDx")
        const [receiverId, setReceiverId] = useState("")
            const [amount, setAmount] = useState("")




  


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

    setLoading(true)

           const senderId =  localStorage.getItem("user-id")

         if (!senderId ) {
                      toast.error('User not authenticated. Please log in.');

            console.log('User not authenticated. Please log in.');
         
     
        }


         const transferAmount = parseFloat(amount);
        if (isNaN(transferAmount) || transferAmount <= 0) {
                toast.error('Please enter a valid amount greater than zero.');

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

      const response = await axios.post("https://intercoin-web3.onrender.com/api/transfer", _dataa)
             
      console.log(response.data);
     toast.success('Transfer Successful', {position:"top-left"});
                                      navigate("/TransactionHistory");

    }catch(error){
      toast.error('transfer error.');

    console.log(error);

    }finally{
      setLoading(false)
    }
}



    return (
                <div className='homeContainer'> 

                  <Container fluid className='transferCon'>
                  
                                <Row className='transferRow'>
  <p style={{fontWeight:"bold", fontSize:"22px", fontFamily: "EB Garamond,serif", textShadow:"3px 3px rgba(223, 190, 190, 1)", color:"black"}}>Transfer Funds</p>

                                  <Col className='transferCol'> 

         { wallet && wallet.balances ?(
           
        <form onSubmit={handleTransfer}> 

            <input type='text'
         value={receiverId}
         placeholder='receiver id'
         style={{backgroundColor:"white", color:"black", borderRadius:"12px",paddingLeft:"7px", marginTop:"40px"}}
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
              style={{border:"1px solid white", width:"99px",backgroundColor:"rgba(0, 12, 12, 1)", color:"white", marginTop:"30px",borderRadius:"12px"}}
                onClick={handleTransfer}
                disabled = {loading}
                ><Nav.Link>{loading ? 'sending...' :'send'}</Nav.Link>
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
