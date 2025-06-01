# 🌅 SunTime

**SunTime** is a Next.js 14 (App Router) application that fetches and displays sunrise and sunset times using data from the [sunrise_sunset_api](https://github.com/josnunezg/sunrise_sunset_api).

## 📦 Requirements

- Node.js **22.12.0** (managed via [Volta.sh](https://volta.sh))
- [pnpm](https://pnpm.io/) as the package manager
- Access to a running instance of the `sunrise_sunset_api`
- Two environment variables: `SUNRISE_SUNSET_API_URL` and `SUNRISE_SUNSET_API_KEY`

---

## 🚀 Getting Started
### 1. Clone the repository
```bash
git clone <your-repo-url>
cd sun_time
```
### 2. Install Volta (if not already installed)
Volta ensures that the correct Node.js version is used automatically.
```bash
curl https://get.volta.sh | bash
```
After installing, restart your terminal or run:
```bash
source ~/.bashrc # or ~/.zshrc
```
### 3. Set the Node.js version
This project uses Node 22.12.0. Volta will pick this up automatically from the package.json or .volta config.
```bash
volta install node@22.12.0
```
### 4. Install dependencies
Using pnpm:
```bash
pnpm install
```
### 5. Set up environment variables
Create a .env.local file in the root of the project:
```bash
touch .env.local
```
Then add the following variables:
```env
SUNRISE_SUNSET_API_URL=<your-api-url>
SUNRISE_SUNSET_API_KEY=<your-api-key>
```
> 🔐 The `SUNRISE_SUNSET_API_KEY` must be generated from the UUID associated with your app in the [`sunrise_sunset_api`](https://github.com/josnunezg/sunrise_sunset_api) project.
### 6. Run the development server
```bash
pnpm dev
```
The app will be available at `http://localhost:3000`.
---
###  🛠 Scripts
- `pnpm dev` – Run the app in development mode
- `pnpm build` – Create an optimized production build
- `pnpm start` – Start the production server
- `pnpm lint` – Run ESLint checks
### 📁 Environment Reference
| Variable                 | Description                                 |
| ------------------------ | ------------------------------------------- |
| `SUNRISE_SUNSET_API_URL` | Base URL of the `sunrise_sunset_api` server |
| `SUNRISE_SUNSET_API_KEY` | API key (UUID) from `sunrise_sunset_api`    |
---
### 🧪 Notes
Make sure the sunrise_sunset_api is deployed and accessible before running sun_time. You can follow the instructions in the [API repository](https://github.com/josnunezg/sunrise_sunset_api) to get it up and running locally or remotely.
