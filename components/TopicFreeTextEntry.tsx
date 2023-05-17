import { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';

const TopicFreeTextEntry = () => {
  const { deselectTopics, setCustomTopic, selectedTopicIndex } = useAppContext();
  const [text, setText] = useState('');
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (selectedTopicIndex >= 0) {
      setText('');
    }
  }, [selectedTopicIndex]);

  const handleFocus = () => {
    setIsActive(true);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
    setCustomTopic(event.target.value);
    deselectTopics();
  };

  return (
    <input
      className={`w-full p-2 border-2 ${isActive ? 'input-active' : 'border-gray-300'} rounded my-4 ${text ? 'text-black' : 'text-gray-500'}`}
      value={text}
      placeholder="Or describe your own topic"
      onFocus={handleFocus}
      onChange={handleChange}
      onBlur={() => setIsActive(false)}
    />
  );
}

export default TopicFreeTextEntry;