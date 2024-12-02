Peaceful-Stay

This is a 2 steps project created for Module 4 and Module 5 of the App Academy

The backend was in Module 4, in which the name was Winding-Down. The detail api documentation is within the backend folder.
The backend was a pair project using the express and sequelize, and then render using render.com and postgreSQL. The test was done using Postman.

The frontend was in Module 5, in which taking the backend and combined together into a new project, called Peaceful-Stay. The frontend is an individual project focusing on the frontend using react and redux.
The rendering is still using render.com

To run the project, 2 terminals should be opened:
- cd to backend and type npm start -> this will open the local host of 8000

- cd to frontend and type npm run dev -> this will open the local host of 5173

- the local host 5173 will show the frontend while the backend will show the communication with the database, or sequelize.

The address upon rendering in render.com is https://peaceful-stay.onrender.com

But since there is a time limit for the free service, it might not be exist anymore, hence need to create a new render.

The backend requirements:
  based on the Winding-Down.png, there are 6 tables, user, spot, spotImage, review, reviewImage and booking.

The CRUD created on the backend:
  full CRUD: spot, spotImage, review and booking
  semi CRUD: user and reviewImage

The frontend requirements:
  requires 2 full CRUD, achieved 3 full CRUD on spot and review, plus an additional of spotImage
  semi CRUD on user
  as of end of Module 5, end of November 2024, the reviewImage and booking have not been touched yet.