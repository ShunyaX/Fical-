"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";

const slideLeft = {
  hidden: { x: 40, opacity: 0 },
  visible: { x: 0, opacity: 1 },
  exit: { x: -40, opacity: 0 },
};

const slideRight = {
  hidden: { x: -40, opacity: 0 },
  visible: { x: 0, opacity: 1 },
  exit: { x: 40, opacity: 0 },
};

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [step, setStep] = React.useState<1 | 2>(1);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const isvalidmail = (e: string) => /\S+@\S+\.\S+/.test(e);

  const handlenext = (e: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (!isvalidmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email: email.trim(),
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error || "Login failed");
        setLoading(false);
        return;
      } else {
        router.push("/");
      }
    } catch (error) {
      setError("Something went wrong. Try again.");
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] font-pop">
        <h1 className="text-white text-3xl hover:text-red-500">Log In</h1>

        <form
          onSubmit={step === 1 ? handlenext : handleSubmit}
          className="text-white w-96 mt-14 flex flex-col space-y-8 bg-transparent"
        >
          <AnimatePresence mode="wait">
            {step === 1 && (
              <>
                <motion.div
                  key="step1"
                  variants={slideRight}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.25 }}
                >
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="focus:border-red-500 p-2 border-b-2 mb-4 bg-transparent outline-none w-full"
                    required
                    autoFocus
                  />
                  <div className="text-white flex items-center justify-center gap-2">
                    <button type="button">Forgot Password?</button>
                    <button
                      type="button"
                      className="text-red-500"
                      onClick={() => {
                        router.push("/Signup");
                      }}
                    >
                      Sign Up
                    </button>
                  </div>
                  <button
                    type="submit"
                    className="border-2 py-1 border-red-500 w-full mt-4 rounded-full bg-red-800 hover:bg-red-700"
                  >
                    Next
                  </button>
                </motion.div>
              </>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                variants={slideLeft}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm text-zinc-300">Password</label>
                    <p className="text-xs text-zinc-400">{email}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setStep(1);
                      setPassword("");
                      setError("");
                    }}
                    className="text-zinc-400 text-sm"
                  >
                    Back
                  </button>
                </div>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password"
                  className="focus:border-red-500 p-2 border-b-2 bg-transparent outline-none w-full"
                  required
                  autoFocus
                />
              </motion.div>
            )}

            {step === 2 && (
              <button
                type="submit"
                disabled={loading}
                className="border-2 py-1 border-red-500 w-full mt-4 rounded-full bg-red-800 hover:bg-red-700"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            )}
          </AnimatePresence>
        </form>

        {error && <p className="text-sm text-red-400 mt-3">{error}</p>}
      </div>
    </div>
  );
}
