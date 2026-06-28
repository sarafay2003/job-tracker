import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import Groq from 'groq-sdk'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

app.post('/api/analyze', async (req, res) => {
  const { jobDescription } = req.body

  try {
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'user',
          content: `Analyze this job description and give me:
1. Top 5 required skills
2. Experience level required
3. 3 tips to tailor my resume for this role

Job Description:
${jobDescription}`
        }
      ]
    })

    res.json({ result: completion.choices[0].message.content })
  } catch (error) {
    console.log('FULL ERROR:', error)
    res.status(500).json({ error: error.message })
  }
})

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})