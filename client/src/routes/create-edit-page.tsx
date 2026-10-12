import { FormMockInterview } from "@/components/form-mock-interview";
import { apiRequest } from "@/lib/api";
import { Interview } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LoaderPage } from "./loader-page";

export const CreateEditPage = () => {
  const { interviewId } = useParams<{ interviewId: string }>(); const [interview, setInterview] = useState<Interview | null>(null); const [loading, setLoading] = useState(Boolean(interviewId));
  useEffect(() => { if (!interviewId) return; apiRequest<Interview>(`/interview/${interviewId}`).then(setInterview).finally(() => setLoading(false)); }, [interviewId]);
  if (loading) return <LoaderPage className="h-[70vh] w-full" />;
  return <div className="my-4 flex-col w-full"><FormMockInterview initialData={interview} /></div>;
};
