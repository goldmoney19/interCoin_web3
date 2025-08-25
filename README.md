                                         INTERCOIN

  Intercoin is a modern, full-stack application designed to demonstrate the core
 functionalities of a stablecoin platform




https://github.com/goldmoney19/interCoin_web3

                        
                                  TECH STACK USED:



Frontend:

React.js: A powerful JavaScript library for building the user interface.

Bootstrap: A mobile utility-first CSS framework used for rapid and responsive styling.

Vite: A fast and modern build tool for the frontend development server.


Backend:

Node.js: A JavaScript runtime environment for building the server-side logic and APIs.

Express.js: A minimalist web framework for building robust APIs.

MongoDB: A flexible NoSQL database for storing user and transaction data.

JSON Web Tokens (JWT): Used for secure user authentication and API access.




UI/UX Design
The application features a light color pallette feel, professional theme that provides a clean and modern aesthetic. 

Key design principles include:

(1) Clarity: A straightforward layout to guide users through core financial functions.

(2) Responsiveness: Designed to adapt flawlessly to different screen sizes, from mobile 
phones to large desktops.

(3) Consistency: A cohesive color palette and typography across all pages for a unified 
brand experience.



                                    SETUP INSTRUCTIONS


1. Clone the repository:

git clone https://github.com/your-username/intercoin.git
cd intercoin

2. Install Backend Dependencies (Node.js)
cd backend
npm install

# Create a .env file with your database connection string and JWT secret
# For example:
# DB_URI=your_mongodb_connection_string
# JWT_SECRET=your_super_secret_key

# Run the backend server
npm start



3. Setup the frontend:

# Navigate to the frontend directory
cd ../frontend

# Install dependencies
npm install

# Run the frontend application
npm run dev



                                         KEY FEATURES


Secure User Authentication: 

As soon as the App Loads on a browsers, The Users  is presented with a professional looking 
login page which contains a mini description of  what the app is about,  it also contains a login form.
The user can now  create an account with their email address and password. As soon as 
the account is created,  the user is  redirected to the homepage, and at the same time 
their own digital wallets are created and are initialized with zero figures.

At the Homepage, the user can view his various wallet balances arranged in a stacked style,
with the currency icon and balances  on display.

Just below the wallet balance section  is a row of the core functionalities of the app.
These Functionalities consist of:



 Funds Deposit:

 A simple and secure process for depositing stablecoins into your personal wallet.Once deposit button is clicked on , the user is presented with a form where he can select the wallet he wants to deposit funds. The user also inputs the amount and  then clicks deposit button, the funds is automatically deposited to the specific wallet securely, and the balance immediately reflected in the frontend wallet balance section.



Instant Transfers: 

The User can also make transfers to other users wallets across different countries and across
different user wallets. The User is presented with  a form , the form contains a text input where 
the receivers wallet details can be typed in, The user can select a wallet he wants to send from
and also select a wallet he wants to send to. When the form is submitted , the transaction is completed seamlessly.
 If there are network issues or problems, the transaction will be terminated or aborted.
This prevents incomplete transfers where funds are debited and not credited. this is made
possible by an additional transactional session code in the Backend.






Seamless Swapping:

The User can also Effortlessly exchange one type of stablecoin for another within 
the application, The user can select a wallet where he is sending from, and also select wallet
he is sending to, the amount is also selected. When the form is submitted, the swap takes place seamlessly, in any case of network issues, the transaction will be aborted to prevent incomplete transaction.


Rate Conversion:

In this App four different stablecoin currencies were used, USDx, EURx, cNGN, cXAF ,

Fixed exchange rate is  also used, when transfers and  swaps are made, calcultions are made between the sent from and received wallets , this ensures the correct exchange rate amount is remitted.




 After a transaction is made, the transaction is details is stored and can be viewed in 
the transaction history page.

The user can also view his account details in profile page and also logout from account.



                                                  CHALLENGES FACED


Deprecated dependencies:

Reactjs and Nodejs are a very useful and professional tool used in building apps .But unlike
PHP/laravel, dependencies in the package.json  like CORS, multer, body-parser can easily get 
Deprecated that is not in use again , so it has to be updated, and this can lead to warnings in the console. If not attended to in the long term, it could lead to bugs and errors in the future, But these error generally dosen’t affect the core functions of the app.



Handling Concurrency and Race Conditions / Simultaneous transactions: This is a critical situation When two users try to transfer funds simultaneously from the same account, you have a race condition, Or a situation where a transfer transaction is made and a network issue occurs, sometimes the money will leave the sender account and not be remitted in the receivers account, this is a situation encountered by many Nigerian Banks, so i mitigated and solved this by employing the method of Atomic Database Transaction, in this situation whenever there are network issues during a transfer transaction, the transfer will be annulled, sender wont be debited, and receiver wont be credited.



Duplicate request in frontend:


Reactjs is asynchronous unlike php , this is a situation where request are made by clicking a button multiple times instead of once, this can lead to multiple request leading to errors and bugs, But the solution for it was implemented by creation a loading state, setting it to true when the request is still loading, and setting it to false when thee the data is ready to be delivered.



As a Fullstack Developer, I still prefer building apps with react/node javascript ecosystem because it ensures uniformity across the front and backend. 




