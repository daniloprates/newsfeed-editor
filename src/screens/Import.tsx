// @t s-nocheck
import React, { useState } from 'react';
import {
  Typography as Text,
  Box,
  Tabs,
  Tab,
} from '@mui/material';
import { parseJson } from '../utils';
import { CONFIRMATIONS } from '../config';
import type { Confirmation, DaedalusSchema } from '../types';

import ImportUpload from './ImportUpload';
import ImportPaste from './ImportPaste';

interface Props {
  onImport: Function,
  onCancel: Function,
  content?: DaedalusSchema,
}

function Import({ onImport, onCancel, content }: Props) {

  const [parsedValue, setParsedValue] = useState({});
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmation, setConfirmation] = useState<Confirmation>();
  const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);

  const resetError = () => {
    setConfirmation(undefined);
    setHasError(false);
    setErrorMessage('')
  }

  const handleUpdateStringValue = (value: string) => {
    const { success: isValid, errorMessage, parsed } = parseJson(value);
    const newContent = parsed as DaedalusSchema;
    setErrorMessage(errorMessage || '');
    setHasError(!value || !isValid);
    if (isValid && value) {
      setParsedValue(newContent);
      onImport(newContent);
    } else {
      setParsedValue({});
      setConfirmation(undefined);
    }
  }

  const handleSubmit = () => {
    setConfirmation(CONFIRMATIONS.SUBMIT);
  };

  const confirmSubmit = () => {
    onImport(parsedValue);
  }

  const handleCancel = () => {
    setConfirmation(CONFIRMATIONS.CANCEL);
  };

  const confirmCancel = () => {
    setConfirmation(undefined);
    onCancel();
  };

  const dontConfirm = () => {
    setConfirmation(undefined);
  }

  const setTabProps = (index: number) => (
    {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    }
  );
  return (
    <div>
      <Text variant="h2">
        Import Json
      </Text>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 5, mt: 5 }}>
        <Tabs value={currentTabIndex} onChange={(ev, newView) => setCurrentTabIndex(newView)} aria-label="basic tabs example">
          <Tab label="Upload" {...setTabProps(0)} />
          <Tab label="Paste" {...setTabProps(1)} />
        </Tabs>
      </Box>
      {
        currentTabIndex === 0 && (
          <ImportUpload
            confirmation={confirmation}
            onUpdateStringValue={handleUpdateStringValue}
            hasError={hasError}
            errorMessage={errorMessage}
            onSubmit={handleSubmit}
            onConfirmSubmit={confirmSubmit}
            onCancel={handleCancel}
            onConfirmCancel={confirmCancel}
            onDontConfirm={dontConfirm}
            onResetError={resetError}
          />
        )
      }
      {
        currentTabIndex === 1 && (
          <ImportPaste
            onImport={onImport}
            onCancel={confirmCancel}
          />
        )
      }
      <Box sx={{ mb: 2, mt: 2 }}>
        <p>{hasError && <Text color="error">{errorMessage}</Text>}</p>
      </Box>
    </div>
  );
}

export default Import;
