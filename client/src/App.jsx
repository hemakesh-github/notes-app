import { useEffect, useState } from 'react'
import axios from 'axios'

const api = axios.create({ baseURL: 'http://localhost:5000/api' })

function App() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [notes, setNotes] = useState([])

  useEffect(() => {
    api
      .get('/notes')
      .then((res) => setNotes(res.data))
      .catch((err) => console.error('Failed to load notes:', err))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) return
    try {
      const { data } = await api.post('/notes', { title, content })
      setNotes((prev) => [data, ...prev])
      setTitle('')
      setContent('')
    } catch (err) {
      console.error('Failed to create note:', err)
    }
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/notes/${id}`)
      setNotes((prev) => prev.filter((note) => note._id !== id))
    } catch (err) {
      console.error('Failed to delete note:', err)
    }
  }

  return (
    <div className="app">
      <h1>Notes</h1>
      <form className="note-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="4"
          required
        />
        <button type="submit">Add Note</button>
      </form>
      <div className="notes-list">
        {notes.length === 0 && <p className="empty">No notes yet</p>}
        {notes.map((note) => (
          <div className="note-card" key={note._id}>
            <div className="note-header">
              <h2>{note.title}</h2>
              <button
                className="delete-btn"
                onClick={() => handleDelete(note._id)}
              >
                Delete
              </button>
            </div>
            <p>{note.content}</p>
            <span className="note-date">
              {new Date(note.createdAt).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App