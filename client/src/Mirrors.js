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
              <div className="row">
                <h1>MAKE-BELIEVE BATHROOM</h1>
              </div>
              <div className="credits-content">
                <div className="row">
                  <div className="col-1">
                    <dl>
                      <dt>
                        Created by <strong>Amy Lam</strong>
                      </dt>
                    </dl>
                    <dl>
                      <dt>Web developer:</dt> 
                      <dd><a href="http://nowme.ca" target="_blank">Naomi Cui</a></dd>
                      <dt>3D renderings & animations:</dt>
                      <dd><a href="http://www.emersonmaxwell.com" target="_blank">Emerson Maxwell</a></dd>
                      <dt>Soundscape:</dt>
                      <dd><a href="www.newchance.biz" target="_blank">Vic Cheong</a></dd>
                      <dt>Graffiti:</dt>
                      <dd><a href="www.haeahnkwon.com" target="_blank">Haeahn Kwon</a></dd>
                      <dd><a href="https://caleysweetnsour.productions" target="_blank">Caley Feeney</a></dd>
                      <dt>Audio description:</dt>
                      <dd><a href="https://twitter.com/aliyapabani" target="_blank">Aliya Pabani</a></dd>    
                      <dt>Curator:</dt>
                      <dd>Jenn Jackson</dd>
                    </dl>
                    <p>
                      With contributions from <strong>Jon McCurley</strong>
                    </p>
                    <p>
                      We acknowledge the support of the <strong>Canada Council for the Arts</strong>.<br/>
                      <em>Make-Believe Bathroom</em> was produced with the support of <a href="https://www.sfu.ca/galleries.html" target="_blank"><strong>SFU Galleries</strong></a>.<br/>
                      <img className="cca-logo" src={CCALogo} alt="Canada Council for the Arts" />
                      <img src="https://virtual-bathroom-assets.s3.us-east-2.amazonaws.com/SFUGalleries_logo.png" />
                    </p>
                  </div>
                  <div className="col-2">
                    <h2><a href="http://freeourpee.publicbathroom.online/">TOILETS FOR ALL</a></h2>
                    <a href="http://freeourpee.publicbathroom.online/"><img id="free-our-pee-logo" src="https://virtual-bathroom-assets.s3.us-east-2.amazonaws.com/freeourpee/washfinals-small.png" /></a>
                    <p>A sticker project in collaboration with TO Toilet Codes. Read more and download the stickers <a href="http://freeourpee.publicbathroom.online/">here</a>.</p>
                    <h2><a href="mailto:amyclam@gmail.com">SUBMIT A POSTER</a></h2>
                    <p>To post a poster or public notice to the <em>Make-Believe Bathroom</em>, please send a PNG file to <strong>amyclam@gmail.com</strong>.</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div id="try-again"><a href="/" className="neon">Try the Make-Believe Bathroom Again?</a></div>
              </div>
            </>
    return (
      <Background id="mirrors" imgSrc={backgroundImgSrc}>
        <div className="bg-layer">
          <div className="mirrors-content">
          {credits}
          </div>
        </div>
      </Background>
    );
  }

}

export default Mirrors;