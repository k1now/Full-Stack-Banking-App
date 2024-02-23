# Full-Stack-Banking-App

***Overview***

K1 Bank is an online banking application that epitomizes the integration of modern web technologies to deliver a secure and user-friendly banking experience. Built on the MERN stack, it showcases the combination of MongoDB, Express.js, React.js, and Node.js, providing a robust solution for managing personal banking operations online. This application is designed to cater to the essential needs of banking customers, offering functionalities like account creation, authentication, transactions, and account management through an intuitive interface.

***Tier 1: Frontend - User Interface and Experience***

The frontend of K1 Bank is developed using React.js, offering a dynamic and responsive user interface. It employs React Router for navigation between components without refreshing the page, enhancing the user experience with fast and interactive transitions. The application's design is supported by Bootstrap for consistent and modern styling across various pages, ensuring accessibility and ease of use. 

***Tier 2: Backend - Server and Database Management***

K1 Bank's backend functionality is powered by Node.js and Express.js, creating a lightweight and efficient server capable of handling requests asynchronously. MongoDB, a document based database, is utilized for storing and managing user data, including personal details, account information, and transaction histories. This choice reflects the need for scalability and flexibility in handling unstructured data. Express middleware facilitates CORS, JSON parsing, and static file serving, establishing a foundation for the application's RESTful API endpoints, which are leveraged for CRUD operations related to user accounts and transactions.

***Tier 3: Integration and Deployment***

Integration in K1 Bank is handled leveraging Axios for HTTP requests to interact with the Express.js server. This integration facilitates real-time data exchange, ensuring that user interactions on the frontend reflect immediately in the database and vice versa. 


**How to Run**

1. Create a new folder, serving as your root directory, and name it BankingApp.
2. Download the full Public directory folder - which hosts the static contenet - the index.js, dal.js, package.json and package-lock.json into the BankingApp folder.
3. In your terminal, cd to your root directory, the BankingApp folder.
4. Once in the BankingApp folder, first run the 'npm install' command and then run the 'node index.js' command.
5. On your chrome browser, navigate to localhost:3000 and you will land on the login page.
