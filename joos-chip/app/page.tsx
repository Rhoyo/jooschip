"use client";

import Rolodex from "./components/Rolodex";
import PasswordScreen from "./components/PasswordModal";
import { useState } from "react";


export default function Home() {

  const [passwordAttempt, setPasswordAttempt] = useState("");
  const password = "011924";

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
