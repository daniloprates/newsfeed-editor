// @t s-nocheck
import React, { useState } from 'react';
import {
  Typography as Text,
  Button,
  TextField,
} from '@mui/material';
import ImportFooter from './ImportFooter';
import { parseJson, readFileAsync } from '../utils';
import type { Confirmation } from '../types';

interface Props {
  confirmation: Confirmation,
  onUpdateStringValue: Function,
  hasError: boolean,
  errorMessage: string,
  onSubmit: Function,
  onConfirmSubmit: Function,
  onCancel: Function,
  onConfirmCancel: Function,
  onDontConfirm: Function,
  onResetError: Function,
}

function ImportUpload({
  confirmation,
  onUpdateStringValue,
  hasError,
  errorMessage,
  onSubmit,
  onConfirmSubmit,
  onCancel,
  onConfirmCancel,
  onDontConfirm,
  onResetError
}: Props) {

  const [file, setFile] = useState<File>();

  const handleSelectFileToUpload = (event: any) => {
    setFile(event.target.files[0]);
    onResetError();
  }

  const handleSubmit = () => {

  }

  const handleConfirmSubmit = async () => {
    let reader = new FileReader();
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
        onCancel={onConfirmCancel}
        isDisabled={hasError || !file}
        confirmation={confirmation}
        onConfirmCancel={onConfirmCancel}
        onConfirmSubmit={handleConfirmSubmit}
        onDontConfirm={onDontConfirm}
      />
    </div>
  );
}

export default ImportUpload;
