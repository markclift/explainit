import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import Footer from './Footer'
import Summary from './Summary'
import Heading from './Heading'
import TopicSelector from './TopicSelector'
import ExperienceSlider from './ExperienceSlider'
import GenerateButton from './GenerateButton'
import LoadingScreen from './LoadingScreen'
import { useLockBodyScroll } from 'react-use';

const App = () => {
    const { topic, isLoading, error, subtopics, facts, selectedTopicIndex, customTopic } = useAppContext();
    const [currentFactIndex, setCurrentFactIndex] = useState(0);
    const [displayedFact, setDisplayedFact] = useState('');
    const [percentage, setPercentage] = useState(0);
    
    useLockBodyScroll(isLoading);  // Lock body scroll when loading

    useEffect(() => {
        if (isLoading && (subtopics[selectedTopicIndex] || customTopic)) {
            // Initialize with the first fact
            setCurrentFactIndex(0);
            setDisplayedFact(facts[0]);
        }
    }, [isLoading, selectedTopicIndex, subtopics, customTopic]);
    

    useEffect(() => {
        let factTimer = null;
        if (isLoading) {
            factTimer = setInterval(() => {
                setCurrentFactIndex((prevIndex) => {
                    const newIndex = (prevIndex + 1) % facts.length;
                    setDisplayedFact(facts[newIndex]);
                    return newIndex;
                });
            }, 7000); // Change fact every 7 seconds
        }

        return () => {
            if (factTimer) {
                clearInterval(factTimer);
            }
        };
    }, [isLoading, selectedTopicIndex, subtopics]);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isLoading && percentage < 100) {
            timer = setTimeout(() => {
                setPercentage((prevPercentage) => prevPercentage + 1);
            }, 210); // 21 seconds for the timer to reach 100%
        } else {
            setPercentage(0);
        }
        return () => {
            clearTimeout(timer);
        };
    }, [isLoading, percentage]);

    useEffect(() => {
        if (isLoading) {
            window.scrollTo(0, 0);
        }
    }, [isLoading]);

    const subtopic = selectedTopicIndex >= 0 ? subtopics[selectedTopicIndex] : customTopic;

    return (
        <div className="flex flex-col min-h-screen relative px-8">
            <main className="flex-grow container mx-auto py-6">
                <Heading />
                <Summary />
                <p className="text-lg mt-2">To dive deeper, choose a sub-topic from the list below or create your own:</p>
                <TopicSelector />
                <hr />
                <ExperienceSlider />
                <GenerateButton />
                {error && <div className="text-red-500">{error}</div>}
            </main>
            <Footer />
            {isLoading && (
                <LoadingScreen
                    percentage={percentage}
                    displayedFact={displayedFact}
                    subtopic={subtopic}
                    currentFactIndex={currentFactIndex}
                />
            )}
        </div>
    )

}

export default App