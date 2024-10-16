// middleware.js
import { NextResponse } from 'next/server';

export function middleware(req) {
  const token = req.cookies.get('token');
  const url = req.nextUrl.clone();
  const protectedPaths = ['/', '/employeeManagement']; // Define protected paths

  // Check if the user is trying to access a protected route
  if (protectedPaths.some((path) => url.pathname.startsWith(path))) {
    // If the token is missing, redirect to the login page
    if (!token && url.pathname !== '/login') {
      url.pathname = '/login'; // Redirect to login
      return NextResponse.redirect(url); // No need to use `new URL()`
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login'],
};
