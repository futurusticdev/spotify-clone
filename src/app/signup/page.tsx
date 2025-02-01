"use client";

import Link from "next/link";

const SpotifyLogoIcon = () => (
  <svg viewBox="0 0 24 24" className="h-[48px] w-[48px] mb-7" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.374 0 12s5.374 12 12 12 12-5.374 12-12S18.626 0 12 0zm5.92 17.442c-.243.373-.765.486-1.136.243-3.102-1.89-7.013-2.318-11.613-1.27-.444.102-.89-.173-.992-.617-.102-.444.174-.89.617-.992 5.036-1.148 9.324-.66 12.767 1.499.37.243.484.764.242 1.137zm1.576-3.501c-.306.473-.947.612-1.419.306-3.548-2.177-8.944-2.808-13.135-1.537-.563.172-1.16-.148-1.333-.71-.172-.563.148-1.314.71-1.333 4.788-1.452 10.733-.741 14.762 1.755.472.306.611.947.305 1.42zm.136-3.645c-4.255-2.525-11.277-2.757-15.34-1.525-.639.194-1.313-.162-1.507-.801-.193-.639.163-1.314.802-1.507 4.653-1.412 12.383-1.14 17.272 1.757.593.352.79 1.118.439 1.711-.352.593-1.118.79-1.711.439l.045-.074z"/>
  </svg>
);

const GoogleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="#1877F2">
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
  </svg>
);

const AppleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
  </svg>
);

const SignupPage = () => {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-t from-[#000000] to-[#242424] text-white font-['CircularSp',system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif]">
      <main className="flex-1 flex flex-col items-center pt-[24px]">
        <div className="w-full max-w-[734px] mx-auto px-8">
          <div className="bg-[#121212] rounded-[8px] p-[24px]">
            <div className="flex flex-col items-center">
              <SpotifyLogoIcon />
              <h1 className="text-[48px] font-bold mb-[48px] text-center leading-[1.2]">
                Sign up to start listening
              </h1>
            </div>

            <div className="w-full max-w-[324px] mx-auto">
              <label htmlFor="email" className="block mb-[8px] text-[14px] font-bold">
                Email address
              </label>
              <input
                type="email"
                id="email"
                placeholder="name@domain.com"
                className="w-full px-[14px] py-[14px] mb-[16px] bg-[#121212] border border-[#878787] rounded-[4px] text-white placeholder-[#6A6A6A] focus:outline-none focus:border-white text-[14px] font-medium"
              />

              <button
                type="submit"
                className="w-full py-[14px] rounded-[500px] font-bold bg-[#1ED760] text-black hover:scale-[1.04] transition-transform text-[14px] mb-[32px]"
              >
                Next
              </button>

              <hr className="border-t border-[#292929] mb-[32px]" />

              <div className="flex flex-col gap-[8px]">
                <button className="relative flex items-center w-full py-[11px] px-[31px] rounded-[500px] font-bold bg-[#101010] border border-[#878787] hover:border-white hover:scale-[1.04] transition-all">
                  <div className="absolute left-[31px]">
                    <GoogleIcon />
                  </div>
                  <span className="text-[14px] w-full text-center font-bold">
                    Sign up with Google
                  </span>
                </button>
                <button className="relative flex items-center w-full py-[11px] px-[31px] rounded-[500px] font-bold bg-[#101010] border border-[#878787] hover:border-white hover:scale-[1.04] transition-all">
                  <div className="absolute left-[31px]">
                    <FacebookIcon />
                  </div>
                  <span className="text-[14px] w-full text-center font-bold">
                    Sign up with Facebook
                  </span>
                </button>
                <button className="relative flex items-center w-full py-[11px] px-[31px] rounded-[500px] font-bold bg-[#101010] border border-[#878787] hover:border-white hover:scale-[1.04] transition-all">
                  <div className="absolute left-[31px]">
                    <AppleIcon />
                  </div>
                  <span className="text-[14px] w-full text-center font-bold">
                    Sign up with Apple
                  </span>
                </button>
              </div>

              <div className="text-center mt-[32px]">
                <p className="text-[#A7A7A7] text-[14px]">
                  Already have an account?{" "}
                  <Link href="/login" className="text-white underline decoration-white">
                    Log in here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

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
};

export default SignupPage; 