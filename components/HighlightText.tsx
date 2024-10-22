const HighlightText = ({
  text,
  highlight,
}: {
  text: string;
  highlight: string;
}) => {
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));

  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <strong className='font-bold' key={`text-${index}`}>
            {part}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  );
};

export default HighlightText;
