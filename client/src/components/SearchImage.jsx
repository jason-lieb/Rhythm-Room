import React, { useState } from 'react'
import axios from 'axios'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

export default function SearchImage() {
  const [form, setForm] = useState({
    prompt: '',
    photo: '',
  })
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.prompt) {
      try {
        const {data} = await axios.post(
          'http://localhost:5500/api/openai',
          { prompt: form.prompt },
          {
            headers: {
              'Content-Type': 'application/json',
            }
          }
        )
        setForm({ ...form, photo: data.image_url })
        console.log(data.image_url)
      } catch (err) {
        console.log(err)
      }
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, prompt: e.target.value })
  }
  return (
    <>
      <form>
        <label>
          Prompt:
          <input type="text" name="prompt" onChange={handleChange} />
        </label>
        <input type="submit" value="Generate" onClick={handleSubmit} />
      </form>
      <div>
        {form.photo ? <img src={form.photo} alt={form.prompt} /> : <p>abc</p>}
      </div>
    </>
  )
}
