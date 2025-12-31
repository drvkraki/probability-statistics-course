// EDIT THIS FILE TO CUSTOMIZE YOUR COURSE

const COURSE_DATA = {
  courseTitle: "Probability and Statistics",
  instructor: "Dr. VK Raki",
  university: "Your University Name",
  passingScore: 70, // Percentage needed to pass each quiz
  
  modules: [
    {
      id: 1,
      title: "Introduction to Probability",
      description: "Fundamental concepts of probability theory, sample spaces, and events",
      materials: [
        { 
          type: "pdf", 
          title: "Lecture Notes - Probability Basics", 
          url: "https://example.com/your-pdf-link.pdf" // Replace with your actual PDF link
        },
        { 
          type: "video", 
          title: "Introduction to Sample Spaces", 
          embedId: "3Z9sTBPcVNA" // YouTube video ID (after v= in URL)
        },
        { 
          type: "link", 
          title: "Khan Academy: Probability", 
          url: "https://www.khanacademy.org/math/statistics-probability"
        }
      ],
      quizTime: 20, // minutes
      questionsPerAttempt: 20, // How many questions students get
      maxAttempts: 3 // Maximum exam attempts allowed
    },
    
    {
      id: 2,
      title: "Random Variables",
      description: "Discrete and continuous random variables, probability distributions",
      materials: [
        { 
          type: "pdf", 
          title: "Random Variables Guide", 
          url: "#" 
        },
        { 
          type: "video", 
          title: "Discrete vs Continuous Random Variables", 
          embedId: "3v9w79NhsfI"
        }
      ],
      quizTime: 25,
      questionsPerAttempt: 20,
      maxAttempts: 3
    },
    
    {
      id: 3,
      title: "Probability Distributions",
      description: "Normal, binomial, Poisson distributions and their applications",
      materials: [
        { 
          type: "pdf", 
          title: "Distribution Tables and Properties", 
          url: "#" 
        },
        { 
          type: "video", 
          title: "The Normal Distribution", 
          embedId: "rzFX5NWojp0"
        }
      ],
      quizTime: 25,
      questionsPerAttempt: 20,
      maxAttempts: 3
    },
    
    {
      id: 4,
      title: "Statistical Inference",
      description: "Hypothesis testing, confidence intervals, and statistical significance",
      materials: [
        { 
          type: "pdf", 
          title: "Inference Methods", 
          url: "#" 
        },
        { 
          type: "video", 
          title: "Hypothesis Testing Explained", 
          embedId: "0oc49DyA3hU"
        }
      ],
      quizTime: 30,
      questionsPerAttempt: 20,
      maxAttempts: 3
    }
  ]
};

