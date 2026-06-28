import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

const STATUSES = ['Applied', 'Interview', 'Offer', 'Rejected']

function Dashboard() {
  const [jobDescription, setJobDescription] = useState('')
  const [aiResult, setAiResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [applications, setApplications] = useState([])
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [status, setStatus] = useState('Applied')
  const [dateApplied, setDateApplied] = useState('')
  const [link, setLink] = useState('')
  const [notes, setNotes] = useState('')
  const [editId, setEditId] = useState(null)
  const [editStatus, setEditStatus] = useState('')

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    const { data, error } = await supabase.from('applications').select('*')
    if (error) console.log(error)
    else setApplications(data)
  }

  const handleAdd = async () => {
    const { error } = await supabase.from('applications').insert([
      { company, role, status, date_applied: dateApplied, link, notes }
    ])
    if (error) console.log(error)
    else {
      fetchApplications()
      setCompany('')
      setRole('')
      setStatus('Applied')
      setDateApplied('')
      setLink('')
      setNotes('')
    }
  }

  const handleDelete = async (id) => {
    const { error } = await supabase.from('applications').delete().eq('id', id)
    if (error) console.log(error)
    else fetchApplications()
  }

  const handleEdit = async (id) => {
    const { error } = await supabase
      .from('applications')
      .update({ status: editStatus })
      .eq('id', id)
    if (error) console.log(error)
    else {
      setEditId(null)
      fetchApplications()
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  const handleAnalyze = async () => {
    setLoading(true)
    setAiResult('')
    try {
      const response = await fetch('http://localhost:3000/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobDescription })
      })
      const data = await response.json()
      setAiResult(data.result)
    } catch (error) {
      setAiResult('Error connecting to server.')
    }
    setLoading(false)
  }

  const statusColors = {
    Applied: 'bg-blue-100 border-blue-400',
    Interview: 'bg-yellow-100 border-yellow-400',
    Offer: 'bg-green-100 border-green-400',
    Rejected: 'bg-red-100 border-red-400',
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-600">Job Application Tracker</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Logout
        </button>
      </div>

      {/* Add Application Form */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Add Application</h2>
        <div className="grid grid-cols-2 gap-4">
          <input className="border rounded p-2" placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} />
          <input className="border rounded p-2" placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)} />
          <select className="border rounded p-2" value={status} onChange={(e) => setStatus(e.target.value)}>
            {STATUSES.map(s => <option key={s}>{s}</option>)}
          </select>
          <input className="border rounded p-2" type="date" value={dateApplied} onChange={(e) => setDateApplied(e.target.value)} />
          <input className="border rounded p-2" placeholder="Job Link" value={link} onChange={(e) => setLink(e.target.value)} />
          <input className="border rounded p-2" placeholder="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>
        <button onClick={handleAdd} className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Add Application
        </button>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-4 gap-4">
        {STATUSES.map(s => (
          <div key={s} className="bg-white rounded-xl shadow p-4">
            <h3 className="font-bold text-lg mb-3">{s}</h3>
            {applications.filter(app => app.status === s).map(app => (
              <div key={app.id} className={`border-l-4 rounded p-3 mb-3 ${statusColors[s]}`}>
                <p className="font-semibold">{app.company}</p>
                <p className="text-sm text-gray-600">{app.role}</p>
                <p className="text-xs text-gray-400">{app.date_applied}</p>
                {editId === app.id ? (
                  <div className="mt-2">
                    <select className="border rounded p-1 text-sm w-full" value={editStatus} onChange={(e) => setEditStatus(e.target.value)}>
                      {STATUSES.map(s => <option key={s}>{s}</option>)}
                    </select>
                    <div className="flex gap-2 mt-1">
                      <button onClick={() => handleEdit(app.id)} className="bg-green-500 text-white px-2 py-1 rounded text-xs">Save</button>
                      <button onClick={() => setEditId(null)} className="bg-gray-400 text-white px-2 py-1 rounded text-xs">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-2 mt-2">
                    <button onClick={() => { setEditId(app.id); setEditStatus(app.status) }} className="bg-yellow-400 text-white px-2 py-1 rounded text-xs">Edit</button>
                    <button onClick={() => handleDelete(app.id)} className="bg-red-400 text-white px-2 py-1 rounded text-xs">Delete</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* AI Analyzer */}
      <div className="bg-white rounded-xl shadow p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4">AI Job Description Analyzer</h2>
        <textarea
          className="border rounded p-2 w-full h-32 mb-3"
          placeholder="Paste a job description here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
        <button
          onClick={handleAnalyze}
          className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
        >
          {loading ? 'Analyzing...' : 'Analyze with AI'}
        </button>
        {aiResult && (
          <div className="mt-4 bg-purple-50 rounded p-4 whitespace-pre-wrap">
            {aiResult}
          </div>
        )}
      </div>

    </div>
  )
}

export default Dashboard