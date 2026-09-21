# Lindy - AI Interview Assistant

An AI-powered mock interview platform built with React 18, TypeScript, Vite, Clerk Authentication, Firebase Firestore, and Google Gemini AI.

## Features

- **AI-Generated Questions** — Gemini generates 5 tailored technical interview questions based on your job role, description, experience, and tech stack.
- **Speech-to-Text Recording** — Answer questions using your microphone; your speech is transcribed in real-time.
- **Webcam Support** — Optional webcam display during interviews.
- **AI Feedback** — Each answer is evaluated by Gemini with a rating (1–10) and detailed improvement feedback.
- **Firebase Persistence** — Interviews and answers are saved to Firestore.
- **Clerk Authentication** — Secure sign-up and sign-in.
- **Dashboard** — View all your previous mock interviews and their feedback.

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS + shadcn/Radix UI
- Clerk (Authentication)
- Firebase Firestore (Database)
- Google Gemini API (AI)
- React Webcam + Speech-to-Text

## Getting Started

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env.local` file in the root with the following:
   ```
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_GEMINI_API_KEY=your_gemini_api_key
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

5. Deploy to Firebase:
   ```bash
   firebase deploy --only hosting
   ```

## Firebase Setup

Enable **Firestore Database** in the Firebase Console for your project.

The app uses two Firestore collections:
- `users` — user profiles (auto-created on first sign-in)
- `interviews` — created mock interviews
- `userAnswers` — saved answers with AI feedback

## License

MIT
