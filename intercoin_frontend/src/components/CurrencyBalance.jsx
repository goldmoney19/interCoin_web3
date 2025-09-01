import React from 'react'
import {useState , useEffect} from 'react'
import axios from 'axios';
import {Container, Row, Col, Nav,Card} from 'react-bootstrap'
import "../App.css"
import Cookies from "cookie-universal";


import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const cookies = new Cookies();


function CurrencyBalance(){

     const userId = localStorage.getItem("user-id");
   //  const email_user = localStorage.getItem("email");

   const [wallets, setWallets] = useState([]);
   const [loading, setLoading] = useState(true);
  
    
   
  

   useEffect(()=>{
    
    
        const userDataa = {user_id:userId}


     const fetchUsers = async() => {
                    try{
            const response = await axios.post("https://intercoin-web3.onrender.com/api/userBalance", userDataa);

               const result = await response.data;
                             console.log(result); 
                             setWallets(result)
    }
                     catch (error) {
     console.log("cannot fetch", error) 
    }finally{

     setLoading(false)
    }
     }
        
                    fetchUsers();
               }, [userId]);





                var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

    return (
                <div className='homeContainer'> 

                             

                                  
  <Row className='currencyBalanceRow' >

         

     <span className='currencyBalanceHeading'>Wallet Balance</span>


                   
    <Slider {...settings}>
             {
                                              
          !loading ? ( 
                        
       wallets.map((wallet) => (
                                                                    
<Col xs = {12} className='currencyBalanceCol'
 >      
      <img src = {wallet.imageUrl}
 className='currencyBalanceImage'  />
   <p className='currencyBalanceText1'>  {wallet.currency} account</p>

    <p className='currencyBalanceText2'>  {wallet.balance.toLocaleString()}</p>
                    </Col>  

          
                                        
                                        
  )) 

  
          ):(

<p>preparing balance....</p>
          )

               }
</Slider>
              
                         </Row>
                        
          
           
          </div> )



}


export default CurrencyBalance
