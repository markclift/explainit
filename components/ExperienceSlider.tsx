import { useAppContext } from '../context/AppContext';

const ExperienceSlider = () => {
  const { experienceLevels, selectExperienceLevel, selectedExperienceLevel } = useAppContext();

  return (
    <div className="w-full my-4 flex items-center">
      <p className="text-lg mr-4">And explain it to me as if I was...</p>
      <div className="flex flex-wrap gap-4">
        {experienceLevels.map((level, index) => (
          <button
            key={index}
            className={`px-4 py-2 text-lg rounded shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 ${selectedExperienceLevel === index ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-white border border-gray-300 hover:bg-gray-100'}`}
            onClick={() => selectExperienceLevel(index)}
          >
            {level['level-prompt-text']}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ExperienceSlider;