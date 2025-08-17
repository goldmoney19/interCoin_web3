import React from 'react'
import {useState , useEffect} from 'react'
import Balance from './Balance'
import "../App.css"
import axios from 'axios';
import Cookies from "cookie-universal";


const cookies = new Cookies();



function TransactionHistory(){

  const userId = cookies.get("user-id");
   const [penthause, setPenthause] = useState([]);
      useEffect(() => {


         const fetchTransactions = async () => {
            

             const userDataa = {user_id:userId}
                try{
                 response = await axios.post("https://intercoin-web3.onrender.com/api/transferHistory", userDataa)

                 const result = await response.data;
                             console.log(result); 
                             setPenthause(result)
                }catch(error){

                   console.log(error)
                }
         }



      }, [userId])




    return (
                <div className='homeContainer'> 
          <h3>Transaction History</h3>
           
          </div> )



}


export default TransactionHistory
