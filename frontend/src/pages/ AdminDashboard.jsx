import React, { useState } from 'react';
import UserManagement from './UserManagement';
import TeacherApproval from './TeacherApproval';
import TeacherListAdmin from './TeacherListAdmin';
import PaymentList from './PaymentList';
import StudentProfileManagement from './StudentProfileManagement';
import Classmanagment from './ Classmanagment';
import Footer from "../components/ Footer"; 
import CreateSubjectForm from './CreateSubjectForm';

const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState('users');

  const renderTab = () => {
    switch (selectedTab) {
      // case 'users':
      //   return <UserManagement />;
      case 'approval':
        return <TeacherApproval />;
      case 'teachers':
        return <TeacherListAdmin />;
      case 'payments':
        return <PaymentList />; 
      case 'class-management':
        return <Classmanagment />;
      case 'profile':
        return <StudentProfileManagement />;
        case 'CreateSubjectForm':
          return <CreateSubjectForm />;
      // default:
      //   return <AdminDashboard />;

    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-[#053F5C]  text-white p-6 space-y-6">
        <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
        <ul className="space-y-4 text-sm font-medium">
          <li
            className={`cursor-pointer ${selectedTab === 'users' ? 'text-white font-bold' : 'text-gray-300'}`}
            onClick={() => setSelectedTab('users')}
          >
            {/* UserManagement */}
          </li>
          <li
            className={`cursor-pointer ${selectedTab === 'approval' ? 'text-white font-bold' : 'text-gray-300'}`}
            onClick={() => setSelectedTab('approval')}
          >
            TeacherApproval
          </li>
          <li
            className={`cursor-pointer ${selectedTab === 'teachers' ? 'text-white font-bold' : 'text-gray-300'}`}
            onClick={() => setSelectedTab('teachers')}
          >
            TeacherListAdmin
          </li>
          <li
            className={`cursor-pointer ${selectedTab === 'payments' ? 'text-white font-bold' : 'text-gray-300'}`}
            onClick={() => setSelectedTab('payments')}
          >
            PaymentList
          </li>  

             <li
            className={`cursor-pointer ${selectedTab === 'profile' ? 'text-white font-bold' : 'text-gray-300'}`}
            onClick={() => setSelectedTab('profile')}
          >
            {/* StudentProfileManagement */}
          </li>

          <li
            className={`cursor-pointer ${selectedTab === 'class-management' ? 'text-white font-bold' : 'text-gray-300'}`}
            onClick={() => setSelectedTab('class-management')}
          >
            Class Management
          </li>
           
          
           
          <li
            className={`cursor-pointer ${selectedTab === 'CreateSubjectForm' ? 'text-white font-bold' : 'text-gray-300'}`}
            onClick={() => setSelectedTab('CreateSubjectForm')}
          >
            {/* Create Subject */}
          </li>


        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-200 overflow-y-auto">
        {renderTab()}
      </main>
      
    </div>
    
  );
  
};

export default AdminDashboard;
