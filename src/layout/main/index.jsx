import { Component } from 'inferno';
import { connect } from 'dva-inferno-no-router';

class Index extends Component {
  handleClick() {
    this.props.dispatch({
      type: 'utils/changeLocale',
      payload: {
        locale: 'en',
        i18n: {
          welcome: 'XXX',
        },
      },
    });
  }

  render() {
    const { i18n, locale } = this.props;
    return (
      <div>
        <div>222</div>
        <div>{i18n.welcome}</div>
        <div>{locale}</div>
        <div><button onClick={this.handleClick.bind(this)}>click</button></div>
      </div>
    );
  }
}

function mapStateToProps({ utils }) {
  return {
    i18n: utils.i18n,
    locale: utils.locale,
  };
}

export default connect(mapStateToProps)(Index);
