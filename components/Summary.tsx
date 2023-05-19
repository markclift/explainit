import { useEffect, useRef, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import styles from '../styles/Summary.module.css';

const Summary = () => {
  const { summary } = useAppContext();
  const isFirstRender = useRef(true);
  const [isDataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (summary) {
      setDataLoaded(true);
    }

    if (isDataLoaded && !isFirstRender.current) {
      const summaryElement = document.querySelector(`.${styles.summaryText}`);
      summaryElement.classList.add(styles.summaryTextFade);

      const timer = setTimeout(() => {
        summaryElement.classList.remove(styles.summaryTextFade);
      }, 1000);

      return () => clearTimeout(timer);
    }

    if (isDataLoaded) {
      isFirstRender.current = false;
    }

  }, [summary, isDataLoaded]);

  if (!isDataLoaded) {
    return null;
  }

  return (
    <section className={`my-4 ${styles.summaryText}`}>
      <p className="text-lg mt-2" dangerouslySetInnerHTML={{ __html: summary }} />
    </section>
  );
}

export default Summary;