# OpenAI GPT Summary and Topics Generator

This project uses OpenAI's gpt-3.5-turbo model to generate a summary and mutually exclusive and collectively exhaustive sub-topics for a given topic. The application is built using Next.js, TypeScript, and Tailwind CSS.

This entire project, including this Readme file, was generated using Chat-GPT.

## Features

- User can input a topic for which they want a summary and sub-topics.
- User can select their experience level, which tailors the summary and sub-topics to their understanding.
- Provides a loading state during the API call to OpenAI, preventing any interaction.
- Error handling to catch and display any errors during the API call.

## Project Structure

- `src/components`: Contains all the React components used in this application.
- `src/context`: Contains the global state management logic using the Context API and React hooks.
- `src/api.ts`: Contains the function to make the API call to OpenAI.
- `src/data.json`: Contains the initial data used in the application, including the prompt for OpenAI.

## Setup Instructions

1. Clone the repository: `git clone https://github.com/yourusername/yourrepository.git`

2. Install the dependencies: `npm install`

3. Create a `.env` file at the root of your project and add your OpenAI API key: `OPENAI_API_KEY=your_api_key_here`

4. Start the development server: `npm start`

5. Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

## Future Improvements

- A clean and modern UI
- Add unit tests for the components and API calls.

Please feel free to contribute to this project by submitting a pull request!

## License

This project is licensed under the terms of the MIT license.