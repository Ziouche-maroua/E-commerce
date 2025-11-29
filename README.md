# E-Commerce Application

## 🐳 Docker Setup

### Standard Setup (Single Instance)
```bash
docker compose up -d
```

###  NGINX Load Balanced Setup (Challenge 3)

This setup includes:
- **NGINX** as load balancer (Port 80)
- **3 PHP application instances** for high availability
- **MySQL database** shared across all instances
- **Round-robin** load distribution

#### Architecture
```
User Request → NGINX (Port 80)
                  ↓
        ┌─────────┼─────────┐
        ↓         ↓         ↓
    php-app-1  php-app-2  php-app-3
        └─────────┼─────────┘
                  ↓
            MySQL Database
```

#### Quick Start
```bash
docker compose up -d
docker compose ps
```

#### Test Load Balancing
Access http://localhost and refresh multiple times.
Each request may be served by a different instance!

#### Configuration Files
- `nginx.conf` - NGINX load balancer configuration
- `docker-compose.yml` - Multi-instance setup with NGINX

##  Load Balancing Strategies

**Current: Round Robin (default)**
- Distributes requests evenly across all instances


