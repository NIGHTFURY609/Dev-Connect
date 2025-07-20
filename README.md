# Kerala Dev Insights

Kerala Dev Insights is an AI-powered platform designed to analyze developer profiles from various platforms, generate a comprehensive "Trust Score," and intelligently match developers with relevant projects and job opportunities. It serves as a bridge between skilled developers in Kerala and organizations seeking talent, fostering trust and transparency through AI-driven reputation analysis.

## Core Features

-   **🤖 AI-Powered Trust Score**: Leverages the Gemini API via Genkit to analyze developer profiles from GitHub, LinkedIn, Stack Overflow, and LeetCode. It evaluates expertise, collaboration, and professionalism to generate a dynamic Trust Score.
-   **👤 Dynamic Developer Profiles**: Displays a clean, comprehensive developer profile, including the AI Trust Score, skill sets, and linked professional accounts.
-   **✨ Smart Project & Job Matchmaking**: Utilizes the AI-generated Trust Score and developer skills to find and rank the most compatible projects and job listings, providing a personalized opportunity feed.
-   **Modern & Responsive UI**: Built with Next.js, ShadCN UI, and Tailwind CSS for a clean, intuitive, and fully responsive user experience on both desktop and mobile.

## Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/) (with App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **AI Integration**: [Genkit](https://firebase.google.com/docs/genkit) (with Google's Gemini)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Form Management**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)

## Getting Started

Follow these instructions to set up and run the project locally for development and testing.

### Prerequisites

-   [Node.js](https://nodejs.org/en) (v18 or later recommended)
-   [npm](https://www.npmjs.com/) or a compatible package manager
-   A Google Gemini API Key

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/kerala-dev-insights.git
    cd kerala-dev-insights
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add your Gemini API key:
    ```env
    GEMINI_API_KEY=your_gemini_api_key_here
    ```

4.  **Run the development server:**
    The project uses two parallel processes: one for the Next.js frontend and another for the Genkit AI flows.

    -   **Start the Next.js app (in your first terminal):**
        ```bash
        npm run dev
        ```
        This will start the web application, typically on `http://localhost:9002`.

    -   **Start the Genkit development server (in a second terminal):**
        ```bash
        npm run genkit:dev
        ```
        This starts the Genkit server, which is required for the AI features to work. It also provides a developer UI to inspect and test your flows, usually at `http://localhost:4000`.

5.  **Open the application:**
    Navigate to `http://localhost:9002` in your browser to see the application in action.
