import { AutoComplete } from '../../classes';

export function Guesses({ guesses }: { guesses?: AutoComplete[] }) {
  return (
    <div>
      {guesses && guesses.map((guess: AutoComplete) => {
        return <div>{guess.label}</div>;
      })}
    </div>
  );
}
