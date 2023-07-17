export function getTemperatureData(temperature: number) {
  return temperature >= 26 && temperature <= 29
    ? { color: 'green-500', term: 'Ideal' }
    : temperature < 26
    ? { color: 'blue-500', term: 'Fria' }
    : temperature > 29
    ? { color: 'red-500', term: 'Quente' }
    : {}
}

export function getPHData(pH: number) {
  return pH >= 6.5 && pH <= 7.5
    ? { color: 'green-500', term: 'Ideal' }
    : pH < 6.5
    ? { color: 'orange-500', term: 'Ácido' }
    : pH > 29
    ? { color: 'purple-500', term: 'Alcalino' }
    : {}
}
