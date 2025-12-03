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
