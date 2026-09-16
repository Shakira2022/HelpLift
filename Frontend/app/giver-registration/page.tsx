import { redirect } from "next/navigation"

// This page was a non-functional duplicate of /register's giver flow (no
// state wiring, no submit handler). Redirect here instead of maintaining
// two giver registration forms.
export default function GiverRegistrationRedirect() {
  redirect("/register")
}
