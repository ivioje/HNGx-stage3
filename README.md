# Image Gallery App

Welcome to the Fototeca! This web application allows users to browse, search, and reorder images. Users have to be authenticate to access the app.

## Demo

See a live demo here: https://hn-gx-stage3.vercel.app/

### Log in details

- email: user@example.com
- password: 1Password

## Features

- Browse and view images.
- Search for images by tags.
- Reorder images by dragging and dropping.
- User authentication system.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your development machine.
- Firebase project credentials (details in the `.env` file).
- A modern web browser (e.g., Chrome, Firefox).

## Installation

1. Clone this repository to your local machine:

   ```bash
   https://github.com/ivioje/HNGx-stage3.git
   ```

2. Navigate to the project directory:

   ```bash
   cd HNGX-stage3
   ```

3. Install project dependencies:

   ```bash
   npm install
   ```

## Configuration

Create a `.env` file in the project root directory and add your Firebase project configuration. You can find this information in your Firebase project settings.

```plaintext
VITE_APP_API_KEY=your_api_key
VITE_APP_AUTH_DOMAIN=your_auth_domain
VITE_APP_PROJECT_ID=your_project_id
VITE_APP_STORAGE_BUCKET=your_storage_bucket
VITE_APP_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_APP_APP_ID=your_app_id
```

Replace `your_api_key`, `your_auth_domain`, and other placeholders with your actual Firebase project details.

## Usage

1. Start the development server:

   ```bash
   npm run dev
   ```

   The application will be accessible at `http://localhost:5173`.

2. Access the application in your web browser:

   ```
   http://localhost:5173
   ```

3. To use the authentication features, use the following login credentials:

   - **Email**: user@example.com
   - **Password**: 1Password

---

#### Author

Eboreime Rhoda
