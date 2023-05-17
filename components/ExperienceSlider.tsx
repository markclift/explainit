import { useAppContext } from '../context/AppContext';

const ExperienceSlider = () => {
  const { experienceLevels, selectExperienceLevel, selectedExperienceLevel } = useAppContext();

  return (
    <div className="w-full my-4">
      <p className="text-2xl font-bold">Explain it to me as if I was...</p>
      <div className="flex">
        {experienceLevels.map((level, index) => (
          <button
            key={index}
            className={`p-2 rounded ${selectedExperienceLevel === index ? 'bg-blue-500 text-white' : 'bg-white border border-gray-300'}`}
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
