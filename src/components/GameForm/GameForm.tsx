import React from 'react';
import { AutoComplete, TMDBActor } from '../../classes';
import { actors } from '../../constants';
import { ActorCard } from './ActorCard';
import { Guesses } from './Guesses';
import { MovieField } from './MovieField';

export function GameForm() {
  const [firstActor, setFirstActor] = React.useState<TMDBActor>();
  const [secondActor, setSecondActor] = React.useState<TMDBActor>();
  const [guesses, setGuesses] = React.useState<AutoComplete[]>();

  React.useEffect(() => {
    const firstRand = Math.floor(Math.random() * actors.length);
    let secondRand = Math.floor(Math.random() * actors.length);
    while (firstRand === secondRand) {
      secondRand = Math.floor(Math.random() * actors.length);
    }
    setFirstActor(actors[firstRand]);
    setSecondActor(actors[secondRand]);
  }, []);

  return (
    <div>
      <div style={actorsStyle}>
        <ActorCard to={false} name={firstActor?.name} id={firstActor?.id} />
        <ActorCard to={true} name={secondActor?.name} id={secondActor?.id} />
      </div>
      <MovieField callback={handleCallback} />
      <Guesses guesses={guesses}/>
    </div>
  );

  function handleCallback(value: AutoComplete) {
    let tempResult = guesses ? [...guesses] : [];
    tempResult.push(value);
    setGuesses(tempResult);
  }
}

const actorsStyle = {
  display: 'flex',
  justifyContent: 'center',
};
