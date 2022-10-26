import React from 'react';
import { Button } from '@mui/material';
import { getMovieById } from '../../api';
import { AutoComplete, TMDBActor } from '../../classes';
import { Movie } from '@mui/icons-material';

export function Submit({
  guesses,
  firstActor,
  secondActor,
}: {
  guesses?: AutoComplete[];
  firstActor?: TMDBActor;
  secondActor?: TMDBActor;
}) {
  const [submittedResult, setSubmittedResult] = React.useState<boolean>();

  return (
    <div>
      <Button
        disabled={!guesses || guesses.length < 1}
        onClick={verifyAnswer}
        sx={buttonStyle}
        variant="contained"
      >
        Submit
      </Button>
      {submittedResult}
    </div>
  );

  async function verifyAnswer() {
    let validationFlag = false;
    if (guesses && guesses.length > 0) {
      for (let i = 0; i < guesses.length; i++) {
        // Validate first movie contains first actor
        if (i === 0 && guesses[0].id) {
          const result = await getMovieById(guesses[0].id);
          for (let x = 0; x < result.length; x++) {
            if (firstActor && result[x].name === firstActor.name) {
              validationFlag = true;
              break;
            } else validationFlag = false;
          }
          // If only one movie, validate first movie contains second actor
          if (guesses.length === 1 && validationFlag) {
            for (let y = 0; y < result.length; y++) {
              if (secondActor && result[y].name === secondActor.name) {
                validationFlag = true;
                break;
              } else validationFlag = false;
            }
          }
        }
        //If more than one movie, validate last movie contains second actor
        if (i === guesses.length - 1 && guesses.length > 1 && validationFlag) {
          //@ts-ignore next-line
          const result = await getMovieById(guesses[guesses.length - 1].id);
          for (let i = 0; i < result.length; i++) {
            if (secondActor && result[i].name === secondActor.name) {
              validationFlag = true;
              break;
            } else validationFlag = false;
          }
        }
        //Validate the neighboring movies share and actor
        if(guesses[i + 1] && validationFlag) {
          //@ts-ignore next-line
          const currentResult = await getMovieById(guesses[i].id);
          //@ts-ignore next-line
          const nextResult = await getMovieById(guesses[i + 1].id);
          for(let z = 0; z < currentResult.length; z++) {
            const filterResult = nextResult.filter((actor: any) => {
              return actor.name === currentResult[z].name
            })
            if(filterResult.length > 0) {
              validationFlag = true;
              break;
            } else validationFlag = false
          }

        }
      }
    }
    console.log(validationFlag);
  }
}

const buttonStyle = {
  marginTop: '5%',
};