import { GoogleGenAI, Type } from "@google/genai";
import type { Exercise, ClassifyWordsContent, QuizQuestion, TranslationContent } from '../types';
import { ExerciseType } from '../types';

// Per instructions, the API key must be obtained from the environment variables.
// The GoogleGenAI instance is initialized here directly.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const model = 'gemini-3.1-flash-lite';

export const generateNewExercise = async (topic: string, type: ExerciseType): Promise<Exercise | null> => {
    console.log(`Generating new exercise for topic: ${topic}, type: ${type}`);

    let prompt = `
      You are an expert in Spanish grammar for French-speaking students. 
      Your task is to create a new, original Spanish grammar exercise.
      
      **Topic:** "${topic}"
      **Exercise Type:** "${type}"
      
      **Constraints:**
      1. The exercise MUST be directly related to the specified topic.
      2. For FILL_IN_THE_BLANK, MULTIPLE_CHOICE, REWRITE_ACCENT, the exercise MUST contain between 3 and 5 distinct items in the "content" array. 
      3. For CLASSIFY_WORDS, the "content" array must contain exactly ONE item, and its "words" array must contain between 8 and 12 words.
      4. For TRANSLATION, the "content" array must contain exactly ONE item.
      5. The output MUST be a single, valid JSON object. Do not include any text, code block formatting (like \`\`\`json), or explanations outside of the JSON object.
    `;

    // Add specific instructions for verb conjugations
    if (topic.toLowerCase().includes('présent') || topic.toLowerCase().includes('indicatif') || topic.toLowerCase().includes('subjonctif')) {
        prompt += `
      \n**Special Instructions for this Topic:**
      - Please focus heavily on common **IRREGULAR** verbs.
      - The exercise should test different types of irregularities, such as stem-changing verbs (e.g., 'poder' -> 'puedo'), verbs with an irregular 'yo' form (e.g., 'hacer' -> 'hago'), and fully irregular verbs ('ser', 'ir', 'estar').
      - For TRANSLATION exercises, create a sentence that forces the use of verbs related to the topic. The cultural/linguistic note should reinforce the grammar point.
      - The goal is to challenge the student on common exceptions and difficult points, not just regular endings.\n`;
    }

    prompt += `
      **Required JSON Structure:**
      {
        "id": "A unique ID string, starting with 'ai_gen_' followed by random characters",
        "type": "${type}",
        "instructions": "Clear instructions for the exercise in French.",
        "content": [
          // An array of objects.
          // For FILL_IN_THE_BLANK: { "sentenceParts": ["Yo (hacer) mis deberes. -> Yo "], "solutions": ["hago"] }. IMPORTANT: The sentence part MUST include the verb in parentheses like "(hacer)". This is critical for the user to know which verb to conjugate.
          // For REWRITE_ACCENT: { "word": "word-no-accent", "solution": "word-with-accent" }
          // For MULTIPLE_CHOICE: { "question": "The question.", "options": ["opt1", "opt2"], "solution": "correct-opt" }
          // For CLASSIFY_WORDS (single item in array): { "categories": ["Cat1", "Cat2"], "words": [{"word": "word1", "category": "Cat1"}, ...] }
          // For TRANSLATION (single item in array): { "frenchSentence": "The French sentence.", "possibleSolutions": ["A correct Spanish translation."], "note": "A cultural or linguistic note in French, using simple HTML (<strong>, <em>)." }
        ],
        "feedback": {
          "correct": "A positive and encouraging feedback message in French.",
          "incorrect": "A helpful feedback message in French that briefly explains the core grammar rule related to the topic."
        }
      }
    `;

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
            }
        });
        
        const text = response.text.trim();
        const generatedExercise = JSON.parse(text) as Exercise;
        
        // Validation of the received structure
        if (generatedExercise.id && generatedExercise.type && generatedExercise.content) {
            if (generatedExercise.type === ExerciseType.CLASSIFY_WORDS) {
                const content = generatedExercise.content as ClassifyWordsContent[];
                if (content.length === 1 && content[0].categories?.length > 1 && content[0].words?.length >= 8) {
                    console.log("Successfully generated and parsed new CLASSIFY_WORDS exercise:", generatedExercise);
                    return generatedExercise;
                }
            } else if (generatedExercise.type === ExerciseType.TRANSLATION) {
                 const content = generatedExercise.content as TranslationContent[];
                if (content.length === 1 && content[0].frenchSentence && content[0].possibleSolutions?.length > 0 && content[0].note) {
                    console.log("Successfully generated and parsed new TRANSLATION exercise:", generatedExercise);
                    return generatedExercise;
                }
            }
            else {
                if (generatedExercise.content.length >= 3 && generatedExercise.content.length <=5) {
                    console.log("Successfully generated and parsed new exercise:", generatedExercise);
                    return generatedExercise;
                }
            }
        }
        
        console.error("Generated JSON is invalid or does not match the required structure:", text);
        return null;

    } catch (error) {
        console.error("Error calling Gemini API or parsing response:", error);
        return null;
    }
};

