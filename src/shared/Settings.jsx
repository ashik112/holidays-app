import React, { Component } from 'react';
import { IonFab, IonFabButton, IonIcon, IonModal, IonButton, IonList, IonListHeader, IonFabList } from '@ionic/react';
import settings from 'ionicons/icons/imports/settings';
import expand from 'ionicons/icons/imports/code-download';
import iconSwitch from 'ionicons/icons/imports/swap';
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
          <IonButton color="success" onClick={async () => {
            const country = await storageService.getObject('country');
            const year = await storageService.getObject('year');
            if (country && year) {
              const { onDone } = this.props;
              onDone();
            }
          }}>Done</IonButton>
        </IonModal>
        <IonFab
          vertical="top"
          horizontal="end"
          slot="fixed"
          style={{
            marginTop: '11px'
          }}
        >
          <IonFabButton color="light" size="small">
            <IonIcon  icon={expand} />
          </IonFabButton>
          <IonFabList side="start">
            <IonFabButton size="small" color="light" onClick={() => {
              const { switchView } = this.props;
              switchView();
            }}>
              <IonIcon icon={iconSwitch} />
            </IonFabButton>
          </IonFabList>
          <IonFabList side="bottom">
            <IonFabButton size="small" color="light" onClick={() => {
              const { onOpen } = this.props;
              onOpen();
            }}>
              <IonIcon icon={settings} />
            </IonFabButton>
          </IonFabList>
        </IonFab>
      </>
    );
  }
}

export default Settings;
