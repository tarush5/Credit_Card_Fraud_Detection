# 💳 Credit Card Fraud Detection System

![Screenshot 1](https://github.com/user-attachments/assets/beac1ed0-28f5-4bbb-9289-57de13ec5efe)


This project is a **Node.js-based backend web service** that simulates credit card fraud detection using a lightweight rule-based algorithm. Designed to be fast, scalable, and easy to understand, it's ideal for educational use and as a prototype for advanced fraud detection systems.

It also features an **AI-powered chatbot assistant** to enhance user experience, provide system insights, and answer basic queries.

---

## 🔧 What It Does

![Screenshot 2](https://github.com/user-attachments/assets/bec2a0bd-fbf5-44dc-8012-507acc5c0dd9)

### ✅ Fraud Risk Scoring
Calculates a fraud probability score based on several risk factors:
- High transaction amounts
- Suspicious location names (e.g., _"Narnia"_, _"Gotham"_)
- Unusual card number patterns (e.g., starting with `0000`)
- Transactions during odd hours (e.g., late night)

### 🤖 Chatbot Integration
Provides automated, keyword-based replies to questions like:
- _"How does the fraud detection work?"_
- _"Is my data secure?"_
- _"What is the system's accuracy?"_

### 🧩 API-Driven Architecture
- `POST /api/detect-fraud`: Accepts transaction data and returns fraud prediction
- `POST /api/chatbot`: Accepts text queries and returns chatbot responses

### 🌐 SPA Compatibility
Routes all non-API requests to `index.html`, supporting single-page application behavior.

---

## 🛠️ Built With

- **Node.js** – Server-side runtime environment  
- **Express.js** – Minimalist web framework  
- **JavaScript (ES Modules)** – Modern syntax and modular development

---

## 🎯 Use Cases

- Educational simulation of fraud detection  
- Prototyping credit card monitoring systems  
- Practice project for REST APIs and Express.js  
- Chatbot integration via keyword NLP techniques  

---

## 🔐 Disclaimer

> This system is a **simulation** and does **not** use real credit card data or machine learning. It is intended for **educational and demonstration** purposes only.

---
