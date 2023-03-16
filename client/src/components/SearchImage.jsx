import React, { useState } from 'react'
import axios from 'axios'
import preview from '../assets/preview.png'
import Loading from './Loading'

export default function SearchImage({ setImgUrl }) {
  const [generatingImg, setGeneratingImg] = useState(false)
  const [form, setForm] = useState({
    prompt: '',
    photo: '',
  })
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.prompt) {
      try {
        let origin =
          window.location.host.split(':').length > 1
            ? window.location.origin.slice(0, -4) + '5500'
            : window.location.origin
        const openAIUri = origin + '/api/openai/'
        setGeneratingImg(true)
        const { data } = await axios.post(
          openAIUri,
          { prompt: form.prompt },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.image_url}` })
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
      <section
        className="form-section"
        style={{ marginTop: '10px', marginBottom: '10px' }}
      >
        <div className="form-div">
          <input
            className="input-cr"
            onChange={handleChange}
            type="text"
            placeholder="Prompt"
          />
          <button className="btn-cr" onClick={handleSubmit}>
            Generate Picture
          </button>
        </div>
      </section>
      <div style={{ position: 'relative' }}>
        {form.photo ? (
          <img src={form.photo} alt={form.prompt} height="340px" />
        ) : (
          <>
            {generatingImg ? (
              <>
                <div
                  style={{ position: 'absolute', top: '140px', left: '150px' }}
                >
                  {' '}
                  <Loading />
                </div>
                <div style={{ backgroundColor: 'white', borderRadius: 10 }}>
                  <img src={preview} alt="preview" height="330px" />
                </div>
              </>
            ) : (
              <div style={{ backgroundColor: 'white', borderRadius: 10 }}>
                <img src={preview} alt="preview" height="330px" />
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}
