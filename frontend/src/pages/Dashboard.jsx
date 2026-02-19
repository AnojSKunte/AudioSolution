import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AudioSourcesList from '../components/AudioSourcesList';
import AudioDevicesList from '../components/AudioDevicesList';
import RoutingControl from '../components/RoutingControl';
import RoutesList from '../components/RoutesList';
import '../styles/Dashboard.css';

function Dashboard() {
  const [inputs, setInputs] = useState([]);
  const [outputs, setOutputs] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [selectedInput, setSelectedInput] = useState(null);
  const [selectedOutput, setSelectedOutput] = useState(null);
  const [status, setStatus] = useState('connecting');
  const [metrics, setMetrics] = useState({
    cpuUsage: 0,
    memoryUsage: 0,
    activeRoutes: 0,
    latency: 0
  });

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchAudioData();
    const interval = setInterval(fetchAudioData, 2000);
    return () => clearInterval(interval);
  }, []);

  const fetchAudioData = async () => {
    try {
      // Fetch inputs
      const inputsRes = await fetch(`${API_URL}/api/audio/inputs`);
      const inputsData = await inputsRes.json();
      setInputs(inputsData.inputs || []);

      // Fetch outputs
      const outputsRes = await fetch(`${API_URL}/api/audio/outputs`);
      const outputsData = await outputsRes.json();
      setOutputs(outputsData.outputs || []);

      // Fetch routes
      const routesRes = await fetch(`${API_URL}/api/routes`);
      const routesData = await routesRes.json();
      setRoutes(routesData.routes || []);

      // Fetch status/metrics
      const statusRes = await fetch(`${API_URL}/api/audio/status`);
      const statusData = await statusRes.json();
      setMetrics(statusData.metrics || {});
      setStatus('connected');
    } catch (error) {
      console.error('Error fetching audio data:', error);
      setStatus('error');
    }
  };

  const handleCreateRoute = async (e) => {
    e.preventDefault();

    if (!selectedInput || !selectedOutput) {
      alert('Please select both input and output');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/routes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inputId: selectedInput.id,
          outputId: selectedOutput.id,
          name: `${selectedInput.name} → ${selectedOutput.name}`
        })
      });

      const data = await response.json();

      if (response.ok) {
        setRoutes([...routes, data.route]);
        setSelectedInput(null);
        setSelectedOutput(null);
        alert('Route created successfully!');
      }
    } catch (error) {
      console.error('Error creating route:', error);
      alert('Failed to create route');
    }
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <motion.div
        className="dashboard-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Audio Solution Dashboard</h1>
        <div className="status-badge">
          <span className={`status-dot status-${status}`}></span>
          {status === 'connected' && 'Agent Connected'}
          {status === 'connecting' && 'Connecting...'}
          {status === 'error' && 'Connection Error'}
        </div>
      </motion.div>

      {/* Metrics */}
      <motion.div
        className="metrics-panel"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="metric">
          <span className="metric-label">CPU Usage</span>
          <span className="metric-value">{metrics.cpuUsage?.toFixed(1)}%</span>
        </div>
        <div className="metric">
          <span className="metric-label">Memory</span>
          <span className="metric-value">{metrics.memoryUsage?.toFixed(1)} MB</span>
        </div>
        <div className="metric">
          <span className="metric-label">Active Routes</span>
          <span className="metric-value">{routes.length}</span>
        </div>
        <div className="metric">
          <span className="metric-label">Latency</span>
          <span className="metric-value">{metrics.latency?.toFixed(0)}ms</span>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Left Column - Audio Sources & Devices */}
        <motion.div
          className="column left-column"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="card">
            <h2>Input Sources</h2>
            <AudioSourcesList
              sources={inputs}
              selected={selectedInput}
              onSelect={setSelectedInput}
            />
          </div>

          <div className="card">
            <h2>Output Devices</h2>
            <AudioDevicesList
              devices={outputs}
              selected={selectedOutput}
              onSelect={setSelectedOutput}
            />
          </div>
        </motion.div>

        {/* Middle Column - Routing Control */}
        <motion.div
          className="column middle-column"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="card">
            <h2>Create New Route</h2>
            <RoutingControl
              selectedInput={selectedInput}
              selectedOutput={selectedOutput}
              onCreateRoute={handleCreateRoute}
            />
          </div>
        </motion.div>

        {/* Right Column - Active Routes */}
        <motion.div
          className="column right-column"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="card">
            <h2>Active Routes</h2>
            <RoutesList routes={routes} onRefresh={fetchAudioData} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Dashboard;
