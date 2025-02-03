"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp, setToken } from "@/lib/auth";
import { PasswordStep } from "./PasswordStep";
import { ProfileStep } from "./ProfileStep";
import { TermsStep } from "./TermsStep";

interface SignupFormProps {
  isDialog?: boolean;
}

export function SignupForm({ isDialog = false }: SignupFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [gender, setGender] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [dataShareConsent, setDataShareConsent] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const router = useRouter();

  const handleNext = async () => {
    if (currentStep === 3 && termsAccepted) {
      try {
        const dateOfBirth = `${year}-${String(
          months.indexOf(month) + 1
        ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

        const response = await signUp({
          email,
          password,
          name,
          dateOfBirth,
          gender,
          marketingConsent,
          dataShareConsent,
        });

        setToken(response.token);
        router.push("/");
      } catch (error) {
        setErrors({
          terms: error instanceof Error ? error.message : "Failed to sign up",
        });
      }
      return;
    }

    setCurrentStep(currentStep + 1);
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

  const getPasswordStrength = () => ({
    hasLetter: /[a-zA-Z]/.test(password),
    hasNumberOrSpecial: /[0-9!@#$%^&*(),.?":{}|<>]/.test(password),
    isLongEnough: password.length >= 10,
  });

  return (
    <div
      className={
        isDialog ? "" : "min-h-screen bg-gradient-to-b from-[#1e1e1e] to-black"
      }
    >
      <div className="max-w-[450px] mx-auto p-8">
        {currentStep === 1 && (
          <PasswordStep
            password={password}
            showPassword={showPassword}
            error={errors.password}
            strength={getPasswordStrength()}
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
      </div>
    </div>
  );
}
