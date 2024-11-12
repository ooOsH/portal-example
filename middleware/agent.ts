import brokers from '@/src/brokers.csv'

export default defineNuxtRouteMiddleware((to) => {
  // Get agent store
  const agentStore = useAgent()
  try {
    if (to.query.agent) {
      // Get route param
      const agentId = to.query.agent
      // Find agent
      const findAgent = brokers.find((a: any) => a.hash === agentId)
      const agent = {
        agentNo: findAgent.id,
        agentCompanyName: findAgent.broker,
      }
      agentStore.setAgent(agent)
    } else if (agentStore.agent.agentNo !== '') {
      return true
    }
  } catch (error) {
    throw showError({
      statusCode: 404,
      fatal: true,
      message: 'No agent code provided or not found',
    })
  }
})
