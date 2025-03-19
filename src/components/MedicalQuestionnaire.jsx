
import { useState } from 'react';
import Button from '@/components/Button';
import { toast } from '@/hooks/use-toast';

const MedicalQuestionnaire = ({ gender, onComplete }) => {
  const [answers, setAnswers] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  
  // Common questions for all donors
  const commonQuestions = [
    {
      id: 'age',
      question: 'Are you between 18 and 65 years of age?',
      required: true
    },
    {
      id: 'weight',
      question: 'Do you weigh more than 45 kg (99 pounds)?',
      required: true
    },
    {
      id: 'meal',
      question: 'Have you had a meal in the last 4 hours?',
      required: true
    },
    {
      id: 'alcohol',
      question: 'Have you consumed alcohol in the last 24 hours?',
      required: true
    },
    {
      id: 'sleep',
      question: 'Did you get at least 6 hours of sleep last night?',
      required: true
    }
  ];
  
  // Female-specific questions
  const femaleQuestions = [
    {
      id: 'pregnant',
      question: 'Are you currently pregnant or have been pregnant in the last 6 months?',
      required: true
    },
    {
      id: 'breastfeeding',
      question: 'Are you currently breastfeeding?',
      required: true
    },
    {
      id: 'menstrual',
      question: 'Are you currently experiencing heavy menstrual bleeding?',
      required: true
    },
    {
      id: 'anemia',
      question: 'Have you ever been diagnosed with anemia or are currently on medication for it?',
      required: true
    }
  ];
  
  // Male-specific questions
  const maleQuestions = [
    {
      id: 'heartIssue',
      question: 'Do you have any known heart conditions?',
      required: true
    },
    {
      id: 'hemoglobin',
      question: 'Have you ever been diagnosed with low hemoglobin levels?',
      required: true
    },
    {
      id: 'fainting',
      question: 'Have you ever fainted during a blood donation?',
      required: true
    }
  ];
  
  // Common health questions for all
  const healthQuestions = [
    {
      id: 'recentSurgery',
      question: 'Have you undergone any surgical procedure in the last 6 months?',
      required: true
    },
    {
      id: 'chronicIllness',
      question: 'Do you have any chronic illnesses such as diabetes or hypertension?',
      required: true
    },
    {
      id: 'medications',
      question: 'Are you currently taking any medications?',
      required: true
    },
    {
      id: 'infectious',
      question: 'Have you ever tested positive for HIV, Hepatitis B, or Hepatitis C?',
      required: true
    },
    {
      id: 'tattoo',
      question: 'Have you gotten a tattoo or piercing in the last 6 months?',
      required: true
    }
  ];
  
  // Combine questions based on gender
  const allQuestions = gender === 'female' 
    ? [...commonQuestions, ...femaleQuestions, ...healthQuestions]
    : [...commonQuestions, ...maleQuestions, ...healthQuestions];
  
  // Calculate number of steps (5 questions per step)
  const totalSteps = Math.ceil(allQuestions.length / 5);
  
  // Get current questions to display
  const getCurrentQuestions = () => {
    const startIndex = (currentStep - 1) * 5;
    return allQuestions.slice(startIndex, startIndex + 5);
  };
  
  const handleAnswer = (questionId, value) => {
    setAnswers({
      ...answers,
      [questionId]: value
    });
  };
  
  const canProceed = () => {
    const currentQuestions = getCurrentQuestions();
    return currentQuestions.every(q => q.required ? answers[q.id] !== undefined : true);
  };
  
  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Evaluate eligibility
      const disqualifyingAnswers = [
        { id: 'age', value: false },
        { id: 'weight', value: false },
        { id: 'pregnant', value: true },
        { id: 'breastfeeding', value: true },
        { id: 'chronicIllness', value: true },
        { id: 'infectious', value: true },
        { id: 'tattoo', value: true }
      ];
      
      const isEligible = !disqualifyingAnswers.some(item => 
        answers[item.id] === item.value
      );
      
      if (isEligible) {
        toast({
          title: 'Questionnaire Complete',
          description: 'You appear to be eligible to donate blood based on your responses.',
        });
      } else {
        toast({
          title: 'Questionnaire Complete',
          description: 'Based on your responses, you may not be eligible to donate at this time. Please consult with a healthcare professional.',
          variant: 'destructive',
        });
      }
      
      onComplete({
        answers,
        eligible: isEligible
      });
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  return (
    <div className="glass-card p-6 mb-8 animate-reveal">
      <h2 className="text-xl font-semibold mb-4">Pre-Donation Medical Questionnaire</h2>
      <p className="text-muted-foreground mb-6">
        Please answer the following questions honestly to determine your eligibility for blood donation.
      </p>
      
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm font-medium text-muted-foreground">
            {Math.round((currentStep / totalSteps) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blood h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <div className="space-y-6">
        {getCurrentQuestions().map((q) => (
          <div key={q.id} className="p-4 bg-gray-50 rounded-lg">
            <p className="font-medium mb-3">{q.question}</p>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => handleAnswer(q.id, true)}
                className={`flex-1 py-2 px-4 rounded-md transition ${
                  answers[q.id] === true 
                    ? 'bg-blood text-white' 
                    : 'bg-white border border-gray-300 hover:bg-gray-50'
                }`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => handleAnswer(q.id, false)}
                className={`flex-1 py-2 px-4 rounded-md transition ${
                  answers[q.id] === false 
                    ? 'bg-blood text-white' 
                    : 'bg-white border border-gray-300 hover:bg-gray-50'
                }`}
              >
                No
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between mt-8">
        <Button
          type="button"
          variant="secondary"
          onClick={handlePrevious}
          disabled={currentStep === 1}
        >
          Previous
        </Button>
        <Button
          type="button"
          variant="primary"
          onClick={handleNext}
          disabled={!canProceed()}
        >
          {currentStep === totalSteps ? 'Submit' : 'Next'}
        </Button>
      </div>
    </div>
  );
};

export default MedicalQuestionnaire;
