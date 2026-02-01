# User Stories

🎯 ---edit my user profile.

# Stretch User Stories

🐿️ As a user, I want to visit other users’ profiles after seeing their posts on a global timeline so that I can learn more about them and view their other content.
🐿️ As a user, I want to follow other users so that I can stay updated on their posts and activities.
🐿️ As a user, I want to like other users’ posts so that I can show appreciation for content I enjoy.
🐿️ As a user, I want to be prompted to complete my biography if it’s left blank after logging in, ensuring that my profile is complete and informative.
🐿️ As a user, I want to see an error/not found page (using error.js or not-found.js) if I try to visit another users profile that doesn’t exist, so that I’m informed about the invalid page.
Stretch Requirements
🏹 Allow users to update their content. You can achieve this either with a dynamic route (“/posts/[id]/edit”) or by creating a modal.
🏹 Allow users to delete their content.
🏹 Allow users to view other profiles directly from posts they see on the global timeline, using a dynamic users route (e.g. /user/[userId]).
🏹 Let users follow each other by establishing a follower and followee relationship between profiles.
🏹 Enable users to like posts by linking their user_id to the liked_post in a junction table.
🏹 Ensure that a user’s biography cannot be left blank. If a user logs in without one, prompt them to add this information.
🏹 Create and display an error/not found page if the user visits another users profile that doesn’t exist.

# Reflection

I decided to expand on my week 7 assignment for this, as I liked the concept and had though at the time that if it has user log-ins there was a lot more I could do with it. Looking at the requiremwnts this week it was also clear that I should be able to meet them all within the constraints of the concept I was using.

When starting out made a user flow in Figma, though later added additional routes such as edit-profile that were not reflected in the digram ( https://www.figma.com/board/LRzWTvddwDEBPNoLfbpPqe/Untitled?node-id=0-1&p=f&t=WfXu0rRq8Cg5OQUn-0 ). I also thought through my database needs and set up 3 tables. My users table initially had an ID (primary key - INT), a username and a screenname, but I then reduced these to only a username (as the primary key) once I established that duplicate log in names could be ruled out using Clerk.

Once I started coding I got the main routes set up pretty easily, with the queries, .map's and forms tested and working by friday afternoon. However, I encountered an error wiht the usernames I had put into the database tables manually as it turns out Clerk automatically sets them to all lower case. I trouble-shot this wiht some help from Bertie and after a bit of testing (and finding a couple more related errors), found that this could be worked with. In hind sight, this shows it would have been far better to stick with the conventional generated INT as the primary key for the table.

Required
🎯 What requirements did you achieve?
🎯 Were there any requirements or goals that you were unable to achieve?
🎯 If so, what was it that you found difficult about these tasks?
Optional
🏹 Feel free to add any other reflections you would like to share about your submission, for example:

Requesting feedback about a specific part of your submission.
What useful external sources helped you complete the assignment (e.g Youtube tutorials)?
What errors or bugs did you encounter while completing your assignment? How did you solve them?
What went really well and what could have gone better?

# notes

As a user you can:

- sign up or sign in, then log out
- view your profile page
- post an upcoming gig
- view all posted gigs (sort?)
- edit or delete gigs you have posted (delete only available if noone is going - user must remove their own going status first)
- tell people you're going to any gig by adding a ~going~ status
- change your ~going~ status for individual gigs
- remove your ~going~ status for individual gigs