// QUESTION BANK - Add your 75+ questions here (20+ per module recommended)
const QUESTION_BANK = [
  // MODULE 1 QUESTIONS
  {
    moduleId: 1,
    id: "m1q1",
    question: "What is the probability of getting heads in a fair coin toss?",
    options: ["0.25", "0.5", "0.75", "1.0"],
    correct: 1,
    explanation: "A fair coin has two equally likely outcomes, so P(Heads) = 1/2 = 0.5"
  },
  {
    moduleId: 1,
    id: "m1q2",
    question: "If P(A) = 0.3 and P(B) = 0.4, and A and B are independent events, what is P(A ∩ B)?",
    options: ["0.12", "0.70", "0.10", "0.06"],
    correct: 0,
    explanation: "For independent events, P(A ∩ B) = P(A) × P(B) = 0.3 × 0.4 = 0.12"
  },
  {
    moduleId: 1,
    id: "m1q3",
    question: "The sum of all probabilities in a sample space must equal:",
    options: ["0", "0.5", "1", "Depends on the sample space"],
    correct: 2,
    explanation: "By the axiom of probability, the total probability of all outcomes in a sample space must equal 1"
  },
  {
    moduleId: 1,
    id: "m1q4",
    question: "Which of the following is NOT a valid probability value?",
    options: ["0", "0.5", "-0.3", "1"],
    correct: 2,
    explanation: "Probabilities must be between 0 and 1 inclusive. Negative values are not valid probabilities."
  },
  {
    moduleId: 1,
    id: "m1q5",
    question: "If two events A and B are mutually exclusive, then P(A ∪ B) equals:",
    options: ["P(A) + P(B)", "P(A) × P(B)", "P(A) - P(B)", "0"],
    correct: 0,
    explanation: "For mutually exclusive events, P(A ∪ B) = P(A) + P(B) since they cannot occur together"
  },
  
  // MODULE 2 QUESTIONS
  {
    moduleId: 2,
    id: "m2q1",
    question: "A discrete random variable can take on:",
    options: ["Any value in an interval", "Only countable values", "Only positive values", "Only integer values"],
    correct: 1,
    explanation: "Discrete random variables can only take on countable (distinct, separate) values"
  },
  {
    moduleId: 2,
    id: "m2q2",
    question: "The expected value E(X) of a random variable represents:",
    options: ["The most likely value", "The median value", "The weighted average", "The maximum value"],
    correct: 2,
    explanation: "Expected value is the weighted average of all possible values, weighted by their probabilities"
  },
  {
    moduleId: 2,
    id: "m2q3",
    question: "If E(X) = 5 and E(Y) = 3, what is E(X + Y)?",
    options: ["2", "8", "15", "Cannot be determined"],
    correct: 1,
    explanation: "By linearity of expectation, E(X + Y) = E(X) + E(Y) = 5 + 3 = 8"
  },
  {
    moduleId: 2,
    id: "m2q4",
    question: "The variance of a random variable measures:",
    options: ["Central tendency", "Spread or dispersion", "Skewness", "The mean"],
    correct: 1,
    explanation: "Variance measures how spread out the values are from the mean"
  },
  {
    moduleId: 2,
    id: "m2q5",
    question: "For a continuous random variable, P(X = a) equals:",
    options: ["1", "0.5", "0", "Depends on the distribution"],
    correct: 2,
    explanation: "For continuous random variables, the probability of any single exact value is 0"
  },
  
  // MODULE 3 QUESTIONS
  {
    moduleId: 3,
    id: "m3q1",
    question: "In a normal distribution, approximately what percentage of data falls within one standard deviation of the mean?",
    options: ["50%", "68%", "95%", "99.7%"],
    correct: 1,
    explanation: "The empirical rule states that approximately 68% of data falls within one standard deviation of the mean"
  },
  {
    moduleId: 3,
    id: "m3q2",
    question: "The binomial distribution is appropriate when:",
    options: ["There are fixed number of independent trials", "Data is continuous", "Mean equals variance", "Sample size is large"],
    correct: 0,
    explanation: "Binomial distribution models fixed number of independent trials with two possible outcomes"
  },
  {
    moduleId: 3,
    id: "m3q3",
    question: "A normal distribution is characterized by:",
    options: ["One parameter", "Two parameters", "Three parameters", "Four parameters"],
    correct: 1,
    explanation: "Normal distribution is characterized by two parameters: mean (μ) and standard deviation (σ)"
  },
  {
    moduleId: 3,
    id: "m3q4",
    question: "The Poisson distribution is used to model:",
    options: ["Continuous outcomes", "Number of events in a fixed interval", "Binary outcomes", "Ranks"],
    correct: 1,
    explanation: "Poisson distribution models the number of events occurring in a fixed interval of time or space"
  },
  {
    moduleId: 3,
    id: "m3q5",
    question: "In a standard normal distribution, the mean is:",
    options: ["-1", "0", "1", "Varies"],
    correct: 1,
    explanation: "The standard normal distribution has mean μ = 0 and standard deviation σ = 1"
  },
  
  // MODULE 4 QUESTIONS
  {
    moduleId: 4,
    id: "m4q1",
    question: "A p-value of 0.03 means:",
    options: ["3% chance the null hypothesis is true", "3% probability of Type I error if we reject H₀", "97% confidence in results", "The effect size is 3%"],
    correct: 1,
    explanation: "The p-value represents the probability of observing results as extreme as those seen, assuming the null hypothesis is true"
  },
  {
    moduleId: 4,
    id: "m4q2",
    question: "A 95% confidence interval means:",
    options: ["95% of data falls in this interval", "The true parameter is in this interval with 95% probability", "95% of such intervals contain the true parameter", "The estimate is 95% accurate"],
    correct: 2,
    explanation: "95% of confidence intervals constructed this way will contain the true population parameter"
  },
  {
    moduleId: 4,
    id: "m4q3",
    question: "Type I error occurs when we:",
    options: ["Fail to reject a false null hypothesis", "Reject a true null hypothesis", "Accept the alternative hypothesis", "Calculate p-value incorrectly"],
    correct: 1,
    explanation: "Type I error is rejecting the null hypothesis when it is actually true (false positive)"
  },
  {
    moduleId: 4,
    id: "m4q4",
    question: "The significance level α typically represents:",
    options: ["The p-value", "The probability of Type I error", "The confidence level", "The sample size"],
    correct: 1,
    explanation: "α is the threshold for rejecting H₀ and represents the probability of Type I error we're willing to accept"
  },
  {
    moduleId: 4,
    id: "m4q5",
    question: "As sample size increases, the width of a confidence interval:",
    options: ["Increases", "Decreases", "Stays the same", "Becomes zero"],
    correct: 1,
    explanation: "Larger sample sizes provide more precise estimates, leading to narrower confidence intervals"
  }
  
  // ADD MORE QUESTIONS HERE to reach 75+ total
  // Aim for 20+ questions per module for good randomization
];
