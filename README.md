## Installation
- Clone the repository:
-  git clone https://github.com/khaled-305/Cloudflare-TXT-Record-Creator.git
-  cd cloudflare-txt-record-creator

# Install dependencies:
- npm install

# Create a .env.local file in the root directory with your Cloudflare credentials
- CF_API_TOKEN=
- CF_ACCOUNT_ID=

# Start the development server:
- npm run dev

- Open http://localhost:3000 in your browser.

## Obtaining Cloudflare Credentials
# API Token:
- Go to Cloudflare Dashboard > Manage Account (from bottom left menu) > Account API Tokens > Create Token
- Then, Create a token with these permissions: Zone:Zone:Read, Zone:DNS:Edit, Zone:Zone:Edit

## Account ID
- Found in the Cloudflare Dashboard URL when viewing account overview. Format: https://dash.cloudflare.com/<account-id>

- Time Spent: 1hr 40min

# Approach
- Started with a simple Next.js page component using the App Router
- Created an Edge Runtime API route for Cloudflare API interactions
- Added comprehensive error handling and user feedback
- Implemented automatic zone creation when domain doesn't exist

# Trade-offs 
- Used React state instead of utilizing Zustand, or Redux to keep things simple
- Basic error messages that could be enhanced with more specific feedback
- Simple implementation of zone creation that might need more validation for production use

# If you had an extra hour, how would you extend this feature?
- Add domain validation
- Implement a list view of existing TXT records
- Add record TTL configuration
- Include more detailed error messages
- Definitely add authentication 
