import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { User, Mail, Lock, ArrowRight, Check } from "lucide-react";
import { Logo } from "@/components/Logo";
import { AuthArt } from "@/components/AuthArt";
import { FloatingField, SocialButton } from "@/routes/login";
import { STATE_LIST } from "@/data/states";
import { StateCardImage } from "@/components/StateCardImage";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Register — Bharat Virasat" }] }),
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [followed, setFollowed] = useState<Set<string>>(new Set());
  const [error, setError] = useState("");

  const toggleFollow = (id: string) => {
    setFollowed((prev) => {
      const n = new Set(prev);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  };

  const handleContinue = () => {
    if (!name.trim()) {
      setError("Please enter your full name");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setError("");
    setStep(1);
  };

  const handlePreferencesContinue = () => {
    if (followed.size === 0) {
      setError("Please select at least one preference");
      return;
    }
    setError("");
    setStep(2);
  };

  const STEPS = ["Account", "Preferences", "Done"];

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <AuthArt />

      <div className="flex flex-col p-8 md:p-14 justify-center bg-background relative">
        <Link to="/" className="flex items-center gap-2 absolute top-8 left-8">
          <Logo className="h-8 w-8" />
          <span className="font-display font-semibold">Bharat Virasat</span>
        </Link>

        <div className="max-w-md w-full mx-auto">
          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-8">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    i < step
                      ? "saffron-gradient text-white"
                      : i === step
                        ? "saffron-gradient text-white shadow-[var(--shadow-glow-saffron)]"
                        : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
                </div>
                <span
                  className={`text-xs font-semibold uppercase tracking-wider ${i <= step ? "text-foreground" : "text-muted-foreground"}`}
                >
                  {s}
                </span>
                {i < STEPS.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 rounded-full ${i < step ? "saffron-gradient" : "bg-border"}`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="overflow-hidden">
            {step === 0 && (
              <div className="animate-fade-up">
                <h1 className="font-display text-3xl font-bold mb-2">Create your account</h1>
                <p className="text-muted-foreground mb-6 text-sm">
                  A passport to India's heritage.
                </p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleContinue();
                  }}
                  className="space-y-4"
                >
                  <FloatingField
                    icon={User}
                    label="Full name"
                    type="text"
                    value={name}
                    onChange={setName}
                  />
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
                  {error && <p className="text-sm font-medium text-red-500">{error}</p>}
                  <button className="w-full py-3 rounded-full text-sm font-semibold text-white saffron-gradient shadow-[var(--shadow-glow-saffron)] hover:scale-[1.02] transition-transform inline-flex items-center justify-center gap-2">
                    Continue <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
                <div className="my-5 flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex-1 h-px bg-border" /> OR{" "}
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
              </div>
            )}

            {step === 1 && (
              <div className="animate-fade-up">
                <h1 className="font-display text-3xl font-bold mb-2">Pick your interests</h1>
                <p className="text-muted-foreground mb-6 text-sm">
                  Follow states whose stories you'd like to hear first.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                  {STATE_LIST.map((s) => {
                    const on = followed.has(s.id);
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => toggleFollow(s.id)}
                        className={`relative h-24 rounded-xl overflow-hidden text-left transition-all ${on ? "ring-2 ring-saffron-deep ring-offset-2" : "hover:scale-105"}`}
                      >
                        <StateCardImage
                          src={s.image}
                          alt={s.name}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-2 left-2 right-2 text-white">
                          <div className="text-sm font-bold">{s.name}</div>
                        </div>
                        {on && (
                          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white flex items-center justify-center">
                            <Check className="h-3.5 w-3.5 text-saffron-deep" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
                {error && <p className="mb-4 text-sm font-medium text-red-500">{error}</p>}
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setError("");
                      setStep(0);
                    }}
                    className="px-5 py-3 rounded-full text-sm font-semibold border border-border"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePreferencesContinue}
                    className="flex-1 py-3 rounded-full text-sm font-semibold text-white saffron-gradient inline-flex items-center justify-center gap-2"
                  >
                    Continue <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="animate-fade-up text-center">
                <div className="mx-auto w-20 h-20 rounded-full saffron-gradient flex items-center justify-center mb-6 shadow-[var(--shadow-glow-saffron)] animate-scale-in">
                  <Check className="h-10 w-10 text-white" />
                </div>
                <h1 className="font-display text-3xl font-bold mb-2">
                  स्वागतम्, {name || "friend"}!
                </h1>
                <p className="text-muted-foreground mb-8">
                  Your journey through India's heritage begins now.
                </p>
                <button
                  onClick={() => navigate({ to: "/map" })}
                  className="px-7 py-3 rounded-full text-sm font-semibold text-white saffron-gradient shadow-[var(--shadow-glow-saffron)] inline-flex items-center gap-2"
                >
                  Explore the map <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          {step !== 2 && (
            <p className="text-sm text-center text-muted-foreground mt-6">
              Already have an account?{" "}
              <Link to="/login" className="text-saffron-deep font-semibold hover:underline">
                Login
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
