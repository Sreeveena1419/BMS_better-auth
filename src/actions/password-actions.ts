"use server";

import { auth } from "@/lib/auth";
import z from "zod";

export const resetPasswordSchema = z.object({
  newPassword: z.string().min(6),
  confirmPassword: z.string().min(6),
});

export async function resetPassword(data: z.infer<typeof resetPasswordSchema>) {
  const parsed = resetPasswordSchema.parse(data);

  if (parsed.newPassword !== parsed.confirmPassword) {
    return { success: false, message: "Passwords do not match" };
  }

  try {
    await auth.api.changePassword({
      body: {
        newPassword: parsed.newPassword,
        currentPassword: "",
        revokeOtherSessions: false,
      },
    });

    return { success: true, message: "Password changed successfully" };
  } catch (error) {
    console.error("Password reset error:", error);
    return { success: false, message: "Error resetting password" };
  }
}
