// @t s-nocheck
import React, { useState } from 'react';
import {
  Typography as Text,
  TextField,
} from '@mui/material';
import ImportFooter from './ImportFooter';
import { readFileAsync } from '../utils';

interface Props {
  onUpdateStringValue: Function,
  hasError: boolean,
  errorMessage: string,
  onSubmit: Function,
  onCancel: Function,
  onResetError: Function,
}

function ImportUpload({
  onUpdateStringValue,
  hasError,
  onResetError,
  onCancel,
}: Props) {

  const [file, setFile] = useState<File>();

  const handleSelectFileToUpload = (event: any) => {
    setFile(event.target.files[0]);
    onResetError();
  }

  const handleConfirmSubmit = async () => {
    if (file) {
      const strJson = await readFileAsync(file);
      await onUpdateStringValue(strJson);
    }
  }

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
