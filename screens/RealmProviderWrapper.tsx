import React from 'react';
import Realm from 'realm';
import {RealmProvider} from '@realm/react';

export class Skipped extends Realm.Object {
  static schema = {
    name: 'Skipped',
    properties: {
      lastUpdated: 'date',
      entryTitles: 'string{}',
    },
  };

  public lastUpdated: Date = new Date();
  public entryTitles: {[key: string]: string} = {};
}

export class Completed extends Realm.Object {
  static schema = {
    name: 'Completed',
    properties: {
      entryTitles: 'string{}',
    },
  };

  public entryTitles: {[key: string]: string} = {};
}

export class DailyPracticeTimeGoal extends Realm.Object {
  static schema = {
    name: 'DailyPracticeTimeGoal',
    properties: {
      seconds: 'int',
    },
  };

  public seconds: number = 0;
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
      practiceScore: 'int',
      bpm: 'int?',
    },
  };

  public title: string = '';
  public totalDuration: number = 0;
  public bpm: number | null = 0;
  public createdAt: Date = new Date();
  public updatedAt: Date = new Date();
  public practiceScore: number = 0;
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
      bpm: 'int?',
    },
  };

  public title: string = '';
  public duration: number = 0;
  public bpm: number | null = 0;
  public createdAt: Date = new Date();
}

const config: Realm.Configuration = {
  schema: [
    PracticeEntry,
    PracticeEntrySummary,
    DailyPracticeTimeGoal,
    Skipped,
    Completed,
  ],
  schemaVersion: 9,
};

function RealmProviderWrapper({children}: {children: React.ReactNode}) {
  return <RealmProvider {...config}>{children}</RealmProvider>;
}

export default RealmProviderWrapper;
