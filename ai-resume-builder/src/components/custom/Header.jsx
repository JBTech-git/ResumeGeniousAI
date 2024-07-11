import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";

export default function Header() {
    const {user,isSignedIn}=useUser();
  return (
    <div className="p-3 px-5 flex justify-between shadow-md">
        <Link to={'/'}>
        <img src="/logo.svg" alt="" />
        </Link>
      {/* <img src="/logo.svg" alt="" /> */}

      {
        isSignedIn ?
        <div className="flex gap-4 items-center">
            <Link to={'/dashboard'}>
            <Button className="rounded" variant="outline">Dashboard</Button>
            </Link>
            <UserButton/>
        </div>
        :
        <Link to={"/auth/sign-in"}>
        <Button className="rounded text-stone-50">Get Started</Button>
      </Link>
      }
    </div>
  );
}
