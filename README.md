# FamilySyncQuasar

FamilySync is a full-stack web application designed to simplify everyday family planning and coordination. The application allows users to manage shared shopping lists, to-do lists, and calendar schedules in one centralized platform.

The project was developed as a personal full-stack project to explore modern frontend architecture, Azure cloud services, authentication with Microsoft Entra ID, and scalable API design using ASP.NET Core.

The frontend application communicates with a separate ASP.NET Core backend API responsible for data storage and business logic.

Backend repository:
```bash
https://github.com/henrikgb/FamilySyncApi
```

---

## 📱 Application Preview

<img width="600" height="800" alt="image" src="https://github.com/user-attachments/assets/a03c09b4-03fc-4e5a-a541-c46ef65a9104" />

---

# ✨ Features

* Shared family shopping lists
* Shared to-do lists
* Calendar and schedule management
* Authentication using Microsoft Entra ID (Azure AD)
* Role-based access control
* Responsive mobile-friendly UI
* REST API architecture
* Automated frontend testing
* CI/CD deployment pipeline with GitHub Actions

---

# 🏗️ Architecture Overview

<img width="1280" height="720" alt="image" src="https://github.com/user-attachments/assets/70a0a573-8636-4401-81fd-bd13a3dd1378" />

The solution consists of:

* **Frontend** built with Vue.js, TypeScript, and Quasar
* **Backend API** built with ASP.NET Core and C#
* **Azure Blob Storage** used for JSON-based data persistence
* **Microsoft Entra ID** for authentication and authorization
* **TanStack Query (Vue Query)** for efficient data fetching and caching
* **GitHub Actions** for CI/CD automation

---

# ⚙️ Technologies

## Frontend

* Vue.js
* Quasar Framework
* TypeScript
* TanStack Query (Vue Query)
* Axios
* i18n
* Vitest
* Vue Test Utils

## Backend

* C#
* ASP.NET Core REST API
* Service-Repository Pattern
* Azure Blob Storage
* Microsoft Entra ID / Azure MSAL

## Cloud & DevOps

* Azure Static Web App
* Azure App Service
* Azure Blob Storage
* GitHub Actions
* Azure Application Insights

---

# 🔐 Authentication & Authorization

Authentication is implemented using Microsoft Entra ID and Azure MSAL.

The backend API validates access tokens on all protected endpoints, ensuring that only authenticated users can access or modify application data.

Role assignments and permissions are configured through Azure App Registrations and Entra ID user groups.

---

# 🧪 Testing

Frontend unit tests are implemented using:

* Vitest
* Vue Test Utils

The testing setup covers:

* API integration
* State handling
* Data fetching and caching
* Core UI logic

The tests are integrated into the CI/CD pipeline through GitHub Actions.

---

# 🚀 Deployment

## Frontend

The frontend application is hosted using:

* Azure Static Web Apps

## Backend

The backend API is deployed to:

* Azure App Service

## CI/CD

GitHub Actions automate:

* Build
* Testing
* Deployment

for both frontend and backend components.

---

# 🛠️ Getting Started

## Clone Repository

```bash
git clone https://github.com/henrikgb/FamilySyncQuasar.git
```

## Install Dependencies

```bash
npm install
```

## Run Development Server

```bash
npm run dev
```

---

# 📌 Future Improvements

* Relational database integration
* Docker containerization
* Infrastructure as Code (Terraform/Bicep)

---

# 👨‍💻 Author

Developed by Henrik Busengdal.

Senior Full-Stack Developer with a background in software engineering and petroleum technology, focusing on modern cloud applications, frontend architecture, and data-intensive systems.
