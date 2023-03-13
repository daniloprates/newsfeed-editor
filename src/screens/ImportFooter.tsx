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
import ImportConfirmations from './ImportConfirmations';

interface Props {
  onSubmit: Function,
  onCancel: Function,
  isDisabled: boolean,
  confirmation?: Confirmation,
  onConfirmCancel?: Function,
  onConfirmSubmit?: Function,
  onDontConfirm?: Function,
}

const jsonToList = (content: string) => {
  try {
    const jsContent = JSON.parse(content);
    return jsContent.items || [];
  } catch (err: any) {
    return [];
  }
}

function ImportFooter({
  onSubmit,
  onCancel,
  isDisabled,
  confirmation,
  onConfirmCancel,
  onConfirmSubmit,
  onDontConfirm
}: Props) {

  return (
    <div>

      <Grid
        container
        justifyContent="right"
        sx={{ borderTop: 1, borderColor: 'divider', mb: 5, mt: 5, padding: 5, align: 'center', '& button': { m: 1 } }}
      >
        <Grid item>
          <Button
            color="secondary"
            onClick={() => onCancel()}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={isDisabled}
            onClick={() => onSubmit()}
          >
            Import json
          </Button>
        </Grid>
      </Grid>
      {
        !!confirmation &&
        !!onConfirmCancel &&
        !!onConfirmSubmit &&
        !!onDontConfirm && (
          <ImportConfirmations
            confirmation={confirmation}
            onConfirmCancel={onConfirmCancel}
            onConfirmSubmit={onConfirmSubmit}
            onDontConfirm={onDontConfirm}
          />
        )
      }
    </div>
  );
}

export default ImportFooter;
