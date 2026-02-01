#

# Reflection

I decided to expand on my week 7 assignment for this, as I liked the concept and had thought at the time that if it had user log-ins there was a lot more I could do with it. Looking at the requirements this week it was also clear that I should be able to meet them all within the constraints of the concept I was using.

When starting out made a user flow in Figma, though later added additional routes such as edit-profile that were not reflected in the digram ( https://www.figma.com/board/LRzWTvddwDEBPNoLfbpPqe/Untitled?node-id=0-1&p=f&t=WfXu0rRq8Cg5OQUn-0 ). I also thought through my database needs and set up 3 tables ( https://drawsql.app/teams/richard-le-fevre/diagrams/social-network ). My users table initially had an ID (primary key - INT), a username and a screenname, but I then reduced these to only a username (as the primary key) once I established that duplicate log in names could be ruled out using Clerk.

Once I started coding I got the main routes set up pretty easily, with the queries, .map's and forms tested and working by Friday afternoon. However, I encountered an error with the usernames I had put into the database tables manually as it turns out Clerk automatically sets them to all lower case. I trouble-shot this with some help from Bertie and after a bit of testing (and finding a couple more related errors), found that this could be worked with. In hind sight, this shows it would have been far better to stick with the conventional generated INT as the primary key for the table.

Once I had moved on and set up additional nested dynamic routes for adding, editing and deleting posts I went back to focus on UX further, adding features like auto-filling inputs with the current information from the database when on an edit page (I had to write a lengthy block of code to reformat dates from the database in order to get them in the correct format for this, as I couldn't find another solution), conditional rendering on the home page (depending on whether the user is logged in) and other features like this. I later tried to find a way to stop the footer appearing when on the user details form (which only appears when first signing up), as I wanted to avoid users navigating away from this, but as this was at the end of the time available I didn't go down the route fo trying top pass props (from params) to make this work and no other workable solutions were apparent.

I struggled with styling for the Radix UI drop down (this appears only on gigs posted by the logged in user and only when these are shown on their profile page) and the Clerk elements, so did very little with these styling-wise. Styling of the whole app is pretty basic, as I wanted to focus on the functionality and assignment requirements, but I do think that in terms of clarity and readability it's not too bad, but could maybe do with some additional touches to appear less bland and engage users better.

I would have liked to implement some extra features including:

- sorting and filter of gigs
- the addition of all gigs a user has a "going" status for in a separate section on the profile page
- conditional rendering for the 3 "going" related links in each gig on the gigs page and profile page, based on the user's current "going" status
- automatically adding a "going" status to any gig for the user posting it
- add additional tables to the database to allow for users to have a list of friends and view their profiles

I unfortunately did not have time to try these ideas out.
However, as a user you can:

- sign up, sign in, log out
- set up a profile as part of the sign up process
- view your profile page, which includes all gigs you have posted
- edit your profile info
- post an upcoming gig
- view all posted gigs
- edit or delete gigs you have posted (delete only available if noone is going - user must also remove their own ~going~ status first)
- tell people you're going or maybe going to any gig by adding a ~going~ status
- change your ~going~ status for individual gigs
- remove your ~going~ status for individual gigs
- see error/page not found pages when appropriate, which include link to take you back to the home page

I'm confident I have achieved all basic requirements and for stretch goals I have allowed users to update and delete their content (edit or delete both posted gigs and their ~going~ status for any gig), implemented global error and not-found page and created code in the main page of each route (covering all that can be reached through links) that redirects the user to the profile information form if they haven’t already submitted their info.

I would love some feedback on
