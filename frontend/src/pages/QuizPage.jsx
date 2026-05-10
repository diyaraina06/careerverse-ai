import { useState } from "react";
import { useNavigate } from "react-router-dom";

function QuizPage() {
  const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);

  const questions = [
    {
      question: "What type of activities do you enjoy most?",
      options: [
        {
          text: "Solving logical and analytical problems",
          category: "logical",
          trait: "analytical_thinking",
        },
        {
          text: "Designing creative visuals or experiences",
          category: "design",
          trait: "creativity",
        },
        {
          text: "Leading teams and organizing work",
          category: "leadership",
          trait: "team_management",
        },
        {
          text: "Communicating ideas and promoting things",
          category: "marketing",
          trait: "communication",
        },
      ],
    },

    {
      question: "Which school subject excites you the most?",
      options: [
        {
          text: "Computer Science or Mathematics",
          category: "logical",
          trait: "problem_solving",
        },
        {
          text: "Business Studies or Economics",
          category: "leadership",
          trait: "strategic_thinking",
        },
        {
          text: "Art, Design or Creative Projects",
          category: "design",
          trait: "visual_thinking",
        },
        {
          text: "Media, Advertising or Communication",
          category: "marketing",
          trait: "branding",
        },
      ],
    },

    {
      question:
        "Imagine your school app suddenly crashes during online exams. What would you most likely do?",
      options: [
        {
          text: "Try identifying the technical issue and fix it",
          category: "logical",
          trait: "technical_reasoning",
        },
        {
          text: "Calm everyone and coordinate responsibilities",
          category: "leadership",
          trait: "leadership",
        },
        {
          text: "Think about improving the app experience later",
          category: "design",
          trait: "user_empathy",
        },
        {
          text: "Communicate updates clearly to students and teachers",
          category: "marketing",
          trait: "communication",
        },
      ],
    },

    {
      question: "How do your friends usually describe you?",
      options: [
        {
          text: "Logical and analytical",
          category: "logical",
          trait: "critical_thinking",
        },
        {
          text: "Creative and imaginative",
          category: "design",
          trait: "innovation",
        },
        {
          text: "Responsible and confident leader",
          category: "leadership",
          trait: "responsibility",
        },
        {
          text: "Energetic and persuasive communicator",
          category: "marketing",
          trait: "persuasion",
        },
      ],
    },

    {
      question:
        "What motivates you the most while working on projects?",
      options: [
        {
          text: "Building efficient and working solutions",
          category: "logical",
          trait: "problem_solving",
        },
        {
          text: "Creating visually appealing experiences",
          category: "design",
          trait: "design_thinking",
        },
        {
          text: "Managing people and achieving goals together",
          category: "leadership",
          trait: "team_management",
        },
        {
          text: "Influencing and engaging people",
          category: "marketing",
          trait: "audience_understanding",
        },
      ],
    },

    {
      question:
        "If your team members disagree during a project, how would you react?",
      options: [
        {
          text: "Analyze the situation logically",
          category: "logical",
          trait: "logic",
        },
        {
          text: "Find a creative middle-ground solution",
          category: "design",
          trait: "creativity",
        },
        {
          text: "Take leadership and resolve the conflict",
          category: "leadership",
          trait: "decision_making",
        },
        {
          text: "Communicate and convince everyone effectively",
          category: "marketing",
          trait: "persuasion",
        },
      ],
    },

    {
      question:
        "Which type of achievement would make you happiest?",
      options: [
        {
          text: "Developing a successful app or software",
          category: "logical",
          trait: "technical_reasoning",
        },
        {
          text: "Designing a beautiful product or interface",
          category: "design",
          trait: "visual_thinking",
        },
        {
          text: "Leading a successful startup or team",
          category: "leadership",
          trait: "leadership",
        },
        {
          text: "Launching a viral marketing campaign",
          category: "marketing",
          trait: "branding",
        },
      ],
    },

    {
      question:
        "What kind of content do you naturally enjoy online?",
      options: [
        {
          text: "Coding, tech, and problem-solving videos",
          category: "logical",
          trait: "technical_reasoning",
        },
        {
          text: "Design inspiration and creative content",
          category: "design",
          trait: "innovation",
        },
        {
          text: "Leadership, startups, and productivity content",
          category: "leadership",
          trait: "strategic_thinking",
        },
        {
          text: "Branding, ads, and social media trends",
          category: "marketing",
          trait: "social_engagement",
        },
      ],
    },

    {
      question:
        "Suppose your school wants to improve student engagement. What idea would you prioritize?",
      options: [
        {
          text: "Build a better technical platform for students",
          category: "logical",
          trait: "problem_solving",
        },
        {
          text: "Redesign the platform for better usability",
          category: "design",
          trait: "user_empathy",
        },
        {
          text: "Organize teams and student communities",
          category: "leadership",
          trait: "team_management",
        },
        {
          text: "Run campaigns and awareness initiatives",
          category: "marketing",
          trait: "audience_understanding",
        },
      ],
    },

    {
      question:
        "Which future work environment sounds most exciting to you?",
      options: [
        {
          text: "Building technology products and solving challenges",
          category: "logical",
          trait: "critical_thinking",
        },
        {
          text: "Working on creative ideas and user experiences",
          category: "design",
          trait: "design_thinking",
        },
        {
          text: "Managing teams and strategic decisions",
          category: "leadership",
          trait: "strategic_thinking",
        },
        {
          text: "Working with brands, media, and audiences",
          category: "marketing",
          trait: "communication",
        },
      ],
    },
  ];

  // Map quiz answers array → the profile shape your backend expects
  const buildProfile = (updatedAnswers) => {
    return {
      grade: "9-12",                              // you can add a grade question later
      activity: updatedAnswers[0]?.selectedAnswer ?? "",   // Q1
      subject: updatedAnswers[1]?.selectedAnswer ?? "",    // Q2
      weekend: updatedAnswers[2]?.selectedAnswer ?? "",    // Q3 (repurposed)
      workStyle: updatedAnswers[3]?.selectedAnswer ?? "",  // Q4
      workplace: updatedAnswers[4]?.selectedAnswer ?? "",  // Q5
      thinkingStyle: updatedAnswers[5]?.selectedAnswer ?? "", // Q6
      values: updatedAnswers[6]?.selectedAnswer ?? "",     // Q7
      approach: updatedAnswers[7]?.selectedAnswer ?? "",   // Q8
      awareness: updatedAnswers[8]?.selectedAnswer ?? "",  // Q9
      // bonus: pass traits too so AI has more signal
      traits: updatedAnswers.map((a) => a.trait).join(", "),
    };
  };

  // Call YOUR backend route — not Anthropic directly
  const callCareerAPI = async (profile) => {
    const response = await fetch("https://careerverse-ai-vi36.onrender.com/api/careers/recommend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ profile }),  // backend expects { profile: {...} }
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const careers = await response.json();
    console.log("AI Careers Response:", careers);
    return careers;
  };

  // Replace your existing handleAnswer with this
  const handleAnswer = async (option) => {
    const answerObject = {
      question: questions[currentQuestion].question,
      selectedAnswer: option.text,
      category: option.category,
      trait: option.trait,
    };

    const updatedAnswers = [...answers, answerObject];
    setAnswers(updatedAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Last question — build profile and hit your backend
      setLoading(true);
      try {
        const profile = buildProfile(updatedAnswers);
        console.log("Sending profile to backend:", profile); // debug
        // const careers = [
        //   {
        //     title: "Digital Marketing Manager",
        //     match: "94%",
        //     description:
        //       "You enjoy creativity, communication, branding, and audience engagement.",
        //   },
        // ];
        const careers = await response.json();
        localStorage.setItem(
          "careerverse_careers",
          JSON.stringify(careers)
        );

        navigate("/results");
      } catch (err) {
        console.error("Career API failed:", err);
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-10">

      <p className="text-purple-400 font-semibold mb-4 text-center">
        AI CAREER DISCOVERY QUIZ
      </p>

      <h1 className="text-4xl md:text-5xl font-bold text-center max-w-4xl leading-tight mb-6">
        Let’s Discover Careers That Match Your Personality
      </h1>

      <p className="text-gray-400 text-center max-w-3xl mb-10 text-lg">
        Our AI analyzes your interests, thinking style, work preferences,
        communication patterns, and personality traits to recommend
        careers that align with your strengths.
      </p>

      <div className="w-full max-w-3xl mb-6">

        <div className="flex justify-between text-sm text-gray-400 mb-3">
          <span>
            Question {currentQuestion + 1} of {questions.length}
          </span>

          <span>
            {Math.round(
              ((currentQuestion + 1) / questions.length) * 100
            )}% Complete
          </span>
        </div>

        <div className="w-full bg-zinc-800 rounded-full h-3">
          <div
            className="bg-purple-500 h-3 rounded-full transition-all duration-500"
            style={{
              width: `${((currentQuestion + 1) / questions.length) * 100
                }%`,
            }}
          ></div>
        </div>

      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 w-full max-w-3xl">

        <h2 className="text-2xl md:text-3xl font-semibold mb-10 leading-relaxed">
          {questions[currentQuestion].question}
        </h2>

        <div className="flex flex-col gap-5">

          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className="bg-zinc-800 hover:bg-purple-500 transition rounded-2xl py-5 px-6 text-left text-base md:text-lg"
            >
              {option.text}
            </button>
          ))}

        </div>

        {loading && (
          <div className="mt-10 text-center">

            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>

            <p className="text-purple-400 font-semibold text-lg">
              AI is analyzing your personality and career alignment...
            </p>

          </div>
        )}

      </div>

    </div>
  );
}

export default QuizPage;




