import React, { useState, useRef, useEffect } from "react";
interface PasswordScreenProps {
  backgroundImage: string;
  onPasswordChange: (password: string) => void;
}

const PasswordScreen: React.FC<PasswordScreenProps> = ({ backgroundImage, onPasswordChange }) => {
  const [password, setPassword] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputPassword = event.target.value;
    setPassword(inputPassword);

    if (inputPassword.length > 6) {
      setIsShaking(true);
      setTimeout(() => {
        setPassword("");
        setIsShaking(false);
      }, 500);
    } else {
      onPasswordChange(inputPassword);
    }
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
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-black">
      <img
        src={backgroundImage}
        alt="Background Image"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />
      <div className="relative">
        <input
          value={password}
          onChange={handlePasswordChange}
          className={`rounded px-4 py-2 w-64 text-white text-center text-3xl font-bold ${isShaking ? "shake" : ""}`}
          id="passwordInput"
          ref={passwordInputRef}
          onBlur={handleBlur}
          style={{ textOverflow: "ellipsis" }}
        />
      </div>
    </div>
  );
};

export default PasswordScreen;