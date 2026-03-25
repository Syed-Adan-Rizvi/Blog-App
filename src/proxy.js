// middleware.js or proxy.js

import middleware from "next-auth/middleware";

// Guard ko default export kar diya (Next.js 16 ki requirement)
export default middleware;

// Guard ko kahan khada karna hai?
export const config = {
  matcher: ["/admin/:path*"]
};













// export { default } from "next-auth/middleware";

// // Guard ko kahan khada karna hai?
// export const config = {
//   // Sirf /admin aur uske andar ke saare pages par sakhti hogi
//   matcher: ["/admin/:path*"] 
// };