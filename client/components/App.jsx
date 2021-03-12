import React from 'react';
import RandR from './RandR/index';
import Overview from './overview/Overview';
import QuestionsAnswers from './QuestionsAnswers/QuestionsAnswers';
import RelatedProduct from './RelatedProduct/RelatedProduct';
// import Config from '../../config.js';
const pId = 19092;
const pName = `Slacker's Slacks`;

const App = () => (
  <div>
    <Overview pId={pId} />
    <RelatedProduct pId={pId} />
    <QuestionsAnswers pId={pId} pName={pName} />
    <RandR productId={pId} pName={pName} />
  </div>
);

export default App;
