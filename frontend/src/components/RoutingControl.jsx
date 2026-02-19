import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaPlus } from 'react-icons/fa';

function RoutingControl({ selectedInput, selectedOutput, onCreateRoute }) {
  return (
    <form onSubmit={onCreateRoute} className="routing-control">
      <div className="routing-display">
        <div className="selected-item">
          {selectedInput ? (
            <>
              <div className="item-icon">📱</div>
              <div className="item-details">
                <p className="item-label">Input Source</p>
                <p className="item-name">{selectedInput.name}</p>
              </div>
            </>
          ) : (
            <>
              <div className="item-icon">?</div>
              <div className="item-details">
                <p className="item-label">Select Input</p>
                <p className="item-name">No source selected</p>
              </div>
            </>
          )}
        </div>

        <div className="arrow-container">
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <FaArrowRight className="arrow-icon" />
          </motion.div>
        </div>

        <div className="selected-item">
          {selectedOutput ? (
            <>
              <div className="item-icon">🔊</div>
              <div className="item-details">
                <p className="item-label">Output Device</p>
                <p className="item-name">{selectedOutput.name}</p>
              </div>
            </>
          ) : (
            <>
              <div className="item-icon">?</div>
              <div className="item-details">
                <p className="item-label">Select Output</p>
                <p className="item-name">No device selected</p>
              </div>
            </>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={!selectedInput || !selectedOutput}
        className="create-route-btn"
      >
        <FaPlus /> Create Route
      </button>

      {!selectedInput && (
        <p className="hint">👆 Select an input source first</p>
      )}
      {selectedInput && !selectedOutput && (
        <p className="hint">👆 Select an output device</p>
      )}
      {selectedInput && selectedOutput && (
        <p className="hint ready">✓ Ready to create route</p>
      )}
    </form>
  );
}

export default RoutingControl;
