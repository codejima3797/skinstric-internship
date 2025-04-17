export const submitUserInfo = async (name: string, location: string) => {
  try {
    const response = await fetch('https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        location
      })
    });

    if (!response.ok) {
      throw new Error('Failed to submit user info');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error submitting user info:', error);
    throw error;
  }
}; 