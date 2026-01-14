"use client";

import Rolodex from "./components/Rolodex";
import PasswordScreen from "./components/PasswordModal";
import { useState } from "react";
import { env } from "process";

export default function Home() {

  const [passwordAttempt, setPasswordAttempt] = useState("");
  const password = env.PASSWORD;

  return (
    <div className="">
      <main className="">

        {
          passwordAttempt == password ?
          <Rolodex/> 
          :
          <PasswordScreen backgroundImage="/random_turtle.jpg" onPasswordChange={setPasswordAttempt}/>
        }
      </main>
    </div>
  );
}
