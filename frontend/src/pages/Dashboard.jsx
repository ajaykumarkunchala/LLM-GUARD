function Dashboard() {
  return (
    <div className="dashboard">
      <h1>LLM-Guard Dashboard</h1>
      <p>AI Security Monitoring Dashboard</p>

      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Requests</h3>
          <p>1,250</p>
        </div>

        <div className="stat-card">
          <h3>Blocked Prompts</h3>
          <p>120</p>
        </div>

        <div className="stat-card">
          <h3>Threats Detected</h3>
          <p>85</p>
        </div>

        <div className="stat-card">
          <h3>Active Users</h3>
          <p>12</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;