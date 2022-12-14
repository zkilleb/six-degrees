import React, { useMemo } from 'react';
import debounce from 'lodash.debounce';
import { styled } from '@mui/material/styles';
import {
  TextField,
  Autocomplete,
  CircularProgress,
  Button,
} from '@mui/material';
import { getMovieByKeyword } from '../../api';
import { AutoComplete } from '../../classes';

export function MovieField({
  callback,
  guesses,
  submitDisabled,
}: {
  callback: (value: AutoComplete) => void;
  guesses?: AutoComplete[];
  submitDisabled?: boolean;
}) {
  const [query, setQuery] = React.useState<any[]>();
  const [result, setResult] = React.useState<AutoComplete>();
  const [loading, setLoading] = React.useState<boolean>(false);

  const debouncedChangeHandler = useMemo(
    () => debounce(handleChange, 1000),
    [],
  );

  return (
    <div>
      <Autocomplete
        key={
          guesses && guesses[guesses.length - 1]
            ? guesses[guesses.length - 1].id
            : 'empty'
        }
        disablePortal
        disabled={submitDisabled}
        onChange={(e, v) => handleClick(v)}
        options={query !== undefined ? query : []}
        loading={loading}
        renderInput={(params) => (
          <CssTextField
            {...params}
            autoFocus={true}
            autoComplete="off"
            data-cy="MovieField"
            placeholder="Guess a movie..."
            onChange={debouncedChangeHandler}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
      <Button
        disabled={(guesses && guesses.length >= 6) || submitDisabled}
        onClick={handleAdd}
        sx={buttonStyle}
        variant="contained"
        data-cy="AddButton"
      >
        Add
      </Button>
    </div>
  );

  async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setLoading(true);
    const result = await getMovieByKeyword(event.target.value);
    const transformedResult = transformValue(result);
    setQuery(transformedResult);
    setLoading(false);
  }

  function handleClick(value: AutoComplete) {
    setResult(value);
  }

  function handleAdd() {
    if (result) {
      callback(result);
      setQuery(undefined);
    }
  }
}

function transformValue(arr: []) {
  return arr.map((element: any) => {
    return {
      label: `${element.title} ${
        element.release_date
          ? '(' + element.release_date.substring(0, 4) + ')'
          : ''
      }`,
      id: element.id,
      posterPath: element.poster_path,
    };
  });
}

const buttonStyle = {
  marginTop: '1%',
};

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'white',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'white',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white',
    },
    '&:hover fieldset': {
      borderColor: 'white',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white',
    },
    '& input': {
      color: 'white',
    },
  },
  width: '75%',
});
