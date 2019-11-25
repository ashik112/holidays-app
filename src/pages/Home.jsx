import { IonContent, IonPage, withIonLifeCycle } from '@ionic/react';
import React, { Component } from 'react';
import HolidaysListView from './Holidays/HolidaysListView';
import Settings from '../shared/Settings';
import storageService from '../services/storeageService';
import jsonHolidays from '../assets/global_public_holiday';

class Home extends Component {
	constructor(props) {
		super(props);
		this.doneSettings = this.doneSettings.bind(this);
		this.onClickSettings = this.onClickSettings.bind(this);
		this.state = {
			openSettings: false,
			loaded: false,
			countryData: {},
		};
	}

	componentDidMount() {
		this.doneSettings().then();
	}

	onClickSettings = () => {
		this.setState({
			openSettings: true,
		})
	};

	doneSettings = async () => {
		await this.setState({
			loaded: false,
		});
		const country = await storageService.getObject('country');
		const year = await storageService.getObject('year');
		const holidays = jsonHolidays[country][year];
		const list = [];
		for (let i=0; i < holidays.length;++i){
			const holiday = holidays[i];
			list.push({
				day: holiday[0],
				weekDay: holiday[1],
				name: holiday[2],
				type: holiday[3],
				location: holiday[4],
				detailsURL: holiday[5],
			});
		}
		await this.setState({
			countryData: {
				country: country,
				year: year,
				days: list,
			},
			openSettings: false,
			loaded: true,
		});
	};

	render() {
		const { countryData, openSettings, loaded } = this.state;
		const { country, year } = countryData;
		return (
			<IonPage>
				<IonContent fullscreen>
					{
						loaded && (
							<>
								<Settings
									country={country}
									year={year}
									onOpen={this.onClickSettings}
									onDone={this.doneSettings}
									open={(!(countryData.country) || !(countryData.year) || (openSettings))}
								/>
								{(country) && (year) && (<HolidaysListView countryData={countryData} />)}
							</>
						)

					}
				</IonContent>
			</IonPage>
		);
	}
}

export default withIonLifeCycle(Home);
