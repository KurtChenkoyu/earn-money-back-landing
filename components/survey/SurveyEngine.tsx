'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { surveyApi, SurveyResult, QuestionPayload, TriMetricReport } from '../../services/surveyApi'
import MultiSelectMatrix from './MultiSelectMatrix'
import SurveyResultDashboard from './SurveyResultDashboard'
import SurveyProgress from './SurveyProgress'
import PreSurveyCalibration from './PreSurveyCalibration'

interface SurveyEngineProps {
  initialCefr?: string
  onExit: () => void
}

const SurveyEngine: React.FC<SurveyEngineProps> = ({ initialCefr, onExit }) => {
  // --- State Machine ---
  const [status, setStatus] = useState<'calibration' | 'init' | 'loading' | 'active' | 'complete' | 'error'>('calibration')
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState<QuestionPayload | null>(null)
  const [finalMetrics, setFinalMetrics] = useState<TriMetricReport | null>(null)
  
  // Calibration state
  const [selectedCefr, setSelectedCefr] = useState<string | undefined>(undefined)
  const [userAge, setUserAge] = useState<number | undefined>(undefined)
  const [calibrationComplete, setCalibrationComplete] = useState<boolean>(false)
  
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

  // Handle calibration completion
  const handleCalibrationComplete = useCallback((cefrLevel: string | undefined, age?: number) => {
    console.log('Calibration complete:', { cefrLevel, age })
    setSelectedCefr(cefrLevel) // Can be undefined for SKIP option
    setUserAge(age)
    setCalibrationComplete(true)
    setStatus('init')
  }, [])

  // 1. Start Survey
  useEffect(() => {
    const initSurvey = async () => {
      if (!calibrationComplete) {
        return
      }

      try {
        console.log('Starting survey with CEFR:', selectedCefr || 'undefined (default)')
        setStatus('loading')
        const result = await surveyApi.start(selectedCefr)
        console.log('Survey start result:', result)
        handleApiResult(result)
      } catch (err) {
        console.error('Survey Start Failed', err)
        setStatus('error')
      }
    }

    if (status === 'init' && calibrationComplete) {
      initSurvey()
    }
  }, [selectedCefr, status, calibrationComplete, handleApiResult])

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

  // Show calibration form first
  if (status === 'calibration') {
    return <PreSurveyCalibration onComplete={handleCalibrationComplete} />
  }

  if (status === 'loading' || status === 'init') {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-950 text-cyan-500 font-mono animate-pulse">
        CALIBRATING_ASSET_SURVEY...
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-950 text-red-500 px-4">
        <h2 className="text-xl font-bold mb-4">SURVEY INITIALIZATION FAILED</h2>
        <p className="text-red-400 mb-4 text-center max-w-md">
          There was an error starting the survey. Please check the console for details.
        </p>
        <div className="text-sm text-gray-400 mb-6 text-center max-w-md">
          <p>Selected CEFR Level: {selectedCefr || 'Not set'}</p>
          <p>Calibration Complete: {calibrationComplete ? 'Yes' : 'No'}</p>
        </div>
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
