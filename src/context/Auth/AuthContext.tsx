import { createContext, ReactNode, useEffect, useState } from "react";
import { IAuthContextType, User } from "../interfaces/IAuth";
import { useRouter } from "next/router";

export const AuthContent = createContext<IAuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  const logout = () => {
    setUser(null);
    router.push("/login");
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if(storedUser) {
      const userParsed = JSON.parse(storedUser)
      setUser(userParsed)
    }
  }, [])

  return (
    <AuthContent.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContent.Provider>
  );
}