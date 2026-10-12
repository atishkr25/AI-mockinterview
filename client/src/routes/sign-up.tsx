import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/provider/auth-provider";
import { AuthForm } from "./sign-in";

export const SignUpPage = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const submit = async (event: FormEvent) => {
    event.preventDefault(); setLoading(true); setError("");
    try { await signUp(name, email, password); navigate("/generate", { replace: true }); }
    catch (authError) { setError(authError instanceof Error ? authError.message : "Could not create account."); }
    finally { setLoading(false); }
  };
  return <AuthForm title="Create your account" submitLabel="Create account" name={name} setName={setName} email={email} password={password} error={error} loading={loading} setEmail={setEmail} setPassword={setPassword} onSubmit={submit} footer={<Link to="/signin" className="text-primary">Already have an account</Link>} />;
};
