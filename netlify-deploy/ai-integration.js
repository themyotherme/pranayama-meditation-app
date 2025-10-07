/**
 * AI Integration Module for OpenAI API
 * Handles all AI-powered features including program generation and recommendations
 */

class AIIntegration {
    constructor() {
        this.apiKey = localStorage.getItem('openaiAPIKey') || '';
        this.model = localStorage.getItem('aiModel') || 'gpt-3.5-turbo';
        this.baseURL = 'https://api.openai.com/v1/chat/completions';
        this.enabled = localStorage.getItem('aiEnabled') === 'true';
    }
    
    setAPIKey(key) {
        this.apiKey = key;
        localStorage.setItem('openaiAPIKey', key);
    }
    
    setModel(model) {
        this.model = model;
        localStorage.setItem('aiModel', model);
    }
    
    setEnabled(enabled) {
        this.enabled = enabled;
        localStorage.setItem('aiEnabled', enabled.toString());
    }
    
    isConfigured() {
        return this.enabled && this.apiKey && this.apiKey.length > 0;
    }
    
    async testConnection() {
        if (!this.apiKey) {
            throw new Error('No API key provided');
        }
        
        try {
            const response = await fetch(this.baseURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    model: this.model,
                    messages: [{
                        role: 'user',
                        content: 'Say "API connection successful" if you can read this.'
                    }],
                    max_tokens: 20
                })
            });
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error?.message || 'API request failed');
            }
            
            const data = await response.json();
            return {
                success: true,
                message: 'Connection successful!',
                model: this.model
            };
        } catch (error) {
            return {
                success: false,
                message: error.message
            };
        }
    }
    
    async generateProgram(userGoal, exercises, targetDuration, experienceLevel) {
        if (!this.isConfigured()) {
            throw new Error('AI not configured. Please add your OpenAI API key in Settings.');
        }
        
        const prompt = this.buildProgramPrompt(userGoal, exercises, targetDuration, experienceLevel);
        
        try {
            const response = await fetch(this.baseURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    model: this.model,
                    messages: [{
                        role: 'system',
                        content: 'You are an expert in meditation, pranayama (yogic breathing), and wellness practices. You create personalized wellness programs.'
                    }, {
                        role: 'user',
                        content: prompt
                    }],
                    temperature: 0.7,
                    max_tokens: 1000
                })
            });
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error?.message || 'API request failed');
            }
            
            const data = await response.json();
            const aiResponse = data.choices[0].message.content;
            
            // Parse JSON from AI response
            const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
            if (!jsonMatch) {
                throw new Error('AI did not return valid JSON');
            }
            
            return JSON.parse(jsonMatch[0]);
        } catch (error) {
            console.error('AI generation failed:', error);
            throw error;
        }
    }
    
    buildProgramPrompt(userGoal, exercises, targetDuration, experienceLevel) {
        const exerciseList = Object.values(exercises).map(ex => ({
            id: ex.id,
            name: ex.name,
            description: ex.description,
            type: ex.type,
            defaultDuration: ex.duration,
            safetyLevel: ex.safetyLevel,
            benefits: ex.benefits
        }));
        
        const validExerciseIds = Object.keys(exercises);
        
        return `Create a personalized wellness program based on the following:

USER REQUEST: "${userGoal}"

TARGET DURATION: ${targetDuration} minutes
EXPERIENCE LEVEL: ${experienceLevel}

AVAILABLE EXERCISES:
${JSON.stringify(exerciseList, null, 2)}

VALID EXERCISE IDs (YOU MUST ONLY USE THESE):
${validExerciseIds.join(', ')}

INSTRUCTIONS:
1. Select 3-5 exercises that best match the user's goal
2. YOU MUST ONLY use exerciseId values from the VALID EXERCISE IDs list above
3. Allocate time for each exercise (minimum 120 seconds, maximum 600 seconds each)
4. Total duration should be close to ${targetDuration} minutes (${targetDuration * 60} seconds)
5. Order exercises logically (e.g., energizing → calming, or progressive sequence)
6. For beginners, avoid exercises marked as "advanced" safety level
7. Create a descriptive program name (max 50 characters)
8. Explain your reasoning (why this sequence helps achieve their goal)
9. For each exercise, explain WHY you selected it

IMPORTANT: If the user's goal cannot be adequately met with existing exercises, you can CREATE NEW EXERCISES.

Respond ONLY with valid JSON in this exact format:
{
  "newExercises": [
    // Only include if you need to create new exercises. Leave empty array [] if using only existing exercises.
    {
      "id": "ai_custom_name",
      "name": "Exercise Name",
      "description": "Clear description",
      "type": "breathing|meditation|visualization|relaxation|mantra",
      "duration": 5,
      "isDefault": false,
      "aiGenerated": true,
      "safetyLevel": "beginner|intermediate|advanced",
      "instructions": "Step-by-step instructions",
      "benefits": "Benefits this provides",
      "pattern": {"inhale": 4, "hold": 4, "exhale": 4},
      "voiceEnabled": true
    }
  ],
  "programName": "...",
  "description": "...",
  "reasoning": "Why you selected/created these exercises",
  "exercises": [
    {
      "exerciseId": "existing_or_ai_id",
      "duration": 300,
      "reason": "Why this fits the goal"
    }
  ]
}

RULES:
- Duration in SECONDS (120-600 range)
- New exercise IDs must start with "ai_"
- 3-5 exercises total in program
- Only create new exercises if truly needed
- Prefer existing when suitable`;
    }
    
    async getRecommendations(userHistory, userName) {
        if (!this.isConfigured()) {
            throw new Error('AI not configured');
        }
        
        const prompt = `You are a wellness coach. Analyze this user's practice history and provide personalized recommendations.

USER: ${userName || 'Anonymous'}
SESSIONS COMPLETED: ${userHistory.sessionsCompleted}
TOTAL TIME PRACTICED: ${Math.round(userHistory.totalTimePracticed / 60)} minutes
RECENT SESSIONS: ${JSON.stringify(userHistory.recentSessions || [])}

Provide:
1. A personalized insight about their progress
2. 3 specific program recommendations with reasons
3. A practical tip for improving their practice

Respond in JSON format:
{
  "insight": "Personal message about their progress...",
  "tip": "Practical advice...",
  "programs": [
    {
      "programId": "actual_program_id_from_their_list",
      "name": "Program Name",
      "description": "What it does",
      "reason": "Why it's recommended for them"
    }
  ]
}`;
        
        try {
            const response = await fetch(this.baseURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    model: this.model,
                    messages: [{
                        role: 'system',
                        content: 'You are a knowledgeable wellness coach specializing in meditation and pranayama.'
                    }, {
                        role: 'user',
                        content: prompt
                    }],
                    temperature: 0.7,
                    max_tokens: 800
                })
            });
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error?.message || 'API request failed');
            }
            
            const data = await response.json();
            const aiResponse = data.choices[0].message.content;
            
            const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
            if (!jsonMatch) {
                throw new Error('AI did not return valid JSON');
            }
            
            return JSON.parse(jsonMatch[0]);
        } catch (error) {
            console.error('AI recommendations failed:', error);
            throw error;
        }
    }
}

// Make available globally
window.AIIntegration = AIIntegration;

