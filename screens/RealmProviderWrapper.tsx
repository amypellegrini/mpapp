import React from 'react';
import {Realm, RealmProvider} from '@realm/react';

export class PracticeEntry extends Realm.Object {
  static schema = {
    name: 'PracticeEntry',
    properties: {
      title: 'string',
      duration: 'int',
    },
  };

  public title: string;
  public duration: number;
}

function RealmProviderWrapper({children}) {
  return <RealmProvider schema={[PracticeEntry]}>{children}</RealmProvider>;
}

export default RealmProviderWrapper;
