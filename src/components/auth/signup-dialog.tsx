"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { SignupForm } from "@/components/auth/signup-form";

interface SignupDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignupDialog = ({ isOpen, onClose }: SignupDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[734px] bg-gradient-to-t from-[#000000] to-[#242424] border-none p-6 shadow-xl relative overflow-hidden rounded-xl">
        <button
          onClick={onClose}
          className="absolute right-6 top-6 z-50 p-2 rounded-full hover:bg-[#282828] transition-colors"
          aria-label="Close signup dialog"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="text-white"
          >
            <path
              d="M18 6L6 18M6 6l12 12"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <SignupForm isDialog />
      </DialogContent>
    </Dialog>
  );
};

export default SignupDialog;
