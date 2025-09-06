import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({});

export const config = {
  matcher: [
    // Run for everything except static files and Next internals
    "/((?!.*\\..*|_next).*)", 
    "/", 
    "/(api|trpc)(.*)",
    "/quiz(.*)",  // 👈 explicitly add quiz route
  ],
};
