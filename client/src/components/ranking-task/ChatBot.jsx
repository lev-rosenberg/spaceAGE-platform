import OpenAI from 'openai' // Import OpenAI library (assuming it's installed via npm/yarn)

export async function ChatBot ({
  conversationDF = []
}) {
  // console.log("conversation", conversationDF);
  const classification = {
    model: 'gpt-4o',
    systemPrompt: "You are a classifier that determines whether certain text must be replied by an AI team member called Sage or a human. When you get some text, you reply: 'Next reply is: {classification}'; where classification is either human or assistant. Always return assistant if Sage was mentioned. Return assistant if participants are asking questions or are confused. Return human if participants talk with each other. Ai Assistant Sage is expert in space exploration and landing locations"
  }
  const completion = {
    model: 'gpt-4o',
    systemPrompt: "You are helpful assistant Sage. You will receive messages in a from of user: 'username'  message: 'message of username' return a short text reply without structure. You are an AI team member named Sage short for SpaceAge. You have been asked to join an elite team tasked with determining the landing site for the mission. The international space colonization alliance has narrowed the list to four sites and has agreed to proceed with the mission at any of the four locations. These four locations are: Argyre, Casius, Diacria and Eridania. Choosing which location to visit on this first outpost mission is critical to mission success. In the following pages, you will read key information about each location. Use this information to determine which location is the best site to land and establish the home base for the crew on Mars. You do not have access to the interface and have to politely ask your team members to shared any additional information with you if necessary. Keep you replies short., Candidate Landing Sites:\n" +
            '\n' +
            'Argyre:\n' +
            '\n' +
            'Pros: Central location for high carbon concentration regions.\n' +
            'Cons: Geologically uninteresting, distant from ice-rich poles, extreme weather delays climate science objectives.\n' +
            'Casius:\n' +
            '\n' +
            'Pros: High methane concentrations, central for cosmic radiation mapping, valuable for studying climate change effects.\n' +
            'Cons: Limited access to Martian volcanoes.\n' +
            'Diacria:\n' +
            '\n' +
            'Pros: Central to unexplored climate-critical areas, contains mountains and volcanoes.\n' +
            'Cons: Stable climate impedes model calibration, low methane levels.\n' +
            'Eridania:\n' +
            '\n' +
            'Pros: Rich in impact craters, complex organic compounds suggest past life, fascinating cloud patterns for climate study.\n' +
            'Cons: Climate already well-mapped, distant from geological blind spots.\n' +
            'Decision Criteria:\n' +
            'Evaluate each site based on its potential to:\n' +
            '\n' +
            'Discover life.\n' +
            'Advance geological understanding.\n' +
            'Enhance climate and atmospheric knowledge.'
  }

  const openAI = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true // should move these requests over to a Node server in a production app.
  }) // Initialize OpenAI instance with your API key

  async function getResponse ({ responseType, df }) {
    const model = responseType.model
    const systemPrompt = responseType.systemPrompt

    df.map((msg) => {
      const valObject = msg.val._value
      msg.name = valObject.sender.name
      msg.text = valObject.text
      return msg
    })

    // eslint-disable-next-line array-callback-return
    const messages = df.map((msg) => {
      if (msg.name !== undefined && msg.text !== undefined) {
        return {
          role: 'user',
          content: `user: ${msg.name} message: ${msg.text}`
        }
      }
    })

    const systemMessage = {
      role: 'system',
      content: `${systemPrompt}`
    }

    const conversation = [systemMessage, ...messages]
    const response = await openAI.chat.completions.create({
      model,
      messages: conversation
    })
    return response.choices[0].message.content
  }

    const classificationResponse = await getResponse({ responseType: classification, df: conversationDF });
    console.log('classicication response', classificationResponse);
    if (!classificationResponse.includes('human')) {
      const completionResponse = getResponse({ responseType: completion, df: conversationDF });
      return completionResponse;
  }
  return null;
}

