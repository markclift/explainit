import { useAppContext } from '../context/AppContext';

const GenerateButton = () => {
  const { generate, isGenerateDisabled, isLoading } = useAppContext();

  return (
    <button
      className={`w-full py-3 mt-8 text-lg font-bold text-white rounded shadow-md transition duration-300 ease-in-out transform ${isGenerateDisabled || isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
      onClick={generate}
      disabled={isGenerateDisabled || isLoading}
    >
      {isLoading ? 'Generating...' : 'Generate'}
    </button>
  );
}

export default GenerateButton;