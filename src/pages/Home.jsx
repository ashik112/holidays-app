import { IonContent, IonPage, withIonLifeCycle } from '@ionic/react';
import React, { Component } from 'react';
import HolidaysListView from './Holidays/HolidaysListView';
import Settings from '../shared/Settings';
import storageService from '../services/storeageService';

class Home extends Component {
	constructor(props) {
		super(props);
		this.doneSettings = this.doneSettings.bind(this);
		this.onClickSettings = this.onClickSettings.bind(this);
		this.state = {
			country: null,
			year: null,
			openSettings: false,
			loaded: false,
		};
	}

	componentDidMount() {
		this.doneSettings();
	}

	onClickSettings = () => {
		this.setState({
			openSettings: true,
		})
	};

	doneSettings = async () => {
		await this.setState({
			loaded: false,
		})
		const country = await storageService.getObject('country');
		const year = await storageService.getObject('year');
		await this.setState({
			country,
			year,
			openSettings: false,
			loaded: true,
		});
	};

	render() {
		return (
			<IonPage>
				<IonContent fullscreen>
					{
						this.state.loaded && (
							<>
								<Settings
									country={this.state.country}
									year={this.state.year}
									onOpen={this.onClickSettings}
									onDone={this.doneSettings}
									open={(!(this.state.country) || !(this.state.year) || (this.state.openSettings))}
								/>
								{(this.state.country) && (this.state.year) && (<HolidaysListView country={this.state.country} year={this.state.year} />)}
							</>
						)

					}
				</IonContent>
			</IonPage>
		);
	}
};

export default withIonLifeCycle(Home);
