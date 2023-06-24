import { createContext, useContext, useState, useEffect } from 'react';
import generateSummaryAndTopics from '../services/api';
import initialData from '../data.json';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
    const [summary, setSummary] = useState(initialData['initial-summary']);
    const [topic, setTopic] = useState(initialData['initial-topic']);
    const [subtopics, setSubTopics] = useState(initialData['initial-subtopics']);
    const [facts, setFacts] = useState(initialData['initial-facts']);
    const [selectedTopicIndex, setSelectedTopicIndex] = useState(-1);
    const [customTopic, setCustomTopicText] = useState('');
    const [experienceLevels, setExperienceLevels] = useState(initialData['experience-levels']);
    const [selectedExperienceLevel, setSelectedExperienceLevel] = useState(2);
    const [isGenerateDisabled, setIsGenerateDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isCustomTopicActive, setIsCustomTopicActive] = useState(false);

    useEffect(() => {
        setIsGenerateDisabled(
            selectedTopicIndex === -1 && customTopic.trim() === ''
        );
    }, [selectedTopicIndex, customTopic]);

    const selectTopic = (index: number) => {
        setSelectedTopicIndex(index);
        setCustomTopic(''); // Clear the custom topic when a checkbox group option is selected
        setIsCustomTopicActive(false);
    }

    const deselectTopics = () => {
        setSelectedTopicIndex(-1);
    }

    const setCustomTopic = (topic: string) => {
        setCustomTopicText(topic);
        setIsGenerateDisabled(topic.trim() === '');
        setIsCustomTopicActive(topic.trim() !== '');
    };

    const selectExperienceLevel = (index: number) => {
        setSelectedExperienceLevel(index);
    }

    const generate = async () => {
        setIsLoading(true); // Set loading to true before sending request
        setError(null);

        const subtopic = selectedTopicIndex >= 0 ? subtopics[selectedTopicIndex] : customTopic;
        const experience = experienceLevels[selectedExperienceLevel]['level-prompt-text'];

        try {
            const result = await generateSummaryAndTopics(subtopic, experience);

            setTopic(result.topic);
            setSummary(result.summary);
            setSubTopics(result.subtopics);
            setFacts(result.facts);
            setSelectedTopicIndex(-1); // Deselect the topics
            setCustomTopic(''); // Clear the custom topic text
        } catch (error) {
            setError(error.message); // set error state if there's an error
        } finally {
            setIsLoading(false);
            setCustomTopic(''); // Clear the custom topic text
        }

    }

    return (
        <AppContext.Provider value={{ summary, topic, subtopics, facts, selectTopic, selectedTopicIndex, customTopic, setCustomTopic, deselectTopics, experienceLevels, selectedExperienceLevel, selectExperienceLevel, generate, isGenerateDisabled, isLoading, isCustomTopicActive, setIsCustomTopicActive }}>
            {children}
        </AppContext.Provider>
    );
}

export const useAppContext = () => useContext(AppContext);