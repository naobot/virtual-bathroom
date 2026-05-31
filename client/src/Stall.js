import { PureComponent } from 'react';

const STALL_IMAGES = {
  front: { full: require('./assets/images/bg-stall-front.webp'), placeholder: require('./assets/images/bg-stall-front-placeholder.webp') },
  back:  { full: require('./assets/images/bg-stall-back.webp'),  placeholder: require('./assets/images/bg-stall-back-placeholder.webp') },
  left:  { full: require('./assets/images/bg-stall-left.webp'),  placeholder: require('./assets/images/bg-stall-left-placeholder.webp') },
  right: { full: require('./assets/images/bg-stall-right.webp'), placeholder: require('./assets/images/bg-stall-right-placeholder.webp') },
  up:    { full: require('./assets/images/bg-stall-up.webp'),    placeholder: require('./assets/images/bg-stall-up-placeholder.webp') },
};

export default class Stall extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { fullImageLoaded: false };
  }

  componentDidMount() {
    const images = STALL_IMAGES[this.props.direction];
    if (!images) return; // stall-down is a GIF, handled by CSS

    const img = new Image();
    img.src = images.full;
    img.onload = () => this.setState({ fullImageLoaded: true });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.direction !== this.props.direction) {
      this.setState({ fullImageLoaded: false });
      const images = STALL_IMAGES[this.props.direction];
      if (!images) return;

      const img = new Image();
      img.src = images.full;
      img.onload = () => this.setState({ fullImageLoaded: true });
    }
  }

  render() {
    const { direction, className, children } = this.props;
    const { fullImageLoaded } = this.state;
    const images = STALL_IMAGES[direction];

    const bgStyle = images ? {
      backgroundImage: fullImageLoaded
        ? `url('${images.full}')`
        : `url('${images.placeholder}')`,
      filter: fullImageLoaded ? 'none' : 'blur(12px)',
      transform: fullImageLoaded ? 'none' : 'scale(1.05)',
      transition: 'filter 0.6s ease, transform 0.6s ease',
    } : {};

    return (
      <div id={`stall-${direction}`} className={`layer ${className}`} data-depth="0.2" style={bgStyle}>
        <div className="content">
          {this.props.children}
        </div>
      </div>
    );
  }
}