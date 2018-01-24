import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

// Import Style
import styles from './LostCreateWidget.css';

export class LostCreateWidget extends Component {
  addLost = () => {
    const nameRef = this.refs.name;
    const titleRef = this.refs.title;
    const contentRef = this.refs.content;
    if (nameRef.value && titleRef.value && contentRef.value) {
      this.props.addLost(nameRef.value, titleRef.value, contentRef.value);
      nameRef.value = titleRef.value = contentRef.value = '';
    }
  };

  render() {
    const cls = `${styles.form} ${(this.props.showAddLost ? styles.appear : '')}`;
    return (
      <div className={cls}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}><FormattedMessage id="createNewLost" /></h2>
          <input placeholder={this.props.intl.messages.authorName} className={styles['form-field']} ref="name" />
          <input placeholder={this.props.intl.messages.lostTitle} className={styles['form-field']} ref="title" />
          <textarea placeholder={this.props.intl.messages.lostContent} className={styles['form-field']} ref="content" />
          <a className={styles['lost-submit-button']} href="#" onClick={this.addLost}><FormattedMessage id="submit" /></a>
        </div>
      </div>
    );
  }
}

LostCreateWidget.propTypes = {
  addLost: PropTypes.func.isRequired,
  showAddLost: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(LostCreateWidget);
