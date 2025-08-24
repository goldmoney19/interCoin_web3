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
The application features a light color pallete feel, professional theme that provides a clean and modern aesthetic. 

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
login page which describes what the app is app about,  it also contains a login form.
The User can now can create an account with their email address and password, as soon as 
the account is created the User is  redirected to the homepage, and at the same time 
their own digital wallets are created and are initialized with zero figures.

At the Homepage, the user can view his various wallet balances,arranged in a stacked style,
with the currency icon and balances  on display.

Just below the balance is a row of the core functionallities of the app,These Functionalities 
consist of:



 Funds Deposit:

 A simple and secure process for depositing 
stablecoins into your personal wallet.Once deposit is clicked on , the user is presented with 
a form where he can select the wallet he wants to deposits funds, the user also inputs the amount
and  then clicks deposit button, the funds is automatically deposited to the specific wallet securely
and the balance immediately reflection in the frontend balance.



Instant Transfers: 

The User can also make transfers to other users wallets across borders and accross
different user wallets. The User is presented with  a form , the form contains a text input where 
the receivers wallet details can be inputed, The user can select a wallet he wants to send from
and also select a wallet he wants to send to. When the form is submitted , the transaction is made seamlessly.
 If there are network issues or problems, the transaction will be terminated or aborted.
This prevents incomplete transfers where funds are debited and not credited. this is made
possible by an additional transactional session code in the Backend.






Seamless Swapping:The User can also Effortlessly exchange one type of stablecoin for another within 
the application, The user can select a wallet where he is sending from, and also select wallet
he is sending to, the amount is also inputed. When the form is submitted, the swap takes place seamlessly
, in an any case of network issues, the transaction will be aborted to prevent inccomplete transaction.



 After a transaction is made, the transaction is details is stored and can be viewed in 
the trasaction history page.

The user can also view his account details in profile page and also logout from account
