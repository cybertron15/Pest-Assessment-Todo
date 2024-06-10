# TaskIT - Decide. Plan. TaskIT.
![image](https://github.com/cybertron15/Taskit/assets/48357640/f61bf1c4-04f3-455e-8397-13ea9574dd75)

TaskIT is a modern, user-friendly task management app designed to help you manage your tasks efficiently. TaskIT can be used on both desktop and mobile devices with features like setting statuses for tasks, filtering tasks based on status, sorting tasks by date and name, and searching for tasks, TaskIT offers a clean, minimalistic UI for a better user experience. The app includes authentication features built using JWT and leverages modern web frameworks such as React for the frontend and Django/Django REST framework for the backend.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Contribution](#contribution)
- [License](#license)

## Features

- Set statuses for tasks
- Filter tasks based on status
- Sort tasks by date and name
- Search tasks
- Clean, modern, minimalistic UI
- Authentication using JWT
- Browsable API for easy interaction and testing

## Project Structure

The repository is divided into two main folders:
- `server`: Contains the Django backend code
- `client`: Contains the React frontend code
  - `taskit`: Holds the React code for the frontend

## Setup Instructions

Follow these instructions to set up the project on your local system.

### Backend Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/taskit.git
   cd taskit/server
   ```

2. **Create and Activate a Virtual Environment:**
   - **For Windows:**
     ```bash
     python -m venv venv
     venv\Scripts\activate
     ```
   - **For macOS and Linux:**
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```

3. **Install Dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set Up Environment Variables:**
   Create a `.env` file in the `server` directory with the following content:
   ```env
   DJ_SECRET=your_secret_key
   MODE=dev
   CORS_ALLOWED_ORIGINS=""
   ```

5. **Run Migrations:**
   ```bash
   python manage.py migrate
   ```

6. **Start the Django Server:**
   ```bash
   python manage.py runserver
   ```

7. **Access the Browsable API:**
   Open your web browser and navigate to `http://localhost:8000/` to access the browsable API provided by Django REST framework. This allows you to interact with the API endpoints directly from your browser for easy testing and debugging.

### Frontend Setup

1. **Navigate to the TaskIT Directory:**
   ```bash
   cd ../client/taskit
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**
   Create a `.env` file in the `client/taskit` directory with the following content:
   ```env
   VITE_BACKEND_API_URL=http://localhost:8000
   ```

4. **Start the Vite Development Server:**
   ```bash
   npm run dev
   ```

The React application should now be running at `http://localhost:5173`.

## Environment Variables

### Backend

The backend uses a `.env` file with the following parameters:
```env
DJ_SECRET=your_secret_key
MODE=dev  # 'dev' for development mode
CORS_ALLOWED_ORIGINS=""
```
- `DJ_SECRET`: Must have a value.
- `MODE`: Should be 'dev' when in development mode.
- `CORS_ALLOWED_ORIGINS`: Can be empty and set as "".

### Frontend

The frontend uses a `.env` file with the following parameter:
```env
VITE_BACKEND_API_URL=http://localhost:8000
```
- `VITE_BACKEND_API_URL`: The URL for the backend Django server. The default is `http://localhost:8000`. Change this if your backend server runs on a different URL or port.

## Contribution

If you wish to contribute to the project, please fork the repository and submit a pull request. We appreciate your contributions!

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

**Note**: This project was built for the Pesto assessment.

---

Thank you for using TaskIT! If you have any questions or feedback, feel free to open an issue on GitHub.

---
