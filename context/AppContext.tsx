import { createContext, useContext, useState, useEffect } from 'react';
import generateSummaryAndTopics from '../services/api';
import initialData from '../data.json';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
    const [summary, setSummary] = useState(initialData['initial-summary']);
    const [topic, setTopic] = useState('Everything!');
    const [topics, setTopics] = useState(initialData['initial-topics']);
    const [selectedTopicIndex, setSelectedTopicIndex] = useState(-1);
    const [customTopic, setCustomTopicText] = useState('');
    const [experienceLevels, setExperienceLevels] = useState(initialData['experience-levels']);
    const [selectedExperienceLevel, setSelectedExperienceLevel] = useState(2);
    const [isGenerateDisabled, setIsGenerateDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsGenerateDisabled(
          selectedTopicIndex === -1 && customTopic.trim() === ''
        );
      }, [selectedTopicIndex, customTopic]);

    const selectTopic = (index: number) => {
        setSelectedTopicIndex(index);
        setCustomTopic(''); // Clear the custom topic when a checkbox group option is selected
    }

    const deselectTopics = () => {
        setSelectedTopicIndex(-1);
    }

    const setCustomTopic = (topic: string) => {
        setCustomTopicText(topic);
        setIsGenerateDisabled(topic.trim() === ''); // disable generate if the custom topic is empty
    };

    const selectExperienceLevel = (index: number) => {
        setSelectedExperienceLevel(index);
    }

    const generate = async () => {
        setIsLoading(true); // Set loading to true before sending request
        setError(null);

        const topic = selectedTopicIndex >= 0 ? topics[selectedTopicIndex] : customTopic;
        const experience = experienceLevels[selectedExperienceLevel]['level-prompt-text'];

        try {
            const result = await generateSummaryAndTopics(topic, experience);

            setTopic(result.topic);
            setSummary(result.summary);
            setTopics(result['sub-topics']);
            setSelectedTopicIndex(-1); // Deselect the topics
            setCustomTopic(''); // Clear the custom topic text
        } catch (error) {
            setError(error.message); // set error state if there's an error
        } finally {
            setIsLoading(false);
        }

    }

    return (
        <AppContext.Provider value={{ summary, topic, topics, selectTopic, selectedTopicIndex, customTopic, setCustomTopic, deselectTopics, experienceLevels, selectedExperienceLevel, selectExperienceLevel, generate, isGenerateDisabled, isLoading }}>
            {children}
        </AppContext.Provider>
    );
}

export const useAppContext = () => useContext(AppContext);