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

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
