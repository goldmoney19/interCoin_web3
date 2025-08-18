
import './App.css'
import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'
import Navvbar from './components/Navvbar'
import Deposit from './components/Deposit'
import Swap from './components/Swap'
import TransferFunds from './components/TransferFunds'
import Profile from './components/Profile'
import 'bootstrap/dist/css/bootstrap.min.css'
import CurrencyBalance from './components/CurrencyBalance'
import TransactionHistory from './components/TransactionHistory'
import TransactionDetailsById from './components/TransactionDetailsById'








import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom'

function App() {


  return (
    <>
    
   <div>
        <BrowserRouter>
   <Navvbar  />
  <Routes>
     
  <Route path = "/" element = {<Home />} />

  <Route path = "/register" element = {<Register />} />

 <Route path = "/login" element = {<Login />} />

  <Route path = "/deposit" element = {<Deposit />} />

    <Route path = "/swap" element = {<Swap />} />

     <Route path = "/transfer_funds" element = {<TransferFunds />} />

       <Route path = "/profile_page" element = {<Profile />} />

         <Route path = "/currencyBalance" element = {<CurrencyBalance />} />

         <Route path = "/TransactionHistory" element = {<TransactionHistory />} />

          <Route path = "/transactionDetailsById/:id" element = {<TransactionDetailsById />} />
          
        


 </Routes>
   </BrowserRouter>
    
      </div>


    </>
  )
}

export default App
