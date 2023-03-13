// @t s-nocheck
import React, { useState } from 'react';
import {
  Typography as Text,
  Button,
  Box,
  TextField,
} from '@mui/material';
import ImportFooter from './ImportFooter';
import { parseJson } from '../utils';
import type { DaedalusSchema } from '../types';

interface Props {
  onImport: Function,
  onCancel: Function,

}

function ImportPaste({ onImport, onCancel }: Props) {

  const [inputValue, setInputValue] = useState('');
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [parsedValue, setParsedValue] = useState<DaedalusSchema>();

  const handleOnChange = (event: any) => {
    const { value } = event.target;
    setValue(value);
  }

  const setValue = (value: string) => {
    if (!value) {
      setHasError(false);
      setErrorMessage('newErrorMessage');
      setParsedValue(undefined);
      return;
    }
    setInputValue(value);
    const { success, errorMessage, parsed } = parseJson(value);
    const newContent = parsed as DaedalusSchema;
    let hasError = false;
    let newErrorMessage = '';
    if (!success) {
      hasError = true;
      newErrorMessage = String(errorMessage);
    } else if (
      !value ||
      typeof newContent !== 'object' ||
      !newContent.updatedAt ||
      !Array.isArray(newContent.items)
    ) {
      hasError = true;
      newErrorMessage = 'This json is not in the Daedalus newsfeed format';
    }
    setHasError(hasError);
    setErrorMessage(newErrorMessage);
    if (!hasError) {
      setParsedValue(parsed);
    } else {
      setParsedValue(undefined);
    }
  }

  const textFieldColor =
    !hasError
      ? 'primary'
      : 'error'

  const handleSubmit = () => {
    onImport(parsedValue);
  }

  return (
    <div>
      <Text variant="h4" component="h3" sx={{ mb: 5, mt: 5 }}>Insert Json</Text>
      <Box sx={{ my: 4 }}>
        <TextField
          id="json-importer-textarea"
          fullWidth
          label="Insert JSON"
          multiline
          rows={15}
          value={inputValue}
          onChange={handleOnChange}
          color={textFieldColor}
          sx={{
            fontFamily: 'monospace',
            overflowX: 'auto',
            mb: 2,
          }}
        />
      </Box>
      <Box sx={{ mb: 1, mt: 1 }}>
        <p>{hasError && <Text color="error">{errorMessage}</Text>}</p>
      </Box>
      <ImportFooter
        onSubmit={handleSubmit}
        onCancel={onCancel}
        isDisabled={hasError || !parsedValue}
      />
    </div>
  );
}

export default ImportPaste;
