import React, { Component } from 'react';
import { IonFab, IonFabButton, IonIcon, IonModal, IonButton, IonList, IonListHeader } from '@ionic/react';
import settings from 'ionicons/icons/imports/settings';
import Country from './Country';
import Years from './Years';
import storageService from '../services/storeageService';

class Settings extends Component {
  render() {
    return (
      <>
        <IonModal isOpen={this.props.open}>
          <IonList>
            <IonListHeader>Settings</IonListHeader>
            <Country initialValue={this.props.country} />
            <Years initialValue={this.props.year} />
          </IonList>
          <IonButton onClick={async () => {
            const country = await storageService.getObject('country');
            const year = await storageService.getObject('year');
            if (country && year) {
              const { onDone } = this.props;
              onDone();
            }
          }}>Done</IonButton>
        </IonModal>
        <IonFab vertical="top" horizontal="end" slot="fixed">
          <IonFabButton size="small" color="light" onClick={() => {
            this.props.onOpen();
          }}>
            <IonIcon icon={settings} />
          </IonFabButton>
        </IonFab>
      </>
    );
  }
}

export default Settings;