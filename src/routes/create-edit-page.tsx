import { FormMockInterview } from "@/components/form-mock-interview";
import { db } from "@/config/firebase.config";
import { Interview } from "@/types";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

export const CreateEditPage = () => {
  const { interviewId } = useParams<{ interviewId: string }>();
  const [interview, setInterview] = useState<Interview | null>(null);
  const { isLoaded, userId } = useAuth();

  useEffect(() => {
    const fetchInterview = async () => {
      if (interviewId && isLoaded && userId) {
        try {
          const interviewDoc = await getDoc(doc(db, "interviews", interviewId));
          if (interviewDoc.exists() && interviewDoc.data().userId === userId) {
            setInterview({
              id: interviewDoc.id,
              ...interviewDoc.data(),
            } as Interview);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchInterview();
  }, [interviewId, isLoaded, userId]);

  return (
    <div className="my-4 flex-col w-full">
      <FormMockInterview initialData={interview} />
    </div>
  );
};
