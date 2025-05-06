# WasteWatch - Empowering Sustainable Waste Management

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![React](https://img.shields.io/badge/React-^18.0.0-61DAFB?logo=react)
![Bootstrap](https://img.shields.io/badge/Bootstrap-^5.3.0-7952B3?logo=bootstrap)

## Overview

WasteWatch is a platform designed to revolutionize waste management by connecting citizens with verified waste collectors and providing tools for efficient service management. Our mission is to build cleaner, greener cities through technology.

**Key Features:**

* **Verify Collectors:** Citizens can easily find and verify licensed waste collectors in their vicinity, ensuring reliable and trustworthy service.
* **Collector Registration:** Waste collectors can register their services, create profiles, and connect with potential clients, expanding their reach and streamlining operations.
* **Admin Portal:** A secure administrative interface for managing users, data, and maintaining the integrity of the platform.
* **Community Focus:** Fostering a sense of responsibility and collaboration towards better waste management practices.
* **Modern & Minimalist Design:** A clean and intuitive user interface for a seamless experience.

## Technologies Used

* **Frontend:**
    * [React](https://react.dev/) - A JavaScript library for building user interfaces.
    * [React Router DOM](https://reactrouter.com/) - For declarative routing in React applications.
    * [Bootstrap](https://getbootstrap.com/) - A powerful CSS framework for responsive layouts and UI components.
    * [Bootstrap Icons](https://icons.getbootstrap.com/) - A library of free, high-quality icons.
    * [EmailJS](https://www.emailjs.com/) - For handling email communication from the contact form.

* **Styling:**
    * Custom CSS (located in `src/index.css`) for specific styling and theming.

## Getting Started

To run WasteWatch locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd wastewatch
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Configure Environment Variables:**
    * Create a `.env` file in the root directory of the project.
    * Add your EmailJS service ID, template ID, and public key:
        ```
        REACT_APP_EMAILJS_SERVICE_ID=your_service_id
        REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
        REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
        ```
        Replace the placeholders with your actual EmailJS credentials. You can obtain these from your [EmailJS dashboard](https://dashboard.emailjs.com/).

4.  **Start the development server:**
    ```bash
    npm start
    # or
    yarn start
    ```

    This will start the application in development mode. Open your browser and navigate to `http://localhost:3000` to view it.

## Project Structure