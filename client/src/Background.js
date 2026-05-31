import { PureComponent } from 'react';

class Background extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { fullImageLoaded: false };
  }

  componentDidMount() {
    const img = new Image();
    img.src = this.props.imgSrc;
    img.onload = () => this.setState({ fullImageLoaded: true });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.imgSrc !== this.props.imgSrc) {
      this.setState({ fullImageLoaded: false });
      const img = new Image();
      img.src = this.props.imgSrc;
      img.onload = () => this.setState({ fullImageLoaded: true });
    }
  }

  render() {
    const { imgSrc, placeholderSrc, id, responsive, children } = this.props;
    const { fullImageLoaded } = this.state;

    const style = {
      backgroundImage: fullImageLoaded
        ? `url('${imgSrc}')`
        : `url('${placeholderSrc || imgSrc}')`,
      filter: fullImageLoaded ? 'none' : 'blur(12px)',
      transform: fullImageLoaded ? 'none' : 'scale(1.05)', // prevents blur edges showing
      transition: 'filter 0.6s ease, transform 0.6s ease',
    };

    const responsiveClass = responsive ? 'bg-div--responsive' : 'bg-div';

    return (
      <div className="view layer" data-depth="0.1">
        <div id={id} className={`content ${responsiveClass}`} style={style}>
          {children}
        </div>
      </div>
    );
  }
}

export default Background;