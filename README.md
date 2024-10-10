to run this app :
requirements : npm install express mongoose axios node-cron dotenv

API Documentation for Koinx![task1-db-storing](https://github.com/user-attachments/assets/84a30228-a930-49b1-88d9-28b3f79d1a31)

Base URL:
Deployed on Vercel: https://koinx-eight-blond.vercel.app

1. Fetch Prices
Endpoint: /api/fetch-prices
Method: GET
description =  a background job that will fetch the current price in USD, 
               market cap in USD and 24 hour change of 3 cryptocurrencies: 
               Bitcoin, Matic, and Ethereum and store it in a database. 
               This job should run once every 2 hours.
hit this api = https://koinx-eight-blond.vercel.app/api/fetch-prices
Response:
Status Code: 200 OK
Content-Type: application/json
response  = Crypto prices fetched and stored successfully. (and data is saved in db)


2.Get Stats for a Specific Coin
Endpoint: /api/stats?coin=<coin_name>
Method: GET
Description:  return the latest data about the requested cryptocurrency.
Query Parameter:
coin: Name of the cryptocurrency (e.g., bitcoin, ethereum).
Response:
Status Code: 200 OK
Content-Type: application/json
hit this api =  https://koinx-eight-blond.vercel.app/api/stats?coin=bitcoin  (change coin name for different coins)
sample response = {
    "price": 59886,
    "marketCap": 1182998980627.5303,
    "24hChange": -1.2926579685039572
}


3. Get Price Deviation for a Specific Coin
Endpoint: /api/deviation?coin=<coin_name>
Method: GET
Description: Provides the price deviation of a specific cryptocurrency, indicating its price fluctuation.
Query Parameter:
coin: Name of the cryptocurrency (e.g., bitcoin, ethereum).
Response:
Status Code: 200 OK
Content-Type: application/json
hit this api = https://koinx-eight-blond.vercel.app/api/deviation?coin=bitcoin
Sample Response = {
    "deviation": "921.98"
}
