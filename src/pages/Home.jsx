import { IonContent, IonPage, withIonLifeCycle } from '@ionic/react';
import React, { Component } from 'react';
import HolidaysListView from './Holidays/HolidaysListView';
import Settings from '../shared/Settings';
import storageService from '../services/storeageService';
import jsonHolidays from '../assets/global_public_holiday';
import HolidaysTableView from './Holidays/HolidaysTableView';
import HolidayPageTopBar from './Holidays/components/HolidayPageTopBar';

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
			await this.setState({
				countryData: {
					country: country,
					year: year,
					days: jsonHolidays[country][year],
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
								<Settings
									country={country}
									year={year}
									onOpen={this.onClickSettings}
									onDone={this.doneSettings}
									onCancel={this.cancelSettings}
									switchView={this.switchView}
									open={(!(country) || !(year) || (openSettings))}
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
										countryName={country}
										year={`${year}`}
									/>
								</div>
								<div style={{
									position: "relative",
									marginTop: '97px',
								}}>
									{(country) && (year) && tableView && (<HolidaysTableView style={{ position: 'relative' }} countryData={countryData} />)}
									{(country) && (year) && !tableView && (<HolidaysListView countryData={countryData} />)}
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
