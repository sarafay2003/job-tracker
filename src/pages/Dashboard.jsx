import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'


function Dashboard() {
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

  return (
    <div>
      <h1>Job Application Tracker</h1>

      <h2>Add Application</h2>
      <input placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} /><br />
      <input placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)} /><br />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option>Applied</option>
        <option>Interview</option>
        <option>Offer</option>
        <option>Rejected</option>
      </select><br />
      <input type="date" value={dateApplied} onChange={(e) => setDateApplied(e.target.value)} /><br />
      <input placeholder="Job Link" value={link} onChange={(e) => setLink(e.target.value)} /><br />
      <input placeholder="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} /><br />
      <button onClick={handleAdd}>Add Application</button>

      

      <h2>My Applications</h2>
      {applications.map((app) => (
        <div key={app.id} style={{ border: '1px solid gray', margin: '10px', padding: '10px' }}>
          <p><b>{app.company}</b> — {app.role}</p>
          <p>Status: {app.status}</p>
          <p>Date: {app.date_applied}</p>
          <p>Link: {app.link}</p>
          <p>Notes: {app.notes}</p>
          <button onClick={() => handleDelete(app.id)}>Delete</button>
{editId === app.id ? (
  <div>
    <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)}>
      <option>Applied</option>
      <option>Interview</option>
      <option>Offer</option>
      <option>Rejected</option>
    </select>
    <button onClick={() => handleEdit(app.id)}>Save</button>
    <button onClick={() => setEditId(null)}>Cancel</button>
  </div>
) : (
  <button onClick={() => { setEditId(app.id); setEditStatus(app.status) }}>Edit Status</button>
)}
        </div>
      ))}
    </div>
  )
}

export default Dashboard