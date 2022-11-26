"use client";
import { useCallback, useState } from "react";
import { BsGithub } from "react-icons/bs";
import { signIn } from "next-auth/react";

import {
  VStack,
  Button,
  Spinner,
  InputGroup,
  FormControl,
  FormCheckInput,
  ValidationFeedback,
} from "@community-next/design-system";

// from server
type ValidUserStatus =
  | "INVALID_EMAIL"
  | "INVALID_SCREEN_NAME"
  | "INVALID_PASSWORD"
  | "INVALID_USERNAME"
  | "USER_NOT_EXISTS"
  | "SUCCESS";

const ErrorMessages = {
  INVALID_EMAIL: "Invalid Email",
  INVALID_SCREEN_NAME: "Invalid screen name",
  INVALID_PASSWORD: "Invalid password",
  INVALID_USERNAME: "Invalid username",
  USER_NOT_EXISTS: "User doesn't exist",
  SERVER_ERROR: "Unknown server error",
  SUCCESS: "Successful login, redirecting...",
};

export type LoginStatus = ValidUserStatus | "SERVER_ERROR" | "INITIAL";

export interface LoginFormProps {}

export const LoginForm: React.FC<LoginFormProps> = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [isUsernameInvalid, setIsUsernameInvalid] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<LoginStatus>("INITIAL");

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
  }, []);

  const handleUsernameChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setIsUsernameInvalid(false);
      setUsername(e.currentTarget.value);
    },
    []
  );

  const handlePasswordChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setIsPasswordInvalid(false);
      setPassword(e.currentTarget.value);
    },
    []
  );

  return (
    <>
      <form className="sm:mt-4" onSubmit={handleSubmit}>
        <VStack className="gap-3">
          <InputGroup>
            <FormControl
              name="username"
              type="text"
              placeholder="Your Email or Username"
              className="w-full"
              value={username}
              onChange={handleUsernameChange}
              validStatus={isUsernameInvalid ? "invalid" : undefined}
            />
          </InputGroup>
          <InputGroup>
            <FormControl
              name="password"
              type="password"
              placeholder="Password"
              className="w-full"
              value={password}
              onChange={handlePasswordChange}
              validStatus={isPasswordInvalid ? "invalid" : undefined}
            />
          </InputGroup>
          <div className="flex justify-between">
            <label className="flex cursor-pointer gap-2">
              <FormCheckInput
                type="checkbox"
                className="cursor-pointer"
                checked={rememberMe}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setRememberMe(!rememberMe);
                }}
              />
              <span>Remember me</span>
            </label>
            <a href="forgot-password.html">Forgot password?</a>
          </div>
          {!isLoading && status !== "INITIAL" ? (
            <div className="flex text-left">
              <ValidationFeedback
                status={status === "SUCCESS" ? "valid" : "invalid"}
              >
                {ErrorMessages[status] ?? "Unknown error"}
              </ValidationFeedback>
            </div>
          ) : null}
          <div className="grid">
            <Button type="submit" variant="primary" disabled={isLoading}>
              {isLoading && <Spinner className="h-5 w-5 mr-3" />}
              {isLoading ? "Logining" : "Login"}
            </Button>
          </div>
        </VStack>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-light-gray-border dark:border-dark-gray-border"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-light-gray-background-primary dark:bg-dark-gray-background-primary px-2 text-slate-600">
            Or continue with
          </span>
        </div>
      </div>

      <Button variant="secondary" onClick={() => signIn("github")}>
        <BsGithub size="16" />
        Github
      </Button>
    </>
  );
};
