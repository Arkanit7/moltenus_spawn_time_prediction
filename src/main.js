import './style.scss'

const TIME_AFTER_KILL_H = 72
const TIME_AFTER_RESTART_H = 36

const afterKillOutputEl = document.querySelector('.js-after-kill-time')
const afterRestartOutputEl = document.querySelector('.js-after-restart-time')

const afterKillCopyBtn = document.querySelector(
  '.js-after-kill-discord-time-copy-button',
)
const afterRestartCopyBtn = document.querySelector(
  '.js-after-restart-discord-time-copy-button',
)

const dateInputEl = document.querySelector('.js-date-input')

/** @param {number} dateInputEl */
function setCurrentTime(dateInputEl) {
  const currentTime = new Date()
  // Pad numbers to two digits
  const pad = (n) => n.toString().padStart(2, '0')
  const year = currentTime.getFullYear()
  const month = pad(currentTime.getMonth() + 1)
  const day = pad(currentTime.getDate())
  const hours = pad(currentTime.getHours())
  const minutes = pad(currentTime.getMinutes())
  // Format for datetime-local input
  const timeValue = `${year}-${month}-${day}T${hours}:${minutes}`
  dateInputEl.value = timeValue
}

const currentTimeBtn = document.querySelector('.js-current-time-button')
currentTimeBtn.addEventListener('click', () => {
  setCurrentTime(dateInputEl)
  emitDateChange({currentTarget: dateInputEl})
})

/** @param {number} hoursPassed */
function handleCopyTimeToClipboard(hoursPassed) {
  const time = dateInputEl.value
  const date = new Date(time)
  const newDate = getDateAfterHoursPassed(hoursPassed, date)
  const discordTimestamp = convertDateToDiscordTimestamp(newDate)
  navigator.clipboard.writeText(discordTimestamp)
}

afterKillCopyBtn.addEventListener('click', () =>
  handleCopyTimeToClipboard(TIME_AFTER_KILL_H),
)
afterRestartCopyBtn.addEventListener('click', () =>
  handleCopyTimeToClipboard(TIME_AFTER_RESTART_H),
)

/** @param {Date} date */
function convertDateToDiscordTimestamp(date) {
  const milliseconds = date.getTime()
  const seconds = Math.round(milliseconds / 1000)

  return `<t:${seconds}:f>`
}

/** @param {Date} newDate */
function updateDate(targetEl, newDate) {
  const dateTimeFormatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: 'long',
    timeStyle: 'short',
  })
  targetEl.textContent = dateTimeFormatter.format(newDate)
}

/**
 * @param {number} hoursPassed
 * @param {Date} date
 * @returns {Date}
 */
function getDateAfterHoursPassed(hoursPassed, date) {
  const newDate = structuredClone(date)
  newDate.setHours(newDate.getHours() + hoursPassed)

  return newDate
}

function emitDateChange({currentTarget}) {
  const time = currentTarget.value
  const date = new Date(time)

  const dateAfterKill = getDateAfterHoursPassed(TIME_AFTER_KILL_H, date)

  const dateAfterRestart = getDateAfterHoursPassed(TIME_AFTER_RESTART_H, date)

  updateDate(afterKillOutputEl, dateAfterKill)
  updateDate(afterRestartOutputEl, dateAfterRestart)
}

dateInputEl.addEventListener('input', emitDateChange)

setCurrentTime(dateInputEl)
emitDateChange({currentTarget: dateInputEl})
