import React, { useState } from 'react';

// Mock data for answered questions
const initialQuestions = [
  {
    id: 1,
    category: 'Housing',
    question: 'How do I find a dorm room near the university?',
    answer: 'You can apply for student dorms via the Studierendenwerk Karlsruhe-Pforzheim website. The main dorms are located at St.-Georgen-Steige and Hagenschießstraße. Deadlines are usually July 15th for the Winter Semester.',
    status: 'Replied',
    date: '2025-10-01'
  },
  {
    id: 2,
    category: 'Visa & Registration',
    question: 'Where is the Foreigners Registration Office (Ausländerbehörde)?',
    answer: 'It is located at the Rathaus (City Hall) near the Marktplatz. You typically need to make an appointment online via the Pforzheim City website before visiting.',
    status: 'Replied',
    date: '2025-09-28'
  },
  {
      id: 3,
      category: 'Transport',
      question: 'Which bus goes to the university?',
      answer: 'Bus lines 5 and 6 go directly to the university from the main train station (Leopoldplatz/Hbf). Look for the stop "Hochschule/Wildpark".',
      status: 'Replied',
      date: '2025-10-05'
  }
];

const LowCodeForm: React.FC = () => {
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [category, setCategory] = useState('Housing');
  const [question, setQuestion] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [questionsList, setQuestionsList] = useState(initialQuestions);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to a backend.
    // Here, we'll just simulate the submission.
    console.log({ name, studentId, category, question });
    setSubmitted(true);
    
    // Optionally add the new question to the list (simulating immediate feedback or queue)
    // For this demo, we won't add it to the "Answered" list immediately as it lacks an answer.
    
    setName('');
    setStudentId('');
    setCategory('Housing');
    setQuestion('');
    setTimeout(() => setSubmitted(false), 5000); 
  };

  return (
    <div className="max-w-lg mx-auto pb-10">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-hs-gold">Submit a Question</h2>
        <p className="mt-2 text-gray-600">Can't find an answer? Use this form to send a query directly to our support team.</p>
      </div>

      {submitted && (
        <div className="bg-green-100 border border-green-400 text-green-800 px-4 py-3 rounded-lg mb-6 text-center animate-fade-in" role="alert">
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline"> Your question has been submitted. We will reply shortly.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-hs-gold transition"
            placeholder="e.g., Martina Mustermann"
          />
        </div>

        <div>
          <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 mb-2">Student Matriculation No.</label>
          <input
            type="text"
            id="studentId"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
            className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-hs-gold transition"
            placeholder="e.g., 333004"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">Question Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-hs-gold transition"
          >
            <option>Housing</option>
            <option>Visa & Registration</option>
            <option>University Courses</option>
            <option>Events</option>
            <option>Connecting with People</option>
            <option>Places</option>
            <option>Health & Insurance</option>
            <option>Transport</option>
            <option>Other</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-2">Your Question</label>
          <textarea
            id="question"
            rows={4}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
            className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-hs-gold transition"
            placeholder="Type your specific question here..."
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-hs-gold text-hs-dark font-bold py-3 px-4 rounded-md hover:bg-yellow-500 transition-colors duration-300 disabled:bg-gray-300 shadow-sm"
          disabled={!name || !studentId || !question}
        >
          Submit Question
        </button>
      </form>

      <div className="mt-12 pt-8 border-t-2 border-dashed border-gray-200">
        <h3 className="text-xl font-bold text-hs-dark mb-6 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-hs-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            Recently Answered Questions
        </h3>
        <div className="space-y-5">
          {questionsList.map(q => (
             <div key={q.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                    <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">{q.category}</span>
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                        {q.status}
                    </span>
                </div>
                <p className="font-bold text-hs-dark mb-3 text-lg">"{q.question}"</p>
                <div className="bg-soft-yellow border-l-4 border-hs-gold p-4 rounded-r-md">
                    <p className="text-sm text-gray-800 leading-relaxed">
                        <span className="font-bold text-hs-gold block text-xs uppercase mb-1">Official Reply:</span> 
                        {q.answer}
                    </p>
                </div>
                <div className="flex justify-end mt-3">
                     <p className="text-xs text-gray-400">{q.date}</p>
                </div>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LowCodeForm;