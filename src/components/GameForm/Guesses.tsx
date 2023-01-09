import React, { CSSProperties } from 'react';
import { AutoComplete } from '../../classes';
import { GuessCard } from './GuessCard';

export function Guesses({
  guesses,
  deleteCallback,
  submitDisabled,
}: {
  guesses?: AutoComplete[];
  deleteCallback: () => void;
  submitDisabled: boolean;
}) {
  const [guestArr, setGuestArr] = React.useState<AutoComplete[]>([]);

  React.useEffect(() => {
    let tempArr = [
      { id: undefined, label: undefined, posterPath: undefined },
      { id: undefined, label: undefined, posterPath: undefined },
      { id: undefined, label: undefined, posterPath: undefined },
      { id: undefined, label: undefined, posterPath: undefined },
      { id: undefined, label: undefined, posterPath: undefined },
      { id: undefined, label: undefined, posterPath: undefined },
    ];
    const transformedResults = tempArr.map((element, index) => {
      if (guesses && guesses[index]) {
        return {
          id: guesses[index].id,
          label: guesses[index].label,
          posterPath: guesses[index].posterPath,
        };
      } else {
        return { id: undefined, label: undefined, posterPath: undefined };
      }
    });
    setGuestArr(transformedResults);
  }, [guesses]);

  function calculateIsLast(tempGuess: AutoComplete[], index: number) {
    if (
      tempGuess[index - 1] &&
      tempGuess[index - 1].label &&
      tempGuess[index].label &&
      tempGuess[index + 1] &&
      !tempGuess[index + 1].label
    ) {
      return true;
    } else if (
      !tempGuess[index - 1] &&
      tempGuess[index].label &&
      !tempGuess[index + 1].label
    ) {
      return true;
    } else if (!tempGuess[index + 1] && tempGuess[index].label) {
      return true;
    } else return false;
  }

  return (
    <div style={wrapperStyle}>
      {guestArr &&
        guestArr.map((guess: AutoComplete, index) => {
          return (
            <GuessCard
              key={index}
              name={guess.label}
              posterPath={guess.posterPath}
              deleteCallback={deleteCallback}
              isLast={calculateIsLast(guestArr, index)}
              submitDisabled={submitDisabled}
              id={guess.id}
            />
          );
        })}
    </div>
  );
}

const wrapperStyle: CSSProperties = {
  height: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  flexWrap: 'wrap',
};
