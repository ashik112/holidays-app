import { IonContent, IonPage} from '@ionic/react';
import React from 'react';
import HolidaysListView from './Holidays/HolidaysListView';

const Home = () => {
  return (
    <IonPage>
      <IonContent>
          <HolidaysListView country="Bangladesh" year={2019} />
      </IonContent>
    </IonPage>
  );
};

export default Home;
