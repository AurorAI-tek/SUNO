import React from 'react';
import { FaExclamationCircle, FaInfoCircle, FaTimesCircle } from 'react-icons/fa';

/**
 * A reusable component for displaying error messages with different severity levels
 * @param {Object} props - Component props
 * @param {string} props.message - The error message to display
 * @param {string} props.type - The type of message ('error', 'warning', or 'info')
 * @param {boolean} props.dismissible - Whether the message can be dismissed
 * @param {function} props.onDismiss - Callback function when the message is dismissed
 */
const ErrorDisplay = ({ 
  message, 
  type = 'error',
  dismissible = false,
  onDismiss = () => {}
}) => {
  if (!message) return null;
  
  // Define styles based on message type
  const styles = {
    error: {
      bg: 'bg-red-50',
      text: 'text-red-700',
      border: 'border-red-200',
      icon: <FaExclamationCircle className="text-red-500" />
    },
    warning: {
      bg: 'bg-yellow-50',
      text: 'text-yellow-800',
      border: 'border-yellow-200',
      icon: <FaExclamationCircle className="text-yellow-500" />
    },
    info: {
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      border: 'border-blue-200',
      icon: <FaInfoCircle className="text-blue-500" />
    }
  };
  
  const currentStyle = styles[type] || styles.error;
  
  return (
    <div className={`${currentStyle.bg} ${currentStyle.text} ${currentStyle.border} border px-4 py-3 rounded-md flex items-start justify-between`}>
      <div className="flex items-center">
        <span className="mr-2">{currentStyle.icon}</span>
        <div>
          {typeof message === 'string' ? (
            <p>{message}</p>
          ) : (
            // Handle error objects or arrays of error messages
            <div>
              {Array.isArray(message) ? (
                <ul className="list-disc list-inside">
                  {message.map((msg, index) => (
                    <li key={index}>{msg}</li>
                  ))}
                </ul>
              ) : message.message ? (
                <p>{message.message}</p>
              ) : (
                <p>An unexpected error occurred</p>
              )}
            </div>
          )}
        </div>
      </div>
      
      {dismissible && (
        <button 
          onClick={onDismiss}
          className="ml-4 text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label="Dismiss"
        >
          <FaTimesCircle />
        </button>
      )}
    </div>
  );
};

export default ErrorDisplay;
