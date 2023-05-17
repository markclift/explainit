import { useAppContext } from '../context/AppContext';

const Summary = () => {
  const { summary } = useAppContext();

  return (
    <section className="my-4">
      <p className="text-lg mt-2"dangerouslySetInnerHTML={{ __html: summary }} />
    </section>
  );
}

export default Summary;