import React from 'react'
import {useState , useEffect} from 'react'
import axios from 'axios';
import {Container, Row, Col, Nav,Card} from 'react-bootstrap'
import "../App.css"
import ChooseAction from './ChooseAction';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';








function TransferFunds(){
  const navigate = useNavigate();
const [isLogged, setIsLogged] = useState(false)
    
    const [wallet, setWallet] = useState([])
      const [loading, setLoading] = useState(false)

     const [fromCurrency, setFromCurrency] = useState("cNGN")
  const [toCurrency, setToCurrency] = useState("USDx")
        const [receiverId, setReceiverId] = useState("")
            const [amount, setAmount] = useState("")




  


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
                       
              // console.log(response.data)

              setWallet(response.data)

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
                <div className='transferhomeContainer'> 

                  <Container fluid className='transferCon' >
                  
                                <Row className='transferRow' >
  <p  className='transferHeading'>Transfer Funds</p>

                                  <Col className='transferCol'> 

         { wallet && wallet.length > 0 ?(
           
        <form onSubmit={handleTransfer}> 

    <input type='text'
 value={receiverId}
 className='transferReceiverId'
 placeholder='receiver id'
  
  onChange={(e) =>setReceiverId(e.target.value)}
         />

 <br></br>
         <br></br>
         
    <br></br> 

     <p className='transferFrom'>From</p>

          <select
          
         className='transferSelectFrom'
          value={fromCurrency}
           onChange={(e) =>setFromCurrency(e.target.value)}>
      
           {wallet.map((currency) =>(

                     <option key={currency._id} value={currency.currency}>

                        {currency.currencyName}
                        
                        </option>
                 )) }

           </select>

        
        
        
         <select
         className='transferToSelect'
           value={toCurrency}
           onChange={(e) =>setToCurrency(e.target.value)}>
    
           {wallet.map((currency) =>(

                     <option key={currency._id} value={currency.currencyName}>

                        {currency.currencyName}
                        
                        </option>
                 )) }

           </select>
         <br></br>
         <br></br>
         
    <br></br> 

         
  <input type='Number'
 value={amount}
  className='transferAmount'
   onChange={(e) =>setAmount(e.target.value)}
  placeholder='Enter amount'
         />
         <br></br>
         <br></br>
     <button type="submit" className='transferBtn' 
  
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
        <br></br>
        <br></br>
          <Row>
               <ChooseAction />
              </Row>
        </Container>
          </div> )



}


export default TransferFunds
