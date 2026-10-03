import React from 'react';
import { AlertCircle, RefreshCw, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ErrorMessage = ({ message, onRetry, showBack = false }) => {
    const navigate = useNavigate();

    return (
        <div className="error-container">
            <AlertCircle className="error-icon" size={48} />
            <h3 className="error-title">Oops! Something went wrong.</h3>
            <p className="error-message">{message || "Unable to load Pokémon. Please try again."}</p>

            <div className="error-actions">
                {showBack && (
                    <button onClick={() => navigate('/')} className="btn-secondary">
                        <ArrowLeft size={16} />
                        Back to List
                    </button>
                )}
                {onRetry && (
                    <button onClick={onRetry} className="btn-retry">
                        <RefreshCw size={16} />
                        Retry
                    </button>
                )}
            </div>
        </div>
    );
};

export default ErrorMessage;
