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
}: {
  callback: (value: AutoComplete) => void;
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
        disablePortal
        onChange={(e, v) => handleClick(v)}
        options={query !== undefined ? query : []}
        loading={loading}
        renderInput={(params) => (
          <CssTextField
            {...params}
            autoComplete="off"
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
      <Button onClick={handleAdd} sx={buttonStyle} variant="contained">
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
    if (result) callback(result);
  }
}

function transformValue(arr: []) {
  return arr.map((element: any) => {
    return {
      label: `${element.original_title} ${
        element.release_date
          ? '(' + element.release_date.substring(0, 4) + ')'
          : ''
      }`,
      id: element.id,
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
  width: '50%',
});
