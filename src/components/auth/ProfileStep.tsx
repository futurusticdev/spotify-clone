import { ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProfileStepProps {
  name: string;
  day: string;
  month: string;
  year: string;
  gender: string;
  months: string[];
  errors?: {
    name?: string;
    day?: string;
    gender?: string;
  };
  onNameChange: (value: string) => void;
  onDayChange: (value: string) => void;
  onMonthChange: (value: string) => void;
  onYearChange: (value: string) => void;
  onGenderChange: (value: string) => void;
  onNext: () => void;
}

export function ProfileStep({
  name,
  day,
  month,
  year,
  gender,
  months,
  errors,
  onNameChange,
  onDayChange,
  onMonthChange,
  onYearChange,
  onGenderChange,
  onNext,
}: ProfileStepProps) {
  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-4"
    >
      <div className="space-y-1">
        <p className="text-xs text-[#A7A7A7]">Step 2 of 3</p>
        <h2 className="text-xl font-bold text-white">Tell us about yourself</h2>
      </div>

      <div className="space-y-4">
        <div className="space-y-1">
          <label className="block text-sm font-bold text-white">Name</label>
          <p className="text-[0.8125rem] text-[#A7A7A7]">
            This name will appear on your profile
          </p>
          <Input
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            className={cn(
              "w-full h-10 bg-[#242424] text-white border border-[#878787] rounded-[4px] px-3 focus:outline-none focus:border-white",
              errors?.name && "border-red-500 focus:border-red-500"
            )}
          />
          {errors?.name && (
            <p className="text-sm text-red-500">{errors.name}</p>
          )}
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-bold text-white">
            Date of birth
          </label>
          <p className="text-[0.8125rem] text-[#A7A7A7] whitespace-nowrap">
            Why do we need your date of birth?{" "}
            <Link
              href="#"
              className="text-[#A7A7A7] underline hover:text-white"
            >
              Learn more
            </Link>
            .
          </p>
          <div className="flex gap-3 mt-2">
            <Input
              placeholder="DD"
              value={day}
              onChange={(e) => onDayChange(e.target.value)}
              className={cn(
                "w-[80px] h-10 bg-[#242424] text-white border border-[#878787] rounded-[4px] px-3 text-center focus:outline-none focus:border-white",
                errors?.day && "border-red-500 focus:border-red-500"
              )}
              maxLength={2}
            />
            <div className="relative flex-1">
              <select
                value={month}
                onChange={(e) => onMonthChange(e.target.value)}
                className={cn(
                  "w-full h-10 bg-[#242424] text-white border border-[#878787] rounded-[4px] px-3 appearance-none focus:outline-none focus:border-white",
                  errors?.day && "border-red-500 focus:border-red-500"
                )}
              >
                <option value="" disabled>
                  Month
                </option>
                {months.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white pointer-events-none" />
            </div>
            <Input
              placeholder="YYYY"
              value={year}
              onChange={(e) => onYearChange(e.target.value)}
              className={cn(
                "w-[80px] h-10 bg-[#242424] text-white border border-[#878787] rounded-[4px] px-3 text-center focus:outline-none focus:border-white",
                errors?.day && "border-red-500 focus:border-red-500"
              )}
              maxLength={4}
            />
          </div>
          {errors?.day && (
            <p className="text-sm text-red-500 mt-1">{errors.day}</p>
          )}
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-bold text-white">Gender</label>
          <p className="text-[0.8125rem] text-[#A7A7A7]">
            We use your gender to help personalize our content recommendations
            and ads for you.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-3 pt-3">
            {[
              ["Man", "Woman", "Non-binary"],
              ["Something else", "Prefer not to say"],
            ].map((row, rowIndex) => (
              <div key={rowIndex} className="flex gap-6 w-full">
                {row.map((option) => (
                  <label key={option} className="flex items-center">
                    <div className="relative flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value={option}
                        checked={gender === option}
                        onChange={(e) => onGenderChange(e.target.value)}
                        className={cn(
                          "appearance-none w-5 h-5 rounded-full border-[1px] border-[#727272] checked:border-[#1ED760] checked:border-[5px] bg-transparent focus:ring-0 focus:ring-offset-0 cursor-pointer transition-all",
                          errors?.gender && "border-red-500"
                        )}
                      />
                    </div>
                    <span className="ml-3 text-[0.875rem] text-white whitespace-nowrap">
                      {option}
                    </span>
                  </label>
                ))}
              </div>
            ))}
          </div>
          {errors?.gender && (
            <p className="text-sm text-red-500 mt-1">{errors.gender}</p>
          )}
        </div>

        <div className="pt-8">
          <button
            onClick={onNext}
            className="w-[324px] h-[48px] rounded-full bg-[#1ED760] font-bold text-black hover:scale-105 transition-transform"
          >
            Next
          </button>
        </div>
      </div>
    </motion.div>
  );
}
