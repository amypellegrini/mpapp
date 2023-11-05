import React from 'react';
import Realm from 'realm';
import {RealmProvider} from '@realm/react';

export class PracticeEntry extends Realm.Object {
  _id!: Realm.BSON.ObjectId;

  static schema = {
    name: 'PracticeEntry',
    properties: {
      _id: 'objectId',
      title: 'string',
      duration: 'int',
      createdAt: 'date',
    },
  };

  public title: string;
  public duration: number;
  public createdAt: Date;
}

const config: Realm.Configuration = {
  schema: [PracticeEntry],
  schemaVersion: 2,
};

function RealmProviderWrapper({children}) {
  return <RealmProvider {...config}>{children}</RealmProvider>;
}

export default RealmProviderWrapper;
