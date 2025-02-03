import { motion } from "framer-motion";
import Link from "next/link";

interface TermsStepProps {
  marketingConsent: boolean;
  dataShareConsent: boolean;
  termsAccepted: boolean;
  onMarketingConsentChange: (value: boolean) => void;
  onDataShareConsentChange: (value: boolean) => void;
  onTermsAcceptedChange: (value: boolean) => void;
  onSignUp: () => void;
}

export function TermsStep({
  marketingConsent,
  dataShareConsent,
  termsAccepted,
  onMarketingConsentChange,
  onDataShareConsentChange,
  onTermsAcceptedChange,
  onSignUp,
}: TermsStepProps) {
  return (
    <motion.div
      key="step3"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-4"
    >
      <div className="space-y-1">
        <p className="text-xs text-[#A7A7A7]">Step 3 of 3</p>
        <h2 className="text-2xl font-bold text-white">Terms & Conditions</h2>
      </div>

      <div className="space-y-3">
        <label className="flex items-start gap-3 p-3 bg-[#181818] rounded cursor-pointer hover:bg-[#282828] transition-colors">
          <input
            type="checkbox"
            checked={marketingConsent}
            onChange={(e) => onMarketingConsentChange(e.target.checked)}
            className="relative w-4 h-4 shrink-0 box-border border border-[#878787] bg-[#181818] rounded-none appearance-none cursor-pointer hover:border-[#1ED760] checked:border-[#1ED760] checked:bg-[#1ED760] transition-colors"
          />
          <span className="text-white text-[0.875rem] leading-[1.5]">
            I would prefer not to receive marketing messages from Spotify
          </span>
        </label>

        <label className="flex items-start gap-3 p-3 bg-[#181818] rounded cursor-pointer hover:bg-[#282828] transition-colors">
          <input
            type="checkbox"
            checked={dataShareConsent}
            onChange={(e) => onDataShareConsentChange(e.target.checked)}
            className="relative w-4 h-4 shrink-0 box-border border border-[#878787] bg-[#181818] rounded-none appearance-none cursor-pointer hover:border-[#1ED760] checked:border-[#1ED760] checked:bg-[#1ED760] transition-colors"
          />
          <span className="text-white text-[0.875rem] leading-[1.5]">
            Share my registration data with Spotify's content providers for
            marketing purposes. Note that your data may be transferred to a
            country outside of the EEA as described in our privacy policy.
          </span>
        </label>

        <label className="flex items-start gap-3 p-3 bg-[#181818] rounded cursor-pointer hover:bg-[#282828] transition-colors">
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => onTermsAcceptedChange(e.target.checked)}
            className="relative w-4 h-4 shrink-0 box-border border border-[#878787] bg-[#181818] rounded-none appearance-none cursor-pointer hover:border-[#1ED760] checked:border-[#1ED760] checked:bg-[#1ED760] transition-colors"
          />
          <span className="text-white text-[0.875rem] leading-[1.5]">
            I agree to the{" "}
            <Link href="#" className="text-[#1DB954] hover:underline">
              Spotify Terms and Conditions of Use
            </Link>
            .
          </span>
        </label>

        <p className="text-[0.875rem] text-white leading-[1.5] mt-2">
          To learn more about how Spotify collects, uses, shares and protects
          your personal data, please see{" "}
          <Link href="#" className="text-[#1DB954] hover:underline">
            Spotify's Privacy Policy
          </Link>
          .
        </p>

        <div className="pt-4">
          <button
            onClick={onSignUp}
            className="w-full h-12 rounded-full bg-[#1ED760] font-bold text-black hover:scale-105 transition-transform"
          >
            Sign up
          </button>
        </div>
      </div>
    </motion.div>
  );
}
