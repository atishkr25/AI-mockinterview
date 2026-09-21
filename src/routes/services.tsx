export const Services = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-12 text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Our Services</h1>
      <p className="text-lg text-gray-600 max-w-2xl mb-12">
        We offer a variety of features to help you succeed in your career journey.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
        <div className="p-6 border rounded-lg shadow-sm bg-white">
          <h3 className="text-xl font-semibold mb-2">Lindy AI Interviews</h3>
          <p className="text-sm text-gray-600">Tailored technical questions generated based on your exact job description, tech stack, and experience level.</p>
        </div>
        <div className="p-6 border rounded-lg shadow-sm bg-white">
          <h3 className="text-xl font-semibold mb-2">Instant Feedback</h3>
          <p className="text-sm text-gray-600">Get an immediate 1-10 rating on your answers and actionable advice on how to improve your responses.</p>
        </div>
        <div className="p-6 border rounded-lg shadow-sm bg-white">
          <h3 className="text-xl font-semibold mb-2">Voice & Text Options</h3>
          <p className="text-sm text-gray-600">Practice your verbal delivery with our built-in speech-to-text, or refine your thoughts using our manual entry mode.</p>
        </div>
      </div>
    </div>
  );
};
