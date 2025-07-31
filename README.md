# ADmyBRAND Insights - AI-Powered Analytics Dashboard

This is a modern, visually stunning analytics dashboard built for the "AI Vibe Coder" hiring task at ADmyBRAND. It was developed using Next.js, shadcn/ui, and Tailwind CSS, with significant assistance from an AI programming partner.

**Live Demo:** [https://ai-powered-analytics-dashboard-nf9u.vercel.app/]

---

## Features

This dashboard includes all core and bonus features as per the assignment requirements:

### Core Features
- **Key Metrics Overview:** At-a-glance cards for Revenue, Subscriptions, Sales, and Active Users.
- **3 Interactive Charts:** Includes a Bar Chart (Revenue), Line Chart (Conversions), and a Pie/Donut Chart (Traffic Sources).
- **Responsive Design:** The layout is fully responsive and looks great on desktop, tablet, and mobile devices.
- **Modern UI/UX:** Built with a consistent design system, beautiful visual hierarchy, and a dark/light mode toggle.
- **Data Table:** A comprehensive table for transactions with features for:
    - **Filtering:** By user name/email.
    - **Sorting:** By clicking on column headers.
    - **Pagination:** "Next" and "Previous" buttons to navigate through data.

### Bonus Features
- **API Integration:** The transactions table fetches live data from a public API.
- **Real-time Updates:** The "Active Now" card simulates live data by updating every 5 seconds.
- **Advanced Date Range Filter:** Filter transactions within a specific date range using a calendar component.
- **Export to CSV:** Export the currently filtered transaction data to a `.csv` file.
- **Beautiful Loading Skeletons:** The UI displays animated placeholders while data is being fetched.
- **Smooth Animations:** All cards and charts have subtle fade-in and slide-up animations on load.

---

## Tech Stack

- **Framework:** Next.js 14 (with App Router)
- **UI Library:** shadcn/ui
- **Styling:** Tailwind CSS
- **Charting:** Recharts
- **Animations:** Framer Motion
- **Language:** TypeScript

---

## How to Run Locally

1.  Clone the repository:
    ```bash
    git clone [https://github.com/paulamartya25/AI-Powered-Analytics-Dashboard.git](https://github.com/paulamartya25/AI-Powered-Analytics-Dashboard.git)
    ```
2.  Navigate to the project directory:
    ```bash
    cd AI-Powered-Analytics-Dashboard
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Run the development server:
    ```bash
    npm run dev
    ```
5.  Open [http://localhost:3000](http://localhost:3000) in your browser.
