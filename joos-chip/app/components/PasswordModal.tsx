import React, { useState, useRef, useEffect } from "react";
import { Box } from "@mui/material";

interface PasswordScreenProps {
  backgroundImage: string;
  onPasswordChange: (password: string) => void;
}

const PasswordScreen: React.FC<PasswordScreenProps> = ({ backgroundImage, onPasswordChange }) => {
  const [password, setPassword] = useState("");
  const [filledBlocks, setFilledBlocks] = useState<number[]>([]);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputPassword = event.target.value;
    setPassword(inputPassword);

    const filledBlocks = inputPassword.split("").map((char, index) => index + 1);
    setFilledBlocks(filledBlocks);

    onPasswordChange(inputPassword);
  };

  const handleClick = (index: number) => {
    const passwordValue = password.slice(0, index) + "*" + password.slice(index + 1);
    setPassword(passwordValue);
    const filledBlocks = Array.from({ length: index + 1 }, (_, i) => i + 1);
    setFilledBlocks(filledBlocks);
    passwordInputRef.current?.focus();
  };

  const handleBlur = () => {
    passwordInputRef.current?.focus();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest("#passwordInput")) {
        passwordInputRef.current?.focus();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <img
        src={backgroundImage}
        alt="Background Image"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />
      <div className="relative">
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          className="rounded px-4 py-2 w-64"
          id="passwordInput"
          ref={passwordInputRef}
          onBlur={handleBlur}
        />
        <div className="grid grid-cols-6 gap-2 justify-self-center flex w-full h-full">
          {Array.from({ length: 6 }).map((_, index) => (
            <Box
              key={index}
              className={`block w-8 h-8 border border-gray-300 rounded ${
                filledBlocks.includes(index + 1)
                  ? "bg-gray-500"
                  : "bg-transparent"
              }`}
              onClick={() => handleClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PasswordScreen;