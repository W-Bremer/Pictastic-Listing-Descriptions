import { streamText } from 'ai'
import { openai } from '@ai-sdk/openai'

export const runtime = 'edge'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const formData = JSON.parse(body.prompt)
    
    const result = streamText({
      model: openai('gpt-4'),
      system: 'You are an expert real estate copywriter who creates compelling property descriptions.',
      prompt: `Create a property description with these details:
        - Address: ${formData.address}
        - Type: ${formData.propertyType} (${formData.listingType})
        - Key Features: ${formData.selectedFeatures.join(', ')}
        - Additional Details: ${formData.additionalDetails || 'None provided'}
        - Style: ${formData.writingStyle}
        - Length: ${formData.descriptionLength} (about ${
          formData.descriptionLength === 'short' ? '150' :
          formData.descriptionLength === 'medium' ? '300' : '500'
        } words)
        - Language: ${formData.language === 'en' ? 'English (US)' : 
                    formData.language === 'es' ? 'Spanish' : 
                    formData.language === 'fr' ? 'French' : 'German'}
        - Creativity: ${formData.creativityLevel}/10`,
      temperature: formData.creativityLevel / 10,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error('API Error:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Failed to generate description',
        details: error instanceof Error ? error.message : 'Unknown error'
      }), 
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
} 