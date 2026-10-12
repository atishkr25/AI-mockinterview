import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/provider/auth-provider";

export const SignInPage = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signIn(email, password);
      navigate("/generate", { replace: true });
    } catch (authError) {
      setError(authError instanceof Error ? authError.message : "Could not sign in.");
    } finally {
      setLoading(false);
    }
  };

  return <AuthForm title="Welcome back" submitLabel="Sign in" email={email} password={password} error={error} loading={loading} setEmail={setEmail} setPassword={setPassword} onSubmit={submit} footer={<Link to="/signup" className="text-primary">Create an account</Link>} />;
};

interface AuthFormProps { title: string; submitLabel: string; name?: string; setName?: (value: string) => void; email: string; password: string; error: string; loading: boolean; setEmail: (value: string) => void; setPassword: (value: string) => void; onSubmit: (event: FormEvent) => void; footer: React.ReactNode; }
export const AuthForm = ({ title, submitLabel, name, setName, email, password, error, loading, setEmail, setPassword, onSubmit, footer }: AuthFormProps) => <form onSubmit={onSubmit} className="w-full max-w-md space-y-5 rounded-3xl bg-white p-8 shadow-xl">
  <div><h1 className="text-2xl font-semibold text-navy">{title}</h1><p className="mt-2 text-sm text-gray-500">Practice with feedback that helps you improve.</p></div>
  {error && <p className="text-sm text-red-600">{error}</p>}
  {setName && <Input required placeholder="Name" value={name || ""} onChange={(event) => setName(event.target.value)} />}
  <Input required type="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
  <Input required minLength={6} type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
  <Button className="w-full" disabled={loading}>{loading ? "Signing in..." : submitLabel}</Button>
  <p className="text-center text-sm text-gray-500">{footer}</p>
</form>;
