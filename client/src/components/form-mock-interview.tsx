import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomBreadCrumb } from "./custom-bread-crumb";
import { Headings } from "./headings";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { apiRequest } from "@/lib/api";
import { Interview } from "@/types";

export const FormMockInterview = ({ initialData }: { initialData: Interview | null }) => {
  const navigate = useNavigate();
  const [role, setRole] = useState(initialData?.role || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [experience, setExperience] = useState(String(initialData?.experience || ""));
  const [techStack, setTechStack] = useState(initialData?.techStack.join(", ") || "");
  const [resume, setResume] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault(); setLoading(true); setError("");
    try {
      const form = new FormData(); form.append("role", role); form.append("description", description); form.append("experience", experience); form.append("techStack", techStack);
      if (resume) form.append("resume", resume);
      await apiRequest("/interview", { method: "POST", body: form });
      navigate("/generate", { replace: true });
    } catch (requestError) { setError(requestError instanceof Error ? requestError.message : "Could not create interview."); }
    finally { setLoading(false); }
  };
  return <div className="w-full space-y-4"><CustomBreadCrumb breadCrumbPage={initialData ? initialData.role : "Create"} breadCrumpItems={[{ label: "Mock Interviews", link: "/generate" }]} /><Headings title={initialData ? initialData.role : "Create a new mock interview"} isSubHeading /><form onSubmit={submit} className="space-y-6 rounded-lg p-8 shadow-md"><Input required maxLength={120} placeholder="Job role" value={role} onChange={(event) => setRole(event.target.value)} /><Textarea required minLength={10} placeholder="Job description" value={description} onChange={(event) => setDescription(event.target.value)} /><Input required min={0} type="number" placeholder="Years of experience" value={experience} onChange={(event) => setExperience(event.target.value)} /><Textarea required placeholder="Tech stack, comma separated" value={techStack} onChange={(event) => setTechStack(event.target.value)} /><Input type="file" accept="application/pdf,.pdf" onChange={(event) => setResume(event.target.files?.[0] || null)} />{error && <p className="text-sm text-red-600">{error}</p>}<Button disabled={loading}>{loading ? "Generating questions..." : "Create interview"}</Button></form></div>;
};
