interface SignUpData {
  email: string;
  password: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  marketingConsent: boolean;
  dataShareConsent: boolean;
}

interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

export async function signUp(data: SignUpData): Promise<AuthResponse> {
  console.log("Attempting to sign up user:", {
    email: data.email,
    name: data.name,
  });

  try {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error("Sign up failed:", responseData);
      throw new Error(responseData.message || "Failed to sign up");
    }

    console.log("Sign up successful:", { userId: responseData.user.id });
    return responseData;
  } catch (error) {
    console.error("Sign up error:", error);
    throw error;
  }
}

export async function login(
  email: string,
  password: string
): Promise<AuthResponse> {
  console.log("Attempting to login user:", { email });

  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error("Login failed:", responseData);
      throw new Error(responseData.message || "Failed to login");
    }

    console.log("Login successful:", { userId: responseData.user.id });
    return responseData;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

// Token management
export function setToken(token: string): void {
  localStorage.setItem("token", token);
}

export function getToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
}

export function removeToken(): void {
  localStorage.removeItem("token");
}

// Auth state management
export function isAuthenticated(): boolean {
  return !!getToken();
}
