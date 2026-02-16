import { AuthenticateWithRedirectCallback, useUser } from "@clerk/clerk-react";

export default function SSOCallbackPage() {
  return <AuthenticateWithRedirectCallback />;
  // const { user } = useUser();
  // if (user) {
  //   return <AuthenticateWithRedirectCallback />;
  // }
}
