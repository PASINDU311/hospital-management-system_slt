
import React, { useState } from 'react';

function DoctorScheduleForm({ onClose, onSave, doctors }) {
    const [formData, setFormData] = useState({
        doctorId: '',
        scheduleDate: '',
        startTime: '',
        endTime: '',
        activity: '',
        room: '',
        status: 'Available'
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));

        setError('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        if (formData.startTime >= formData.endTime) {
            setError('End time must be after start time.');
            return;
        }

        setLoading(true);

        try {
            await onSave({
                ...formData,
                doctorId: Number(formData.doctorId)
            });
        } catch (error) {
            setError(error.message || 'Failed to create schedule.');
        } finally {
            setLoading(false);
        }
    };

    const today = new Date().toLocaleDateString('en-CA');

    return (
        <div className="schedule-modal-overlay">
            <div className="schedule-modal">
                <div className="schedule-modal-header">
                    <div>
                        <h2>New Doctor Schedule</h2>
                        <p>Create a doctor availability schedule</p>
                    </div>

                    <button
                        type="button"
                        className="schedule-modal-close"
                        onClick={onClose}
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="schedule-form-body">

                        <div className="schedule-form-field">
                            <label>Doctor</label>
                            <select
                                name="doctorId"
                                value={formData.doctorId}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Doctor</option>

                                {doctors.map((doctor) => (
                                    <option
                                        key={doctor.id}
                                        value={doctor.id}
                                    >
                                        Dr. {doctor.firstName} {doctor.lastName}
                                        {' - '}{doctor.department}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="schedule-form-field">
                            <label>Schedule Date</label>
                            <input
                                type="date"
                                name="scheduleDate"
                                min={today}
                                value={formData.scheduleDate}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="schedule-form-row">
                            <div className="schedule-form-field">
                                <label>Start Time</label>
                                <input
                                    type="time"
                                    name="startTime"
                                    value={formData.startTime}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="schedule-form-field">
                                <label>End Time</label>
                                <input
                                    type="time"
                                    name="endTime"
                                    value={formData.endTime}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="schedule-form-field">
                            <label>Activity</label>
                            <input
                                type="text"
                                name="activity"
                                placeholder="e.g. Consultation"
                                value={formData.activity}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="schedule-form-field">
                            <label>Room</label>
                            <input
                                type="text"
                                name="room"
                                placeholder="e.g. Room 101"
                                value={formData.room}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="schedule-form-field">
                            <label>Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                            >
                                <option value="Available">Available</option>
                                <option value="Busy">Busy</option>
                                <option value="Unavailable">Unavailable</option>
                            </select>
                        </div>

                        {error && (
                            <p className="schedule-form-error">
                                {error}
                            </p>
                        )}
                    </div>

                    <div className="schedule-modal-actions">
                        <button
                            type="button"
                            className="schedule-cancel-btn"
                            onClick={onClose}
                            disabled={loading}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="schedule-save-btn"
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : 'Create Schedule'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default DoctorScheduleForm;
