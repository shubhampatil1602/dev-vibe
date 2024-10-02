# dev-vibe

## auth

- POST /auth/signup
- POST /auth/login
- POST /auth/logout

## profile

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/forget-password // Forgot password API

## connection-request

- POST /request/send/:status/:userId // interested or ignored
- POST /request/review/:status/:requestId // accepted or rejected

## user

- GET /user/requests/received
- GET /user/connections
- GET /user/feed - Gets you the profiles of other users on platform

Status: ignored, interested, accepeted, rejected
