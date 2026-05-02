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

  const toggleFollow = (id: string) => {
    setFollowed((prev) => {
      const n = new Set(prev);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
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
                    setStep(1);
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
                  <SocialButton brand="GitHub" />
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
                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(0)}
                    className="px-5 py-3 rounded-full text-sm font-semibold border border-border"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(2)}
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
