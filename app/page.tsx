'use client'

import { useState } from 'react'

export default function Home() {
  const [recordName, setRecordName] = useState('')
  const [recordValue, setRecordValue] = useState('')
  const [domain, setDomain] = useState('')
  const [status, setStatus] = useState<{
    loading: boolean
    message: string
    error: boolean
  }>({ loading: false, message: '', error: false })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!recordName.trim() || !recordValue.trim() || !domain.trim()) {
      setStatus({
        loading: false,
        message: 'All fields are required',
        error: true
      })
      return
    }

    setStatus({ loading: true, message: 'Loading...', error: false })

    try {
      const response = await fetch('/api/add-txt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recordName,
          recordValue,
          domain
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create TXT record')
      }

      setStatus({
        loading: false,
        message: 'Success! TXT record created.',
        error: false
      })
    } catch (error) {
      setStatus({
        loading: false,
        message: error instanceof Error ? error.message : 'An unknown error occurred',
        error: true
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Add TXT Record</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="domain" className="block text-sm font-medium text-gray-700">
              Domain
            </label>
            <input
              type="text"
              id="domain"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="example.com"
            />
          </div>
          
          <div>
            <label htmlFor="recordName" className="block text-sm font-medium text-gray-700">
              Record Name
            </label>
            <input
              type="text"
              id="recordName"
              value={recordName}
              onChange={(e) => setRecordName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="_acme-challenge"
            />
          </div>
          
          <div>
            <label htmlFor="recordValue" className="block text-sm font-medium text-gray-700">
              Record Value
            </label>
            <input
              type="text"
              id="recordValue"
              value={recordValue}
              onChange={(e) => setRecordValue(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="any-string-value"
            />
          </div>
          
          <div>
            <button
              type="submit"
              disabled={status.loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create
            </button>
          </div>
        </form>
        
        {status.message && (
          <div className={`mt-4 p-4 rounded-md ${status.error ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
            <p>{status.message}</p>
          </div>
        )}
      </div>
    </div>
  )
}