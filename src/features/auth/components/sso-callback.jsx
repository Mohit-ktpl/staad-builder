import { AuthenticateWithRedirectCallback, useUser } from "@clerk/clerk-react";

export default function SSOCallbackPage() {
  const { user } = useUser();
  if (user) {
    return <AuthenticateWithRedirectCallback />;
  }
}
