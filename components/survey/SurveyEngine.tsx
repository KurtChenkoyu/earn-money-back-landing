'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { surveyApi, SurveyResult, QuestionPayload, TriMetricReport } from '../../services/surveyApi'
import MultiSelectMatrix from './MultiSelectMatrix'
import SurveyResultDashboard from './SurveyResultDashboard'
import SurveyProgress from './SurveyProgress'

interface SurveyEngineProps {
  initialCefr?: string
  onExit: () => void
}

const SurveyEngine: React.FC<SurveyEngineProps> = ({ initialCefr = 'B1', onExit }) => {
  // --- State Machine ---
  const [status, setStatus] = useState<'init' | 'loading' | 'active' | 'complete' | 'error'>('init')
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState<QuestionPayload | null>(null)
  const [finalMetrics, setFinalMetrics] = useState<TriMetricReport | null>(null)
  
  // Progress Tracking
  const [phase, setPhase] = useState<number>(1)
  const [questionCount, setQuestionCount] = useState<number>(0)
  const totalTarget = 15 // Maximum questions in survey

  // Timer State for Metadata
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now())

  // --- Actions ---

  // 2. Handle API Response Router
  const handleApiResult = useCallback((result: SurveyResult) => {
    if (result.session_id) setSessionId(result.session_id)

    // Extract phase and question count from debug_info
    if (result.debug_info) {
      if (result.debug_info.phase !== undefined) {
        setPhase(result.debug_info.phase)
      }
      if (result.debug_info.question_count !== undefined) {
        setQuestionCount(result.debug_info.question_count)
      }
    }

    if (result.status === 'complete' && result.metrics) {
      setFinalMetrics(result.metrics)
      setStatus('complete')
    } else if (result.payload) {
      setCurrentQuestion(result.payload)
      setQuestionStartTime(Date.now())
      setStatus('active')
      // If debug_info doesn't have question_count, increment manually
      if (!result.debug_info?.question_count) {
        setQuestionCount(prev => prev + 1)
      }
    }
  }, [])

  // 1. Start Survey
  useEffect(() => {
    const initSurvey = async () => {
      try {
        setStatus('loading')
        const result = await surveyApi.start(initialCefr)
        handleApiResult(result)
      } catch (err) {
        console.error('Survey Start Failed', err)
        setStatus('error')
      }
    }

    if (status === 'init') {
      initSurvey()
    }
  }, [initialCefr, status, handleApiResult])

  // 3. Submit Answer
  const handleAnswerSubmit = useCallback(
    async (selectedIds: string[]) => {
      if (!sessionId || !currentQuestion) return

      // optimistic UI update or loading state here if desired
      // setStatus('loading'); // Optional: keeps UI responsive if backend is fast

      try {
        const timeTaken = (Date.now() - questionStartTime) / 1000

        const result = await surveyApi.next(sessionId, {
          question_id: currentQuestion.question_id,
          selected_option_ids: selectedIds,
          time_taken: timeTaken,
        })

        handleApiResult(result)
      } catch (err) {
        console.error('Submission Failed', err)
        setStatus('error')
      }
    },
    [sessionId, currentQuestion, questionStartTime, handleApiResult]
  )

  // --- Render Logic ---

  if (status === 'loading' || status === 'init') {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-950 text-cyan-500 font-mono animate-pulse">
        CALIBRATING_ASSET_SURVEY...
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-950 text-red-500">
        <h2 className="text-xl font-bold">CONNECTION LOST</h2>
        <button
          onClick={onExit}
          className="mt-4 px-4 py-2 border border-red-500 hover:bg-red-900/20 rounded"
        >
          ABORT
        </button>
      </div>
    )
  }

  if (status === 'complete' && finalMetrics) {
    return <SurveyResultDashboard metrics={finalMetrics} onExit={onExit} />
  }

  if (status === 'active' && currentQuestion) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center pt-20">
        <div className="w-full max-w-4xl px-6">
          {/* Survey Progress Bar */}
          <SurveyProgress 
            phase={phase}
            questionCount={questionCount}
            totalTarget={totalTarget}
          />

          {/* The Matrix Interaction */}
          <MultiSelectMatrix
            key={currentQuestion.question_id} // Force re-render on new question
            question={currentQuestion}
            onSubmit={handleAnswerSubmit}
          />
        </div>
      </div>
    )
  }

  return null
}

export default SurveyEngine
