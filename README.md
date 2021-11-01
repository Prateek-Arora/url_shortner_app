
# URL Shortener

This app allows a user to convert big URLs to shortened ones and provides features like analytics for a shortened URL.


## Authors

- [@prateekarora](https://github.com/Prateek-Arora)

## Demo

https://user-images.githubusercontent.com/37131837/139707895-a58e3c7f-ede1-4c73-8cec-6eb5408d9f53.mp4


## Features

- User registration and login.
- Shorten URLs
- Update and Delete shortened URLs
- URL Analytics
  - Page Views
  - Unique Visitors


## Run Locally

Clone the project

```bash
  git clone https://github.com/Prateek-Arora/url_shortner_app
```

Go to the project directory

```bash
  cd url_shortner_app
```

Install dependencies in root directory

```bash
  npm install
```

Install server related dependencies

```bash
  cd server
  npm install
```

Install client related dependencies

```bash
  cd ../client
  npm install
```

Run the project from root directory

```bash
  cd ../
  npm run dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_URI`   - Your mongodb database connection string.

`SECRET_KEY`  - Random string to sign your jwt tokens.

`BASE_URL`    - Base URL that your client will run on. Example  http://localhost:3000


## Screenshots

![Register User](https://user-images.githubusercontent.com/37131837/139704124-9f222769-12f3-4dc5-854e-e5723982ad5a.png)

![Login User](https://user-images.githubusercontent.com/37131837/139704167-d98c5267-adf1-430e-858e-b14fc093d4ce.png)

![Dashboard](https://user-images.githubusercontent.com/37131837/139704193-8018b4c3-a5f5-4802-8472-d85a3390ebef.png)

![Dashboard with shortened URL](https://user-images.githubusercontent.com/37131837/139704219-2b69955c-bd81-4bcb-9c24-5c1e7feb21d8.png)

![Update shortened URL](https://user-images.githubusercontent.com/37131837/139704236-f6ef70bf-2719-4634-a5d3-327d4facb29f.png)

![URL Analytics](https://user-images.githubusercontent.com/37131837/139704255-78c85a1a-ae40-40ab-bcef-b2887f955af2.png)


## Tech Stack

**Client:** React, Redux, Materialize CSS

**Server:** Node, Express


## 🚀 About Me
I'm a full stack developer who loves solving problems. To see a business solution get converted into a real product able to serve the needs of many is a sight to delight for any problem solver.

My journey started when I wrote my first python code and through a process of continuous learning, coding became an inevitable part of my daily routine. I've been an active coder on sites like gfg, codechef, interviewbit and leetcode.


## 🛠 Skills
Javascript, HTML, CSS, NodeJS, ReactJS, NestJS, C++, Jest, Postman...

