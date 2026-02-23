Tutor Scheduler Pro

Live Demo:
https://tutor-scheduler-pro-mauve.vercel.app/

Frontend: React (Vite) + Tailwind CSS
Backend: Node.js + Express
Authentication: JWT + Role-Based Access Control
Database: MySQL (Railway)
Deployment: Vercel (Frontend) + Railway (Backend & DB)

⸻

Overview

Tutor Scheduler Pro is a full-stack tutor booking platform that allows providers to create and manage tutoring sessions while customers can browse and book available classes.

The application implements secure JWT authentication, role-based authorization, and a production-ready architecture deployed across Vercel (frontend) and Railway (backend + database).

⸻

Features

Authentication & Authorization
	•	JWT-based authentication
	•	Role-based access control (Customer / Provider)
	•	15+ protected API routes
	•	Middleware-based permission enforcement

Provider Capabilities
	•	Create and manage tutoring classes
	•	Add and manage addresses
	•	Set pricing and scheduling (start/end times)
	•	View bookings

Customer Capabilities
	•	Browse classes by subject
	•	Book available sessions
	•	View upcoming appointments

Database Architecture
	•	MySQL relational database
	•	Normalized tables (Users, Providers, Customers, Classes, Addresses, Bookings)
	•	Foreign key relationships
	•	Production-hosted database via Railway

⸻

Tech Stack

Frontend
	•	React (Vite)
	•	Tailwind CSS
	•	Fetch API
	•	LocalStorage token management

Backend
	•	Node.js
	•	Express.js
	•	JSON Web Tokens (jsonwebtoken)
	•	Custom authentication & role middleware
	•	MySQL

Deployment
	•	Frontend: Vercel
	•	Backend: Railway
	•	Database: Railway MySQL

⸻

Installation (Local Development)

1. Clone the repository:
git clone https://github.com/SajedAtwa/Tutor-SchedulerPro.git
cd Tutor-SchedulerPro
2.  Install backend dependencies:
npm install
3. Create a .env file:
PORT=5000
JWT_SECRET=your_secret_key
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=tutor_scheduler
4.Start backend: 
npm run dev
5. Run frontend (if inside client folder):
cd client
npm install
npm run dev

Author

Sajed Atwa
Full-Stack Developer

GitHub: https://github.com/SajedAtwa
LinkedIn: https://www.linkedin.com/in/sajedatwa/


