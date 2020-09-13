import React, { PureComponent } from 'react';
import Background from './Background';

import * as constants from './constants';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const CCALogo = `${constants.STATICURL}/CCA_RGB_colour_e.svg`;

const backgroundImgSrc = `${constants.STATICURL}/images/bg-mirrors.jpg`;

class Mirrors extends PureComponent {
  // constructor(props) {
  //   super(props);
  //   // this.handleNavigationClick = this.handleNavigationClick.bind(this);
  // }

  // handleNavigationClick(target) {
  //   if (target === 'waiting') {
  //     this.props.onEnterWaiting();
  //   }
  //   else if (target === 'bathroom') {
  //     this.setState({ currentView: 'bathroom' });
  //   }
  // }
  // 

  render() {
    var credits = <>
              <div className="col-1">
                <h1>MAKE-BELIEVE BATHROOM</h1>
                <p>
                  Created by Amy Lam<br/>
                  Web developer: Naomi Cui<br/>
                  3D renderings & animations: Emerson Maxwell<br/>
                  Soundscape: Vic Cheong<br/>
                  Graffiti: Haeahn Kwon, Caley Feeney<br/>
                  Audio descriptive guide: Aliya Pabani
                </p>
                <p>
                  Curator: Jenn Jackson<br/>
                  With contributions from Jon McCurley
                </p>
                <p>
                  We acknowledge the support of the Canada Council for the Arts<br/>
                  <img className="cca-logo" src={CCALogo} alt="Canada Council for the Arts" />
                </p>
              </div>
              <div className="col-2">
                <h2>TOILETS FOR ALL</h2>
                <p>Download and share window stickers created by the Toronto Bathroom Codes project. These stickers advocate for businesses and other organizations to allow their bathrooms to be used by anyone.</p>
                <p><a href="freeourpee" alt="Pee for free, free to pee.">
                <img src="https://virtual-bathroom-assets.s3.us-east-2.amazonaws.com/freeourpee/washfinals-small.png" /></a></p>
                <p>Pee for free, free to pee.</p>
                <h2>SUBMIT A POSTER</h2>
                <p>To post a poster or public notice to the Make-Believe Bathroom, please send a PNG file to <strong>xxemail@gmail.com</strong></p>
              </div>
              <div>
                <a href="/" className="neon">Try the Make-Believe Bathroom Experience Again?</a>
              </div>
            </>
    return (
      <Background id="mirrors" imgSrc={backgroundImgSrc}>
        <div className="layer" data-depth="0.4">
          <div className="mirrors-content">
          {credits}
          </div>
        </div>
      </Background>
    );
  }

}

export default Mirrors;