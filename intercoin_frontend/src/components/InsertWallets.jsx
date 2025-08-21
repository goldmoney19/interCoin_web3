import React from 'react'
import {useState , useEffect} from 'react'
import Balance from './Balance'
import "../App.css"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'




function InsertWallets(){
const navigate = useNavigate()
    const [isLogged, setIsLogged ] = useState(false)
        const [currency, setCurrency ] = useState("")
        const [image, setImage ] = useState(null)



        //    useEffect(() => {

        //          const user = localStorage.getItem("user-id");
        //             if(user === null){

                        
        //                 navigate("/login")
        //             }else{
        //                setIsLogged(true)

        //             }


        //    }, [navigate])


   const handleSubmit = async(e) => {
         e.preventDefault();

         if (!currency || !image) {
    console.log("Currency and image are required");
    return;
  }

const formData = new FormData();

  formData.append("currency", currency);
    formData.append("image", image);

try{
         const response = await axios.post("https://intercoin-web3.onrender.com/api/wallet2Insert",formData,
                                )

                      console.log(response.data)
                      console.log("successfully wallet insert")
                     setCurrency("")
                     setImage(null);

        }catch(error){

            console.error("Error inserting wallet:", error.response?.data || error.message);
        }
   }


    return (
                <div className='homeContainer'> 
                <p></p>
         <form  onSubmit={handleSubmit} encType='multipart/form-data'>
            
            <input type = "text" 
            value = {currency}
            onChange = {(e)=>{setCurrency(e.target.value)}}
            placeholder='currency'
            id='currency'
       name ="currency"
         
            />

     <br></br>
        <br></br>

            <input type ="file"
             name = "image"
            onChange = {(e)=>{setImage(e.target.files[0])}}
            />

         <br></br>
         <br></br>

        <button type ="submit" >submit</button>


         </form>
           
          </div> )



}


export default InsertWallets
