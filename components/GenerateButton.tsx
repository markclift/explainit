import { useAppContext } from '../context/AppContext';

const GenerateButton = () => {
  const { generate, isGenerateDisabled, isLoading } = useAppContext();

  return (
    <button
      className={`w-full py-2 mt-4 font-bold text-white rounded ${isGenerateDisabled || isLoading ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-500 hover:bg-green-700'}`}
      onClick={generate}
      disabled={isGenerateDisabled || isLoading}
    >
      {isLoading ? 'Generating...' : 'Generate'}
    </button>
  );
}

export default GenerateButton;