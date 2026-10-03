# Host PETZEUSTECH on your VPS (162.35.183.158) Right Now

Follow these 3 easy steps to have your website live right now on **`http://162.35.183.158`** and **`http://petzeustech.com`**:

---

## Step 1: Push Code to Your GitHub Repository
From your computer or workspace, run:
```bash
./push-to-github.sh https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git
```
*(Or if you push normally: `git push -u origin main`)*

---

## Step 2: SSH into Your VPS
Open your terminal (PowerShell, Command Prompt, or Mac/Linux Terminal) and connect to your VPS:
```bash
ssh root@162.35.183.158
```
When prompted for the password, enter:
```
Petuel99.5
```

---

## Step 3: Run the 1-Line Deployment Command
Once connected inside your VPS terminal, copy and paste this command:
```bash
mkdir -p /opt/petzeustech && cd /opt/petzeustech && git clone https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git . || git pull origin main && chmod +x setup-vps.sh deploy.sh && ./setup-vps.sh
```
*(Remember to replace `YOUR_GITHUB_USERNAME/YOUR_REPO_NAME` with your actual GitHub repository URL)*

---

## That's It!
- Your website is immediately live on: **`http://162.35.183.158`**
- As soon as your domain DNS `petzeustech.com` points to `162.35.183.158`, it will open automatically on: **`http://petzeustech.com`**!

---

## Enable Automatic Push-to-Deploy (CI/CD)
To have your VPS automatically update every time you push code to GitHub:
1. Go to your GitHub repository on github.com.
2. Click **Settings > Secrets and variables > Actions > New repository secret**.
3. Add these secrets:
   - Name: `VPS_HOST` | Value: `162.35.183.158`
   - Name: `VPS_USER` | Value: `root`
   - Name: `VPS_PASSWORD` | Value: `Petuel99.5`
4. Now, every single time you push code to `main`, GitHub Actions will build, test, and automatically update your VPS in seconds!
