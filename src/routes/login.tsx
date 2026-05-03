import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { Logo } from "@/components/Logo";
import { AuthArt } from "@/components/AuthArt";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login — Bharat Virasat" }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <AuthArt />

      <div className="flex flex-col p-8 md:p-14 justify-center bg-background relative">
        <Link to="/" className="flex items-center gap-2 absolute top-8 left-8">
          <Logo className="h-8 w-8" />
          <span className="font-display font-semibold">Bharat Virasat</span>
        </Link>

        <div className="max-w-sm w-full mx-auto animate-fade-up">
          <h1 className="font-display text-4xl font-bold mb-2">Welcome back.</h1>
          <p className="text-muted-foreground mb-8">Continue your cultural journey.</p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ to: "/" });
            }}
            className="space-y-5"
          >
            <FloatingField
              icon={Mail}
              label="Email"
              type="email"
              value={email}
              onChange={setEmail}
            />
            <FloatingField
              icon={Lock}
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
            />

            <div className="flex justify-between text-sm">
              <label className="flex items-center gap-2 text-muted-foreground">
                <input type="checkbox" className="accent-saffron" />
                Remember me
              </label>
              <button type="button" className="text-saffron-deep font-medium hover:underline">
                Forgot?
              </button>
            </div>

            <button className="w-full py-3 rounded-full text-sm font-semibold text-white saffron-gradient shadow-[var(--shadow-glow-saffron)] hover:scale-[1.02] transition-transform inline-flex items-center justify-center gap-2">
              Login <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="my-6 flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex-1 h-px bg-border" />
            OR CONTINUE WITH
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <SocialButton brand="Google" />
            <button
              type="button"
              className="flex items-center justify-center gap-2 w-full border rounded-xl py-3 hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              Apple
            </button>
          </div>

          <p className="text-sm text-center text-muted-foreground mt-8">
            New here?{" "}
            <Link to="/register" className="text-saffron-deep font-semibold hover:underline">
              Create an account
            </Link>
          </p>
          <div className="mt-4 pt-4 border-t border-gray-100 text-center">
            <a
              href="/admin"
              className="text-sm text-gray-400 hover:text-orange-500 transition-colors"
            >
              🔐 Admin Access
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FloatingField({
  icon: Icon,
  label,
  type,
  value,
  onChange,
}: {
  icon: React.ElementType;
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative group">
      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-saffron-deep transition-colors" />
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder=" "
        className="peer w-full pl-11 pr-4 pt-5 pb-2 rounded-xl border border-border bg-secondary/40 focus:bg-background focus:border-saffron focus:outline-none focus:ring-4 focus:ring-saffron/15 transition-all text-sm"
      />
      <label className="absolute left-11 top-3.5 text-xs text-muted-foreground transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-saffron-deep peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[10px] uppercase tracking-wider font-semibold pointer-events-none">
        {label}
      </label>
    </div>
  );
}

export function SocialButton({ brand }: { brand: "Google" }) {
  return (
    <button
      type="button"
      className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-border hover:bg-secondary transition-colors text-sm font-medium"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4">
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
      </svg>
      {brand}
    </button>
  );
}
