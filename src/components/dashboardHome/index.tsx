import React from 'react';
interface DashboardHomeProps {
  loggedInEmail: string; 
}

const DashboardHome: React.FC<DashboardHomeProps> = () => {
  return (
      <h2 className="text-white text-3xl font-semibold mb-4">Main</h2>
  );
};

export default DashboardHome;
