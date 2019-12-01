import React, { Component } from 'react';
import { IonFab, IonFabButton, IonIcon } from '@ionic/react';
import iconSwitch from 'ionicons/icons/imports/swap';

class SwitchViewFab extends Component {
  render() {
    return (
      <>
        <IonFab
          vertical="top"
          horizontal="end"
          slot="fixed"
          style={{
            marginTop: '11px'
          }}
        >
            <IonFabButton size="small" color="light" onClick={() => {
              const { switchView } = this.props;
              switchView();
            }}>
              <IonIcon icon={iconSwitch} />
            </IonFabButton>
        </IonFab>
      </>
    );
  }
}

export default SwitchViewFab;
