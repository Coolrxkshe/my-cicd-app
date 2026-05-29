# ⚡ TaskFlow — CI/CD Pipeline Demo

A real-world Task Manager app built to demonstrate a full **CI/CD pipeline on Azure DevOps**.

![Node.js](https://img.shields.io/badge/Node.js-18-green?style=flat-square&logo=node.js)
![Docker](https://img.shields.io/badge/Docker-Containerized-blue?style=flat-square&logo=docker)
![Azure](https://img.shields.io/badge/Azure-DevOps-0078D4?style=flat-square&logo=microsoftazure)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)

---

## 🚀 Live Demo
> Deployed via Azure DevOps Pipeline → Azure App Service

---

## 📌 What This Project Does

Every time code is pushed to `main`, the pipeline automatically:

1. **Installs dependencies** and runs unit tests
2. **Builds a Docker image** of the app
3. **Pushes the image** to Azure Container Registry (ACR)
4. **Deploys the container** to Azure App Service

---

## 🛠️ Tech Stack

| Layer        | Technology              |
|--------------|-------------------------|
| Backend      | Node.js + Express       |
| Frontend     | Vanilla JS + HTML/CSS   |
| Testing      | Jest + Supertest        |
| Container    | Docker                  |
| CI/CD        | Azure DevOps Pipelines  |
| Registry     | Azure Container Registry|
| Hosting      | Azure App Service       |

---

## 📁 Project Structure
my-cicd-app/
├── src/
│   ├── app.js              # Express app & REST API
│   └── server.js           # Server entry point
├── public/
│   └── index.html          # Frontend UI
├── tests/
│   └── app.test.js         # Unit tests (Jest)
├── Dockerfile              # Container config
├── azure-pipelines.yml     # CI/CD pipeline
└── package.json

---

## 🔌 REST API Endpoints

| Method   | Endpoint           | Description        |
|----------|--------------------|--------------------|
| `GET`    | `/api/tasks`       | Get all tasks      |
| `POST`   | `/api/tasks`       | Create a new task  |
| `PUT`    | `/api/tasks/:id`   | Update a task      |
| `DELETE` | `/api/tasks/:id`   | Delete a task      |
| `GET`    | `/health`          | Health check       |

---

## ⚙️ Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/Coolrxkshe/my-cicd-app.git
cd my-cicd-app

# 2. Install dependencies
npm install

# 3. Start the dev server (opens browser automatically)
npm run dev
```

App runs at → **http://localhost:3000**

---

## 🧪 Run Tests

```bash
npm test
```

---

## 🐳 Run with Docker

```bash
# Build the image
docker build -t taskflow-app .

# Run the container
docker run -p 3000:3000 taskflow-app
```

---

## 🔄 CI/CD Pipeline Flow
Git Push → main
│
▼
┌─────────────────┐
│  Stage 1: Build │  npm install + npm test
└────────┬────────┘
│ ✅ tests pass
▼
┌─────────────────┐
│  Stage 2: Docker│  docker build + push to ACR
└────────┬────────┘
│ ✅ image pushed
▼
┌─────────────────┐
│  Stage 3: Deploy│  Azure App Service pulls image
└─────────────────┘
│
▼
🌐 App is Live!

---

## 📸 Screenshots

> App running locally at http://localhost:3000

---

## 👨‍💻 Author

**Arya Rakshe**
- GitHub: [@Coolrxkshe](https://github.com/Coolrxkshe)

---

## 📄 License

MIT License — free to use for learning and portfolio projects.