import React, { Component } from 'react';
import { IonFab, IonFabButton, IonIcon, IonModal, IonButton, IonList, IonListHeader } from '@ionic/react';
import settings from 'ionicons/icons/imports/settings';
import Country from './Country';
import Years from './Years';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    }
  }

  render() {
    const { modal } = this.state;
    return (
      <>
        <IonModal isOpen={modal}>
          <IonList>
            <IonListHeader>Settings</IonListHeader>
            <Country />
            <Years />
          </IonList>
          <IonButton onClick={() => this.setState({ modal: false })}>Done</IonButton>
        </IonModal>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => this.setState({ modal: true })}>
            <IonIcon icon={settings} />
          </IonFabButton>
        </IonFab>
      </>
    );
  }
}

export default Settings;