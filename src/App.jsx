import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import { Plugins } from '@capacitor/core';

const { AdMob } = Plugins;

class App extends Component {
    constructor(props) {
        super(props);
        try {
            AdMob.initialize('ca-app-pub-7599602508699161~8716527808');
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return(
            <IonApp>
                <IonReactRouter>
                    <IonRouterOutlet>
                        <Route path="/home" component={Home} exact={true} />
                        <Route exact path="/" render={() => <Redirect to="/home" />} />
                        {/* <Route path="/:tab(sessions)" component={SessionsPage} exact={true} />
                        <Route path="/:tab(speakers)" component={SpeakerList} exact={true} /> */}
                    </IonRouterOutlet>
                </IonReactRouter>
            </IonApp>
        );
    }
}

export default App;
