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
    },
  };

  public title: string;
  public duration: number;
}

const config: Realm.Configuration = {
  schema: [PracticeEntry],
  schemaVersion: 1,
};

function RealmProviderWrapper({children}) {
  return <RealmProvider {...config}>{children}</RealmProvider>;
}

export default RealmProviderWrapper;
