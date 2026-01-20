# Weather Application API

A Node.js/Express application that integrates with the OpenWeatherMap API to provide:

- Current weather lookup by city
- 5-day weather forecast
- Save up to 3 favorite cities and view their weather at a glance

---

## **Table of Contents**

1. [Setup & Installation](#setup--installation)
2. [Running the Application](#running-the-application)
3. [API Endpoints](#api-endpoints)
4. [Architecture Decisions](#architecture-decisions)
5. [Assumptions](#assumptions)
6. [Testing](#testing)



## **Setup & Installation**

git clone <https://github.com/chimolirgb/weather-api-gateway >

cd <weather-api-gateway >

Install dependencies

npm install

Create .env file in the root directory with the following variables:


OPENWEATHER_API_KEY=<YOUR_OPENWEATHER_API_KEY>
OPENWEATHER_BASE_URL=https://api.openweathermap.org/data/2.5
PORT=3000
Replace <YOUR_OPENWEATHER_API_KEY> with your free API key from OpenWeatherMap.

Running the Application
Start the server:


npm start
Server will run on: http://localhost:3000

You can now test the API endpoints via Postman or browser.

API Endpoints


#### Weather
Method	        Endpoint	                    Description
GET	            /api/weather/:city	            Get current weather for a city

GET             /api/weather/forecast/:city	    Get 5-day forecast for a city

### Favorites
Method	    Endpoint	                        Description
POST	    /api/favorites	                    Add a city to favorites (JSON body: { "city": "Nairobi" })
GET     	/api/favorites	                    List all favorite cities with current weather
DELETE	    /api/favorites/:city	            Remove a city from favorites


Maximum 3 favorite cities allowed.

Architecture Decisions
Node.js + Express: Lightweight, suitable for building APIs

Services layer: weatherService.js handles API calls to OpenWeatherMap

Controllers: Handle request logic and validation

Routes: Separate route files for weather and favorites

Caching: In-memory cache with node-cache to store API responses for 10 minutes and reduce external API calls

Favorites storage: In-memory array (can be extended to database later)

Error handling: Consistent JSON responses with HTTP status codes

Assumptions
Maximum 3 favorite cities per user

No authentication implemented (single user assumption)

Favorite cities stored in-memory (data resets on server restart)

API key is valid and has access to OpenWeatherMap free tier

Temperature is in Celsius

Testing
Use Postman to test all endpoints

Collection includes:

Current weather

5-day forecast

Add favorite

List favorites

Delete favorite

Sample tests in Postman verify:

Correct data returned

Errors handled (duplicate, max favorites, invalid city)

Optional: Unit tests with Jest/Supertest can be added to validate service logic

Example Requests
Current Weather

GET http://localhost:3000/api/weather/Nairobi


Forecast

GET http://localhost:3000/api/weather/forecast/Nairobi


Add Favorite

POST http://localhost:3000/api/favorites
Content-Type: application/json

{
  "city": "Nairobi"
}


List Favorites

GET http://localhost:3000/api/favorites


Delete Favorite

DELETE http://localhost:3000/api/favorites/Nairobi



Author
Created by Lucy Chimoli
