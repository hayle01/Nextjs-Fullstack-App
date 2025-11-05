import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { AuthOptions } from "./api/auth/[...nextauth]/authOptions";

export default async function Home() {
  const session = await getServerSession(AuthOptions);
  console.log("Session", session);
  return (
   <div className="">
    <p>Hello, {session?.user?.name}</p>
    <Button size="sm" variant="outline" >Save</Button>
   </div>
  )
}