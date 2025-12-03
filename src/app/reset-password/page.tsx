// "use client";

// import { useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
// import { resetPassword } from "@/actions/password-actions";
// import { useRouter } from "next/navigation";

// export default function ResetPasswordPage() {
//   const router = useRouter();
//   const token = new URLSearchParams(window.location.search).get("token");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await resetPassword({
//         newPassword: password,
//         confirmPassword,
//       });

//       if (res.success) {
//         toast.success(res.message);
//         router.push("/signin");
//       } else {
//         toast.error(res.message);
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };
//   if (!token) return null;
//   return (
//     <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-12 space-y-4">
//       <h1 className="text-2xl font-bold">Reset Password</h1>
//       <Input
//         type="password"
//         placeholder="New password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//       />
//       <Input
//         type="password"
//         placeholder="Confirm password"
//         value={confirmPassword}
//         onChange={(e) => setConfirmPassword(e.target.value)}
//         required
//       />
//       <Button type="submit" disabled={loading}>
//         {loading ? "Resetting..." : "Reset Password"}
//       </Button>
//     </form>
//   );
// }

"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { resetPassword } from "@/actions/password-actions";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const router = useRouter();
  const token = new URLSearchParams(window.location.search).get("token"); // ✅ get token from URL
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await resetPassword({
        newPassword: password,
        confirmPassword,
        token,
        // ✅ pass token to the action
      });

      if (res.success) {
        toast.success(res.message);
        router.push("/signin");
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!token)
    return (
      <p className="text-center mt-12 text-red-500">Invalid or missing token</p>
    );

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-12 space-y-4">
      <h1 className="text-2xl font-bold">Reset Password</h1>
      <Input
        type="password"
        placeholder="New password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="Confirm password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <Button type="submit" disabled={loading}>
        {loading ? "Resetting..." : "Reset Password"}
      </Button>
    </form>
  );
}
