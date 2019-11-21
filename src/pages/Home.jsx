import { IonContent, IonPage, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import React from 'react';
import HolidaysListView from './Holidays/HolidaysListView';
import settings from 'ionicons/icons/imports/settings';

const Home = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
       {/*-- fab placed to the top end --*/}
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton>
          <IonIcon icon={settings} />
        </IonFabButton>
      </IonFab>
        <HolidaysListView country="Bangladesh" year={2019} />
      </IonContent>
    </IonPage>
  );
};

export default Home;
