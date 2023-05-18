import { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';

const TopicFreeTextEntry = () => {
  const { deselectTopics, setCustomTopic, isLoading, selectedTopicIndex, isCustomTopicActive, setIsCustomTopicActive } = useAppContext();
  const [text, setText] = useState('');

  useEffect(() => {
    if (selectedTopicIndex >= 0  || !isLoading) {
      setText('');
    }
  }, [selectedTopicIndex, isLoading]);

  const handleFocus = () => {
    setIsCustomTopicActive(true);
    deselectTopics();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setText(value);
    setCustomTopic(value);
  };

  return (
    <input
      className={`w-80 px-4 py-2 text-lg rounded shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 ${isCustomTopicActive ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-white border border-gray-300 hover:bg-gray-100'}`}
      value={text}
      placeholder="Or describe your own topic"
      onFocus={handleFocus}
      onChange={handleChange}
    />
  );
}

export default TopicFreeTextEntry;