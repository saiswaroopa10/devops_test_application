# Kishore ❤️ Sai Swaroopa — Valentine's Invitation

A lightweight full-stack Valentine's Day invitation used to practice Docker containerization and deployment on an AWS EC2 server.

Couple: **Kishore ❤️ Sai Swaroopa** · Together since **June 02, 2022**

## Technology stack

| Layer | Stack |
| --- | --- |
| Frontend | React, Vite, TypeScript, plain CSS |
| Backend | Java 21, Spring Boot 3, Maven |
| Deployment | Docker, Docker Compose, Nginx |

No database, authentication, or admin features. RSVP choices live in React state only and reset on reload.

## Prerequisites

- Docker Desktop (or Docker Engine + Compose plugin)
- Optional for local non-Docker development:
  - Node.js 20+
  - Java 21 + Maven 3.9+

## Project layout

```
frontend/          React + Vite SPA
backend/           Spring Boot REST API
nginx/default.conf Nginx SPA + /api proxy config
docker-compose.yml Runs frontend (port 80) + backend (internal 8080)
```

## Run locally (without Docker)

### Backend

```bash
cd backend
mvn spring-boot:run
```

API: `http://localhost:8080/api/health` and `http://localhost:8080/api/message`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

App: `http://localhost:5173` (Vite proxies `/api` to the backend)

### Tests

```bash
cd backend && mvn test
cd frontend && npm install && npm test
```

## Run with Docker Compose

From the project root:

```bash
docker compose build
docker compose up -d
docker compose ps
docker compose logs -f
```

Open:

- Website: [http://localhost](http://localhost)
- Health: [http://localhost/api/health](http://localhost/api/health)
- Message: [http://localhost/api/message](http://localhost/api/message)

Stop everything:

```bash
docker compose down
```

## Push the code to GitHub

Never commit credentials, `.env` files, or private keys.

```bash
git add .
git status
git commit -m "Add Valentine's invitation full-stack Docker app"
git branch -M main
git remote add origin https://github.com/<YOUR_USERNAME>/<YOUR_REPO>.git
git push -u origin main
```

If the remote already exists, skip `git remote add` and push:

```bash
git push -u origin main
```

## Deploy to AWS EC2 (Ubuntu)

These steps assume you create a new Ubuntu EC2 instance. They do not assume an existing AWS account setup, domain, or public IP.

### 1. Launch an EC2 instance

1. Choose an Ubuntu LTS AMI.
2. Pick an instance type suitable for learning (for example `t3.micro` / `t3.small`).
3. Create or select a key pair for SSH.
4. Attach a security group with:
   - **SSH (22)** — restrict source to your trusted IP(s) when possible
   - **HTTP (80)** — allow website access (`0.0.0.0/0` for public demos, or tighter if preferred)
5. Note the instance public IPv4 address after launch.

### 2. Install Docker on the instance

SSH in:

```bash
ssh -i /path/to/your-key.pem ubuntu@<EC2_PUBLIC_IP>
```

Then:

```bash
sudo apt-get update
sudo apt-get install -y ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo \"$VERSION_CODENAME\") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
sudo usermod -aG docker ubuntu
```

Log out and back in so the `docker` group applies.

### 3. Clone and start the app

```bash
git clone https://github.com/<YOUR_USERNAME>/<YOUR_REPO>.git
cd <YOUR_REPO>
docker compose build
docker compose up -d
docker compose ps
```

Visit `http://<EC2_PUBLIC_IP>` in a browser.

Useful commands on the server:

```bash
docker compose logs -f
docker compose down
```

### 4. HTTPS and custom domains

For any public production-style deployment with a custom domain, configure HTTPS (for example with a reverse proxy + Let's Encrypt) before pointing DNS at the server. This learning project serves HTTP on port 80 by default.

## API reference

### `GET /api/health`

```json
{
  "status": "UP",
  "application": "valentines-invitation"
}
```

### `GET /api/message`

```json
{
  "couple": "Kishore ❤️ Sai Swaroopa",
  "relationshipStartDate": "2022-06-02",
  "title": "Every Love Story Is Beautiful, But Ours Is My Favorite.",
  "invitation": "Sai, Will You Be My Valentine?"
}
```

## Replace the couple photo

Put your romantic portrait here (same filename):

```text
frontend/public/couple.jpg
```

Keep the name `couple.jpg` (or update the `src` in `frontend/src/App.tsx`). A heart-shaped frame shows it on the hero section.

## Notes

- The frontend still renders romantic content if the backend is down; a connection warning appears in the status pill.
- RSVP answers are temporary browser state only — they are not saved to a database or shared with another user.
