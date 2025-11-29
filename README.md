# E-Commerce Application

##  Docker Deployments

This project demonstrates two Docker deployment patterns:

###  Challenge 1: Simple Single-Instance Setup

**Branch:** `main`

**Architecture:**
```
User → PHP App (Port 8080) → MySQL
```

**Run:**
```bash
git clone https://github.com/Ziouche-maroua/E-commerce.git
cd E-commerce
docker compose up -d
```

**Access:** http://localhost:8080

**Docker Hub Image:** https://hub.docker.com/r/marouazi/ecommerce-app

---

###  Challenge 3: NGINX Load Balanced Setup

**Branch:** `feature/nginx-load-balancing`

**Architecture:**
```
User → NGINX (Port 80)
         ↓
    ┌────┼────┐
    ↓    ↓    ↓
  App1 App2 App3
    └────┼────┘
         ↓
      MySQL
```

**Run:**
```bash
git clone https://github.com/Ziouche-maroua/E-commerce.git
cd E-commerce
git checkout feature/nginx-load-balancing
docker compose up -d
```

**Access:** http://localhost

**Features:**
- Round-robin load balancing
- 3 application instances for high availability
- Shared MySQL database
- Instance identifier shows which container serves each request

---

##  Quick Start

### Prerequisites
- Docker Desktop installed and running

### For Challenge 1 (Simple Setup):
```bash
docker compose up -d
```

### For Challenge 3 (Load Balancing):
```bash
git checkout feature/nginx-load-balancing
docker compose up -d
```

### Stop Everything:
```bash
docker compose down
```

---

## 📂 Project Structure
```
main branch:
├── Dockerfile
├── docker-compose.yml (1 app + 1 db)
├── config.php
├── home.php
└── ...

feature/nginx-load-balancing branch:
├── Dockerfile
├── docker-compose.yml (nginx + 3 apps + 1 db)
├── nginx.conf
├── config.php
├── home.php
└── ...
```

