import { useAppContext } from '../context/AppContext';
import TopicFreeTextEntry from './TopicFreeTextEntry'

const TopicSelector = () => {
  const { topics, selectTopic, selectedTopicIndex } = useAppContext();

  return (
    <div className="flex flex-wrap gap-4 my-4">
      {topics.map((topic, index) => (
        <button
          key={index}
          className={`px-4 py-2 text-lg rounded shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 ${selectedTopicIndex === index ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-white border border-gray-300 hover:bg-gray-100'}`}
          onClick={() => selectTopic(index)}
        >
          {topic}
        </button>
      ))}
      <TopicFreeTextEntry />
    </div>
  );
}

export default TopicSelector;