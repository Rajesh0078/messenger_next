"use client"

// utils/api.js

import axios from 'axios';

export const pollUpdates = async () => {
    try {
        const response = await axios.get('/api/poll');
        return response.data;
    } catch (error) {
        console.error('Error polling updates:', error);
        return null;
    }
};
