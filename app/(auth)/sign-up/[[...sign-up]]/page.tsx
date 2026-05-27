import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex-1 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 landing-bg">
      <div className="w-full max-w-md flex flex-col items-center">
        <SignUp />
      </div>
    </div>
  );
}
