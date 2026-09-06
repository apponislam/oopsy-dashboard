# Oopsy Dashboard — Platform Administration Console

<p align="center">
  <img src="public/oopsy-bg.png" alt="Oopsy Dashboard Banner" width="100%" style="border-radius: 16px;" />
</p>

<p align="center">
  <strong>Comfort & Convenience, Anywhere.</strong><br />
  A modern, high-performance Next.js 16 administration platform for managing clean restrooms, showers, lockers, spa facilities, bookings, payouts, safety incidents, content moderation, and platform settings.
</p>

<p align="center">
  <a href="https://oopsy.apponislam.top">
    <img src="https://img.shields.io/badge/🌐_Live_Demo-https%3A%2F%2Foopsy.apponislam.top-005461?style=for-the-badge" alt="Live Demo" />
  </a>
</p>

> [!NOTE]
> **Deployment Architecture Note:** This live environment is running locally and securely exposed over the web via a **Cloudflare Tunnel** (`cloudflared`).

---

## 🔗 Quick Links

- 🌐 **Live Website**: [https://oopsy.apponislam.top](https://oopsy.apponislam.top)
- 📁 **Repository**: [https://github.com/apponislam/oopsy-dashboard](https://github.com/apponislam/oopsy-dashboard)

---

## 🌟 Comprehensive System Architecture & Modules

### 🔐 1. Authentication & Security Suite (`/auth`)
- **Login Console** (`/auth/login`): Split-screen desktop & mobile stack with custom checkboxes, brand styling (`#005461`, `#088395`), and password visibility toggles.
- **Forgot Password** (`/auth/forgot-password`): Email verification entry powered by React Hook Form & Zod with direct navigation to Sign in.
- **Verify OTP** (`/auth/verify-otp`): 6-digit pin code entry with auto-focusing inputs, clipboard paste support, and interactive resend timers.
- **Reset Password** (`/auth/reset-password`): Secure password update screen with matching confirmation validation.

### 📊 2. Platform Overview & Metrics (`/`)
- Live KPIs: Total Bookings, Active Providers, Facility Inventory, and Total Revenue.
- Visual charts, booking activity trends, facility type breakdown, and rapid management shortcuts.

### 👥 3. User Management (`/users`)
- Complete account logs for registered clients.
- Status filters (Active, Pending, Suspended), role controls, and detailed slide-over profile drawer.

### 🏢 4. Facility Providers (`/providers`)
- Directory of partner facility owners and corporate hosts.
- Verification badges, total listings metric, contact actions, and provider details drawer.

### 🏷️ 5. Facility Listings Inventory (`/listings`)
- Complete inventory of platform facility spots (Restrooms, Showers, Lockers, Spa, Jacuzzi, etc.).
- Approval moderation (`Approved`, `Pending`, `Rejected`), pricing details, and listing drawer preview.

### 📅 6. Bookings & Reservations (`/bookings`)
- Real-time booking transaction logs.
- Status filtering (`Completed`, `Upcoming`, `Cancelled`), facility breakdown, and customer booking histories.

### 💳 7. Payments & Financial Transactions (`/payments`)
- Payment logs, gateway transaction IDs, payment methods, and revenue status tracking.

### 💸 8. Provider Payouts (`/payouts`)
- Payout requests management, payout status (`Pending`, `Approved`, `Processed`), bank account details, and manual approval triggers.

### 💰 9. Platform Commissions (`/commissions`)
- Commission tier management, platform fee percentages, tier overrides, and historical fee reports.

### ⭐ 10. Reviews & Ratings Moderation (`/reviews`)
- User feedback moderation console, star ratings breakdown, review visibility toggles, and direct responses.

### 📑 11. Platform Analytics & Reports (`/reports`)
- Comprehensive usage and revenue reports.
- Custom date filtering and instant PDF/CSV export downloads.

### 🆘 12. Support & Assistance Tickets (`/assistance`)
- Support ticket queue, priority tagging (`High`, `Normal`), status tracking (`Open`, `In Progress`, `Resolved`, `Closed`), and inline response modal.

### 🚨 13. Safety Incidents & Moderation (`/safety`)
- High-priority safety incident log (`Critical`, `High`, `Medium`, `Low`).
- Active safety alert header banner.
- Incident investigation protocol modal for saving action notes and status updates.
- 24/7 Provider contact notice modal for immediate facility dispatch.

### 🏷️ 14. Service Categories (`/categories`)
- Facility category inventory grid with category icon/photo cards.
- Per-category active/inactive toggle switches.
- New Category creation form with drag-and-drop / click-to-upload photo & icon support (PNG, JPG, WebP, SVG).

### 📄 15. Content Management System (`/content`)
- Tabbed management interface for **FAQs** and **Policy Documents**.
- Status management (`Published`, `Draft`, `Live`, `Under Review`).
- Create and edit modals for adding questions, answers, and legal documents (Terms & Conditions, Privacy Policy, Host Terms, Refund Policy, Accessibility Policy).

### 🔔 16. Targeted Notifications (`/notifications`)
- Platform notification dispatcher targeting **All**, **Clients**, or **Providers**.
- Sent notification history with date, recipient count, and open-rate badges (`📬 68% open rate`).

### ⚙️ 17. System Settings & Danger Zone (`/settings`)
- **Platform Controls**: Switches for Maintenance Mode, New Registrations, Auto-Approve Reviews, and Public Facility Visibility.
- **Notification Channels**: Email & SMS transactional toggles.
- **Operational Configuration**: Support email (`support@oopsy.app`), default commission %, and max advance booking days.
- **Danger Zone**: Single-column vertical action stack for *Clear Cache*, *Reset Analytics*, *Database Backup*, and *Enable Maintenance Mode*.

---

## 🚀 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router & Turbopack)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) & Base UI
- **Form Handling**: [React Hook Form](https://react-hook-form.com/)
- **Validation**: [Zod](https://zod.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Tunneling**: [Cloudflare Tunnel](https://www.cloudflare.com/products/tunnel/) (`cloudflared`)

---

## 🛠️ Local Development & Running the App

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

3. Run the development server (configured on port `3044`):
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3044](http://localhost:3044) in your browser.

---

## 🌐 Exposing via Cloudflare Tunnel (`cloudflared`)

To serve your local environment securely to the web (matching [https://oopsy.apponislam.top](https://oopsy.apponislam.top)):

1. Install `cloudflared` on your system.
2. Run the tunnel pointing to local port `3044`:
   ```bash
   cloudflared tunnel run --url http://localhost:3044
   ```

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
│   ├── (dashboard)/               # Dashboard Application Routes
│   │   ├── assistance/            # Assistance & Support Tickets
│   │   ├── bookings/              # Bookings Management
│   │   ├── categories/            # Service Categories
│   │   ├── commissions/           # Platform Commissions
│   │   ├── content/               # FAQs & Policy Documents
│   │   ├── listings/              # Facility Inventory & Moderation
│   │   ├── notifications/         # Notification Center
│   │   ├── payments/              # Transactions & Payments
│   │   ├── payouts/               # Provider Payouts
│   │   ├── providers/             # Facility Providers Directory
│   │   ├── reports/               # Platform Analytics & Export
│   │   ├── reviews/               # Reviews & Feedback Moderation
│   │   ├── safety/                # Safety Incidents & Emergency Dispatch
│   │   ├── settings/              # System Settings & Danger Zone
│   │   ├── users/                 # Client Account Management
│   │   └── verification/          # Provider Verification Queue
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── auth-pages/                # Auth Form Components
│   ├── dashboard/                 # Feature Modules & Modals
│   └── ui/                        # UI Primitives (Button, Input, Sidebar, etc.)
├── public/                        # Static Assets & Logos
├── lib/                           # Navigation Menus & Helpers
└── hooks/                         # React Custom Hooks
```

---

## 📜 Scripts

- `npm run dev`: Launches Next.js dev server on port `3044`.
- `npm run build`: Compiles production static pages.
- `npm run start`: Runs production server on port `3044`.
- `npm run lint`: Executes ESLint validation.

---

## 📄 License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for details.
