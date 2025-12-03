'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { DepositForm } from '@/components/deposit/DepositForm'
import { Link } from '@/i18n/routing'
import { useAuth } from '@/contexts/AuthContext'

export default function DashboardPage() {
  const t = useTranslations('dashboard')
  const searchParams = useSearchParams()
  const router = useRouter()
  const { user, loading } = useAuth()
  const [showSuccess, setShowSuccess] = useState(false)
  const [showCancel, setShowCancel] = useState(false)
  
  // Redirect to login if not authenticated (with locale)
  useEffect(() => {
    if (!loading && !user) {
      // Get current locale from pathname
      const currentLocale = window.location.pathname.split('/')[1] || 'zh-TW'
      router.push(`/${currentLocale}/login`)
    }
  }, [user, loading, router])

  // Get user IDs from auth
  const userId = user?.id || ''
  // TODO: Get child ID from database (for now, use first child or create one)
  const childId = 'temp-child-id' // Will be replaced with real child ID from database

  useEffect(() => {
    const success = searchParams.get('success')
    const canceled = searchParams.get('canceled')
    const sessionId = searchParams.get('session_id')

    if (success === 'true') {
      setShowSuccess(true)
      // Hide success message after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000)
    }

    if (canceled === 'true') {
      setShowCancel(true)
      // Hide cancel message after 5 seconds
      setTimeout(() => setShowCancel(false), 5000)
    }
  }, [searchParams])

  // Show loading state
  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pt-20 pb-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600 mx-auto mb-4"></div>
          <p className="text-gray-600">載入中...</p>
        </div>
      </main>
    )
  }

  // Don't render if not authenticated (redirect will happen)
  if (!user) {
    return null
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pt-20 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-lg flex items-center justify-between">
            <div className="flex items-center">
              <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-semibold">付款成功！您的存款已確認。</span>
            </div>
            <button
              onClick={() => setShowSuccess(false)}
              className="text-green-600 hover:text-green-800"
            >
              ✕
            </button>
          </div>
        )}

        {/* Cancel Message */}
        {showCancel && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 text-yellow-800 px-6 py-4 rounded-lg flex items-center justify-between">
            <div className="flex items-center">
              <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>付款已取消。您可以隨時重新嘗試。</span>
            </div>
            <button
              onClick={() => setShowCancel(false)}
              className="text-yellow-600 hover:text-yellow-800"
            >
              ✕
            </button>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            LexiCraft 家長控制台
          </h1>
          <p className="text-xl text-gray-600">
            管理孩子的學習帳戶與信託資金
          </p>
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Deposit Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                存入信託資金
              </h2>
              <p className="text-gray-600 mb-6">
                為孩子的學習帳戶存入資金。孩子完成學習任務後，即可解鎖提領。
              </p>
              
              <DepositForm 
                childId={childId}
                userId={userId}
                onSuccess={() => {
                  // Success is handled by Stripe redirect
                  console.log('Deposit initiated')
                }}
              />
            </div>

            {/* Balance Card (Placeholder - will be connected to API later) */}
            <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">帳戶餘額</h3>
              <div className="text-3xl font-bold mb-2">NT$ 0</div>
              <p className="text-cyan-100 text-sm">
                可用點數：0 | 鎖定點數：0
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">快速操作</h3>
              <div className="space-y-3">
                <Link
                  href="/survey"
                  className="block w-full px-4 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors text-center font-semibold"
                >
                  開始測驗
                </Link>
                <Link
                  href="/"
                  className="block w-full px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-center font-semibold"
                >
                  返回首頁
                </Link>
              </div>
            </div>

            {/* Info Card */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-blue-900 mb-3">💡 如何運作</h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>1. 存入信託資金</li>
                <li>2. 孩子完成學習任務</li>
                <li>3. 解鎖並提領獎勵</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

