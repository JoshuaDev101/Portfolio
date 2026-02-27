# 🌐 Personal Portfolio Website

A fully responsive personal portfolio website built with vanilla HTML, CSS, and JavaScript, deployed on a production-grade cloud infrastructure with a fully automated CI/CD pipeline.

---

## 🚀 Live Demo

> [https://your-domain.com](https://your-domain.com)

---

## 📸 Preview

> *(Add a screenshot or GIF of your portfolio here)*

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML, CSS, JavaScript |
| Containerization | Docker, DockerHub |
| CI/CD | GitHub Actions |
| Cloud Hosting | DigitalOcean Droplet |
| Web Server | Nginx |

---

## ⚙️ Architecture Overview

```
Push to main
     │
     ▼
GitHub Actions
     │
     ├─► Build Docker Image
     │
     ├─► Push to DockerHub
     │
     └─► SSH into DigitalOcean Droplet
              │
              ├─► Pull latest image
              │
              └─► Restart Nginx container
```

---

## 📁 Project Structure

```
portfolio/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── assets/
│   └── images/
├── Dockerfile
├── nginx.conf
└── .github/
    └── workflows/
        └── deploy.yml
```

---

## 🐳 Docker Setup

### Dockerfile

```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
```

### Build & Run Locally

```bash
# Build the image
docker build -t portfolio .

# Run the container
docker run -p 8080:80 portfolio
```

Then open [http://localhost:8080](http://localhost:8080) in your browser.

---

## 🔄 CI/CD Pipeline (GitHub Actions)

The workflow is triggered on every push to the `main` branch and automates the full build and deployment process.

**`.github/workflows/deploy.yml`**

```yaml
name: Deploy Portfolio

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Log in to DockerHub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      - name: Build and push Docker image
        uses: docker/build-push-action@v4
        with:
          push: true
          tags: ${{ secrets.DOCKER_USERNAME }}/portfolio:latest

      - name: Deploy to DigitalOcean Droplet
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.DROPLET_IP }}
          username: ${{ secrets.DROPLET_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            docker pull ${{ secrets.DOCKER_USERNAME }}/portfolio:latest
            docker stop portfolio || true
            docker rm portfolio || true
            docker run -d --name portfolio -p 80:80 ${{ secrets.DOCKER_USERNAME }}/portfolio:latest
```

---

## 🔐 GitHub Secrets Required

Go to **Settings → Secrets and Variables → Actions** and add the following:

| Secret | Description |
|---|---|
| `DOCKER_USERNAME` | Your DockerHub username |
| `DOCKER_PASSWORD` | Your DockerHub password or access token |
| `DROPLET_IP` | Your DigitalOcean Droplet's public IP |
| `DROPLET_USER` | SSH username (e.g. `root`) |
| `SSH_PRIVATE_KEY` | Your private SSH key for the Droplet |

---

## ☁️ DigitalOcean Droplet Setup

1. Create a new Droplet (Ubuntu 22.04 recommended)
2. SSH into your Droplet and install Docker:

```bash
sudo apt update
sudo apt install -y docker.io
sudo systemctl enable docker
sudo systemctl start docker
```

3. Add your SSH public key to the Droplet for GitHub Actions access
4. Make sure port `80` is open in your Droplet's firewall settings

---

## 🌍 Nginx Configuration

Nginx is used as the web server inside the Docker container to serve the static files.

```nginx
server {
    listen 80;
    server_name _;

    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

---

## 🏃 Getting Started Locally

```bash
# Clone the repository
git clone https://github.com/your-username/portfolio.git
cd portfolio

# Open directly in browser
open index.html

# Or run with Docker
docker build -t portfolio .
docker run -p 8080:80 portfolio
```

---

## 📬 Contact

**Your Name**
- Portfolio: [your-domain.com](https://your-domain.com)
- GitHub: [@your-username](https://github.com/your-username)
- LinkedIn: [linkedin.com/in/your-profile](https://linkedin.com/in/your-profile)
- Email: your@email.com

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
