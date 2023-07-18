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
    color: '#737373'
  },
  booting: {
    status: 'Inicializando',
    description: 'O contralador está inicializando os sensores para se conectar ao servidor',
    color: '#84cc16'
  },
  idling: {
    status: 'Ocioso',
    description: 'O controlador não está realizando nenhuma tarefa ou registrando dados',
    color: '#3b82f6'
  },
  logging: {
    status: 'Registrando',
    description: 'O controlador está capturando os parâmetros para serem enviados ao servidor',
    color: '#22c55e'
  },
  restarting: {
    status: 'Reiniciando',
    description: 'Procedimento para reinicialiazção do controlador e sensores',
    color: '#f59e0b'
  },
  crashed: {
    status: 'Erro',
    description: 'Há algum problema com o controlador, se persistir, contate o administrador',
    color: '#ef4444'
  }
}

export function getControllerStatusMetadata(status: ControllerStatus) {
  return controllerStatusesMetadata[status] || controllerStatusesMetadata.unknown
}
