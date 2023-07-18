import { ControllerStatus } from './types'

export function getTemperatureMetadata(temperature: number) {
  return temperature >= 20 && temperature <= 30
    ? { color: '#22c55e', term: 'Ideal' }
    : temperature < 20
    ? { color: '#3b82f6', term: 'Fria' }
    : temperature > 30
    ? { color: '#ef4444', term: 'Quente' }
    : { color: '', term: '' }
}

export function getPHMetadata(pH: number) {
  return pH >= 6.5 && pH <= 7.5
    ? { color: '#22c55e', term: 'Ideal' }
    : pH < 6.5
    ? { color: '#f59e0b', term: 'Ácido' }
    : pH > 7.5
    ? { color: '#6366f1', term: 'Alcalino' }
    : { color: '', term: '' }
}

export const controllerStatusesMetadata = {
  unknown: {
    status: 'Sem informações',
    description: 'O servidor não está conectado ao controlador',
    bulletBackgroundColor: 'bg-neutral-500'
  },
  booting: {
    status: 'Inicializando',
    description: 'O contralador está inicializando os sensores e se conectando ao servidor',
    bulletBackgroundColor: 'bg-yellow-500'
  },
  idling: {
    status: 'Ocioso',
    description: 'O controlador não está realizando nenhuma tarefa ou registrando dados',
    bulletBackgroundColor: 'bg-blue-500'
  },
  logging: {
    status: 'Registrando',
    description: 'O controlador está capturando os parâmetros para serem enviados ao servidor',
    bulletBackgroundColor: 'bg-green-500'
  },
  restarting: {
    status: 'Reiniciando',
    description: 'Procedimento para reinicialiazção do controlador e sensores',
    bulletBackgroundColor: 'bg-orange-500'
  },
  crashed: {
    status: 'Erro',
    description: 'Há algum problema com o controlador, se persistir, contate o administrador',
    bulletBackgroundColor: 'bg-red-500'
  }
}

export function getControllerStatusMetadata(status: ControllerStatus) {
  return controllerStatusesMetadata[status] || controllerStatusesMetadata.unknown
}
