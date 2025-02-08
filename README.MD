# 📋 **Project Instructions**

Welcome to the project! Follow the instructions below to set up, develop, and test the applications.

---

## 🚀 **1️⃣ Run the Server**

### 🔧 **Server Setup**
- Follow the instructions in `README_RUN_SERVER.md` to start the server.
- Ensure the server is running at:  
  `http://127.0.0.1:5000/`

### 🌐 **Verify API Accessibility**
- Open your browser and visit:  
  `http://127.0.0.1:5000/apidocs`  
- Confirm that the API documentation is accessible.

---

## 🗂️ **2️⃣ Assignment A: Widget Manager React App**

### 🎯 **Objective**
Develop a React application to manage widgets with full CRUD functionality:
- **Add**, **Edit**, **Delete**, **View**, and **Retrieve All** widgets.

### 🧩 **Key Features**
- **Page-Based Widget Management:**  
  Manage widgets based on different pages.
  
- **A/B Testing Support:**  
  - Assign multiple widgets per page using a `showToPercentage` property.  
  - Ensure the total percentage of all widgets on a page equals **100%**.

- **API Integration:**  
  Implement seamless interaction with the Flask server for all CRUD operations.

### 📱 **Responsive Design**
Ensure the UI adapts flawlessly across major devices(Mobile, Tablets and Desktops)

---

## 🌍 **3️⃣ Assignment B: Website Simulation React App**

### 🎯 **Objective**
Create a React application that mimics a dynamic website with multiple pages:
- **Homepage**, **Cards**, and **Wedding**.

### 🔑 **Core Functionality**
- **Dynamic Widget Loading:**  
  Fetch widgets from the Flask API based on the current page.

- **A/B Testing Logic:**  
  Implement a function to display widgets according to their `showToPercentage`:
  - Example:  
    - **Widget A:** 70% visibility  
    - **Widget B:** 30% visibility  
  - The function should randomly generate a number (0-100) and display the widget based on the result:
    - `0–29` → Show **Widget B**  
    - `30–100` → Show **Widget A**
  - Additionally, support forcing a specific experience by adding a URL parameter with the widget ID (e.g., experience=widget2). If the specified ID exists, the corresponding widget will be shown directly, bypassing the random selection.

- **Navigation:**  
  Enable smooth page transitions, ensuring the correct widgets load per page.

### 📱 **Responsive Design**
Ensure the UI adapts flawlessly across major devices(Mobile, Tablets and Desktops)

---

## ✅ **Final Checklist**

Before submission, make sure:

### 🔄 **Server & API**
- The Flask server is **running** during testing.
- API endpoints are accessible via `http://127.0.0.1:5000/apidocs`.

### 📊 **Widget Manager App**
- Supports **Create**, **Read**, **Update**, and **Delete** operations.

### 🌐 **Website Simulation App**
- Dynamically displays widgets based on page navigation.
- Implements correct A/B testing behavior.
- Responsive across all listed devices.

---

## 🤝 **Need Help?**

If you have questions or need clarification, feel free to reach out.  
Good luck with the assignment! 🚀