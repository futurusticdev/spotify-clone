import { Eye, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface PasswordStepProps {
  password: string;
  showPassword: boolean;
  strength: {
    hasLetter: boolean;
    hasNumberOrSpecial: boolean;
    isLongEnough: boolean;
  };
  error?: string;
  onPasswordChange: (value: string) => void;
  onTogglePassword: () => void;
  onNext: () => void;
}

export function PasswordStep({
  password,
  showPassword,
  strength,
  error,
  onPasswordChange,
  onTogglePassword,
  onNext,
}: PasswordStepProps) {
  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-4"
    >
      <div className="space-y-1">
        <p className="text-xs text-[#A7A7A7]">Step 1 of 3</p>
        <h2 className="text-xl font-bold text-white">Create a password</h2>
      </div>

      <div className="space-y-4">
        <div className="space-y-1">
          <label
            htmlFor="password"
            className="block text-sm font-bold text-white"
          >
            Password
          </label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => onPasswordChange(e.target.value)}
              className={cn(
                "w-full h-10 bg-[#242424] text-white border border-[#878787] rounded-[4px] px-3 focus:outline-none focus:border-white",
                error && "border-red-500 focus:border-red-500"
              )}
            />
            <button
              type="button"
              onClick={onTogglePassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A7A7A7] hover:text-white transition-colors"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>

        <div className="space-y-2">
          <p className="text-[0.8125rem] text-white">
            Your password must contain at least
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "w-4 h-4 rounded-full border flex items-center justify-center",
                  strength.hasLetter
                    ? "border-[#1ED760] bg-[#1ED760]"
                    : "border-white"
                )}
              >
                {strength.hasLetter && (
                  <Check className="w-2.5 h-2.5 text-black" />
                )}
              </div>
              <span
                className={cn(
                  "text-[0.8125rem]",
                  strength.hasLetter ? "text-[#1ED760]" : "text-white"
                )}
              >
                1 letter
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "w-4 h-4 rounded-full border flex items-center justify-center",
                  strength.hasNumberOrSpecial
                    ? "border-[#1ED760] bg-[#1ED760]"
                    : "border-white"
                )}
              >
                {strength.hasNumberOrSpecial && (
                  <Check className="w-2.5 h-2.5 text-black" />
                )}
              </div>
              <span
                className={cn(
                  "text-[0.8125rem]",
                  strength.hasNumberOrSpecial ? "text-[#1ED760]" : "text-white"
                )}
              >
                1 number or special character (example: # ? ! &)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "w-4 h-4 rounded-full border flex items-center justify-center",
                  strength.isLongEnough
                    ? "border-[#1ED760] bg-[#1ED760]"
                    : "border-white"
                )}
              >
                {strength.isLongEnough && (
                  <Check className="w-2.5 h-2.5 text-black" />
                )}
              </div>
              <span
                className={cn(
                  "text-[0.8125rem]",
                  strength.isLongEnough ? "text-[#1ED760]" : "text-white"
                )}
              >
                10 characters
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={onNext}
          className="w-full h-10 rounded-full bg-[#1ED760] font-bold text-black hover:scale-105 transition-transform"
        >
          Next
        </button>
      </div>
    </motion.div>
  );
}
