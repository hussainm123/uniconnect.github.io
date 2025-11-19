import React from 'react';
import { EmailIcon, PrefsIcon, ResourcesIcon, TasksIcon, PeersIcon, FeedbackIcon } from './Icons';

interface FlowStepProps {
  icon: React.ReactElement;
  title: string;
  description: string;
}

const FlowStep: React.FC<FlowStepProps> = ({ icon, title, description }) => (
  <li className="relative flex items-start gap-4 pb-8">
    <div className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></div>
    <div className="relative flex h-10 w-10 flex-none items-center justify-center bg-white rounded-full ring-1 ring-gray-200">
      {icon}
    </div>
    <div className="flex-grow pt-1">
      <h3 className="text-lg font-semibold text-hs-dark">{title}</h3>
      <p className="mt-1 text-sm text-gray-600">{description}</p>
    </div>
  </li>
);

const OnboardingFlow: React.FC = () => {
  const steps = [
    {
      icon: <EmailIcon />,
      title: 'Step 1: Welcome & Account Setup',
      description: 'Upon confirmation, our system automatically sends a welcome email with a secure link to set up your student portal password.',
    },
    {
      icon: <PrefsIcon />,
      title: 'Step 2: Profile & Preference Collection',
      description: 'The chatbot engages you to collect key preferences like housing needs, language course interests, and social event types.',
    },
    {
      icon: <ResourcesIcon />,
      title: 'Step 3: Personalized Recommendations',
      description: 'Based on your profile, the system curates and sends you a list of recommended local events, services, and university resources.',
    },
    {
      icon: <TasksIcon />,
      title: 'Step 4: Automated Task Management',
      description: 'We automate administrative tasks, sending you reminders for university registration, appointments, and housing application deadlines.',
    },
    {
      icon: <PeersIcon />,
      title: 'Step 5: Peer Connection Matching',
      description: 'Our workflow matches you with other students who share your interests, courses, or country of origin to help you build connections.',
    },
    {
      icon: <FeedbackIcon />,
      title: 'Step 6: Integration & Feedback Loop',
      description: 'The system periodically checks in to confirm your integration progress and collects valuable feedback to improve the process for future students.',
    },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-hs-gold">Your Automated Onboarding Journey</h2>
        <p className="mt-2 text-gray-600">This flow demonstrates how we automate key steps to make your arrival seamless.</p>
      </div>
      <ul>
        {steps.map((step, index) => (
          <FlowStep key={index} {...step} />
        ))}
      </ul>
    </div>
  );
};

export default OnboardingFlow;