# Hivo Todo app  (Backend)

#### I used these technologies :
![Static Badge](https://img.shields.io/badge/5.1.1-bcrypt-red)
![Static Badge](https://img.shields.io/badge/16.4.5-dotenv-yellow)
![Static Badge](https://img.shields.io/badge/4.19.2-express-blue)
![Static Badge](https://img.shields.io/badge/17.13.3-joi-sand)
![Static Badge](https://img.shields.io/badge/4.0.2-joi-objectid-pink)
![Static Badge](https://img.shields.io/badge/1.41.3-cloudinary-green)
![Static Badge](https://img.shields.io/badge/9.0.2-jsonwebtoken-purple)
![Static Badge](https://img.shields.io/badge/20.5.0-node-darkgreen)
![Static Badge](https://img.shields.io/badge/3.1.4-nodemon-09c)
![Static Badge](https://img.shields.io/badge/1.4.5-multer-brown)
![Static Badge](https://img.shields.io/badge/4.0.0-multer.storage.cloudinary-bronze)
![Static Badge](https://img.shields.io/badge/cors-2.8.5-0f3)
![Static Badge](https://img.shields.io/badge/nodemailer-6.9.14-orange)
![Static Badge](https://img.shields.io/badge/mongoose-8.5.0-white)


#### This is the Backend part which is considered with Database and data manipulation

# Modules

# 1- User module :

#### 1.1 User schema : 

```JavaScript
{
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true, default: "male" },
    location: { type: String, required: true },
    nationalId: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage: { type: String, required: true, default: "default.png" },
    isVerified: { type: Boolean, default: false },
    joinedAt: { type: Date, default: Date.now() },
}
```

#### 1.2 User endPoints : 

|pre-route|Endpoint|Method|Usage
|----:|-------:|-----:|-----
|/user|/verifyAccount|GET|allows user to receive a verify his email after creating account
|/user|/getUserProfile|GET|allows user to see him own profile
|/user|/resendVerificationEmail|GET|allows user to ask for another verification email it the last email expired 
|/user|/signUp|POST|allows user to create an account 
|/user|/login|POST|allows user to sign in and login to his account  
|/user|/forgetPassword|POST|allows user to ask for a new password
|/user|/submitNewPassword|POST|allows the user to change his password if he forgot his password 
|/user|/changeProfileImage|POST|allows the user to change his profile image
|/user|/changePassword|PATCH|allows user to change his password inside his account 
|/user|/editProfile|PATCH|allows user to edit/update his profile 

--------------------------------------------------------------------------------------

# 2- Task module:

#### 2.1 Task schema:

```JavaScript
{
    title: { type: String, required: true, default: "title" },
    content: { type: String, required: true, default: "description" },
    addedBy: { type: ObjectId, required: true, ref: 'user' },
    taskStatus: { type: String, required: true, default: "toDo" }, // To do , In progress, Done
    createdAt: { type: Date, default: Date.now() },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    doneAt: { type: Date },
}
```

#### 2.2 Task endPoints : 

|pre-route||Endpoint|Method|Usage
|----:|-------:|-----:|-----
|/task|/getAllTasks|GET|allows user to get all his tasks in a specific date (used in calender)
|/task|/getSpecificTasksType|GET|allows user to get all his tasks based on tasks type 
|/task|/addTask|POST|allows user to add any task
|/task|/editTask|PATCH|allows user to edit his tasks
|/task|/deleteTask|DELETE|allows user to delete any task
|/task|/deleteAllTasksType|DELETE|allows user to delete his tasks based on tasks status 
 
--------------------------------------------------------------------------------------

# notes :

#### all the services is full production using `onrender` cloud services
#### Server URL: *https://internship-assessment.onrender.com*


#### you can run the project using the following command : `npm start`

#### all get requests has a pagination you can send page *( default = 1)* and limit *(default =10)* in the URL 

#### you can find sample of *.env file* (use your credentials)