import getUserSession from "@/actions/getUserSession";
import Signup from "@/app/(pages)/(authPages)/_templates/SignUp";
import { redirect } from "next/navigation";

export default async function Register() {
  const session = await getUserSession();
  if (session) {
    return redirect("/");
  }

  return <Signup />;
}
