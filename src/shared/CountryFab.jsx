import React, { Component } from 'react';
import { IonFab, IonFabButton, IonIcon, IonModal, IonButton, IonList, IonListHeader } from '@ionic/react';
import { Plugins } from '@capacitor/core';
import iconFlag from 'ionicons/icons/imports/flag';
import iconSave from 'ionicons/icons/imports/save';
import iconCancel from 'ionicons/icons/imports/backspace';
import Country from './Country';
import Years from './Years';
import storageService from '../services/storeageService';

const { App } = Plugins;

class CountryFab extends Component {
  componentDidMount() {
    const { onCancel } = this.props;
    App.addListener('backButton', (data) => {
      console.log("on close");
      onCancel();
    });
  }

  render() {
    return (
      <>
        <IonModal isOpen={this.props.open}>
          <IonList>
            <IonListHeader>Selection</IonListHeader>
            <Country initialValue={this.props.country} />
            <Years initialValue={this.props.year} />
            <IonButton
              style={{
                float: 'right',
              }}
              color="danger"
              onClick={async () => {
                const { onCancel } = this.props;
                onCancel();
              }}
            >
              <IonIcon icon={iconCancel} /> Cancel
            </IonButton>
            <IonButton
              style={{
                '--background': '#4CAF50',
                float: 'right',
              }}
              onClick={async () => {
                const country = await storageService.getObject('country');
                const year = await storageService.getObject('year');
                if (country && year) {
                  const { onDone } = this.props;
                  onDone();
                }
              }}
            >
              <IonIcon icon={iconSave} /> Done
            </IonButton>
          </IonList>
        </IonModal>
        <IonFab
          vertical="top"
          horizontal="start"
          slot="fixed"
          style={{
            marginTop: '11px'
          }}
        >
          <IonFabButton size="small" color="light" onClick={() => {
            const { onOpen } = this.props;
            onOpen();
          }}>
            <IonIcon icon={iconFlag} />
          </IonFabButton>
        </IonFab>
      </>
    );
  }
}

export default CountryFab;
