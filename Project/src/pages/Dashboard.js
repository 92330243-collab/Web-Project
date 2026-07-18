import React, { useState, useEffect } from 'react';
import ActivityCard from '../components/ActivityCard';
import '../styles/Dashboard.css';

export default function Dashboard() {
  const [userName, setUserName] = useState('Guest');
  const [isNameSet, setIsNameSet] = useState(false);
  const [steps, setSteps] = useState(0);
  const [water, setWater] = useState(0);
  const [sleep, setSleep] = useState(0);
  const [activities, setActivities] = useState([]);
  const [activityInput, setActivityInput] = useState('');
  const [goal, setGoal] = useState(10000);

  useEffect(() => {
    const savedData = localStorage.getItem('dashboardData');
    if (savedData) {
      const data = JSON.parse(savedData);
      setUserName(data.userName || 'Guest');
      setSteps(data.steps || 0);
      setWater(data.water || 0);
      setSleep(data.sleep || 0);
      setActivities(data.activities || []);
      setGoal(data.goal || 10000);
      setIsNameSet(!!data.userName);
    }
  }, []);

  const saveData = () => {
    const data = { userName, steps, water, sleep, activities, goal };
    localStorage.setItem('dashboardData', JSON.stringify(data));
  };

  const handleSetName = () => {
    if (userName.trim()) {
      setIsNameSet(true);
      saveData();
    }
  };

  const handleAddActivity = () => {
    if (activityInput.trim()) {
      const newActivity = {
        id: Date.now(),
        text: activityInput,
        date: new Date().toLocaleString(),
        completed: false
      };
      setActivities([newActivity, ...activities]);
      setActivityInput('');
      saveData();
    }
  };

  const toggleComplete = (id) => {
    setActivities(activities.map(act => 
      act.id === id ? { ...act, completed: !act.completed } : act
    ));
    saveData();
  };

  const deleteActivity = (id) => {
    setActivities(activities.filter(act => act.id !== id));
    saveData();
  };

  const addWater = (amount) => {
    setWater(water + amount);
    saveData();
  };

  const progress = Math.min((steps / goal) * 100, 100);

  return (
    <section className="section container dashboard">
      <div className="dashboard-header">
        <div>
          {!isNameSet ? (
            <div className="name-setup">
              <h1>👋 Welcome!</h1>
              <div className="name-input-group">
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="name-input"
                />
                <button onClick={handleSetName} className="btn-primary">Start</button>
              </div>
            </div>
          ) : (
            <div>
              <h1 className="section-title">👋 Good to see you, {userName}!</h1>
              <p className="section-subtitle">Let's track your health today</p>
            </div>
          )}
        </div>
        <div className="dashboard-date">
          <span>📅 {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
          })}</span>
        </div>
      </div>

      <div className="dashboard-grid">
        <ActivityCard icon="👣" title="Steps Today" value={steps} unit="steps" color="#16a888" />
        <ActivityCard icon="💧" title="Water" value={water} unit="ml" color="#3f8fe0" />
        <ActivityCard icon="😴" title="Sleep" value={sleep} unit="hrs" color="#8a5fe0" />
      </div>

      <div className="summary-grid">
        <div className="summary-card">
          <label>👣 Steps</label>
          <input 
            type="number" 
            value={steps} 
            onChange={(e) => { setSteps(parseInt(e.target.value) || 0); saveData(); }} 
            className="summary-input" 
            min="0"
          />
        </div>
        <div className="summary-card">
          <label>😴 Sleep</label>
          <input 
            type="number" 
            value={sleep} 
            onChange={(e) => { setSleep(parseFloat(e.target.value) || 0); saveData(); }} 
            className="summary-input" 
            step="0.5" 
            min="0" 
            max="24"
          />
        </div>
        <div className="summary-card">
          <label>💧 Water Goal</label>
          <div className="water-goal-display">
            <span className="water-amount-small">{water}</span>
            <span className="water-goal-text">/ 2000 ml</span>
          </div>
        </div>
      </div>

      <div className="dashboard-main">
        <div className="dashboard-left">
          <div className="dashboard-panel">
            <div className="panel-header">
              <h3>📈 Daily Goal Progress</h3>
              <button 
                onClick={() => {
                  const newGoal = prompt('Enter your daily step goal:', goal);
                  if (newGoal !== null && !isNaN(newGoal) && newGoal > 0) {
                    setGoal(parseInt(newGoal));
                    saveData();
                  }
                }} 
                className="edit-btn"
              >
                ✏️ Edit Goal
              </button>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <div className="progress-details">
              <span className="progress-percentage">{Math.round(progress)}%</span>
              <span className="progress-label">{steps} / {goal} steps</span>
            </div>
          </div>

          <div className="dashboard-panel">
            <div className="panel-header">
              <h3>📋 Today's Activities</h3>
              <span className="activity-count">{activities.length}</span>
            </div>
            <div className="add-activity">
              <input
                type="text"
                placeholder="Add activity..."
                value={activityInput}
                onChange={(e) => setActivityInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddActivity()}
                className="activity-input"
              />
              <button onClick={handleAddActivity} className="add-btn">+</button>
            </div>
            <ul className="activity-list">
              {activities.length === 0 ? (
                <p className="empty-message">No activities yet. Start tracking!</p>
              ) : (
                activities.map((item) => (
                  <li key={item.id} className="activity-item">
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => toggleComplete(item.id)}
                      className="activity-checkbox"
                    />
                    <div className="activity-info">
                      <span className={item.completed ? 'completed' : ''}>{item.text}</span>
                      <span className="activity-time">{item.date}</span>
                    </div>
                    <button onClick={() => deleteActivity(item.id)} className="delete-btn">✕</button>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>

        <div className="dashboard-right">
          <div className="dashboard-panel">
            <h3>💧 Water Tracker</h3>
            <div className="water-display">
              <span className="water-amount">{water}</span>
              <span className="water-unit">ml</span>
            </div>
            <div className="water-buttons">
              <button onClick={() => addWater(250)} className="water-btn">250ml</button>
              <button onClick={() => addWater(500)} className="water-btn">500ml</button>
              <button onClick={() => addWater(1000)} className="water-btn">1L</button>
              <button onClick={() => { setWater(0); saveData(); }} className="water-btn reset">Reset</button>
            </div>
            <div className="water-goal">
              <span>Goal: 2000ml</span>
              <span>{Math.round((water / 2000) * 100)}%</span>
            </div>
            <div className="progress-bar mini">
              <div className="progress-fill" style={{ width: `${Math.min((water / 2000) * 100, 100)}%` }} />
            </div>
          </div>

          <div className="dashboard-panel">
            <h3>😴 Sleep Tips</h3>
            <div className="sleep-display">
              <span className="sleep-amount">{sleep}</span>
              <span className="sleep-unit">hours</span>
            </div>
            <div className="sleep-recommendation">
              {sleep >= 7 && sleep <= 9 ? '✅ Great sleep!' : 
               sleep > 9 ? '😴 Too much sleep!' : 
               sleep > 0 ? '😅 Try to sleep more!' : 
               '💤 Add your sleep hours'}
            </div>
            <div className="sleep-tips">
              <p>💡 Aim for 7-9 hours</p>
              <p>🌙 Keep a consistent schedule</p>
            </div>
          </div>

          <div className="dashboard-panel">
            <h3>📊 Quick Stats</h3>
            <div className="stat-row">
              <span>🏃 Activities</span>
              <span className="stat-value">{activities.length}</span>
            </div>
            <div className="stat-row">
              <span>✅ Completed</span>
              <span className="stat-value">{activities.filter(a => a.completed).length}</span>
            </div>
            <div className="stat-row">
              <span>💧 Water Goal</span>
              <span className="stat-value">{Math.round((water / 2000) * 100)}%</span>
            </div>
            <button onClick={saveData} className="save-btn">💾 Save Progress</button>
          </div>
        </div>
      </div>
    </section>
  );
}