export default ({ app }) => {
  app.$moment.updateLocale('ja', {
    longDateFormat: {
      LL: 'M/D',
      LLL: 'M/D H:mm',
      LLLL: 'YYYY/M/D H:mm'
    }
  })

  app.$moment.updateLocale('en', {
    longDateFormat: {
      LL: 'MMM Do',
      LLL: 'MMM Do h:mm A',
      LLLL: 'ddd, MMM Do h:mm A'
    }
  })

  app.$moment.updateLocale('en', {})
}
