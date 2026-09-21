 
import { db } from "@/config/firebase.config";
import { Interview } from "@/types";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LoaderPage } from "./loader-page";
import { CustomBreadCrumb } from "@/components/custom-bread-crumb";
import { Button } from "@/components/ui/button";
import { Lightbulb, Sparkles, WebcamIcon } from "lucide-react";
import { InterviewPin } from "@/components/pin";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import WebCam from "react-webcam";

export const MockLoadPage = () => {
  const { interviewId } = useParams<{ interviewId: string }>();
  const [interview, setInterview] = useState<Interview | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isWebCamEnabled, setIsWebCamEnabled] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    const fetchInterview = async () => {
      if (interviewId) {
        try {
          const interviewDoc = await getDoc(doc(db, "interviews", interviewId));
          if (interviewDoc.exists()) {
            setInterview({
              id: interviewDoc.id,
              ...interviewDoc.data(),
            } as Interview);
          }
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchInterview();
  }, [interviewId]);

  useEffect(() => {
    if (!isLoading && !interviewId) {
      navigate("/generate", { replace: true });
    }
  }, [isLoading, interviewId, navigate]);

  if (isLoading) {
    return <LoaderPage className="w-full h-[70vh]" />;
  }

  if (!interview) {
    return null;
  }

  return (
    <div className="flex flex-col w-full gap-6 py-5">
      <div className="flex items-center justify-between w-full gap-2">
        <CustomBreadCrumb
          breadCrumbPage={interview?.position || ""}
          breadCrumpItems={[{ label: "My Interviews", link: "/generate" }]}
        />
        <Link to={`/generate/interview/${interviewId}/start`}>
          <Button size={"sm"} className="rounded-full px-6">
            Start <Sparkles className="ml-2 w-4 h-4" />
          </Button>
        </Link>
      </div>

      {interview && <InterviewPin interview={interview} onMockPage />}

      <Alert className="bg-amber-50 border-amber-200 rounded-2xl p-5 flex items-start gap-3">
        <Lightbulb className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <AlertTitle className="text-amber-800 font-semibold">Before You Begin</AlertTitle>
          <AlertDescription className="text-sm text-amber-700 mt-1 leading-relaxed">
            Enable your webcam and microphone to start the Lindy AI session. You'll answer 5 questions and receive a personalized feedback report.
            <br /><br />
            <span className="font-medium">Note:</span> Your video is <strong>never recorded</strong>.
          </AlertDescription>
        </div>
      </Alert>

      <div className="flex flex-col items-center gap-4">
        <div className="w-full max-w-md h-[380px] flex flex-col items-center justify-center border border-gray-100 bg-white/80 backdrop-blur-sm shadow-[0_8px_30px_rgba(0,0,0,0.06)] rounded-3xl p-4">
          {isWebCamEnabled ? (
            <WebCam
              onUserMedia={() => setIsWebCamEnabled(true)}
              onUserMediaError={() => setIsWebCamEnabled(false)}
              className="w-full h-full object-cover rounded-2xl"
            />
          ) : (
            <div className="flex flex-col items-center gap-4 text-gray-400">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                <WebcamIcon className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-sm">Webcam is off</p>
            </div>
          )}
        </div>
        <Button
          onClick={() => setIsWebCamEnabled(!isWebCamEnabled)}
          variant={isWebCamEnabled ? "outline" : "default"}
          className="rounded-full px-8"
        >
          {isWebCamEnabled ? "Disable Webcam" : "Enable Webcam"}
        </Button>
      </div>
    </div>
  );
};
