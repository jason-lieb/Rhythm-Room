import React, { useState } from 'react'
import axios from 'axios'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

export default function SearchImage() {
  const [form, setForm] = useState({
    prompt: '',
    photo: '',
  })
  const handleSubmit = () => {
    console.log(123)
  }

  const handleChange = (e) => {
    setForm({ ...form, prompt: e.target.value })
  }
  return (
    <>
      <form>
        <label>
          Prompt:
          <input type="text" name="prompt" />
        </label>
        <input
          type="submit"
          value="Generate"
          onClick={handleSubmit}
          onChange={handleChange}
        />
      </form>
      <div>
        {form.photo ? <img src={form.photo} alt={form.prompt} /> : <p>abc</p>}
      </div>
    </>
  )
}
