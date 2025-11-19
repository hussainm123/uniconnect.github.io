import React from 'react';
import { AcademicCapIcon } from './Icons';

const StudentPortal: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-hs-gold to-yellow-300 rounded-xl text-hs-dark shadow-sm">
        <div className="bg-white/30 p-3 rounded-full">
           <div className="w-10 h-10 flex items-center justify-center text-2xl">👤</div>
        </div>
        <div>
            <h2 className="text-xl font-bold">Welcome back, Martina!</h2>
            <p className="opacity-90 text-sm">Matriculation No: 333004 | Master Corporate Communication Management</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm text-center">
              <div className="text-3xl font-bold text-hs-dark mb-1">1.7</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">Current GPA</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">Paid</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">Semester Fee</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm text-center">
              <div className="text-3xl font-bold text-hs-gold mb-1">5</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">Upcoming Exams</div>
          </div>
      </div>

      <div className="bg-red-50 border border-red-100 rounded-lg p-4 flex items-start gap-3">
          <div className="text-red-500 mt-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          </div>
          <div>
              <h3 className="font-bold text-red-800 text-sm">Restricted Access Area</h3>
              <p className="text-red-700 text-xs mt-1">
                  This is a mock visualization. In the real application, this section requires strict OAuth2 authentication to access personal grades, exam schedules, and financial documents from the University Database.
              </p>
          </div>
      </div>

      <div className="space-y-4">
          <h3 className="text-lg font-bold text-hs-dark flex items-center gap-2">
              <AcademicCapIcon />
              <span>My Documents</span>
          </h3>
          <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100">
              {[
                  { name: 'Immatriculation Certificate (WiSe 25/26)', date: '01.10.2025', size: '145 KB' },
                  { name: 'Transcript of Records', date: '15.07.2025', size: '2.1 MB' },
                  { name: 'Health Insurance Confirmation', date: '20.09.2025', size: '80 KB' },
              ].map((doc, i) => (
                  <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50 transition">
                      <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center text-gray-500 text-xs font-bold">PDF</div>
                          <div>
                              <p className="text-sm font-medium text-hs-dark">{doc.name}</p>
                              <p className="text-xs text-gray-500">{doc.date} • {doc.size}</p>
                          </div>
                      </div>
                      <button className="text-hs-gold hover:text-yellow-600 text-sm font-medium">Download</button>
                  </div>
              ))}
          </div>
      </div>
    </div>
  );
};

export default StudentPortal;