import { schema } from 'mongoose';
interface Question {
    _id: string;
    question: string;
    answers: Answer[];
}

interface Answer {
    text: string;
    isCorrect: boolean;
}

export type { Question, Answer };