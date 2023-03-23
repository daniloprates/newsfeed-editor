// @t s-nocheck
import React, { useState } from 'react';
import {
  Typography as Text,
  Box,
  TextField,
} from '@mui/material';
import ImportFooter from './ImportFooter';

interface Props {
  hasError: boolean,
  onCancel: Function,
  onSubmit: Function,
  onUpdateStringValue: Function,
}

function ImportPaste({
  hasError,
  onCancel,
  onSubmit,
  onUpdateStringValue,
}: Props) {
  const [inputValue, setInputValue] = useState('');

  const handleOnChange = (event: any) => {
    const { value } = event.target;
    setInputValue(value);
    onUpdateStringValue(value);
  }

  const textFieldColor =
    !hasError
      ? 'primary'
      : 'error'

  const handleSubmit = () => {
    onSubmit();
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
      <ImportFooter
        onSubmit={handleSubmit}
        onCancel={onCancel}
        isDisabled={hasError}
      />
    </div>
  );
}

export default ImportPaste;
