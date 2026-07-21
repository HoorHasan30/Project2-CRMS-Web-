# Project Name
CRMS

## Overview

## Screenshots


## Technologies Used
- HTML
- CSS
- JS
- Node.js
- Express
- MongoDB
- EJS
- GitHub

## Getting Started

## Installation

## User Stories
### Guest (Not Logged In User)
- As a guest, I want to sign-up in the system as a new user
- As a guest, I want to login in the system 

### Admin
- As an admin, I want to log in securely so that I can manage the system.
- As an admin, I want to view the dashboard so that I can monitor overall system activity.
- As an admin, I want to view ticket analytics so that I can identify trends and performance.
- As an admin, I want to view all submitted tickets so that I can manage support requests.
- As an admin, I want to assign a technician to a ticket so that issues are handled by the appropriate staff.
- As an admin, I want to assign a priority level to each ticket so that urgent issues are addressed first.
- As an admin, I want to update the status of tickets so that users are informed of their progress.
- As an admin, I want to reject invalid or duplicate tickets so that only legitimate requests are processed.
- As an admin, I want to log out securely so that my account remains protected

### User 
- As a user, I want to log in securely so that I can access my account.
- As a user, I want to view my dashboard so that I can quickly access my support requests.
- As a user, I want to submit a new ticket so that I can report an issue.
- As a user, I want to view all of my submitted tickets so that I can track their progress.
- As a user, I want to edit my ticket before it is assigned so that I can correct any mistakes.
- As a user, I want to delete a ticket that is no longer needed if it was still pending.
- As a user, I want to see the status of my tickets so that I know whether they are pending, assigned, or completed.
- As a user, I want to provide feedback after my ticket is resolved so that I can evaluate the support service.
- As a user, I want to log out securely so that no one else can access my account.


## Database Design
![erd](public/assets/ERD.png)


## Routes
### Index 
---
| Method | Route | Description |
|---------|-------|-------------|
| GET | /home | Display Home Page|

### Auth
---
| Method | Route | Description |
|---------|-------|-------------|
| GET | auth/sign-up | Sign Up Page |
| POST | auth/sign-up | Create User Account |
| GET | auth/login | Login Page |
| POST | auth/login | Login User into System |
| GET | auth/sign-out | Signout User From System |

### Category
---
| Method | Route | Description |
|---------|-------|-------------|
| GET | /categories | All Categories Page |
| POST | /categories | Create New Category |
| GET | /categories/:id | Show Category Details |
| GET | /categories//sub-categories/:id | Get Sub-Categories |
| POST | /categories/:id | Create Sub-Category |
| PUT | /categories/:id/edit | Update Category |
| PUT | /categories/:id/editsub | Upadte Sub-Category|

### Status
---
| Method | Route | Description |
|---------|-------|-------------|
| GET | /forbidden | Show Forbidden Page |

### Technician
---
| Method | Route | Description |
|---------|-------|-------------|
| GET | /technician | Show All Technicians Page |
| POST | /technician | Add New Technicians |
| PUT | /technician/:id | Edit Technician Details |


### Tickets
---
| Method | Route | Description |
|--------|-------|-------------|
| GET | /tickets | Show all tickets (Admin only)|
| GET | /tickets/myTickets | Show all tickets created by the currently signed-in user|
| GET | /tickets/new | Show new ticket form |
| POST | /tickets | Create new ticket|
| GET | /tickets/:id | Show ticket details |
| GET | /tickets/:id/edit | Edit ticket before it's assigned |
| PUT | /tickets/:id | Update pending ticket|
| GET | /tickets/:id/assign | Show assign ticket page (Admin only)|
| PUT | /tickets/:id/assign | Assign a technician and priority to a ticket (Admin only)|
| PUT | /tickets/:id/reject | Mark ticket at rejected |
| PUT | /tickets/:id/completed | Mark a ticket as completed (Admin only)|
| PUT | /tickets/:id/feedback | Add a feedback to the completed ticket |
| DELETE | /tickets/:id/delete | Delete a ticket |


### Analysis
---
| Method | Route | Description |
|---------|-------|-------------|
| GET | /admin | Show Admin Dashbpard(Analysis) |


## Features
- User registration and secure login/logout.
- Role-based access control for Guests, Users, and Administrators.
- Create, view, edit, and delete support tickets.
- View personal ticket history and track ticket status.
- Organize tickets using categories and sub-categories.
- Assign technicians to tickets.
- Set ticket priority levels.
- Update ticket status (Pending, Assigned, Completed).
- Reject invalid or duplicate support requests.
- Manage categories and sub-categories.
- Manage technician and availability.
- Admin dashboard with ticket analytics and system overview.
- Dynamic category and sub-category selection when creating tickets.
- Session-based authentication and protected routes.


## Future Enhancements



## Credits
