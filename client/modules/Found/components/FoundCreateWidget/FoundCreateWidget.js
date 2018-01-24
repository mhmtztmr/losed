import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

// Import Style
import styles from './FoundCreateWidget.css';

export class FoundCreateWidget extends Component {
  addFound = () => {
    const nameRef = this.refs.name;
    const titleRef = this.refs.title;
    const contentRef = this.refs.content;
    if (nameRef.value && titleRef.value && contentRef.value) {
      this.props.addFound(nameRef.value, titleRef.value, contentRef.value);
      nameRef.value = titleRef.value = contentRef.value = '';
    }
  };

  render() {
    const cls = `${styles.form} ${(this.props.showAddFound ? styles.appear : '')}`;
    return (
      <div className={cls}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}><FormattedMessage id="createNewFound" /></h2>
          <input placeholder={this.props.intl.messages.authorName} className={styles['form-field']} ref="name" />
          <input placeholder={this.props.intl.messages.foundTitle} className={styles['form-field']} ref="title" />
          <textarea placeholder={this.props.intl.messages.foundContent} className={styles['form-field']} ref="content" />
          <a className={styles['found-submit-button']} href="#" onClick={this.addFound}><FormattedMessage id="submit" /></a>
        </div>
      </div>
    );
  }
}

FoundCreateWidget.propTypes = {
  addFound: PropTypes.func.isRequired,
  showAddFound: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(FoundCreateWidget);
