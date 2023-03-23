import React from 'react';
import type { DaedalusSchema } from '../types';
import ListNew from './ListNew';
import ListItems from './ListItems';
import ListEmpty from './ListEmpty';

interface Props {
  content?: DaedalusSchema,
  onSelectItem: Function,
  onDelete: Function,
  onImportJson: Function,
  onUseExample: Function,
}

function ListScreen({
  content,
  onDelete,
  onImportJson,
  onSelectItem,
  onUseExample,
}: Props) {
  const { items: list = [] } = content || {};
  return (
    <div>
      <ListNew
        onSelectItem={onSelectItem}
      />
      {
        !!content
        ? (
          <ListItems
            list={list}
            onDelete={onDelete}
            onSelectItem={onSelectItem}
          />
        )
        : (
          <ListEmpty
            onImportJson={onImportJson}
            onUseExample={onUseExample}
          />
        )
      }
    </div>
  );
}

export default ListScreen;
