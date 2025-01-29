import React from 'react';

const VitalSigns = ({ vitalSigns, onChange }) => {
    const handleChange = (key, value) => {
        onChange({ ...vitalSigns, [key]: parseFloat(value) });
    };

    return (
        <div className="vital-signs">
            <label>
                Heart Rate:
                <input
                    type="number"
                    value={vitalSigns.heart_rate}
                    onChange={(e) => handleChange('heart_rate', e.target.value)}
                />
            </label>
            <label>
                SpO2:
                <input
                    type="number"
                    value={vitalSigns.spo2}
                    onChange={(e) => handleChange('spo2', e.target.value)}
                />
            </label>
            <label>
                Temperature:
                <input
                    type="number"
                    value={vitalSigns.temperature}
                    onChange={(e) => handleChange('temperature', e.target.value)}
                />
            </label>
        </div>
    );
};

export default VitalSigns;
