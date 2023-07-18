export function getTemperatureData(temperature: number) {
  return temperature >= 26 && temperature <= 29
    ? { color: '[#22c55e]', term: 'Ideal' }
    : temperature < 26
    ? { color: '[#3b82f6]', term: 'Fria' }
    : temperature > 29
    ? { color: '[#ef4444]', term: 'Quente' }
    : {}
}

export function getPHData(pH: number) {
  return pH >= 6.5 && pH <= 7.5
    ? { color: '[#22c55e]', term: 'Ideal' }
    : pH < 6.5
    ? { color: '[#f59e0b]', term: 'Ácido' }
    : pH > 29
    ? { color: '[#6366f1]', term: 'Alcalino' }
    : {}
}
