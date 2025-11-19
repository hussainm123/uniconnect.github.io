import React from 'react';
import { UploadIcon, HashIcon, ChainIcon, VerifyIcon, IoTIcon, StudentProfileIcon, NotificationBellIcon, LibraryIcon, LabIcon } from './Icons';

interface FlowStepProps {
  icon: React.ReactElement;
  title: string;
  description: string;
  isLast?: boolean;
}

const FlowStep: React.FC<FlowStepProps> = ({ icon, title, description, isLast = false }) => (
  <li className="relative flex items-start gap-6 pb-8">
    {!isLast && (
      <div className="absolute left-6 top-12 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
    )}
    <div className="relative flex h-12 w-12 flex-none items-center justify-center bg-white rounded-full ring-1 ring-gray-200 text-hs-gold">
      {icon}
    </div>
    <div className="flex-grow pt-2">
      <h3 className="text-lg font-semibold text-hs-dark">{title}</h3>
      <p className="mt-1 text-sm text-gray-600">{description}</p>
    </div>
  </li>
);

const Outcome: React.FC<{icon: React.ReactElement, text: string}> = ({ icon, text }) => (
    <div className="flex items-center gap-3 p-3 bg-yellow-50/70 rounded-md">
        <div className="flex-shrink-0 text-hs-gold">{icon}</div>
        <p className="text-sm text-gray-700">{text}</p>
    </div>
);


const BlockchainFlow: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-hs-gold">Student Credential & Campus Integration Flow</h2>
        <p className="mt-2 text-gray-600">An illustration of credential verification via Blockchain and integration with IoT campus notifications.</p>
      </div>
      
      <div>
        <h3 className="text-xl font-semibold text-hs-gold/80 mb-6 pl-20">Phase 1: Credential Verification</h3>
        <ul>
          <FlowStep 
            icon={<UploadIcon />}
            title="1. Student Uploads Credentials"
            description="The student submits required documents (admission letter, insurance) to the secure university portal."
          />
          <FlowStep 
            icon={<HashIcon />}
            title="2. Document Hashing"
            description="The system generates a unique, unchangeable cryptographic hash (a digital fingerprint) for each document."
          />
          <FlowStep 
            icon={<ChainIcon />}
            title="3. Transaction on Blockchain"
            description="This hash is recorded on a private blockchain, creating an immutable and tamper-proof record of the document's authenticity."
          />
          <FlowStep 
            icon={<VerifyIcon />}
            title="4. Verification by Third Parties"
            description="Authorized institutions (e.g., city registration office) can instantly verify the credential's hash against the blockchain record without needing to access the sensitive document itself."
            isLast={true}
          />
        </ul>
      </div>

      <div className="my-8 border-t border-dashed border-gray-300"></div>

      <div>
        <h3 className="text-xl font-semibold text-hs-gold/80 mb-6 pl-20">Phase 2: IoT Campus Integration</h3>
        <ul>
           <FlowStep 
            icon={<StudentProfileIcon />}
            title="5. Student Status Update"
            description="Upon successful verification, the student's digital profile is updated to 'Verified' or 'Registered', unlocking campus privileges."
          />
           <FlowStep 
            icon={<IoTIcon />}
            title="6. IoT Device Interaction"
            description="The verified status allows the student to interact with IoT-enabled devices across campus, such as smart card readers at building entrances."
          />
           <li className="relative flex items-start gap-6">
              <div className="relative flex h-12 w-12 flex-none items-center justify-center bg-white rounded-full ring-1 ring-gray-200 text-hs-gold">
                <NotificationBellIcon />
              </div>
              <div className="flex-grow pt-2">
                <h3 className="text-lg font-semibold text-hs-dark">7. Real-time Notifications & Access</h3>
                <p className="mt-1 text-sm text-gray-600 mb-4">IoT systems trigger actions based on the student's verified status and location:</p>
                <div className="space-y-3">
                    <Outcome icon={<LibraryIcon/>} text="Access granted to secure areas like libraries and labs." />
                    <Outcome icon={<NotificationBellIcon/>} text="Real-time notifications sent for relevant events or alerts." />
                </div>
              </div>
           </li>
        </ul>
      </div>

    </div>
  );
};

export default BlockchainFlow;