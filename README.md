# Cloudflare TXT Record Creator

A Next.js web application that allows users to create TXT records in Cloudflare DNS, with automatic zone creation if the domain doesn't exist.

## Features

- Create TXT records via Cloudflare API
- Automatically creates DNS zone if it doesn't exist
- Simple, clean UI with status feedback
- Built with Next.js (App Router), TypeScript, and Tailwind CSS
- Edge runtime for API routes

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/cloudflare-txt-record-creator.git
   cd cloudflare-txt-record-creator

# Install dependencies:
npm install

# Create a .env.local file in the root directory with your Cloudflare credentials
CF_API_TOKEN=
CF_ACCOUNT_ID=

# Start the development server:
npm run dev

Open http://localhost:3000 in your browser.

## Obtaining Cloudflare Credentials
# API Token:
- Go to Cloudflare Dashboard > Manage Account (from bottom left menu) > Account API Tokens > Create Token
- Then, Create a token with these permissions: Zone:Zone:Read, Zone:DNS:Edit, Zone:Zone:Edit

## Account ID
-Found in the Cloudflare Dashboard URL when viewing your account overview. Format: https://dash.cloudflare.com/<account-id>

Time Spent: 1.5 hours

# Approach
- Started with a simple Next.js page component using the App Router
- Created an Edge Runtime API route for Cloudflare API interactions
- Added comprehensive error handling and user feedback
- Implemented automatic zone creation when domain doesn't exist

# Trade-offs 
- State Management: Used React state instead of utilizing Zustand, or Redux to keep things simple
- Error Handling: Basic error messages that could be enhanced with more specific feedback
- Zone Creation: Simple implementation that might need more validation for production use

# If you had an extra hour, how would you extend this feature?
- Add domain validation
- Implement a list view of existing TXT records
- Add record TTL configuration
- Include more detailed error messages
- Definitely add authentication 
