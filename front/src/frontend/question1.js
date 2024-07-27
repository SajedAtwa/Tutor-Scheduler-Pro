import React, { useState } from 'react';

import PropTypes from 'prop-types'

import './question1.css'

const Question1 = ({ question, answer }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={`faq-item ${isActive ? 'active' : ''}`} onClick={() => setIsActive(!isActive)}>
      <div className="faq-question">
        {question}
        <span className="faq-arrow">▼</span>
      </div>
      <div className="faq-answer">{answer}</div>
    </div>
  );
};

Question1.defaultProps = {
  answer:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non volutpat turpis. Mauris luctus rutrum mi ut rhoncus.',
  question: 'What types of cars do you sell?',
}

Question1.propTypes = {
  answer: PropTypes.string,
  question: PropTypes.string,
}

export default Question1
