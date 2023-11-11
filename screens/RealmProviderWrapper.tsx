import React from 'react';
import Realm from 'realm';
import {RealmProvider} from '@realm/react';

export class DailyPracticeTimeGoal extends Realm.Object {
  static schema = {
    name: 'DailyPracticeTimeGoal',
    properties: {
      seconds: 'int',
    },
  };

  public seconds: number;
}

export class PracticeEntrySummary extends Realm.Object {
  _id!: Realm.BSON.ObjectId;

  static schema = {
    name: 'PracticeEntrySummary',
    properties: {
      _id: 'objectId',
      title: 'string',
      totalDuration: 'int',
      createdAt: 'date',
      updatedAt: 'date',
    },
  };

  public title: string;
  public totalDuration: number;
  public createdAt: Date;
  public updatedAt: Date;
}

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
  schema: [PracticeEntry, PracticeEntrySummary, DailyPracticeTimeGoal],
  schemaVersion: 6,
};

function RealmProviderWrapper({children}: {children: React.ReactNode}) {
  return <RealmProvider {...config}>{children}</RealmProvider>;
}

export default RealmProviderWrapper;
