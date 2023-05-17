import { useAppContext } from '../context/AppContext';

const TopicSelector = () => {
  const { topics, selectTopic, selectedTopicIndex } = useAppContext();

  return (
    <div className="flex flex-row space-x-4 my-4">
      {topics.map((topic, index) => (
        <button
          key={index}
          className={`p-2 rounded ${selectedTopicIndex === index ? 'bg-blue-500 text-white' : 'bg-white border border-gray-300'}`}
          onClick={() => selectTopic(index)}
        >
          {topic}
        </button>
      ))}
    </div>
  );
}

export default TopicSelector;