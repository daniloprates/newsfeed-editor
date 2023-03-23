// @t s-nocheck
import React, { useState, useEffect } from 'react';
import {
  Typography as Text,
  TextField,
} from '@mui/material';
import ImportFooter from './ImportFooter';
import { readFileAsync } from '../utils';
import type { DaedalusSchema } from '../types';

interface Props {
  hasError: boolean,
  onCancel: Function,
  onSubmit: Function,
  onUpdateStringValue: Function,
  parsedValue?: DaedalusSchema,
}

function ImportUpload({
  hasError,
  onCancel,
  onSubmit,
  onUpdateStringValue,
  parsedValue,
}: Props) {

  const [file, setFile] = useState<File>();

  const handleSelectFileToUpload = (event: any) => {
    setFile(event.target.files[0]);
    onUpdateStringValue();
  }

  const handleConfirmSubmit = async () => {
    if (file) {
      const strJson = await readFileAsync(file);
      onUpdateStringValue(strJson);
    }
  }

  useEffect(() => {
    if (parsedValue) {
      onSubmit();
    }
  }, [parsedValue]);

  return (
    <div>
      <Text variant="h4" component="h3" sx={{ mb: 5, mt: 5 }}>Upload Json</Text>
      <TextField
        type="file"
        inputProps={{ accept:'application/JSON' }}
        onChange={(event) =>
        handleSelectFileToUpload(event)}
       />
      <ImportFooter
        onSubmit={handleConfirmSubmit}
        onCancel={onCancel}
        isDisabled={hasError || !file}
      />
    </div>
  );
}

export default ImportUpload;
