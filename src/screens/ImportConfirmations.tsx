// @t s-nocheck
import React, { useState } from 'react';
import { get } from 'lodash';
import {
  Typography as Text,
  Box,
  TextField,
  Button,
  Tabs,
  Tab,
  Grid
} from '@mui/material';
import Confirm from '../components/Confirm';
import { parseJson } from '../utils';
import { CONFIRMATIONS } from '../config';
import type { Confirmation } from '../types';

import ImportUpload from './ImportUpload';
import ImportPaste from './ImportPaste';

interface Props {
  confirmation: Confirmation,
  onConfirmCancel: Function,
  onConfirmSubmit: Function,
  onDontConfirm: Function,
}

const jsonToList = (content: string) => {
  try {
    const jsContent = JSON.parse(content);
    return jsContent.items || [];
  } catch (err: any) {
    return [];
  }
}

function ImportConfirmations({
  confirmation,
  onConfirmCancel,
  onConfirmSubmit,
  onDontConfirm
}: Props) {

  if (confirmation === CONFIRMATIONS.CANCEL) {
    return (
      <Confirm
        content="You are going to loose the imported json"
        onConfirm={onConfirmCancel}
        onCancel={onDontConfirm}
        confirmLabel="Confirm cancel"
        cancelLabel="Keep importing"
      />
    );
  }
  if (confirmation === CONFIRMATIONS.SUBMIT) {
    return (
      <Confirm
        content="This action will overwrite your old json"
        onConfirm={onConfirmSubmit}
        onCancel={onDontConfirm}
        cancelLabel="Keep importing"
      />
    );
  }

  return null;

}

export default ImportConfirmations;
