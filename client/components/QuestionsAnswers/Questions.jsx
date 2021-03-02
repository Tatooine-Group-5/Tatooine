/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Answers from './Answers';
import { GITHUB_API_KEY } from '../../../config';

const urlQuestions = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/questions/'; // productId comes from Props
const urlAnswers = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/answers/';

const Question = class extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      helpfulness: false,
      page: 1,
      count: 2,
    };

    this.getAnswersFromQuestionId = this.getAnswersFromQuestionId.bind(this);
    this.AddQuestionHelpfulness = this.AddQuestionHelpfulness.bind(this);
    this.handleAnswerHelpfulness = this.handleAnswerHelpfulness.bind(this);
    this.handleMoreAnswers = this.handleMoreAnswers.bind(this);
  }

  componentDidMount() {
    this.getAnswersFromQuestionId('get');
  }

  handleMoreAnswers() {
    const { page } = this.state;
    const newPage = page + 1;
    this.setState({
      page: newPage,
    }, () => {
      this.getAnswersFromQuestionId('get'); // Check
    });
  }

  handleAnswerHelpfulness(id) {
    axios.put(`${urlAnswers + id}/helpful`, '', {
      headers: {
        Authorization: GITHUB_API_KEY,
      },
    })
      .then((result) => {
        if (result.status === 204) {
          this.getAnswersFromQuestionId('refresh'); // Check
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getAnswersFromQuestionId(type) {
    const { id } = this.props;
    const { answers, page, count } = this.state;
    let fixedCall;

    if (type === 'get') {
      fixedCall = `${urlQuestions + id}/answers?page=${page}&count=${count}`;
    }
    if (type === 'refresh') {
      fixedCall = `${urlQuestions + id}/answers?page=${1}&count=${count * page}`;
    }

    axios.get(fixedCall, {
      headers: {
        Authorization: GITHUB_API_KEY,
      },
    })
      .then((response) => {
        if (type === 'get') {
          const newAnswers = [...answers, ...response.data.results];
          this.setState({
            answers: newAnswers,
          });
        }
        if (type === 'refresh') {
          this.setState({
            answers: response.data.results,
          });
        }
      })
      .catch((err) => {
        console.log(err); // Create error boundary
      });
  }

  AddQuestionHelpfulness() {
    const { id, handleQuestionHelpfulness } = this.props;
    const { helpfulness } = this.state;
    if (!helpfulness) {
      handleQuestionHelpfulness(id);
      this.setState({
        helpfulness: true,
      });
    }
  }

  render() {
    const { question } = this.props;
    const { answers } = this.state;
    const {
      question_body,
      question_helpfulness,
    } = question;
    return (
      <div>
        <div>
          <div className="question-blocks">
            <span>
              <b>
                Q:
              </b>
              { ` ${question_body}`}
            </span>
          </div>
          <div className="question-options">
            <div>
              <div className="question-format">
                <span>
                  {'Helpful? '}
                  <u
                    className="pointer"
                    onClick={() => this.AddQuestionHelpfulness()}
                    onKeyDown={this.handleButtonClick}
                    role="button"
                    tabIndex={0}
                  >
                    Yes
                  </u>
                  {` (${question_helpfulness})`}
                </span>
              </div>
              <div className="question-format reset">
                <span>
                  <u>
                    Add Answer
                  </u>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div>
          {answers.map((answer) => (
            <Answers
              key={answer.answer_id}
              id={answer.answer_id}
              answer={answer}
              AnswerHelpfulness={this.handleAnswerHelpfulness}
              AnswerReport={this.handleAnswerReport}
            />
          ))}
        </div>
        <div>
          <button
            type="button"
            onClick={this.handleMoreAnswers}
          >
            More Answers
          </button>
        </div>
      </div>
    );
  }
};

Question.propTypes = {
  id: PropTypes.number.isRequired,
  handleQuestionHelpfulness: PropTypes.func.isRequired,
  question: PropTypes.shape({
    question_body: PropTypes.string.isRequired,
    question_helpfulness: PropTypes.number.isRequired,
  }).isRequired,
};

export default Question;