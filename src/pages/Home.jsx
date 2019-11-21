import { IonContent, IonPage} from '@ionic/react';
import React from 'react';
import HolidaysListView from './Holidays/HolidaysListView';
import SingleDay from './Holidays/components/SingleDay';

const Home = () => {
  return (
    <IonPage>
      <IonContent>
        <div style={{
          display: 'block',
          position: "fixed",
          top: 0,
          zIndex: 1,
          width: '100%',
          opacity: 0.5,
        }}>
          <SingleDay description="2019" day="Holidays of Bangladesh"/>
        </div>
        <div style={{
          marginTop: '85px',
        }}>
          <HolidaysListView />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
