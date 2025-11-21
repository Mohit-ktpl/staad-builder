// import {
//   SignedIn,
//   SignedOut,
//   SignInButton,
//   UserButton,
// } from "@clerk/clerk-react";

// export default function App() {
//   return (
//     <header>
//       <SignedOut>
//         <SignInButton />
//       </SignedOut>
//       <SignedIn>
//         <UserButton />
//       </SignedIn>
//     </header>
//   );
// }

import React from "react";
import AppRouter from "./app/router";

export default function App() {
  return <AppRouter />;
}
