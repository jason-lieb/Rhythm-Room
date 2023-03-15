import React, { useState } from 'react'
import axios from 'axios'
import preview from '../assets/preview.png'

export default function SearchImage({setImgUrl}) {
  const [generatingImg, setGeneratingImg] = useState(false)
  const [form, setForm] = useState({
    prompt: '',
    photo: '',
  })
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.prompt) {
      try {
        setGeneratingImg(true)
        const { data } = await axios.post(
          'http://localhost:5500/api/openai',
          { prompt: form.prompt },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.image_url}` })
        console.log(`data:image/jpeg;base64,${data.image_url}`)
        setImgUrl(`data:image/jpeg;base64,${data.image_url}`)
      } catch (err) {
        console.log(err)
      } finally {
        setGeneratingImg(false)
      }
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, prompt: e.target.value })
  }
  return (
    <>
      <form>
        <label style={{backgroundColor: 'white'}}>
          Prompt:
          <input type="text" name="prompt" onChange={handleChange} />
        </label>
        <input type="submit" value="Generate" onClick={handleSubmit} />
      </form>
      {generatingImg && (
        <div style={{ backgroundColor: 'white' }}>Loading</div>
      )}
      <div>
        {form.photo ? (
          <img src={form.photo} alt={form.prompt} />
        ) : (
          <div style={{ backgroundColor: 'white' }}>
            <img src={preview} alt="preview" height="512px" />
          </div>
        )}
      </div>
    </>
  )
}
