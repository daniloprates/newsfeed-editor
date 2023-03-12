import React, { useState, ChangeEvent } from 'react';
import { Container, Typography as Text, Box, Link, Button } from '@mui/material';
import { cloneDeep } from 'lodash';
import Edit from './screens/Edit';
import List from './screens/List';
import Confirm from './components/Confirm'
import testJson from './testJson.json';
import type { Screen, DaedalusSchema, DaedalusItemSchema } from './types';
import { SCREENS } from './config';

const initialState = testJson as DaedalusSchema;
const initialScreen: Screen = SCREENS.LIST;

export default function App() {

  const [currentScreen, setCurrentScreen] = useState(initialScreen);
  const [content, setContent] = useState<DaedalusSchema>(initialState);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [deletingIndex, setDeletingIndex] = useState(-1);
  const setScreenList = () => setCurrentScreen(SCREENS.LIST);
  const setScreenEdit = () => setCurrentScreen(SCREENS.EDIT);
  const handleEdit = (newContentItem: DaedalusItemSchema) => {
    if (editingIndex === -1) {
      return;
    }
    const newContent: DaedalusSchema = cloneDeep(content);
    newContent.items[editingIndex] = newContentItem;
    setContent(newContent);
    setScreenList();
    setEditingIndex(-1);
  }
  const handleSelectItem = (index: number) => {
    if (index < 0 || index > content.items.length - 1) {
      return;
    }
    setEditingIndex(index);
    setScreenEdit();
  }

  const handleDelete = (index: number) => {
    setDeletingIndex(index);
  }

  const handleConfirmDelete = () => {
    setDeletingIndex(-1);
    const newContent: DaedalusSchema = cloneDeep(content);
    newContent.items.splice(deletingIndex, 1);
    setContent(newContent);
    setScreenList();
    setEditingIndex(-1);
  }

  return (
    <Container
      maxWidth="lg"
      fixed
      sx={{
        padding: 5,
        minHeight: '100vh',
        background: '#ebeff2',
      }}
    >
      <Text variant="h2" component="h1" align="center" sx={{mb: 5}}>
        Newsfeed Editor
      </Text>
      {
        currentScreen === SCREENS.EDIT && (
          <Edit
            onEdit={handleEdit}
            content={content}
            editingIndex={editingIndex}
            onCancel={setScreenList}
            onDelete={handleDelete}
          />
        )
      }
      {
        currentScreen === SCREENS.LIST && (
          <List
            onSelectItem={handleSelectItem}
            content={content}
            onDelete={handleDelete}
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
  );
}
