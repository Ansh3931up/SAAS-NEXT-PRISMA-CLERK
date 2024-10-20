
---

# Project Name

Saas app for understand and use the prisma,next and clerk library more properly

---

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Screenshots](#screenshots)
7. [Contributing](#contributing)
8. [License](#license)
9. [Contact](#contact)

---

## Overview

Provide a detailed explanation of your web app:

- **Goal**: Describe the purpose of the app.
- **Target Audience**: Who is this app for?
- **Key Features**: What can users expect?
- **Live Demo**: (Optional) [Link to the live version]

---

## Features

Highlight the main features of your application:

- Feature 1
- Feature 2
- Feature 3

---

## Tech Stack

- **Frontend**: e.g., NEXTjs and Typescript
- **Backend**: e.g., Node.js, Express,Primsa
- **Database**: e.g., MongoDB, PostgreSQL
- **Other**: e.g., APIs, Libraries, Clerk

---

## Installation

### Prerequisites

- Node.js (version)
- Other dependencies (list if any)

### Steps

# 1.Install all librabries
```bash
npx create-next-app@latest
npm i -D daisyui@latest
npm install @clerk/nextjs
```

# 2. Add more changes to use daisy ui 
```bash
plugins: [daisyui],
  daisyui:{
    themes:["dark"]
  }
```
# 3.Add .env.local file in you project folder or under src (if present) and add basic secrets like
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

# 4. Add a middleware file and use createRouteMatcher to make public and private route to secure authorization process:
```bash
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Public routes accessible to everyone
const isPublicRoute = createRouteMatcher([
  '/sign-in',
  '/sign-up',
  '/',
  '/home',
]);

// Public API routes accessible to everyone
const isPublicApiRoute = createRouteMatcher([
  '/api/video',
]);
export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
```

# 5. Also add the cosnt clerkMiddleware and export it for making the logic behind the secure authorization
```bash
export default clerkMiddleware((auth, req) => {
  const { userId } = auth();
  const currentUrl = new URL(req.url);
  const isAccessingDashboard = currentUrl.pathname === '/home';
  const isApiRequest = currentUrl.pathname.startsWith('/api');

  // If user is logged in and accessing a public route (excluding dashboard)
  if (userId && isPublicRoute(req) && !isAccessingDashboard) {
    // Redirect logged-in users to the dashboard if they access a public route
    return NextResponse.redirect(new URL('/home', req.url));
  }

  // If user is not logged in
  if (!userId) {
    // If trying to access a protected route (non-public and non-public API)
    if (!isPublicRoute(req) && !isPublicApiRoute(req)) {
      // Redirect unauthenticated users to the sign-in page
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }

    // If the request is for a protected API and the user is not logged in
    if (isApiRequest && !isPublicApiRoute(req)) {
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }
  }

  // Allow the request to proceed if no redirect condition is met
  return NextResponse.next();
});
```

# 6. Wrap the whole code using Clerkprovider by adding it to layout under the app
```bash
import { ClerkProvider } from "@clerk/nextjs";

  return (
    <ClerkProvider><html lang="en">
    <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      {children}
    </body>
  </html></ClerkProvider>
  );

```
# 7.Now installing Prisma
```bash
npm install prisma typescript ts-node @types/node --save-dev
```
# 8. Create the model in schema.prisma :
```bash
model Video{
  id          String @id @default(cuid())
  title       String
  description String?
  publicId String
  originalSize String
  compressedSize String
  duration String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

}
```
# 9. Now create further process using
```bash
npx prisma init
npx prisma migrate dev --name init
npm install @prisma/client
```
# 10. Also change the .env DATABASE_URL from the neon db site:
```bash
DATABASE_URL="postgresql://cloudinary-saas_owner:JNFTp7euasZ0@ep-silent-pine-a5n24n93.us-east-2.aws.neon.tech/cloudinary-saas?sslmode=require"
```
# 11. After thsi you can craete route for the app:
app >> api >> video >>route.ts
```bash
import {NextRequest,NextResponse} from "next/server"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req:NextRequest) {    
    try {
        const videos=await prisma.video.findMany({
            orderBy:{
                createdAt:"desc"
            }
        })
        return NextResponse.json(videos)
    } catch (error) {
        return NextResponse.json({error:"Something went wrong"},{status:500})   
    }
    finally{
        await prisma.$disconnect()
    }

}
```
---

## Usage

Explain how users can interact with the app, or any important steps to follow once installed.

Example:

1. Navigate to `http://localhost:3000`
2. Log in or create an account.
3. Use the app for...

---



## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch-name`
3. Make your changes.
4. Commit your changes: `git commit -m 'Add feature'`
5. Push to the branch: `git push origin feature-branch-name`
6. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

## Contact

- **Your Name**: Ansh(mailto:thebeliever39.gmail.com)


---
