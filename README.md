# bango_social_app
creating a social app with User Registration, User Login, Password Recovery, Posts, using REACT class based components, Redux, Express.js, MongoDB, bcryptjs to create and store into the database encrypted
passwords, JsonWebToken to facilitate after the login exchanging data between frontend and backend in a secure way , and also to generate on the server api links for recovering passwords/confirming email addresses

The app is running on  
https://bango-social-app.herokuapp.com/

For testing register a new account with a valid e-mail address or use one of the below accounts (already validated):
marko.test.v01@gmail.com   pass:1234 
john.test.v01@gmail.com	   pass:1234 
lisa.test.v01@gmail.com    pass:1234 
peter.test.v01@gmail.com   pass:1234




![image](https://user-images.githubusercontent.com/100131303/168809201-dfbac89d-a580-4555-9ae7-a328af98da1e.png)
![image](https://user-images.githubusercontent.com/100131303/168809412-c0cf9332-fdb4-446f-b072-f42ac46b586e.png)
![image](https://user-images.githubusercontent.com/100131303/168810976-655c040c-6979-4a91-86d4-26fd0094facb.png)
![image](https://user-images.githubusercontent.com/100131303/168811046-d42309ff-e3b8-466c-aafe-b31385a597c8.png)

Details about development
Frontend:
Funcitionalities:
- user registration and authentification with data validation on the backend side
- choose a user from the list to start a private conversation
- searching for a user to start a private conversation
- searching for an existing conversation with a specific user
- inside a chat the possibility to send files photos, pdf, documents that will be stored in a directory on the server with the possibility for the user to see and download this files
- automatically update the chat content
- automatically update the chats list 
- update user profile data
- create a custom textArea using div to write the chat content with emoticons insertion along the text and storing into the database as html string
Frontend development using React (routes, ref, state, props, lifecycle methods), Redux(store, actions, reducers, constants), html-react-parser, axios , form-data 
