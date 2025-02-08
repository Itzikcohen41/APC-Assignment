# Flask Widgets API

This is a simple Flask application that manages widgets stored in a local JSON file. The API allows you to create, retrieve, update, and delete widget data, and provides a Swagger UI for easy API documentation and testing.

## 📦 Installation

1. **Install the dependencies**
   ```bash
   pip install -r requirements.txt
   ```

## 🚀 Running the Application

1. **Run the Flask server:**
   ```bash
   python app.py
   ```

2. **Access the API:**
   The server will start at `http://127.0.0.1:5000/`

## 📄 API Endpoints

- **GET** `/widget/<page_name>`: Retrieve widget data for a specific page.
- **POST** `/widget`: Add a new widget.
- **PUT** `/widget/<page_name>`: Update an existing widget.
- **DELETE** `/widget/<page_name>`: Delete a widget for the specified page.

## 📊 Viewing the Swagger Documentation

1. **Start the application (if not already running):**
   ```bash
   python app.py
   ```

2. **Open your browser and go to:**
   ```
   http://127.0.0.1:5000/apidocs
   ```

Here you'll find a Swagger UI that allows you to interact with the API endpoints directly.

## 🗂️ Data Storage

The widget data is stored in a local JSON file located at `data/widgets_db.json`. This file will be created automatically when the application is run for the first time.

## ❓ Example cURL Request

**Add a new widget for the homepage:**
```bash
curl -X POST http://127.0.0.1:5000/widget \
-H "Content-Type: application/json" \
-d '{
  "page_name": "homepage",
  "header": "Welcome to Our Website",
  "text": "Explore our latest features and updates.",
  "thumbnail": "https://example.com/images/homepage-thumbnail.jpg",
  "price": "Free"
}'
```

## 🔑 License

This project is licensed under the MIT License.

