// @t s-nocheck
import React, { useState } from 'react';
import {
  Typography as Text,
  Box,
  Tabs,
  Tab,
} from '@mui/material';
import { parseJson, isJsonDaedalusCompatible } from '../utils';
import type { DaedalusSchema } from '../types';

import ImportUpload from './ImportUpload';
import ImportPaste from './ImportPaste';

interface Props {
  onImport: Function,
  onCancel: Function,
  content?: DaedalusSchema,
}

function Import({ onImport, onCancel }: Props) {

  const [parsedValue, setParsedValue] = useState<DaedalusSchema>();
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);

  const resetError = () => {
    setHasError(false);
    setErrorMessage('');
    setParsedValue(undefined);
  }

  const handleUpdateStringValue = async (value?: string) => {
    if (!value) {
      resetError();
      return;
    }
    const { success, errorMessage, parsed } = parseJson(value);
    const newContent = parsed as DaedalusSchema;
    let hasError = false;
    let newErrorMessage = '';
    if (!success) {
      hasError = true;
      newErrorMessage = String(errorMessage);
    } else if (!isJsonDaedalusCompatible(newContent)) {
      hasError = true;
      newErrorMessage = 'This json is not in the Daedalus newsfeed format';
    }
    await setHasError(hasError);
    await setErrorMessage(newErrorMessage);
    if (!hasError) {
      await setParsedValue(parsed);
    } else {
      await setParsedValue(undefined);
    }
  }

  const handleSubmit = () => {
    if (!parsedValue) {
      return;
    }
    onImport(parsedValue);
  };

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
        <Tabs value={currentTabIndex} onChange={(_, newView) => setCurrentTabIndex(newView)} aria-label="basic tabs example">
          <Tab label="Upload" {...setTabProps(0)} />
          <Tab label="Paste" {...setTabProps(1)} />
        </Tabs>
      </Box>
      {
        currentTabIndex === 0 && (
          <ImportUpload
            hasError={hasError}
            onCancel={onCancel}
            onSubmit={handleSubmit}
            onUpdateStringValue={handleUpdateStringValue}
            parsedValue={parsedValue}
          />
        )
      }
      {
        currentTabIndex === 1 && (
          <ImportPaste
            hasError={hasError}
            onCancel={onCancel}
            onSubmit={handleSubmit}
            onUpdateStringValue={handleUpdateStringValue}
          />
        )
      }
      <Box sx={{ mb: 2, mt: 2 }}>
        {hasError && <Text color="error">{errorMessage}</Text>}
      </Box>
    </div>
  );
}

export default Import;
