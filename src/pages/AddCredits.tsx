
import Header from "@/components/Header";
import AddCreditsForm from "@/components/AddCreditsForm";

const AddCredits = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Add Credits to Your Account</h1>
          <p className="text-gray-600 mt-2 max-w-xl mx-auto">
            Purchase credits to use across multiple AI models. Credits never expire and can be used at your own pace.
          </p>
        </div>
        
        <AddCreditsForm />
      </main>
    </div>
  );
};

export default AddCredits;
