import React, { useState } from 'react';
import { get, set, cloneDeep } from 'lodash';
import {
  Typography as Text,
  TextField,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Stack,
  Grid,
  RadioGroup,
  Radio
} from '@mui/material';
import { DeleteForever } from '@mui/icons-material';
import { getEmptyItem } from '../utils';
import type { DaedalusSchema, DaedalusItemSchema } from '../types';

 interface Props {
  onSave: Function,
  onDelete: Function,
  onCancel: Function,
  editingIndex: number,
  content?: DaedalusSchema,
 }

function Edit({ onSave, onCancel, editingIndex, content, onDelete }: Props) {

  const newEditingItem = content && editingIndex > -1
    ? content.items[editingIndex]
    : getEmptyItem();

  const [editingItem, setEditingItem] =
    useState<DaedalusItemSchema>(cloneDeep(newEditingItem));

  const getValue = (path: string) => get(editingItem, path);

  const getIsChecked = (path: string, id: string) => {
    const value = getValue(path) || [];
    return value.includes(id);
  }

  const editItem = (event: any) => {
    if (!event || !event.target) return;
    const { target } = event;
    const { name: path, value } = target;
    const newItem = {...set(editingItem, path, value) as DaedalusItemSchema};
    setEditingItem(newItem);
  }

  const editCheckbox = (event: any) => {
    if (!event || !event.target) return;
    const { target } = event;
    const { name: path, value: id } = target;
    const value = [...get(editingItem, path)];
    const index = value.indexOf(id);
    if (index > -1) {
      value.splice(index, 1);
    } else {
      value.push(id);
    }
    const newItem = {...set(editingItem, path, value) as DaedalusItemSchema};
    setEditingItem(newItem);
  }

  const titleEn = getValue('title.en-US');
  const titleJa = getValue('title.ja-JP');
  const contentEn = getValue('content.en-US');
  const contentJa = getValue('content.ja-JP');
  const version = getValue('target.daedalusVersion');
  const actionLabelEn = getValue('action.label.en-US');
  const actionaLabelJa = getValue('action.label.ja-JP');
  const actionUrlEn = getValue('action.url.en-US');
  const actionUrlJa = getValue('action.url.ja-JP');
  const softwareUpdateLinuxVersion = getValue('softwareUpdate.linux.version');
  const softwareUpdateLinuxHash = getValue('softwareUpdate.linux.hash');
  const softwareUpdateLinuxUrl = getValue('softwareUpdate.linux.url');
  const softwareUpdateDarwinVersion = getValue('softwareUpdate.darwin.version');
  const softwareUpdateDarwinHash = getValue('softwareUpdate.darwin.hash');
  const softwareUpdateDarwinUrl = getValue('softwareUpdate.darwin.url');
  const softwareUpdateWin32Version = getValue('softwareUpdate.win32.version');
  const softwareUpdateWin32Hash = getValue('softwareUpdate.win32.hash');
  const softwareUpdateWin32Url = getValue('softwareUpdate.win32.url');

  // TODO: proper validattion
  const isDisable =
    !titleEn ||
    !titleJa ||
    !contentEn ||
    !contentJa ||
    !version ||
    !editingItem.target.platforms.length ||
    editingItem.type === 'software-update' && (
      !softwareUpdateLinuxVersion ||
      !softwareUpdateLinuxHash ||
      !softwareUpdateLinuxUrl ||
      !softwareUpdateDarwinVersion ||
      !softwareUpdateDarwinHash ||
      !softwareUpdateDarwinUrl ||
      !softwareUpdateWin32Version ||
      !softwareUpdateWin32Hash ||
      !softwareUpdateWin32Url
    );

  return (
    <div>
      <Stack
        spacing={2}
        direction="row"
        sx={{
          border: 1,
          borderColor: 'divider',
          padding: 3,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Button onClick={() => onCancel()}>Cancel</Button>
          </Grid>
          <Grid  item xs={9} sx={{textAlign: 'right'}}>
            <Button variant="contained" disabled={isDisable} onClick={() => onSave(editingItem)}>Save</Button>
          </Grid>
        </Grid>
      </Stack>
      <Text variant="h4"><p>{titleEn || 'New Item'}</p></Text>
      <Text variant="h5"><p>Title</p></Text>
      <TextField
        name="title.en-US"
        label="Title (English)"
        fullWidth
        onChange={editItem}
        value={titleEn}
      />
      <TextField
        name="title.ja-JP"
        label="Title (Japanese)"
        fullWidth
        onChange={editItem}
        value={titleJa}
      />
      <Text variant="h5"><p>Content</p></Text>
      <TextField
        name="content.en-US"
        label="Content (English)"
        fullWidth
        multiline
        rows={6}
        onChange={editItem}
        value={contentEn}
      />
      <TextField
        name="content.ja-JP"
        label="Content (Japanese)"
        fullWidth
        multiline
        rows={6}
        onChange={editItem}
        value={contentJa}
      />
      <Text variant="h5"><p>Target</p></Text>
      <TextField
        name="target.daedalusVersion"
        label="Daedalus Version"
        placeholder=">=2.3.0 <5.2.0"
        fullWidth
        onChange={editItem}
        value={version}
      />
      <Text variant="h6"><p>Platforms</p></Text>
      <FormGroup>
        <FormControlLabel control={<Checkbox checked={getIsChecked('target.platforms', 'win32')} onChange={(event: any) => editCheckbox(event)} name="target.platforms" value="win32" />} label="Windows" />
        <FormControlLabel control={<Checkbox checked={getIsChecked('target.platforms', 'darwin')} onChange={(event: any) => editCheckbox(event)} name="target.platforms" value="darwin" />} label="MacOs" />
        <FormControlLabel control={<Checkbox checked={getIsChecked('target.platforms', 'linux')} onChange={(event: any) => editCheckbox(event)} name="target.platforms" value="linux" />} label="Linux" />
      </FormGroup>
      <Text variant="h5"><p>Action</p></Text>
      <TextField
        name="action.label.en-US"
        label="Label (English)"
        fullWidth
        value={actionLabelEn}
      />
      <TextField
        name="action.label.ja-JP"
        label="Label (Japanese)"
        fullWidth
        value={actionaLabelJa}
      />
      <TextField
        name="action.url.en-US"
        label="URL (English)"
        fullWidth
        value={actionUrlEn}
      />
      <TextField
        name="action.url.ja-JP"
        label="URL (Japanese)"
        fullWidth
        value={actionUrlJa}
      />
      <Text variant="h5"><p>Type</p></Text>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        value={editingItem.type}
        name="type"
        onChange={editItem}
      >
        <FormControlLabel value="incident" control={<Radio />} label="Incident" />
        <FormControlLabel value="alert" control={<Radio />} label="Alert" />
        <FormControlLabel value="announcement" control={<Radio />} label="Announcement" />
        <FormControlLabel value="info" control={<Radio />} label="Info" />
        <FormControlLabel value="software-update" control={<Radio />} label="Software update" />
      </RadioGroup>

      {
        editingItem.type === 'software-update' && (
          <div>
            <Text variant="h5"><p>Software Update</p></Text>
            <Text variant="h6"><p>Windows</p></Text>
            <TextField
              name="softwareUpdate.linux.version"
              label="Version"
              fullWidth
              onChange={editItem}
              value={softwareUpdateLinuxVersion}
            />
            <TextField
              name="softwareUpdate.linux.hash"
              label="Hash"
              fullWidth
              onChange={editItem}
              value={softwareUpdateLinuxHash}
            />
            <TextField
              name="softwareUpdate.linux.url"
              label="Version"
              fullWidth
              onChange={editItem}
              value={softwareUpdateLinuxUrl}
            />

            <Text variant="h6"><p>MacOs</p></Text>
            <TextField
              name="softwareUpdate.darwin.version"
              label="Version"
              fullWidth
              onChange={editItem}
              value={softwareUpdateDarwinVersion}
            />
            <TextField
              name="softwareUpdate.darwin.hash"
              label="Hash"
              fullWidth
              onChange={editItem}
              value={softwareUpdateDarwinHash}
            />
            <TextField
              name="softwareUpdate.darwin.url"
              label="Version"
              fullWidth
              onChange={editItem}
              value={softwareUpdateDarwinUrl}
            />

            <Text variant="h6"><p>Linux</p></Text>
            <TextField
              name="softwareUpdate.win32.version"
              label="Version"
              fullWidth
              onChange={editItem}
              value={softwareUpdateWin32Version}
            />
            <TextField
              name="softwareUpdate.win32.hash"
              label="Hash"
              fullWidth
              onChange={editItem}
              value={softwareUpdateWin32Hash}
            />
            <TextField
              name="softwareUpdate.win32.url"
              label="Version"
              fullWidth
              onChange={editItem}
              value={softwareUpdateWin32Url}
            />

          </div>
        )
      }

      <Stack
        spacing={2}
        direction="row"
        sx={{
          border: 1,
          borderColor: 'divider',
          padding: 3,
          mt: 7
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Button onClick={() => onDelete(editingIndex)}><DeleteForever /> Delete item</Button>
          </Grid>
          <Grid  item xs={9} sx={{textAlign: 'right'}}>
            <Button variant="contained" disabled={isDisable} onClick={() => onSave(editingItem)}>Save</Button>
          </Grid>
        </Grid>
      </Stack>
    </div>
  );
}

export default Edit;
