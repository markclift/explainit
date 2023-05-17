import React, { useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'; // Import the styles
import { useAppContext } from '../context/AppContext';
import Header from './Header'
import Footer from './Footer'
import Summary from './Summary'
import TopicSelector from './TopicSelector'
import TopicFreeTextEntry from './TopicFreeTextEntry'
import ExperienceSlider from './ExperienceSlider'
import GenerateButton from './GenerateButton'

const App = () => {
    const { topic, isLoading, error } = useAppContext();
    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isLoading && percentage < 100) {
            timer = setTimeout(() => {
                setPercentage((prevPercentage) => prevPercentage + 1);
            }, 220);
        } else {
            setPercentage(0);
        }
        return () => {
            clearTimeout(timer);
        };
    }, [isLoading, percentage]);

    return (
        <div className="flex flex-col min-h-screen relative">
            <Header />
            <main className="flex-grow container mx-auto p-4">
                <h1 className="text-2xl font-bold">Topic: {topic}</h1>
                <Summary />
                <h3 className="text-2xl font-bold">To explain more, choose a sub-topic from the list below or create your own:</h3>
                <TopicSelector />
                <TopicFreeTextEntry />
                <ExperienceSlider />
                <GenerateButton />
                
                {error && <div className="text-red-500">{error}</div>}
            </main>
            <Footer />
            {isLoading && (
                <div className="absolute inset-0 bg-gray-500 bg-opacity-50 z-50 flex items-center justify-center">
                    <div style={{ width: 100, height: 100 }}>
                        <CircularProgressbar value={percentage} text={`${percentage}%`} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default App