@echo off
echo Starting Hospital Management System...
echo.
echo Starting Backend Server...
start cmd /k "cd server && node server.js"
timeout /t 3 /nobreak > nul
echo Starting Frontend...
start cmd /k "npm start"
echo.
echo Both servers are starting!
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Login credentials:
echo Username: admin
echo Password: 123
