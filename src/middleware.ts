// middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  const url = req.nextUrl.clone();
  const userCookie = req.cookies.get("user");
  const protectedPaths = [
    "/",
    "/employeeManagement",
    "/clientManagement",
    "/company",
    "/subadminManagement",
    "/activityLogs",
    "/settings",
    "/helpAndSupport",
    "/clientManagement/pendingRequests",
  ];
  // Check if the user is trying to access a protected route
  if (protectedPaths.some((path) => url.pathname.startsWith(path))) {
    // If the token is missing, redirect to the login page
    if (!userCookie && url.pathname !== "/login") {
      url.pathname = "/login"; // Redirect to login
      return NextResponse.redirect(url); // No need to use `new URL()`
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/employeeManagement",
    "/clientManagement",
    "/company",
    "/subadminManagement",
    "/activityLogs",
    "/settings",
    "/helpAndSupport",
    "/clientManagement/pendingRequests",
    "/clientManagement/[clientDetails]", 
    "/employeeManagement/[employeeDetails]", 
    "/company/[companyDetails]" , 
  ],
};
