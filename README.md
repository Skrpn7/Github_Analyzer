# GitHub Profile Analyzer API

A Node.js and Express.js backend service that analyzes GitHub user profiles using the GitHub Public API and stores useful insights in a MySQL database.

## Features

* Analyze any public GitHub profile using username
* Store profile analysis results in MySQL
* Update existing profiles on re-analysis
* Fetch all analyzed profiles
* Fetch a single analyzed profile
* Pagination support
* Search profiles by username
* Sorting support
* Structured API responses
* Error handling for invalid users and API failures

## Tech Stack

* Node.js
* Express.js
* MySQL
* Sequelize ORM
* Axios
* GitHub REST API

## Insights Stored

The application stores the following profile insights:

* GitHub ID
* Username
* Name
* Bio
* Avatar URL
* Profile URL
* Public Repository Count
* Followers Count
* Following Count
* Total Stars Across Repositories
* Total Forks Across Repositories
* Top Programming Language
* Average Stars Per Repository
* Most Starred Repository
* Account Creation Date
* Account Age (Years)
* Analysis Timestamp

## Project Setup

### 1. Clone Repository

```bash
git clone <repository-url>
cd github-profile-analyzer
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Environment File

Create a `.env` file in the root directory using `.env.example` as reference.

```env
PORT=5000

DB_HOST=localhost
DB_PORT=3306
DB_NAME=github_analyzer
DB_USER=root
DB_PASSWORD=your_mysql_password

GITHUB_TOKEN=your_github_personal_access_token
```

### 4. Create Database

```sql
CREATE DATABASE github_analyzer;
```

### 5. Start Application

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

The server will run on:

```text
http://localhost:5000
```

---

## API Endpoints

### Analyze GitHub Profile

```http
POST /api/github/analyze/:username
```

Example:

```http
POST /api/github/analyze/Skrpn7
```

---

### Get All Analyzed Profiles

```http
GET /api/github/profiles
```

Supports:

```http
?page=1
&limit=10
&search=octo
&sort=followers
&order=DESC
```

Example:

```http
GET /api/github/profiles?page=1&limit=5&search=octo
```

---

### Get Single Profile

```http
GET /api/github/profiles/:username
```

Example:

```http
GET /api/github/profiles/octocat
```

---

## Sample Success Response

```json
{
  "errorMessages": null,
  "isSuccess": true,
  "result": {
    "username": "octocat",
    "followers": 18000,
    "publicRepos": 8,
    "totalStars": 250,
    "totalForks": 100,
    "topLanguage": "JavaScript",
    "mostStarredRepo": "Hello-World",
    "accountAgeYears": 14.25
  },
  "statusCode": 200,
  "totalRecords": 1
}
```

---

## Database Schema

```sql
CREATE TABLE Profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    githubId BIGINT UNIQUE NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    bio TEXT,
    avatarUrl VARCHAR(500),
    profileUrl VARCHAR(500),
    publicRepos INT DEFAULT 0,
    followers INT DEFAULT 0,
    following INT DEFAULT 0,
    totalStars INT DEFAULT 0,
    totalForks INT DEFAULT 0,
    topLanguage VARCHAR(100),
    averageStars FLOAT DEFAULT 0,
    mostStarredRepo VARCHAR(255),
    accountCreatedAt DATETIME,
    accountAgeYears FLOAT DEFAULT 0,
    analyzedAt DATETIME,
    createdAt DATETIME,
    updatedAt DATETIME
);
```

## Future Improvements

* Swagger API Documentation
* GitHub Repository Analytics
* Redis Caching
* Authentication & Authorization
* Scheduled Re-analysis
* Docker Support
* Unit & Integration Tests

## Author

Somesh Dhruw
