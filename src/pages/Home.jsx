import { IonContent, IonPage } from '@ionic/react';
import React from 'react';
import HolidaysListView from './Holidays/HolidaysListView';
import Settings from '../shared/Settings';

const Home = () => {
	return (
		<IonPage>
			<IonContent fullscreen>
				<Settings />
				<HolidaysListView country="Slovakia" year={2019} />
			</IonContent>
		</IonPage>
	);
};

export default Home;
