import React from 'react'
import {useState , useEffect} from 'react'
import Balance from './Balance'
import "../App.css"
import { useNavigate } from 'react-router-dom'




function Home(){
const navigate = useNavigate()
    const [isLogged, setIsLogged ] = useState(false)

        //    useEffect(() => {

        //          const user = localStorage.getItem("user-id");
        //             if(user === null){

                        
        //                 navigate("/login")
        //             }else{
        //                setIsLogged(true)

        //             }


        //    }, [navigate])

    return (
                <div className='homeContainer'> 
                <p></p>
           <Balance />
            
          </div> )



}


export default Home
