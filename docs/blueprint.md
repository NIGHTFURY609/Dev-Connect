# **App Name**: Kerala Dev Insights

## Core Features:

- AI-Powered Trust Score: Analyzes developer profiles, aggregates content from platforms like GitHub, and uses the Gemini API to evaluate expertise, collaboration, and professionalism, generating a Trust Score. The Gemini API acts as a tool, assessing contributions based on sentiment, technical skills, and collaborative spirit, returning feedback and scores in a JSON format.
- Secure Profile Creation: Implements secure authentication using Firebase Authentication, allowing developers to create profiles by linking their GitHub and other relevant accounts.
- Firestore Database: Uses Firestore to store developer profiles, skills, and AI-generated Trust Scores, creating a dynamic database for talent matching and reputation analysis.
- Project Listings: Creates and stores project listings in Firestore with company information, required skills, and project details to ensure organized data management and streamlined matching.
- AI-Driven Matchmaking: Matches developers with projects using a combination of AI Trust Score and skill overlap. This Cloud Function filters developers based on skills and uses Gemini AI's reputation analysis, with Gemini as a tool, to calculate and sort a developer list based on compatibility scores.
- Intuitive Dashboard: Presents developer profiles with their Trust Score and AI feedback in a clean, card-based UI, similar to ChatGPT, offering a professional and easy-to-navigate interface.
- Project Cards: Creates project cards that clearly display project requirements and company information, facilitating quick and informed decision-making for developers.

## Style Guidelines:

- Primary color: Deep Blue (#304FFE) to convey trust and technical expertise.
- Background color: Light Gray (#F5F6FA) for a clean and professional look.
- Accent color: Bright Green (#2ecc71) to highlight key information and actions.
- Body and headline font: 'Inter' (sans-serif) for a modern, machined, objective, neutral look, suitable for headlines or body text
- Uses professional icons for skills, profile links, and project categories, enhancing usability and visual appeal.
- Card-based design to organize developer profiles and project listings in a clean, structured manner.
- Subtle transitions and loading animations to provide a smooth and engaging user experience.
- Minimal card components, clean typography, soft shadows.
- ChatGPT-like spacing and color hierarchy
- Fully responsive (mobile + desktop)