# Sri Lanka Railways Location API

This Node.js application serves as a RESTful API for Sri Lanka Railways, handling the ingestion, storage, and retrieval of real-time GPS location data for trains. The API supports CRUD operations on train data and maintains a 90-day data retention policy, allowing clients to access both current and historical location information.

## Features

- Ingest and store real-time GPS location data for trains.
- Retrieve current and historical location data.
- Maintain a 90-day data retention policy with automatic cleanup.
- Perform CRUD operations on train data with history logging.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm (Node Package Manager)

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/sri-lanka-railways-location-api.git
   ```
   ```bash
   cd sri-lanka-railways-location-api
   ```
   
2. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Set up environment variables:**
   ```bash
   MONGO_URI=mongodb://localhost:27017/railways
   ```
   ```bash
   PORT=5000
   ```
5. **Start the application:**
   ```bash
   npm start
   ```

## API Endpoints

- POST /location: Ingest GPS location data for a train.
- GET /location/:trainId: Retrieve the current location of a specific train.
- GET /location/history/:trainId: Retrieve historical location data for a specific train.
- GET /train-history: Retrieve CRUD operation history for trains.
- GET /location-history: Retrieve creation history logs for locations.

  ![image](https://github.com/user-attachments/assets/a954a9ff-b995-446b-a4ae-09d969af429f)


## Data Retention and Cleanup
The application automatically deletes location data older than 90 days, managed by a cron job running daily at midnight.

License
This project is licensed under the MIT License. See the [LICENSE](https://github.com/A-Samod/sri-lanka-railways-location-api?tab=MIT-1-ov-file#readme) file for details.
