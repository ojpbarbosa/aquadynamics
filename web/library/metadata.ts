import { ControllerStatus } from './types'

const TEMPERATURE_IDEAL_MINIMUM = 20
const TEMPERATURE_IDEAL_MAXIMUM = 30

const PH_IDEAL_MINIMUM = 6.5
const PH_IDEAL_MAXIMUM = 7.5

export function getTemperatureMetadata(temperature: number) {
  return temperature >= TEMPERATURE_IDEAL_MINIMUM && temperature <= TEMPERATURE_IDEAL_MAXIMUM
    ? { color: '#22c55e', term: 'Ideal' }
    : temperature < TEMPERATURE_IDEAL_MINIMUM
    ? { color: '#3b82f6', term: 'Fria' }
    : temperature > TEMPERATURE_IDEAL_MAXIMUM
    ? { color: '#ef4444', term: 'Quente' }
    : { color: '', term: '' }
}

export function getPHMetadata(pH: number) {
  return pH >= PH_IDEAL_MINIMUM && pH <= PH_IDEAL_MAXIMUM
    ? { color: '#22c55e', term: 'Ideal' }
    : pH < PH_IDEAL_MINIMUM
    ? { color: '#f59e0b', term: 'Ácido' }
    : pH > PH_IDEAL_MAXIMUM
    ? { color: '#6366f1', term: 'Alcalino' }
    : { color: '', term: '' }
}

export const controllerStatusesMetadata = {
  unknown: {
    term: 'Sem informações',
    description: 'O servidor não está conectado ao controlador',
    color: '#737373'
  },
  booting: {
    term: 'Inicializando',
    description: 'O contralador está inicializando os sensores para se conectar ao servidor',
    color: '#84cc16'
  },
  idling: {
    term: 'Ocioso',
    description: 'O controlador não está realizando nenhuma tarefa ou registrando dados',
    color: '#3b82f6'
  },
  logging: {
    term: 'Registrando',
    description: 'O controlador está capturando os parâmetros para serem enviados ao servidor',
    color: '#22c55e'
  },
  restarting: {
    term: 'Reiniciando',
    description: 'Procedimento para reinicialiazção do controlador e sensores',
    color: '#f59e0b'
  },
  crashed: {
    term: 'Erro',
    description: 'Há algum problema com o controlador, se persistir, contate o administrador',
    color: '#ef4444'
  }
}

export function getControllerStatusMetadata(status: ControllerStatus) {
  return controllerStatusesMetadata[status] || controllerStatusesMetadata.unknown
}
