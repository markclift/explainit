import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'; // Import the styles

interface LoadingScreenProps {
  percentage: number;
  displayedFact: string;
  subtopic: string;
  currentFactIndex: number;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ percentage, displayedFact, subtopic, currentFactIndex }) => (
  <div className="absolute inset-0 bg-gray-500 bg-opacity-50 z-50 flex items-center justify-center">
    <div className="bg-white p-4 rounded shadow-md flex flex-col items-center space-y-4 w-3/4 md:w-1/2 lg:w-1/3"> {/* set fixed width here */}
      <h2 className="text-2xl font-bold text-center">Summarizing {subtopic}...</h2> {/* increase title size */}
      <div className="flex items-center space-x-4">
        <div style={{ width: 100, height: 100 }}> {/* decrease CircularProgress size */}
          <CircularProgressbar value={percentage} text={`${percentage}%`} />
        </div>
        <div key={currentFactIndex} className="text-xl text-center transition-opacity duration-7000 ease-in-out animate-fadeInOut">
          <p className="overflow-ellipsis overflow-hidden max-h-[3.6rem]">{displayedFact}</p>
        </div>
      </div>
    </div>
  </div>
);

export default LoadingScreen;