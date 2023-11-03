import React from 'react';
import {Realm, RealmProvider} from '@realm/react';

class PracticeEntry extends Realm.Object {
  static schema = {
    name: 'PracticeEntry',
    properties: {
      title: 'string',
      duration: 'int',
    },
  };
}

function RealmProviderWrapper({children}) {
  return <RealmProvider schema={[PracticeEntry]}>{children}</RealmProvider>;
}

export default RealmProviderWrapper;
