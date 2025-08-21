import axios from "axios"
import { useState, useEffect } from "react"
import { useParams , useNavigate} from "react-router-dom"
import { Container, Col, Row } from "react-bootstrap"
import React from "react"











function TransactionDetailsById(){
 const navigate = useNavigate();
   const [isLogged, setIsLogged] = useState(false)

const [transaction, setTrasaction] = useState()




// useEffect(() =>{
    

//               const user =  localStorage.getItem("user-id")

//                if(user === null){

//                 navigate("/login")
//                }else{

//                 setIsLogged(true)
//                }

//          },[navigate] )












const {id} = useParams()


useEffect(() =>{

    const fetchTransaction = async () => {
        try{

  const response = await axios.get(`https://intercoin-web3.onrender.com/api/transactionDetails/${id}`)
    const result = response.data

    setTrasaction(result)
                  console.log(result)
           
        }catch(error){

   console.log(error)
        }

    }

    fetchTransaction() 

},[id])


    return (
                <div className='homeTransaction' style={{border:"none",height:"780px"}}> 
                
          

            <Container style={{border:"none", height:"680px", marginTop:"100px"}}>

                <Row style={{border:"none", height:"660px"}}>
                     <p style={{fontWeight:"bold", fontSize:"22px", fontFamily: "EB Garamond,serif", textShadow:"3px 3px rgba(223, 190, 190, 1)", color:"black"}}> Transaction Details </p>
                    <Col style={{  fontFmily:"EB Garamond,serif",
backgroundColor:" rgb(232, 232, 241)",
  border:" 2px solid rgb(117, 65, 65)",
  height:" 620px",
  color: "rgb(3, 17, 17)",
   margin:"40px",
   boxShadow:" 4px 4px rgb(117, 65, 65)",
   borderRadius: "12px"}} >
                    <table style={{border:"none", width:"100%", height:"600px"}}>
                {transaction?(
                        <thead>
                            <tr style={{borderBottom:"2px solid grey", fontFamily:"EB Garamond,serif", height:"60px", fontSize:"17px"}}>
                            <td>Type </td> 
                             <td className="transactionType">{transaction.type}</td>
                              </tr>

                               <tr style={{borderBottom:"2px solid grey", fontFamily:"EB Garamond,serif", height:"60px", fontSize:"17px"}}>
                            <td>Amount Sent </td> 
                             <td >{transaction.amountSent}</td>
                              </tr>

                                 <tr style={{borderBottom:"2px solid grey", fontFamily:"EB Garamond,serif", height:"60px",fontSize:"17px"}}>
                            <td>Amount Received </td> 
                             <td >{transaction.amountReceived}</td>
                              </tr>

                               <tr style={{borderBottom:"2px solid grey", fontFamily:"EB Garamond,serif", height:"60px", fontSize:"17px"}}>
                            <td>From Currency </td> 
                             <td >{transaction.fromCurrency}</td>
                              </tr>

                               <tr style={{borderBottom:"2px solid grey", fontFamily:"EB Garamond,serif", height:"60px", fontSize:"17px"}}>
                            <td>to Currency </td> 
                             <td >{transaction.toCurrency}</td>
                              </tr>

                              <tr style={{borderBottom:"2px solid grey", fontFamily:"EB Garamond,serif", height:"60px", fontSize:"17px"}}>
                            <td>rate </td> 
                             <td >{transaction.rate}</td>
                              </tr>

                              <tr style={{borderBottom:"2px solid grey", fontFamily:"EB Garamond,serif", height:"60px", fontSize:"17px"}}>
                            <td>type </td> 
                             <td >{transaction.type}</td>
                              </tr>

                              <tr style={{borderBottom:"2px solid grey", fontFamily:"EB Garamond,serif", height:"60px", fontSize:"17px"}}>
                            <td>status </td> 
                             <td >{transaction.status}</td>
                              </tr>

                               <tr style={{borderBottom:"2px solid grey", fontFamily:"EB Garamond,serif", height:"60px", fontSize:"17px"}}>
                            <td>date </td> 
                             <td style={{fontSize:"17px"}}>{transaction.timestamp}</td>
                              </tr>

                        </thead>
                ):(
                    <tfoot>
                    <tr>
                      <td>loading....</td>
                    </tr>
                  </tfoot>
                )}
                    </table>
                    
                    </Col>
                </Row>
            </Container>

           
          </div> )



}


export default TransactionDetailsById