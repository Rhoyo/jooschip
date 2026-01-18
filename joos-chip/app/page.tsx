"use client";

import Rolodex from "./components/Rolodex";
import PasswordScreen from "./components/PasswordModal";
import { useState } from "react";


export default function Home() {

  const [passwordAttempt, setPasswordAttempt] = useState("");
  const password = process.env.NODE_ENV === "production" ? process.env.PASSWORD : process.env.NEXT_PUBLIC_PASSWORD;
  console.log("ENV", process.env);

  return (
    <div className="">
      <main className="">

        {
          passwordAttempt == password ?
          <Rolodex/> 
          :
          <PasswordScreen backgroundImage="/background.png" onPasswordChange={setPasswordAttempt}/>
        }
      </main>
    </div>
  );
}
