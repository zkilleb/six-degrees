import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { AutoComplete, TMDBActor } from '../../classes';
import { modernActors, classicActors } from '../../constants';
import { ActorCard } from './ActorCard';
import { Guesses } from './Guesses';
import { MovieField } from './MovieField';
import { Submit } from './Submit';

export function GameForm() {
  const [firstActor, setFirstActor] = React.useState<TMDBActor>();
  const [secondActor, setSecondActor] = React.useState<TMDBActor>();
  const [guesses, setGuesses] = React.useState<AutoComplete[]>();
  const [submitDisabled, setSubmitDisabled] = React.useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();

  React.useEffect(() => {
    const combinedArr = [...classicActors, ...modernActors];
    if (
      searchParams.get('firstActor') &&
      searchParams.get('secondActor') &&
      combinedArr.find(
        (actor) => actor.name === searchParams.get('firstActor'),
      ) &&
      combinedArr.find(
        (actor) => actor.name === searchParams.get('secondActor'),
      )
    ) {
      setFirstActor(
        combinedArr.find(
          (actor) => actor.name === searchParams.get('firstActor'),
        ),
      );
      setSecondActor(
        combinedArr.find(
          (actor) => actor.name === searchParams.get('secondActor'),
        ),
      );
    } else {
      setSearchParams(undefined);
      const saved = localStorage.getItem('era');
      const baconMode = localStorage.getItem('baconMode');
      let tempActorArr: TMDBActor[] = [];
      if (saved && saved === 'classic') {
        tempActorArr = [...classicActors];
      } else if (saved && saved === 'both') {
        tempActorArr = [...combinedArr];
      } else if (!saved || saved === 'modern') {
        tempActorArr = [...modernActors];
      }
      let firstRand = Math.floor(Math.random() * tempActorArr.length);
      let secondRand = Math.floor(Math.random() * tempActorArr.length);
      while (
        baconMode === 'true' &&
        tempActorArr[firstRand].name === 'Kevin Bacon'
      ) {
        firstRand = Math.floor(Math.random() * tempActorArr.length);
      }
      while (firstRand === secondRand) {
        secondRand = Math.floor(Math.random() * tempActorArr.length);
      }
      setFirstActor(tempActorArr[firstRand]);
      setSecondActor(
        baconMode === 'true'
          ? modernActors.find((actor) => actor.name === 'Kevin Bacon')
          : tempActorArr[secondRand],
      );
    }
  }, [searchParams, setSearchParams]);

  return (
    <div data-cy="GameForm">
      <div style={actorsStyle}>
        <ActorCard to={false} name={firstActor?.name} id={firstActor?.id} />
        <ActorCard to={true} name={secondActor?.name} id={secondActor?.id} />
      </div>
      <MovieField
        callback={handleCallback}
        guesses={guesses}
        submitDisabled={submitDisabled}
      />
      <Guesses
        guesses={guesses}
        deleteCallback={deleteCallback}
        submitDisabled={submitDisabled}
      />
      <Submit
        guesses={guesses}
        firstActor={firstActor}
        secondActor={secondActor}
        submitCallback={submitCallback}
      />
    </div>
  );

  function submitCallback() {
    setSubmitDisabled(true);
  }

  function handleCallback(value: AutoComplete) {
    let tempResult = guesses ? [...guesses] : [];
    tempResult.push(value);
    setGuesses(tempResult);
  }

  function deleteCallback() {
    if (guesses) {
      let tempArr = [...guesses];
      tempArr.pop();
      setGuesses(tempArr);
    }
  }
}

const actorsStyle = {
  display: 'flex',
  justifyContent: 'center',
};
