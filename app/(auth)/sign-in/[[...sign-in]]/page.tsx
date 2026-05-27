import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex-1 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 landing-bg">
      <div className="w-full max-w-md flex flex-col items-center">
        <SignIn />
      </div>
    </div>
  );
}
