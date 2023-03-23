// @t s-nocheck
import React from 'react';
import Confirm from '../components/Confirm';
import { CONFIRMATIONS } from '../config';
import type { Confirmation } from '../types';

interface Props {
  confirmation: Confirmation,
  onConfirmCancel: Function,
  onConfirmSubmit: Function,
  onDontConfirm: Function,
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
