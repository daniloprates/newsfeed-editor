import React, { useState, ChangeEvent } from 'react';
import { CssBaseline, AppBar, Toolbar, Container, Typography as Text, Box, Link, Button, ButtonGroup } from '@mui/material';
import { cloneDeep } from 'lodash';
import Edit from './screens/Edit';
import List from './screens/List';
import Import from './screens/Import';
import Confirm from './components/Confirm'
import ElevationScroll from './components/ElevationScroll'
import type { Screen, DaedalusSchema, DaedalusItemSchema } from './types';
import { SCREENS } from './config';

const initialScreen: Screen = SCREENS.LIST;

export default function App() {

  const [currentScreen, setCurrentScreen] = useState(initialScreen);
  const [content, setContent] = useState<DaedalusSchema>();
  const [editingIndex, setEditingIndex] = useState(-1);
  const [deletingIndex, setDeletingIndex] = useState(-1);
  const setScreenList = () => setCurrentScreen(SCREENS.LIST);
  const setScreenImport = () => setCurrentScreen(SCREENS.IMPORT);
  const setScreenEdit = () => setCurrentScreen(SCREENS.EDIT);

  const handleImport = (newContent: DaedalusSchema) => {
    setContent(newContent);
    setScreenList();
  }

  const handleSaveItem = (newContentItem: DaedalusItemSchema) => {
    if (!content) {
      return;
    }
    const index = editingIndex > -1
      ? editingIndex
      : content.items.length;
    const newContent: DaedalusSchema = cloneDeep(content);
    newContent.items[index] = newContentItem;
    setContent(newContent);
    setScreenList();
    setEditingIndex(-1);
  }
  const handleSelectItem = (index?: number) => {
    if (typeof index === 'number') {
      setEditingIndex(index);
    }
    setScreenEdit();
  }

  const handleDelete = (index: number) => {
    setDeletingIndex(index);
  }

  const handleConfirmDelete = () => {
    if (!content || editingIndex === -1) {
      return;
    }
    setDeletingIndex(-1);
    const newContent: DaedalusSchema = cloneDeep(content);
    newContent.items.splice(deletingIndex, 1);
    setContent(newContent);
    setScreenList();
    setEditingIndex(-1);
  }

  const handleDownload = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(content, null, 2));
    const node = document.createElement('a');
    const date = new Date().toJSON();
    node.setAttribute('href', dataStr);
    node.setAttribute('download', `edited-daedalus-newsfeed-${date}.json`);
    document.body.appendChild(node); // required for firefox
    node.click();
    node.remove();
  }

  return (
    <div>
      <CssBaseline />
      <AppBar
        color="secondary"
      >
        <Container
          maxWidth="lg"
        >
          <Toolbar>
            <Text variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Newsfeed Editor
            </Text>
            <div>
            <ButtonGroup variant="text" color="inherit">
              <Button onClick={setScreenImport}>Import Json</Button>
              <Button onClick={handleDownload} disabled={!content}>Download Json</Button>
            </ButtonGroup>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
      <Container
        maxWidth="lg"
        fixed
        sx={{
          padding: 5,
          paddingTop: 15,
          minHeight: '100vh',
          background: '#ebeff2',
        }}
      >
        {
          currentScreen === SCREENS.EDIT && (
            <Edit
              onSave={handleSaveItem}
              content={content}
              editingIndex={editingIndex}
              onCancel={setScreenList}
              onDelete={handleDelete}
            />
          )
        }
        {
          currentScreen === SCREENS.IMPORT && (
            <Import
              onImport={handleImport}
              onCancel={setScreenList}
              content={content}
            />
          )
        }
        {
          currentScreen === SCREENS.LIST && (
            <List
              onSelectItem={handleSelectItem}
              content={content}
              onDelete={handleDelete}
              onImportJson={setScreenImport}
            />
          )
        }
        {
          (deletingIndex > -1) && (
            <Confirm
              onConfirm={handleConfirmDelete}
              onCancel={() => {setDeletingIndex(-1)}}
              content="Are you sure you want to delete this item?"
            />
          )
        }
      </Container>
    </div>
  );
}
