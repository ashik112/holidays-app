import {
  IonContent,
  IonPage,
  withIonLifeCycle,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonIcon,
} from '@ionic/react';
import React, { Component } from 'react';
import HolidaysListView from './Holidays/HolidaysListView';
//import Settings from '../shared/Settings';
import storageService from '../services/storeageService';
import jsonHolidays from '../assets/global_public_holiday';
import HolidaysTableView from './Holidays/HolidaysTableView';
import HolidayPageTopBar from './Holidays/components/HolidayPageTopBar';
import iconFlag from 'ionicons/icons/imports/flag';
import { Plugins } from '@capacitor/core';
import { AdSize, AdPosition } from 'capacitor-admob';
import CountryFab from '../shared/CountryFab';
import SwitchViewFab from '../shared/SwitchViewFab';

// eslint-disable-next-line no-unused-vars
const { AdMob } = Plugins;

// eslint-disable-next-line no-unused-vars
const options = {
	adId: 'ca-app-pub-3940256099942544/6300978111',
	adSize: AdSize.Banner,
	position: AdPosition.BOTTOM_CENTER
};

class Home extends Component {
	constructor(props) {
		super(props);
		this.doneSettings = this.doneSettings.bind(this);
		this.onClickSettings = this.onClickSettings.bind(this);
		this.switchView = this.switchView.bind(this);
		this.contentRef = React.createRef();
		this.state = {
			tableView: true,
			openSettings: false,
			loaded: false,
			countryData: {},
		};
	}

	componentDidMount() {
		this.doneSettings().then();
		try {
			// Show Banner Ad
			/*AdMob.showBanner(options)
				.then(
					(value) => {
						console.log(value);  // true
					},
					(error) => {
						console.log(error); // show error
					}
				);*/

			/*AdMob.addListener('onAdLoaded', (info) => {
				console.log("Banner Ad Loaded");
			});*/
		} catch (e) {
			console.log(e);
		}
	}

	onClickSettings = () => {
		this.setState({
			openSettings: true,
		})
	};

	cancelSettings = async () => {
		await this.setState({
			openSettings: false,
		});
	};

	doneSettings = async () => {
		await this.setState({
			loaded: false,
		});
		const country = await storageService.getObject('country');
		const year = await storageService.getObject('year');
		if(country===null || year===null) {
			await this.setState({
				countryData: {
					country: null,
					year: null,
					days: [],
				},
				openSettings: true,
				loaded: true,
			});
		} else {
			let tempDays = [];
			if(jsonHolidays && jsonHolidays[country] && jsonHolidays[country][year]) {
				tempDays = jsonHolidays[country][year];
			}
			await this.setState({
				countryData: {
					country: country,
					year: year,
					days: tempDays,
				},
				openSettings: false,
				loaded: true,
			});
		}
	};

	switchView = () => {
		const { tableView } = this.state;
		this.setState({
			tableView: !tableView,
		});
		this.contentRef.current.scrollToTop();
	};

	render() {
		const { countryData, openSettings, loaded, tableView } = this.state;
		const { country, year } = countryData;
		return (
			<IonPage>
				<IonContent
					fullscreen
					ref={this.contentRef}
					scrollEvents={true}
				>
					{
						loaded && (
							<>
								<CountryFab
									country={country}
									year={year}
									onOpen={this.onClickSettings}
									onDone={this.doneSettings}
									onCancel={this.cancelSettings}
									open={(openSettings)}
								/>
								<SwitchViewFab
									switchView={this.switchView}
								/>
								<div
									style={{
										display: 'block',
										position: "fixed",
										top: 0,
										width: '100%',
										zIndex: 1,
									}}
								>
									<HolidayPageTopBar
										countryName={country===null? 'UNKNOWN' : country}
										year={`${year===null? 'UNKNOWN' : year}`}
									/>
								</div>
								<div style={{
									position: "relative",
									marginTop: '97px',
								}}>
									{(country) && (year) && tableView && (<HolidaysTableView style={{ position: 'relative' }} countryData={countryData} />)}
									{(country) && (year) && !tableView && (<HolidaysListView countryData={countryData} />)}
									{((!country) || (!year)) && (
									    <IonCard>
                                          <IonCardHeader>
                                            <IonCardTitle>No Data!</IonCardTitle>
                                          </IonCardHeader>'
                                          <IonCardContent>
                                            Please select country and year. Press <IonIcon icon={iconFlag} />
                                          </IonCardContent>
                                        </IonCard>
                                    )}
								</div>
							</>
						)
					}
				</IonContent>
			</IonPage>
		);
	}
}

export default withIonLifeCycle(Home);
