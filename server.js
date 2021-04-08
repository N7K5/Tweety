
const schedule = require('node-schedule');

const BOT= require("./bot")

const morning_rule = new schedule.RecurrenceRule();
morning_rule.hour = 7;
morning_rule.minute = 0;

const eve_rule = new schedule.RecurrenceRule();
eve_rule.hour = 18;
eve_rule.minute = 0;





const morning_job= schedule.scheduleJob(morning_rule, function() {
    BOT.post_quote()
    .then(e=> console.log(e))
    .catch(e => console.log(e))
})


const eve_job= schedule.scheduleJob(eve_rule, function() {
    BOT.post_ask_yourself()
    .then(e=> console.log(e))
    .catch(e => console.log(e))
})
