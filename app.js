const { useState, useEffect } = React;
const { 
  BookOpen, Video, Award, Clock, CheckCircle, Lock, 
  Menu, X, BarChart3, Trophy, ExternalLink 
} = lucide;

const CoursePlatform = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedModule, setSelectedModule] = useState(null);
  const [quizMode, setQuizMode] = useState(null);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [quizStartTime, setQuizStartTime] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const [progress, setProgress] = useState(() => {
    const saved = {};
    COURSE_DATA.modules.forEach(m => {
      saved[m.id] = {
        completed: false,
        bestScore: 0,
        attempts: 0,
        lastAttempt: null
      };
    });
    return saved;
  });

  const isModuleUnlocked = (moduleId) => {
    if (moduleId === 1) return true;
    const prevModule = progress[moduleId - 1];
    return prevModule && prevModule.completed;
  };

  const startQuiz = (module, mode) => {
    const moduleQuestions = QUESTION_BANK.filter(q => q.moduleId === module.id);
    const shuffled = [...moduleQuestions].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, module.questionsPerAttempt);
    
    setCurrentQuiz({ module, questions: selected, mode });
    setQuizStartTime(Date.now());
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResult(false);
    setCurrentView('quiz');
  };

  const submitAnswer = (answerIndex) => {
    setSelectedAnswers({ ...selectedAnswers, [currentQuestionIndex]: answerIndex });
  };

  const calculateScore = () => {
    let correct = 0;
    currentQuiz.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correct) correct++;
    });
    return Math.round((correct / currentQuiz.questions.length) * 100);
  };

  const submitQuiz = () => {
    const score = calculateScore();
    const moduleId = currentQuiz.module.id;
    
    const newProgress = {
      ...progress,
      [moduleId]: {
        ...progress[moduleId],
        attempts: progress[moduleId].attempts + 1,
        bestScore: Math.max(progress[moduleId].bestScore, score),
        completed: score >= COURSE_DATA.passingScore || progress[moduleId].completed,
        lastAttempt: new Date().toISOString()
      }
    };
    
    setProgress(newProgress);
    setShowResult(true);
  };

  const currentQuestion = currentQuiz?.questions[currentQuestionIndex];

  const renderDashboard = () => {
    const completedModules = Object.values(progress).filter(p => p.completed).length;
    const totalModules = COURSE_DATA.modules.length;
    const overallProgress = Math.round((completedModules / totalModules) * 100);

    return React.createElement('div', { className: 'space-y-6' },
      React.createElement('div', { className: 'bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white' },
        React.createElement('h1', { className: 'text-3xl font-bold mb-2' }, COURSE_DATA.courseTitle),
        React.createElement('p', { className: 'text-blue-100' }, `Instructor: ${COURSE_DATA.instructor}`),
        React.createElement('div', { className: 'mt-4' },
          React.createElement('div', { className: 'flex justify-between text-sm mb-2' },
            React.createElement('span', null, 'Overall Progress'),
            React.createElement('span', null, `${overallProgress}%`)
          ),
          React.createElement('div', { className: 'w-full bg-blue-900 rounded-full h-3' },
            React.createElement('div', {
              className: 'bg-white h-3 rounded-full transition-all duration-500',
              style: { width: `${overallProgress}%` }
            })
          )
        )
      ),
      React.createElement('div', { className: 'grid gap-4' },
        COURSE_DATA.modules.map(module => {
          const unlocked = isModuleUnlocked(module.id);
          const moduleProgress = progress[module.id];
          
          return React.createElement('div', {
            key: module.id,
            className: `border rounded-lg p-6 ${unlocked ? 'bg-white cursor-pointer hover:shadow-lg transition-shadow' : 'bg-gray-50 opacity-60'}`,
            onClick: () => unlocked && setSelectedModule(module)
          },
            React.createElement('div', { className: 'flex items-start justify-between' },
              React.createElement('div', { className: 'flex-1' },
                React.createElement('div', { className: 'flex items-center gap-3 mb-2' },
                  React.createElement('span', {
                    className: `text-2xl font-bold ${moduleProgress.completed ? 'text-green-600' : 'text-gray-400'}`
                  }, module.id),
                  React.createElement('div', null,
                    React.createElement('h3', { className: 'text-xl font-semibold' }, module.title),
                    React.createElement('p', { className: 'text-gray-600 text-sm' }, module.description)
                  )
                ),
                moduleProgress.attempts > 0 && React.createElement('div', { className: 'flex gap-4 mt-3 text-sm' },
                  React.createElement('span', { className: 'flex items-center gap-1' },
                    React.createElement(Trophy, { className: 'w-4 h-4 text-yellow-500' }),
                    `Best: ${moduleProgress.bestScore}%`
                  ),
                  React.createElement('span', { className: 'text-gray-500' },
                    `Attempts: ${moduleProgress.attempts}/${module.maxAttempts}`
                  )
                )
              ),
              React.createElement('div', null,
                moduleProgress.completed
                  ? React.createElement(CheckCircle, { className: 'w-8 h-8 text-green-600' })
                  : unlocked
                  ? React.createElement(BookOpen, { className: 'w-8 h-8 text-blue-600' })
                  : React.createElement(Lock, { className: 'w-8 h-8 text-gray-400' })
              )
            )
          );
        })
      ),
      completedModules === totalModules && React.createElement('div', { className: 'bg-yellow-50 border-2 border-yellow-400 rounded-lg p-6 text-center' },
        React.createElement(Award, { className: 'w-16 h-16 text-yellow-600 mx-auto mb-3' }),
        React.createElement('h3', { className: 'text-2xl font-bold text-yellow-900 mb-2' }, 'Congratulations!'),
        React.createElement('p', { className: 'text-yellow-800' }, 'You\'ve completed all modules!')
      )
    );
  };

  const renderModuleDetails = () => {
    if (!selectedModule) return null;
    
    const moduleProgress = progress[selectedModule.id];
    const canTakeExam = moduleProgress.attempts < selectedModule.maxAttempts;

    return React.createElement('div', { className: 'space-y-6' },
      React.createElement('button', {
        onClick: () => setSelectedModule(null),
        className: 'text-blue-600 hover:text-blue-800 flex items-center gap-2'
      }, '← Back to Dashboard'),
      
      React.createElement('div', { className: 'bg-white rounded-lg border p-6' },
        React.createElement('h2', { className: 'text-2xl font-bold mb-2' }, selectedModule.title),
        React.createElement('p', { className: 'text-gray-600 mb-4' }, selectedModule.description),
        
        moduleProgress.completed && React.createElement('div', { className: 'bg-green-50 border border-green-200 rounded p-3 mb-4' },
          React.createElement('p', { className: 'text-green-800 flex items-center gap-2' },
            React.createElement(CheckCircle, { className: 'w-5 h-5' }),
            `Module Completed - Best Score: ${moduleProgress.bestScore}%`
          )
        )
      ),
      
      React.createElement('div', { className: 'bg-white rounded-lg border p-6' },
        React.createElement('h3', { className: 'text-xl font-semibold mb-4 flex items-center gap-2' },
          React.createElement(BookOpen, { className: 'w-6 h-6' }),
          'Study Materials'
        ),
        React.createElement('div', { className: 'space-y-3' },
          selectedModule.materials.map((material, idx) =>
            React.createElement('div', {
              key: idx,
              className: 'flex items-center gap-3 p-3 border rounded hover:bg-gray-50'
            },
              material.type === 'pdf' && React.createElement(BookOpen, { className: 'w-5 h-5 text-red-600' }),
              material.type === 'video' && React.createElement(Video, { className: 'w-5 h-5 text-blue-600' }),
              material.type === 'link' && React.createElement(ExternalLink, { className: 'w-5 h-5 text-green-600' }),
              React.createElement('a', {
                href: material.url,
                target: '_blank',
                rel: 'noopener noreferrer',
                className: 'flex-1 text-blue-600 hover:underline'
              }, material.title)
            )
          )
        )
      ),
      
      React.createElement('div', { className: 'bg-white rounded-lg border p-6' },
        React.createElement('h3', { className: 'text-xl font-semibold mb-4 flex items-center gap-2' },
          React.createElement(BarChart3, { className: 'w-6 h-6' }),
          'Assessment'
        ),
        React.createElement('div', { className: 'space-y-3' },
          React.createElement('p', { className: 'text-gray-600' },
            `Complete the quiz to unlock the next module. Passing score: ${COURSE_DATA.passingScore}%`
          ),
          React.createElement('div', { className: 'flex gap-3' },
            React.createElement('button', {
              onClick: () => startQuiz(selectedModule, 'practice'),
              className: 'flex-1 bg-blue-100 text-blue-700 py-3 rounded-lg font-semibold hover:bg-blue-200 transition'
            }, 'Practice Mode (Unlimited)'),
            React.createElement('button', {
              onClick: () => canTakeExam && startQuiz(selectedModule, 'exam'),
              disabled: !canTakeExam,
              className: `flex-1 py-3 rounded-lg font-semibold transition ${canTakeExam ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`
            }, `Exam Mode (${moduleProgress.attempts}/${selectedModule.maxAttempts})`)
          ),
          React.createElement('p', { className: 'text-sm text-gray-500' },
            React.createElement(Clock, { className: 'w-4 h-4 inline mr-1' }),
            `Time limit: ${selectedModule.quizTime} minutes | Questions: ${selectedModule.questionsPerAttempt}`
          )
        )
      )
    );
  };

  const renderQuiz = () => {
    if (!currentQuiz) return null;

    if (showResult) {
      const score = calculateScore();
      const passed = score >= COURSE_DATA.passingScore;
      
      return React.createElement('div', { className: 'max-w-2xl mx-auto space-y-6' },
        React.createElement('div', {
          className: `rounded-lg p-8 text-center ${passed ? 'bg-green-50 border-2 border-green-500' : 'bg-red-50 border-2 border-red-500'}`
        },
          React.createElement('div', { className: 'text-6xl font-bold mb-4' }, `${score}%`),
          React.createElement('h3', {
            className: `text-2xl font-bold mb-2 ${passed ? 'text-green-800' : 'text-red-800'}`
          }, passed ? 'Congratulations! You Passed!' : 'Keep Trying!'),
          React.createElement('p', { className: passed ? 'text-green-700' : 'text-red-700' },
            passed
              ? currentQuiz.mode === 'exam' ? 'Next module unlocked!' : 'Great practice session!'
              : `You need ${COURSE_DATA.passingScore}% to pass. Review the materials and try again.`
          )
        ),
        
        React.createElement('div', { className: 'bg-white rounded-lg border p-6 space-y-4' },
          React.createElement('h4', { className: 'font-semibold text-lg' }, 'Review Answers:'),
          currentQuiz.questions.map((q, idx) => {
            const userAnswer = selectedAnswers[idx];
            const isCorrect = userAnswer === q.correct;
            
            return React.createElement('div', {
              key: idx,
              className: `p-4 rounded border-l-4 ${isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`
            },
              React.createElement('p', { className: 'font-medium mb-2' }, `Q${idx + 1}: ${q.question}`),
              React.createElement('p', { className: 'text-sm text-gray-600 mb-1' },
                `Your answer: ${q.options[userAnswer]} ${isCorrect ? '✓' : '✗'}`
              ),
              !isCorrect && React.createElement('p', { className: 'text-sm text-green-700 mb-1' },
                `Correct answer: ${q.options[q.correct]}`
              ),
              React.createElement('p', { className: 'text-sm text-gray-700 italic' }, q.explanation)
            );
          })
        ),
        
        React.createElement('button', {
          onClick: () => {
            setCurrentView('module');
            setCurrentQuiz(null);
          },
          className: 'w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700'
        }, 'Back to Module')
      );
    }

    return React.createElement('div', { className: 'max-w-3xl mx-auto space-y-6' },
      React.createElement('div', { className: 'bg-white rounded-lg border p-4 flex justify-between items-center' },
        React.createElement('div', null,
          React.createElement('span', { className: 'text-sm text-gray-600' },
            `Question ${currentQuestionIndex + 1} of ${currentQuiz.questions.length}`
          ),
          React.createElement('span', {
            className: `ml-4 px-3 py-1 rounded text-sm ${currentQuiz.mode === 'exam' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`
          }, currentQuiz.mode === 'exam' ? 'Exam Mode' : 'Practice Mode')
        ),
        React.createElement('div', { className: 'flex items-center gap-2 text-gray-600' },
          React.createElement(Clock, { className: 'w-5 h-5' }),
          React.createElement('span', { className: 'font-mono' },
            `${Math.floor((Date.now() - quizStartTime) / 60000)}:${String(Math.floor(((Date.now() - quizStartTime) / 1000) % 60)).padStart(2, '0')}`
          )
        )
      ),
      
      React.createElement('div', { className: 'bg-white rounded-lg border p-8' },
        React.createElement('h3', { className: 'text-xl font-semibold mb-6' }, currentQuestion.question),
        React.createElement('div', { className: 'space-y-3' },
          currentQuestion.options.map((option, idx) =>
            React.createElement('button', {
              key: idx,
              onClick: () => submitAnswer(idx),
              className: `w-full text-left
