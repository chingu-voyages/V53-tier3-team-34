import getUserSession from "@/actions/getUserSession";
import Signin from "@/app/(pages)/(authPages)/_templates/Login";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await getUserSession();
  if (session) {
    return redirect("/");
  }

  return <Signin />;
}
