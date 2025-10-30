import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Initialize intl middleware with routing
const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  // Let intl middleware handle the request
  const response = intlMiddleware(request);

  return response;
}

export const config = {
  // Configure which routes should be processed by this middleware

  // This regex excludes:
  // /api/* routes (API endpoints)
  // /_next/* (Next.js internal files and static assets)
  // /monitoring/* (custom monitoring routes)
  // Static files with specific extensions (images, fonts, documents, etc.)

  // Only dynamic pages and other routes will be processed for internationalization
  matcher: [
    "/((?!api|_next|monitoring|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
