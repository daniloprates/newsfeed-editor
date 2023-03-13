import React, { useState } from 'react';
import { get, set, cloneDeep } from 'lodash';
import {
  Typography as Text,
  Box,
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
import { ArrowBackIos, DeleteForever } from '@mui/icons-material';
import { getType } from '../utils';
import type { DaedalusSchema, DaedalusItemSchema } from '../types';

 interface Props {
  onEdit: Function,
  onDelete: Function,
  onCancel: Function,
  editingIndex: number,
  content?: DaedalusSchema,
 }

function Edit({ onEdit, onCancel, editingIndex, content, onDelete }: Props) {

  if (!content || !content.items || !content.items[editingIndex]) {
    return (
      <div>
        Something went wrong.
        <Button
          onClick={() => onCancel()}
        >
          Go back
        </Button>
      </div>
    );
  };

  const [editingItem, setEditingItem] = useState<DaedalusItemSchema>(cloneDeep(content.items[editingIndex]));

  const getValue = (path: string) => get(editingItem, path);

  const getIsChecked = (path: string, id: string) => {
    const value = getValue(path);
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
            <Button variant="contained" onClick={() => onEdit(editingItem)}>Save</Button>
          </Grid>
        </Grid>
      </Stack>
      <Text variant="h4"><p>{getValue('title.en-US')}</p></Text>
      <Text variant="h5"><p>Title</p></Text>
      <TextField
        name="title.en-US"
        label="Title (EN)"
        fullWidth
        onChange={editItem}
        value={getValue('title.en-US')}
      />
      <TextField
        name="title.ja-JP"
        label="Title (JA)"
        fullWidth
        onChange={editItem}
        value={getValue('title.ja-JP')}
      />
      <Text variant="h5"><p>Content</p></Text>
      <TextField
        name="content.en-US"
        label="Content (EN)"
        fullWidth
        multiline
        rows={6}
        onChange={editItem}
        value={getValue('content.en-US')}
      />
      <TextField
        name="content.ja-JP"
        label="Content (JA)"
        fullWidth
        multiline
        rows={6}
        onChange={editItem}
        value={getValue('content.ja-JP')}
      />
      <Text variant="h5"><p>Target</p></Text>
      <TextField
        name="target.daedalusVersion"
        label="Daedalus Version"
        placeholder=">=2.3.0 <5.2.0"
        fullWidth
        onChange={editItem}
        value={getValue('target.daedalusVersion')}
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
        label="Label (EN)"
        fullWidth
        value={getValue('action.label.en-US')}
      />
      <TextField
        name="action.label.ja-JP"
        label="Label (JA)"
        fullWidth
        value={getValue('action.label.ja-JP')}
      />
      <TextField
        name="action.url.en-US"
        label="URL (EN)"
        fullWidth
        value={getValue('action.url.en-US')}
      />
      <TextField
        name="action.url.ja-JP"
        label="URL (JA)"
        fullWidth
        value={getValue('action.url.ja-JP')}
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
              value={getValue('softwareUpdate.linux.version')}
            />
            <TextField
              name="softwareUpdate.linux.hash"
              label="Hash"
              fullWidth
              onChange={editItem}
              value={getValue('softwareUpdate.linux.hash')}
            />
            <TextField
              name="softwareUpdate.linux.url"
              label="Version"
              fullWidth
              onChange={editItem}
              value={getValue('softwareUpdate.linux.url')}
            />

            <Text variant="h6"><p>MacOs</p></Text>
            <TextField
              name="softwareUpdate.darwin.version"
              label="Version"
              fullWidth
              onChange={editItem}
              value={getValue('softwareUpdate.darwin.version')}
            />
            <TextField
              name="softwareUpdate.darwin.hash"
              label="Hash"
              fullWidth
              onChange={editItem}
              value={getValue('softwareUpdate.darwin.hash')}
            />
            <TextField
              name="softwareUpdate.darwin.url"
              label="Version"
              fullWidth
              onChange={editItem}
              value={getValue('softwareUpdate.darwin.url')}
            />

            <Text variant="h6"><p>Linux</p></Text>
            <TextField
              name="softwareUpdate.win32.version"
              label="Version"
              fullWidth
              onChange={editItem}
              value={getValue('softwareUpdate.win32.version')}
            />
            <TextField
              name="softwareUpdate.win32.hash"
              label="Hash"
              fullWidth
              onChange={editItem}
              value={getValue('softwareUpdate.win32.hash')}
            />
            <TextField
              name="softwareUpdate.win32.url"
              label="Version"
              fullWidth
              onChange={editItem}
              value={getValue('softwareUpdate.win32.url')}
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
            <Button variant="contained" onClick={() => onEdit(editingItem)}>Save</Button>
          </Grid>
        </Grid>
      </Stack>
      {/*<pre>{JSON.stringify(editingItem, null, 2)}</pre>*/}
    </div>
  );
}

export default Edit;
