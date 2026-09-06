# Oopsy Dashboard

<p align="center">
  <img src="public/oopsy-bg.png" alt="Oopsy Dashboard Banner" width="100%" style="border-radius: 16px;" />
</p>

<p align="center">
  <strong>Comfort & Convenience, Anywhere.</strong><br />
  A modern, high-performance Next.js admin console and dashboard application for managing clean restrooms, showers, lockers, and luggage storage.
</p>

---

## 🌟 Key Features

- 🔐 **Complete Authentication Suite**:
  - **Login Form**: Responsive desktop split-screen / mobile stack design with custom check-boxes, brand colors (`#005461`, `#E2EFF1`), and password visibility toggles.
  - **Forgot Password**: Email verification flow powered by React Hook Form & Zod.
  - **Verify OTP**: 6-digit pin entry with auto-focusing inputs, paste support, and resend timers.
  - **Reset Password**: Secure password update form with matching confirmation validation.
- 📱 **Fully Responsive Layout**: Dynamic layout adaptations across Mobile, Tablet, and Desktop displays.
- 🎨 **Modern Design System**: Built with Tailwind CSS v4, Lucide React icons, and Shadcn UI components.
- ⚡ **Next.js 16 (App Router)**: Utilizing Turbopack and React 19 for ultra-fast performance.

---

## 🚀 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) & Base UI
- **Form Handling**: [React Hook Form](https://react-hook-form.com/)
- **Validation**: [Zod](https://zod.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🛠️ Getting Started

### Prerequisites

- **Node.js**: `v18.x` or higher
- **npm**: `v9.x` or higher

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/apponislam/oopsy-dashboard.git
   cd oopsy-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📁 Project Structure

```
oopsy-dashboard/
├── app/
│   ├── (auth)/
│   │   └── auth/
│   │       ├── login/             # Login Page
│   │       ├── forgot-password/   # Forgot Password Page
│   │       ├── verify-otp/        # OTP Verification Page
│   │       └── reset-password/    # Reset Password Page
│   ├── (dashboard)/               # Main Dashboard App Layout & Pages
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── auth-pages/                # Auth components (LoginForm, AuthLayoutWrapper, etc.)
│   └── ui/                        # Shadcn UI primitives (button, input, sidebar, etc.)
├── public/                        # Static assets, branding icons & background imagery
├── lib/                           # Helper utilities
└── hooks/                         # Custom React hooks
```

---

## 📜 Available Scripts

- `npm run dev`: Starts the Turbopack development server.
- `npm run build`: Compiles and builds the production app.
- `npm run start`: Runs the built production app locally.
- `npm run lint`: Runs ESLint check across all files.

---

## 📄 License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more details.
