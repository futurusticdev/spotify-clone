"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SpotifyIcon } from "@/components/icons/spotify";
import { Eye, ChevronDown, Check, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { PasswordStep } from "@/components/auth/PasswordStep";
import { ProfileStep } from "@/components/auth/ProfileStep";
import { TermsStep } from "@/components/auth/TermsStep";
import { signUp, setToken } from "@/lib/auth";
import { useRouter } from "next/navigation";

const SpotifyLogoIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-[48px] w-[48px] mb-7"
    fill="currentColor"
  >
    <path d="M12 0C5.374 0 0 5.374 0 12s5.374 12 12 12 12-5.374 12-12S18.626 0 12 0zm5.92 17.442c-.243.373-.765.486-1.136.243-3.102-1.89-7.013-2.318-11.613-1.27-.444.102-.89-.173-.992-.617-.102-.444.174-.89.617-.992 5.036-1.148 9.324-.66 12.767 1.499.37.243.484.764.242 1.137zm1.576-3.501c-.306.473-.947.612-1.419.306-3.548-2.177-8.944-2.808-13.135-1.537-.563.172-1.16-.148-1.333-.71-.172-.563.148-1.314.71-1.333 4.788-1.452 10.733-.741 14.762 1.755.472.306.611.947.305 1.42zm.136-3.645c-4.255-2.525-11.277-2.757-15.34-1.525-.639.194-1.313-.162-1.507-.801-.193-.639.163-1.314.802-1.507 4.653-1.412 12.383-1.14 17.272 1.757.593.352.79 1.118.439 1.711-.352.593-1.118.79-1.711.439l.045-.074z" />
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

interface FormErrors {
  email?: string;
  password?: string;
  name?: string;
  day?: string;
  month?: string;
  year?: string;
  gender?: string;
  terms?: string;
}

interface SignUpPageProps {
  isDialog?: boolean;
}

export function SignUpPage({ isDialog = false }: SignUpPageProps) {
  const [showSignupFlow, setShowSignupFlow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [gender, setGender] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [dataShareConsent, setDataShareConsent] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const router = useRouter();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return "Email is required";
    }
    if (!emailRegex.test(email)) {
      return "Please enter a valid email";
    }
    return "";
  };

  const handleInitialNext = () => {
    const emailError = validateEmail(email);
    setErrors({ email: emailError });
    if (!emailError) {
      setShowSignupFlow(true);
    }
  };

  const validatePassword = (password: string) => {
    const strength = getPasswordStrength();

    if (!password) {
      return "Password is required";
    }

    if (
      !strength.hasLetter ||
      !strength.hasNumberOrSpecial ||
      !strength.isLongEnough
    ) {
      return "Your password must meet all requirements";
    }

    return "";
  };

  const getPasswordStrength = () => {
    return {
      hasLetter: /[a-zA-Z]/.test(password),
      hasNumberOrSpecial: /[0-9!@#$%^&*(),.?":{}|<>]/.test(password),
      isLongEnough: password.length >= 10,
    };
  };

  const handleNext = async () => {
    if (currentStep === 1) {
      const passwordError = validatePassword(password);
      setErrors({ password: passwordError });
      if (!passwordError) {
        setCurrentStep(2);
      }
    } else if (currentStep === 2) {
      // Validate profile info
      const profileErrors: FormErrors = {};

      if (!name) {
        profileErrors.name = "Name is required";
      }

      if (!day || !month || !year) {
        profileErrors.day = "Date of birth is required";
      } else {
        const birthDate = new Date(
          `${year}-${months.indexOf(month) + 1}-${day}`
        );
        if (isNaN(birthDate.getTime())) {
          profileErrors.day = "Please enter a valid date";
        }
      }

      if (!gender) {
        profileErrors.gender = "Please select your gender";
      }

      setErrors(profileErrors);

      if (Object.keys(profileErrors).length === 0) {
        setCurrentStep(3);
      }
    } else if (currentStep === 3) {
      // Validate terms
      if (!termsAccepted) {
        setErrors({
          terms: "You must accept the Terms and Conditions to continue",
        });
        return;
      }

      try {
        // Format date of birth
        const dateOfBirth = `${year}-${String(
          months.indexOf(month) + 1
        ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

        // Call signup API
        const response = await signUp({
          email,
          password,
          name,
          dateOfBirth,
          gender,
          marketingConsent,
          dataShareConsent,
        });

        // Store token
        setToken(response.token);

        // Redirect to home page
        router.push("/");
      } catch (error) {
        console.error("Signup error:", error);
        setErrors({
          terms: error instanceof Error ? error.message : "Failed to sign up",
        });
      }
    }
  };

  const handleBack = () => {
    if (currentStep === 1) {
      setShowSignupFlow(false);
    } else {
      setCurrentStep(currentStep - 1);
    }
    setErrors({});
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const renderInitialSignup = () => (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full"
    >
      <div className="flex flex-col items-center">
        <SpotifyLogoIcon />
        <h1 className="text-[48px] font-bold mb-[48px] text-center leading-[1.2]">
          Sign up to start listening
        </h1>
      </div>

      <div className="w-full max-w-[324px] mx-auto">
        <div className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Email address
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors({});
              }}
              className={cn(
                "bg-[#121212] text-white",
                errors.email && "border-red-500"
              )}
              placeholder="name@example.com"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <Button
            onClick={handleInitialNext}
            className="w-full rounded-[500px] bg-[#1ED760] px-8 py-3 text-[1rem] font-bold hover:bg-[#1ED760]/90 hover:scale-[1.04] transition-all"
          >
            Next
          </Button>
        </div>

        <hr className="border-t border-[#292929] my-[32px]" />

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
            <Link
              href="/login"
              className="text-white underline decoration-white"
            >
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );

  const renderSignupFlow = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-[450px] mx-auto"
    >
      {/* Progress bar */}
      <div className="w-full h-1 bg-[#242424] mb-6">
        <div
          className="h-full bg-[#1ED760] transition-all duration-300"
          style={{ width: `${(currentStep / 3) * 100}%` }}
        />
      </div>

      {/* Back button */}
      <button
        onClick={handleBack}
        className="flex items-center gap-2 text-white mb-6 hover:text-[#1ED760] transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
        <span className="text-[1rem]">Back</span>
      </button>

      <div className="max-w-[280px] mx-auto">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <PasswordStep
              password={password}
              showPassword={showPassword}
              strength={getPasswordStrength()}
              error={errors.password}
              onPasswordChange={setPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
              onNext={handleNext}
            />
          )}

          {currentStep === 2 && (
            <ProfileStep
              name={name}
              day={day}
              month={month}
              year={year}
              gender={gender}
              months={months}
              errors={errors}
              onNameChange={setName}
              onDayChange={setDay}
              onMonthChange={setMonth}
              onYearChange={setYear}
              onGenderChange={setGender}
              onNext={handleNext}
            />
          )}

          {currentStep === 3 && (
            <TermsStep
              marketingConsent={marketingConsent}
              dataShareConsent={dataShareConsent}
              termsAccepted={termsAccepted}
              onMarketingConsentChange={setMarketingConsent}
              onDataShareConsentChange={setDataShareConsent}
              onTermsAcceptedChange={setTermsAccepted}
              onSignUp={handleNext}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );

  return (
    <div
      className={cn(
        "flex flex-col bg-gradient-to-t from-[#000000] to-[#242424] text-white font-['CircularSp',system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif]",
        isDialog ? "h-full rounded-lg" : "h-screen"
      )}
    >
      <main className="flex-1 flex flex-col items-center pt-[24px]">
        <div className="w-full max-w-[734px] mx-auto px-4">
          <div
            className={cn(
              !showSignupFlow ? "bg-[#121212] rounded-[8px] p-[24px]" : ""
            )}
          >
            <AnimatePresence mode="wait">
              {!showSignupFlow ? renderInitialSignup() : renderSignupFlow()}
            </AnimatePresence>
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
}

// Add this default export for the page route
export default function SignUpRoute() {
  return <SignUpPage />;
}
