import { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import styles from '../styles/Heading.module.css';

const Heading = () => {
    const { topic } = useAppContext();
    const [isFirstUpdate, setFirstUpdate] = useState(false);

    useEffect(() => {
        if (!isFirstUpdate) {
            setFirstUpdate(true);
            return;
        }

        const topicElement = document.querySelector(`.${styles.topicText}`);
        topicElement.classList.add(styles.topicTextFade);

        const timer = setTimeout(() => {
            topicElement.classList.remove(styles.topicTextFade);
        }, 1000);

        return () => clearTimeout(timer);
    }, [topic]);

    if (!topic) {
        return null;
    }

    return (
        <section className={`my-4`}>
            <h1 className="text-2xl font-bold mb-4">Topic: <span className={`bg-blue-200 px-2 rounded ${styles.topicText}`}>{topic}</span></h1>
        </section>
    );
}

export default Heading;