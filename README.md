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

The flow of the website:
1. Upon entering the website, it will go to the Landing Page, showing the Navigation Bar and list of Spots
  1a. The Nav-Bar will stay on the top of every page
  1b. Clicking the left logo or the title, will bring the display into the Landing Page (similar to Home)

2. To Login and Signup, you need to click on the button on the right of the Nav-Bar and will show a drop-down menu.
  2a. Login will have a Demo User
  2b. Login needs credential (username or email) and the password
  2c. Signup, need to fill all necessary input fields

3. Upon Login or Signup there will be another menu on the Nav-Bar, which is Create-Spot

4. Create-Spot will show an input form to fill the the necessary information, including up to 4 additional 4 images

5. Clicking the drop down menu button on the right side, will show the username, email, Manage Spots and Logout

6. Logout will take the user out of the system, and only can see the Landing Page and Spot Detail

7. From the Landing Page, by clicking the image, will go the Spot By Detail information

8. Under Manage Spots, the display will be similar to the Landing Page, but only belongs to the User, with additional buttons
  8a. Update - will show a form similar the create a spot with the information in it and will be able to change the information upon submitting the form and will return to the Spot Detail screen and will show the updated information.
  8b. For the 4 additional image url - any changes of the url, will update the the image url, any deletion, will delete the image url, any new url within a blank field, will add a new image url.
  8c. Delete - will delete the spot (with confirmation pop-up) and returned to the Manage Spot screen, where now the spot is gone

9. In the Spot detail, if the Spot is not belong to the User, there is a button to post a review, if the User has not create one yet.
  9a. Creating a review will update the list of reviews and update the star rating.
  9b. If User already has a review, then there are 2 buttons, update and delete
  9c. Update Review will show the pop-up similar to create a review with information from the reviews in it, updating it will update the review and star rating and will return to the Spot Detail screen
  9d. Delete Review will delete the review (with confirmation pop-up) and return to the Spot Detail screen.

10. There is a button for reservation within the Spot Detail screen, but it is only to go to another screen stating 'Feature coming Soon'

Any additional or modification to this project, the README.md will be updated as well.
