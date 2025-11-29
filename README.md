# E-Commerce App

## 🐳 Docker Setup

### Quick Start with Docker

**Pull from Docker Hub:**
```bash
docker pull marouazi/ecommerce-app
docker run -d -p 8080:80 marouazi/ecommerce-app
```

**Or run complete setup with database:**
```bash
docker compose up -d
```

Access the app at: http://localhost:8080

### Tech Stack
- PHP 8.2 + Apache
- MySQL 8.0
- HTML/CSS/JavaScript
- Docker & Docker Compose

## Development

### Prerequisites
- Docker Desktop

### Running Locally
```bash
git clone https://github.com/Ziouche-maroua/E-commerce.git
cd  E-commerce
docker compose up -d
```

### Stopping
```bash
docker compose down
```


  