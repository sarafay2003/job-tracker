import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import Anthropic from '@anthropic-ai/sdk'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

app.post('/api/analyze', async (req, res) => {
  const { jobDescription } = req.body

  try {
    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
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

    res.json({ result: message.content[0].text })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})