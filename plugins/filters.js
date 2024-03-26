import Vue from 'vue'
const date = datetime => {
  const config = { hour12: true, dateStyle: 'full', timeStyle: 'short' }
  return new Date(datetime).toLocaleString('es-MX', config)
}
const shortDate = datetime => {
  const config = { hour12: true, dateStyle: 'short', timeStyle: 'short' }
  return new Date(datetime).toLocaleString('es-MX', config)
}
const roundPrice = price => {
  return price.toFixed(2)
}
const birthdate = datetime => {
  const config = { hour12: true, dateStyle: 'long' }
  return new Date(datetime).toLocaleString('es-MX', config)
}
const currency = (num) => {
  return parseFloat(num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}
const statusPlanification = (status) => {
  return status === 'primary' ? 'Disponible para captura' : (status === 'warning' ? 'Capturando' : (status === 'secondary' ? 'En revisión' : (status === 'medium' ? 'Rechazado' : (status === 'success' ? 'Aprobado' : 'Sin estado'))))
}

const generalStatus = (status) => {
  console.log(status)
  return status === 'Planificacion' ? 'Planificacion' : (status === 'Licitacion' ? 'Licitacion' : (status === 'Ejecucion' ? 'Ejecucion' : 'Sin estado'))
}
Vue.filter('date', date)
Vue.filter('shortDate', shortDate)
Vue.filter('birthdate', birthdate)
Vue.filter('currency', currency)
Vue.filter('statusPlanification', statusPlanification)
Vue.filter('generalStatus', generalStatus)
Vue.filter('roundPrice', roundPrice)
