interface DemographicsResponse {
  message: string;
  data: {
    race: {
      black: number;
      white: number;
      "southeast asian": number;
      "south asian": number;
      "latino hispanic": number;
      "east asian": number;
      "middle eastern": number;
    };
    age: {
      "20-29": number;
      "30-39": number;
      "40-49": number;
      "10-19": number;
      "50-59": number;
      "3-9": number;
      "60-69": number;
      "70+": number;
      "0-2": number;
    };
    gender: {
      male: number;
      female: number;
    };
  };
}

export const analyzeImage = async (imageBase64: string): Promise<DemographicsResponse> => {
  try {
    const response = await fetch(
      "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: imageBase64 }),
      }
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error analyzing image:", error);
    throw error;
  }
}; 