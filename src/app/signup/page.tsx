import SignupForm from "@/components/SignupForm";
import { SHOP } from "@/lib/constants";

export default function SignupPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md items-center px-4 py-12">
      <div className="w-full rounded-3xl border border-gray-100 bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="font-serif text-2xl font-bold text-rangoli-maroon">Create Account</h1>
          <p className="mt-2 text-sm text-gray-500">Join {SHOP.name} for exclusive offers</p>
        </div>
        <SignupForm />
      </div>
    </div>
  );
}