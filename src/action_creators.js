import * as types from './constants/ActionTypes';
import * as routeNames from './constants/routeNames';


export const insertQuestion = (question) => {
    return {
        type: types.INSERT_QUESTION,
        question
    }
}

export const updateQuestion = (question) => {
    return {
        type: types.UPDATE_QUESTION,
        question
    }
}


export const insertAnswer = (answer) => {
    return {
        type: types.INSERT_ANSWER,
        answer
    }
}

export const updateAnswer = (answer) => {
    return {
        type: types.UPDATE_ANSWER,
        answer
    }
}

export const upsertAnswer = (answer) => {
    if (answer._rev === undefined) {
        return insertAnswer(answer);
    } else {
        return updateAnswer(answer);
    }
}


export const insertQuiz = (quiz) => {
    return {
      type : types.INSERT_QUIZ,
      quiz
    }
}

export const updateQuiz = (quiz) => {
    return {
      type : types.UPDATE_QUIZ,
      quiz
    }
}

export const quizToggleLive = (quiz) => {
    return {
      type : types.UPDATE_QUIZ,
      quiz : {...quiz, live: !quiz.live}
    }
}

export const quizStopLive = (quiz) => {
    return {
      type : types.UPDATE_QUIZ,
      quiz : {...quiz, live:false}
    }
}

export const insertSession = (session) => {
    return {
      type : types.INSERT_SESSION,
      session
    }
}

export const updateSession = (session) => {
    return {
      type : types.UPDATE_SESSION,
      session
    }
}

export const sessionStartLive = (session) => {
    return {
      type : types.UPDATE_SESSION,
      session : {...session, live: true, start_date: session.start_date || new Date()}
    }
}

export const sessionStopLive = (session) => {
    return {
      type : types.UPDATE_SESSION,
      session : {...session, live:false, end_date: new Date()}
    }
}

export const navtigateToQuizes = () => {
    return {
        type: types.NAVIGATE_TO,
        route: {
            name: routeNames.QUIZES
        }
    }
}

export const navigateToQuestions = () => {
    return {
      type : types.NAVIGATE_TO,
      route : {
        name : routeNames.QUESTIONS
      }
    }
}

export const navigateToSessions = () => {
    return {
        type: types.NAVIGATE_TO,
        route: {
            name: routeNames.SESSIONS
        }
    }
}

export const navigateToLiveQuiz = () => {
    return {
      type : types.NAVIGATE_TO,
      route : {
        name : routeNames.LIVE_QUIZ
      }
    }
}

export const navigateToLiveSession = () => {
    return {
      type : types.NAVIGATE_TO,
      route : {
        name : routeNames.LIVE_SESSION
      }
    }
}



export const resetRoute = () => {
    return {
      type : types.RESET_ROUTE,
    }
}

export const navigateToQuestion = (question_id) => {
    return {
      type : types.NAVIGATE_TO,
      route : {
        name : routeNames.VIEW_QUESTION,
        params : {
          question_id
        }
      }
    }
}

export const navigateToAddQuestion = () => {
    return {
      type : types.NAVIGATE_TO,
      route : {
        name : routeNames.ADD_QUESTION,
      }
    }
}

export const navigateToEditQuestion = (question_id) => {
    return {
      type : types.NAVIGATE_TO,
      route : {
        name : routeNames.EDIT_QUESTION,
        params : {
          question_id
        }
      }
    }
}

export const navigateToQuiz = (quiz_id) => {
    return {
      type : types.NAVIGATE_TO,
      route : {
        name : routeNames.VIEW_QUIZ,
        params : {
          quiz_id
        }
      }
    }
}

export const navigateToAddQuiz = () => {
    return {
      type : types.NAVIGATE_TO,
      route : {
        name : routeNames.ADD_QUIZ,
      }
    }
}

export const navigateToEditQuiz = (quiz_id) => {
    return {
      type : types.NAVIGATE_TO,
      route : {
        name : routeNames.EDIT_QUIZ,
        params : {
          quiz_id
        }
      }
    }
}

export const navigateToSession = (session_id) => {
    return {
      type : types.NAVIGATE_TO,
      route : {
        name : routeNames.VIEW_SESSION,
        params : {
          session_id
        }
      }
    }
}

export const navigateToAddSession = () => {
    return {
      type : types.NAVIGATE_TO,
      route : {
        name : routeNames.ADD_SESSION,
      }
    }
}

export const addQuizToSession = (quiz_id, session)=> {
    return {
        type: types.UPDATE_SESSION,
        session: {
            ...session,
            quizes: [...session.quizes, {id: quiz_id, live: false, public: false}]
        }
    }
}

export const addQuestionToSession = (question_id, session)=> {
    return {
        type: types.UPDATE_SESSION,
        session: {
            ...session,
            questions: [...session.questions, {id: question_id, live: false, public: false}]
        }
    }
}

export const insertMessage = (message)=>{
    return {
        type: types.INSERT_MESSAGE,
        message
    }
}
