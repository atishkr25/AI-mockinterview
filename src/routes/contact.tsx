export const ContactUs = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
      <p className="text-lg text-gray-600 max-w-xl mb-8">
        Have questions, feedback, or need support? We'd love to hear from you.
      </p>
      <div className="bg-white p-6 rounded-lg shadow-sm border w-full max-w-md">
        <p className="text-sm font-semibold text-gray-800">Email:</p>
        <p className="text-sm text-gray-600 mb-4">support@lindy.ai</p>
        <p className="text-sm font-semibold text-gray-800">Address:</p>
        <p className="text-sm text-gray-600">123 Tech Lane, Innovation City</p>
      </div>
    </div>
  );
};
