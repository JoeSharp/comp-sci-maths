import { NextPage } from "next";
import { LoremIpsum } from "lorem-ipsum";

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

interface Props {
  longText: string;
}

const LoremTest: NextPage<Props> = ({ longText }) => {
  return (
    <div>
      <h1>Lorem Ipsum Page</h1>
      <p>{longText}</p>
    </div>
  );
};

// This gets called on every request
export async function getStaticProps() {
  // Fetch data from external API
  const longText = lorem.generateParagraphs(7);

  // Pass data to the page via props
  return { props: { longText } };
}

export default LoremTest;
