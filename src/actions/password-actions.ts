// "use server";

// import { auth } from "@/lib/auth";
// import z from "zod";

// export const resetPasswordSchema = z.object({
//   newPassword: z.string().min(6),
//   confirmPassword: z.string().min(6),
// });

// export async function resetPassword(data: z.infer<typeof resetPasswordSchema>) {
//   const parsed = resetPasswordSchema.parse(data);

//   if (parsed.newPassword !== parsed.confirmPassword) {
//     return { success: false, message: "Passwords do not match" };
//   }

//   try {
//     await auth.api.changePassword({
//       body: {
//         newPassword: parsed.newPassword,
//         currentPassword: "",
//         revokeOtherSessions: false,
//       },
//     });

//     return { success: true, message: "Password changed successfully" };
//   } catch (error) {
//     console.error("Password reset error:", error);
//     return { success: false, message: "Error resetting password" };
//   }
// }

// src/actions/password-actions.ts
import { authClient } from "@/lib/auth-client";

interface ResetPasswordParams {
  newPassword: string;
  confirmPassword: string;
  token: string | null;
}

export async function resetPassword({
  newPassword,
  confirmPassword,
  token,
}: ResetPasswordParams) {
  if (!token) {
    return { success: false, message: "Invalid or missing token" };
  }

  if (newPassword !== confirmPassword) {
    return { success: false, message: "Passwords do not match" };
  }

  try {
    const { data, error } = await authClient.resetPassword({
      newPassword,
      token,
    });

    if (error) {
      return {
        success: false,
        message: error.message || "Failed to reset password",
      };
    }

    return { success: true, message: "Password has been reset successfully" };
  } catch (err) {
    console.error(err);
    return { success: false, message: "Something went wrong" };
  }
}
