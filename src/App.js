// import logo from './logo.svg'; - removed unused import
// import './App.css';
// import { Assessment } from '@hirist/assessment';
import { ScreeningJobSeeker } from '@hirist/screening';
// import { Assessment } from '@hirist/assessment';
import axios from 'axios';
import React from 'react'; // Explicitly import React

export const mockAssessmentProps = {
    questionnaireId: '5eea16595837f50fde0cb254',
    user: 'Utkarsh',
    seeker: 1821269,
    associationPublished: 1649515,
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMwMzAwODYiLCJkb21haW4iOiJoaXJpc3QuY29tIiwic3RhdHVzIjoxLCJ0eXBlIjoyLCJleHBpcmUiOjE3NzgwNDY3Mjg1NTgsImlhdCI6MTc3ODA0NjcyNiwiZXhwIjoxOTM1NzI2NzI2fQ.UfojfYVK2NjQo9JypNGFF73OCXSaDYcFaji0ckPMox4',
    competitionId: 1746382,
    redirectUrl: 'https://www.hirist.com',
    isProd: false, // false -> uses REACT_APP_ASSESSMENT_URL (staging)
    theme: 'orange', // 'orange' (hirist) | 'green' (iimjobs)

    // Called when the quiz ends. Receives:
    // { result, score, competitionId, round, questionnaireId, seekerId }
    onSaveResult: async (payload) => {
        console.log('onSaveResult called with:', payload);
        // return a resolved promise (mock a successful save)
        return Promise.resolve({ status: 'ok' });
    },
};

const initObject = {
  questionnaireId: '5eea71a27acb9b19ccd2e2da',
  user: 'jobSeeker',
  associationPublished: 1526635,
  seeker: 3342023,
  token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ2ODYzMTEiLCJkb21haW4iOiJoaXJpc3QuY29tIiwic3RhdHVzIjoxLCJ0eXBlIjoyLCJleHBpcmUiOjE3Njc4NTczNjUzMzgsImlhdCI6MTc2Nzg1NzM2MywiZXhwIjoxOTI1NTM3MzYzfQ.ugyOxqgd5lS9_YYLT1ACtXcDp98wTc_AViW4iP75qQA',
  isProd: true
};

const initObjectScreening = {
  seekerId: 260656,
  associationPublished: 1673240,
  assessmentLoginToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI2MDY1NiIsImRvbWFpbiI6ImhpcmlzdC5jb20iLCJzdGF0dXMiOjEsInR5cGUiOjIsImV4cGlyZSI6MTc5MTk3ODEyOTAyMCwiaWF0IjoxNzkxOTc4MTI3LCJleHAiOjE5NDk2NTgxMjd9.Mt6qTKnL4vFkebOQaA3QvwdZxGU5McR1ZMt578nFCdU"
}

const handleSaveResult = (resultData) => {
  console.log('Result data received in assessmentPreview:', resultData);

  const seekerId = resultData.seekerId || initObject.seeker;

  axios.request({
      url: `https://user-api.iimjobs.com/v2/competition/user/${seekerId}/save/result`,
      method: 'post',
      data: {
          result: resultData.result,
          score: resultData.score,
          competitionId: resultData.competitionId,
          round: resultData.round,
          questionnaireId: resultData.questionnaireId,
      },
      headers: {
          Authorization: initObject.token,
          'Content-Type': 'application/json',
      },
  })
  .then(response => {
      console.log('Result saved successfully:');
  })
  .catch(error => {
      console.error('Failed to save result:', error);
  });
};

function App() {
  return (
    <div className="App">
      <ScreeningJobSeeker {...initObjectScreening} />
      {/* <Assessment {...mockAssessmentProps} /> */}
    </div>
  );
}

export default App;
 