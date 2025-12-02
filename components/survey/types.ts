/**
 * Survey Types and Interfaces
 * 
 * Type definitions for LexiSurvey frontend components.
 * Matches backend API response models.
 */

export interface QuestionOption {
  id: string
  text: string
  type: 'target' | 'trap' | 'filler' | 'unknown'
  is_correct: boolean
}

export interface QuestionPayload {
  question_id: string
  word: string
  rank: number
  options: QuestionOption[]
  time_limit: number
}

export interface TriMetricReport {
  volume: number
  reach: number
  density: number
}

export interface SurveyResult {
  status: 'continue' | 'complete'
  session_id: string
  payload?: QuestionPayload
  metrics?: TriMetricReport
  debug_info?: {
    phase?: number
    confidence?: number
    question_count?: number
    [key: string]: any
  }
}

export interface AnswerSubmission {
  question_id: string
  selected_option_ids: string[]
  time_taken: number
}

export type SurveyState = 
  | { type: 'loading' }
  | { type: 'error'; message: string }
  | { type: 'question'; data: QuestionPayload; sessionId: string; debugInfo?: { phase?: number; question_count?: number; [key: string]: any } }
  | { type: 'complete'; metrics: TriMetricReport; sessionId: string }

