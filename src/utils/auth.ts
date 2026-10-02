export const validEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
export const validPassword = (value: string) => value.length >= 8;
export type SignUpValues = {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};
export function validateSignUp(v: SignUpValues) {
  const errors: Partial<Record<keyof SignUpValues, string>> = {};
  if (v.name.trim().length < 2) errors.name = "Enter your full name.";
  if (!/^[a-zA-Z0-9_]{3,20}$/.test(v.username))
    errors.username = "Use 3–20 letters, numbers, or underscores.";
  if (!validEmail(v.email)) errors.email = "Enter a valid email address.";
  if (!validPassword(v.password))
    errors.password = "Use at least 8 characters.";
  if (v.confirmPassword !== v.password)
    errors.confirmPassword = "Passwords must match.";
  return errors;
}
