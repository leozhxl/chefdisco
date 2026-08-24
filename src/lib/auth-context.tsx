"use client";

// ---------------------------------------------------------------------------
// AUTENTICAÇÃO SIMULADA (PLACEHOLDER)
// ---------------------------------------------------------------------------
// Este contexto simula login/cadastro usando apenas localStorage, SEM
// nenhuma segurança real (sem hashing de senha, sem sessão de servidor,
// sem proteção contra XSS/CSRF). É apenas para fins de demonstração de UI.
//
// ANTES DE IR PARA PRODUÇÃO, substitua por um provedor de autenticação real
// como NextAuth.js, Clerk ou Auth0, com sessões seguras no servidor.
// ---------------------------------------------------------------------------

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export interface StoredUser {
  name: string;
  email: string;
  // Senha armazenada em texto puro apenas para fins de protótipo.
  // NUNCA faça isso em produção.
  password: string;
}

interface AuthContextValue {
  user: Omit<StoredUser, "password"> | null;
  login: (email: string, password: string) => { success: boolean; error?: string };
  register: (name: string, email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const USERS_KEY = "chef-do-disco:users";
const SESSION_KEY = "chef-do-disco:session";

function readUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Omit<StoredUser, "password"> | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from localStorage on mount
      if (raw) setUser(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  const login: AuthContextValue["login"] = (email, password) => {
    const users = readUsers();
    const found = users.find((u) => u.email === email);
    if (!found) return { success: false, error: "E-mail não encontrado." };
    if (found.password !== password) return { success: false, error: "Senha incorreta." };
    const session = { name: found.name, email: found.email };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
    return { success: true };
  };

  const register: AuthContextValue["register"] = (name, email, password) => {
    const users = readUsers();
    if (users.some((u) => u.email === email)) {
      return { success: false, error: "Já existe uma conta com este e-mail." };
    }
    const newUser: StoredUser = { name, email, password };
    localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));
    const session = { name, email };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  return ctx;
}
