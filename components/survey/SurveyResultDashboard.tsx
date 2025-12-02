'use client'

import { TriMetricReport } from './types'

interface SurveyResultDashboardProps {
  metrics: TriMetricReport
  onExit: () => void
}

/**
 * SurveyResultDashboard: Final Results Display
 * 
 * Displays the Tri-Metric Report (Volume, Reach, Density)
 * in a terminal-style, high-tech format.
 */
export default function SurveyResultDashboard({
  metrics,
  onExit,
}: SurveyResultDashboardProps) {
  const { volume, reach, density } = metrics

  // Calculate density percentage
  const densityPercent = Math.round(density * 100)

  // Format numbers with commas
  const formatNumber = (num: number) => {
    return num.toLocaleString('zh-TW')
  }

  return (
    <div className="min-h-screen bg-gray-950 text-cyan-500 font-mono">
      <div className="max-w-4xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="mb-12 border-b border-gray-800 pb-4">
          <h1 className="text-2xl font-bold mb-2">SURVEY_COMPLETE</h1>
          <p className="text-gray-500 text-sm">ASSET_REPORT_GENERATED</p>
        </div>

        {/* Tri-Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Volume Card */}
          <div className="bg-gray-900 border border-cyan-500/30 rounded-lg p-6">
            <div className="text-cyan-400 text-xs mb-2">VOLUME_RESERVES</div>
            <div className="text-3xl font-bold text-cyan-500 mb-1">
              {formatNumber(volume)}
            </div>
            <div className="text-gray-500 text-xs">EST_WORDS_OWNED</div>
          </div>

          {/* Reach Card */}
          <div className="bg-gray-900 border border-cyan-500/30 rounded-lg p-6">
            <div className="text-cyan-400 text-xs mb-2">REACH_HORIZON</div>
            <div className="text-3xl font-bold text-cyan-500 mb-1">
              {formatNumber(reach)}
            </div>
            <div className="text-gray-500 text-xs">HIGHEST_RELIABLE_RANK</div>
          </div>

          {/* Density Card */}
          <div className="bg-gray-900 border border-cyan-500/30 rounded-lg p-6">
            <div className="text-cyan-400 text-xs mb-2">DENSITY_SOLIDITY</div>
            <div className="text-3xl font-bold text-cyan-500 mb-1">
              {densityPercent}%
            </div>
            <div className="text-gray-500 text-xs">CONSISTENCY_SCORE</div>
          </div>
        </div>

        {/* Summary Section */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 mb-8">
          <h2 className="text-lg font-bold mb-4 text-cyan-400">REPORT_SUMMARY</h2>
          <div className="space-y-3 text-gray-300 text-sm">
            <p>
              <span className="text-cyan-500">EST_RESERVES:</span> {formatNumber(volume)}{' '}
              words
            </p>
            <p>
              <span className="text-cyan-500">HORIZON:</span> Rank {formatNumber(reach)}
            </p>
            <p>
              <span className="text-cyan-500">SOLIDITY:</span> {densityPercent}% consistency
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={onExit}
            className="px-6 py-3 border border-cyan-500 text-cyan-500 hover:bg-cyan-500/10 rounded transition-colors"
          >
            EXIT
          </button>
          <button
            onClick={() => window.print()}
            className="px-6 py-3 border border-gray-600 text-gray-400 hover:bg-gray-800 rounded transition-colors"
          >
            PRINT_REPORT
          </button>
        </div>
      </div>
    </div>
  )
}