export const getClarification = async (exercise: Exercise, question: string): Promise<string | null> => {
    const prompt = `
      You are a friendly and precise Spanish grammar tutor for French-speaking university students.
      A student has just completed an exercise and has a specific question about it.

      **Exercise Context:**
      - Instructions: "${exercise.instructions}"
      - Content: ${JSON.stringify(exercise.content, null, 2)}
      
      **Student's Question:** "${question}"

      **Your Task:**
      Provide a clear, concise, and direct answer to the student's question in French.
      Focus only on answering the question. Do not add conversational fluff like "Bonjour !" or "J'espère que cela vous aide.".
      If the question is about a specific word or sentence, refer to it directly.
      Format your response using simple HTML for clarity (e.g., <strong> for emphasis, <em> for italics, <ul> and <li> for lists). Do not use headings (h1, h2, etc.).
      Your answer must be directly useful and educational.
    `;

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
        });
        
        return response.text.trim();

    } catch (error) {
        console.error("Error calling Gemini API for clarification:", error);
        return "Je suis désolé, une erreur est survenue et je ne peux pas fournir d'explication pour le moment.";
    }
};

export const generateNewQuizQuestions = async (topic: string): Promise<QuizQuestion[] | null> => {
    console.log(`Generating new quiz questions for topic: ${topic}`);

    const prompt = `
      You are a Spanish grammar expert creating a mini-quiz for French-speaking students.
      Your task is to generate exactly 2 new, original quiz questions.

      **Topic:** "${topic}"

      **Constraints:**
      1.  The questions must be directly related to the specified topic.
      2.  Each question must have 3 or 4 multiple-choice options.
      3.  Provide clear feedback for both correct and incorrect answers.
      4.  The output MUST be a single, valid JSON array containing two question objects. Do not include any text, code block formatting (like \`\`\`json), or explanations outside of the JSON.

      **Required JSON Structure:**
      [
        {
          "question": "The question text in French.",
          "options": ["Option A", "Option B", "Option C"],
          "answer": "The correct option text.",
          "feedback": {
            "correct": "A positive feedback message in French.",
            "incorrect": "A helpful feedback message in French explaining the concept."
          }
        },
        {
          "question": "A second question text in French.",
          "options": ["Option 1", "Option 2", "Option 3"],
          "answer": "The correct option text.",
          "feedback": {
            "correct": "Another positive feedback message.",
            "incorrect": "Another helpful explanation."
          }
        }
      ]
    `;

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
            }
        });

        const text = response.text.trim();
        const generatedQuestions = JSON.parse(text) as QuizQuestion[];

        // Basic validation
        if (Array.isArray(generatedQuestions) && generatedQuestions.length > 0 && generatedQuestions.every(q => q.question && q.options && q.answer)) {
            console.log("Successfully generated and parsed new quiz questions:", generatedQuestions);
            return generatedQuestions;
        }
        
        console.error("Generated JSON for quiz questions is invalid or empty:", text);
        return null;

    } catch (error) {
        console.error("Error calling Gemini API or parsing response for quiz questions:", error);
        return null;
    }
};