"use client";

import Link from "next/link";
import { EyeOff } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SpotifyIcon = () => (
  <svg viewBox="0 0 1134 340" className="h-[40px]" fill="currentColor">
    <title>Spotify</title>
    <path d="M8 171c0 92 76 168 168 168s168-76 168-168S268 4 176 4 8 79 8 171zm230 78c-39-24-89-30-147-17-14 2-16-18-4-20 64-15 118-8 162 19 11 7 0 24-11 18zm17-45c-45-28-114-36-167-20-17 5-23-21-7-25 61-18 136-9 188 23 14 9 0 31-14 22zM80 133c-17 6-28-23-9-30 59-18 159-15 221 22 17 9 1 37-17 27-54-32-144-35-195-19zm379 91c-17 0-33-6-47-20-1 0-1 1-1 1l-16 19c-1 1-1 2 0 3 18 16 40 24 64 24 34 0 55-19 55-47 0-24-15-37-50-46-29-7-34-12-34-22s10-16 23-16 25 5 39 15c0 0 1 1 2 1s1-1 1-1l14-20c1-1 1-1 0-2-16-13-35-20-56-20-31 0-53 19-53 46 0 29 20 38 52 46 28 6 32 12 32 22 0 11-10 17-25 17zm95-77v-13c0-1-1-2-2-2h-26c-1 0-2 1-2 2v147c0 1 1 2 2 2h26c1 0 2-1 2-2v-46c10 11 21 16 36 16 27 0 54-21 54-61s-27-60-54-60c-15 0-26 5-36 17zm30 78c-18 0-31-15-31-35s13-34 31-34 30 14 30 34-12 35-30 35zm68-34c0 34 27 60 62 60s62-27 62-61-26-60-61-60-63 27-63 61zm30-1c0-20 13-34 32-34s33 15 33 35-13 34-32 34-33-15-33-35zm140-58v-29c0-1 0-2-1-2h-26c-1 0-2 1-2 2v29h-13c-1 0-2 1-2 2v22c0 1 1 2 2 2h13v58c0 23 11 35 34 35 9 0 18-2 25-6 1 0 1-1 1-2v-21c0-1 0-2-1-2h-2c-5 3-11 4-16 4-8 0-12-4-12-12v-54h30c1 0 2-1 2-2v-22c0-1-1-2-2-2h-30zm129-3c0-11 4-15 13-15 5 0 10 0 15 2h1s1-1 1-2V93c0-1 0-2-1-2-5-2-12-3-22-3-24 0-36 14-36 39v5h-13c-1 0-2 1-2 2v22c0 1 1 2 2 2h13v89c0 1 1 2 2 2h26c1 0 1-1 1-2v-89h25l37 89c-4 9-8 11-14 11-5 0-10-1-15-4h-1l-1 1-9 19c0 1 0 3 1 3 9 5 17 7 27 7 19 0 30-9 39-33l45-116v-2c0-1-1-1-2-1h-27c-1 0-1 1-1 2l-28 78-30-78c0-1-1-2-2-2h-44v-3zm-83 3c-1 0-2 1-2 2v113c0 1 1 2 2 2h26c1 0 1-1 1-2V134c0-1 0-2-1-2h-26zm-6-33c0 10 9 19 19 19s18-9 18-19-8-18-18-18-19 8-19 18zm245 69c10 0 19-8 19-18s-9-18-19-18-18 8-18 18 8 18 18 18zm0-34c9 0 17 7 17 16s-8 16-17 16-16-7-16-16 7-16 16-16zm4 18c3-1 5-3 5-6 0-4-4-6-8-6h-8v19h4v-6h4l4 6h5zm-3-9c2 0 4 1 4 3s-2 3-4 3h-4v-6h4z" />
  </svg>
);

const GoogleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

const FacebookIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="#1877F2">
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
  </svg>
);

const AppleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
  </svg>
);

const SpotifyLogoIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-[48px] w-[48px] mb-7"
    fill="currentColor"
  >
    <path d="M12 0C5.374 0 0 5.374 0 12s5.374 12 12 12 12-5.374 12-12S18.626 0 12 0zm5.92 17.442c-.243.373-.765.486-1.136.243-3.102-1.89-7.013-2.318-11.613-1.27-.444.102-.89-.173-.992-.617-.102-.444.174-.89.617-.992 5.036-1.148 9.324-.66 12.767 1.499.37.243.484.764.242 1.137zm1.576-3.501c-.306.473-.947.612-1.419.306-3.548-2.177-8.944-2.808-13.135-1.537-.563.172-1.16-.148-1.333-.71-.172-.563.148-1.314.71-1.333 4.788-1.452 10.733-.741 14.762 1.755.472.306.611.947.305 1.42zm.136-3.645c-4.255-2.525-11.277-2.757-15.34-1.525-.639.194-1.313-.162-1.507-.801-.193-.639.163-1.314.802-1.507 4.653-1.412 12.383-1.14 17.272 1.757.593.352.79 1.118.439 1.711-.352.593-1.118.79-1.711.439l.045-.074z" />
  </svg>
);

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to login");
      }

      // Store the token
      localStorage.setItem("token", data.token);

      // Redirect to home page
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-t from-[#000000] to-[#242424] text-white font-['CircularSp',system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif]">
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center pt-[24px]">
        <div className="w-full max-w-[734px] mx-auto px-8">
          {/* Login Card Container */}
          <div className="bg-[#121212] rounded-[8px] p-[24px]">
            <div className="flex flex-col items-center">
              <SpotifyLogoIcon />
              <h1 className="text-[48px] font-bold mb-[48px] text-center leading-[1.2]">
                Log in to Spotify
              </h1>
            </div>

            <div className="w-full max-w-[324px] mx-auto flex flex-col gap-[8px]">
              {/* Social Login Buttons */}
              <button className="relative flex items-center w-full py-[11px] px-[31px] rounded-[500px] font-bold bg-[#101010] border border-[#878787] hover:border-white hover:scale-[1.04] transition-all">
                <div className="absolute left-[31px]">
                  <GoogleIcon />
                </div>
                <span className="text-[14px] w-full text-center font-bold">
                  Continue with Google
                </span>
              </button>
              <button className="relative flex items-center w-full py-[11px] px-[31px] rounded-[500px] font-bold bg-[#101010] border border-[#878787] hover:border-white hover:scale-[1.04] transition-all">
                <div className="absolute left-[31px]">
                  <FacebookIcon />
                </div>
                <span className="text-[14px] w-full text-center font-bold">
                  Continue with Facebook
                </span>
              </button>
              <button className="relative flex items-center w-full py-[11px] px-[31px] rounded-[500px] font-bold bg-[#101010] border border-[#878787] hover:border-white hover:scale-[1.04] transition-all">
                <div className="absolute left-[31px]">
                  <AppleIcon />
                </div>
                <span className="text-[14px] w-full text-center font-bold">
                  Continue with Apple
                </span>
              </button>
            </div>

            <hr className="my-[32px] border-t border-[#292929] w-full max-w-[324px] mx-auto" />

            {/* Email Login Form */}
            <form
              onSubmit={handleLogin}
              className="w-full max-w-[324px] mx-auto flex flex-col gap-[16px]"
            >
              {error && (
                <div className="bg-red-500/10 text-red-500 p-3 rounded text-sm">
                  {error}
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="block mb-[8px] text-[14px] font-bold"
                >
                  Email or username
                </label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email or username"
                  className="w-full px-[14px] py-[14px] bg-[#121212] border border-[#878787] rounded-[4px] text-white placeholder-[#6A6A6A] focus:outline-none focus:border-white text-[14px] font-medium"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-[8px] text-[14px] font-bold"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full px-[14px] py-[14px] bg-[#121212] border border-[#878787] rounded-[4px] text-white placeholder-[#6A6A6A] focus:outline-none focus:border-white text-[14px]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-[14px] top-1/2 -translate-y-1/2 text-[#6A6A6A] hover:text-white"
                  >
                    <EyeOff className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-[14px] mt-[24px] rounded-[500px] font-bold bg-[#1ED760] text-black hover:scale-[1.04] transition-transform text-[14px] disabled:opacity-50 disabled:hover:scale-100"
              >
                {isLoading ? "Logging in..." : "Log In"}
              </button>
            </form>

            <Link
              href="/forgot-password"
              className="block text-center mt-[32px] text-white underline decoration-white text-[14px]"
            >
              Forgot your password?
            </Link>

            <hr className="my-[32px] border-t border-[#292929] w-full max-w-[324px] mx-auto" />

            <div className="text-center w-full max-w-[324px] mx-auto">
              <p className="text-[#6A6A6A] text-[14px]">
                Don't have an account?{" "}
                <button
                  onClick={() => router.push("/signup")}
                  className="text-[#1ED760] hover:underline"
                >
                  Sign up for Spotify
                </button>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-[24px] text-[12px] text-[#A7A7A7] bg-[#121212]">
        <p>
          This site is protected by reCAPTCHA and the Google{" "}
          <Link href="#" className="underline hover:text-white">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="#" className="underline hover:text-white">
            Terms of Service
          </Link>{" "}
          apply.
        </p>
      </footer>
    </div>
  );
}
