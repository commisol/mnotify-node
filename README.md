# mnotify-node
mNotify nodeJS Connector

Full documentation can be found at https://readthedocs.mnotify.com

## Installing

Using npm:

```bash
$ npm install mnotify-node --save
```

## Example

```js
const mNotifyNode = require('mnotify-node');
const mNotify = new mNotifyNode("<API_KEY>")

// Get balance
mNotify.smsBalance().then(balance => console.log(balance)) // {"status": "success", "balance": 4000, "bonus": 70} 

// Add Group
mNotify.addGroup({
  group_name: "Firends"
})
.then(response => console.log(response) // {"status": "success", "_id": "3"}

```

## Methods

```js
// Message Template Methods
listTemplates(){
getTemplate(payload)
addTemplate(payload)
updateTemplate(payload)
deleteTemplate(payload)

// Group Methods
listGroups(){
getGroup(payload)
addGroup(payload)
updateGroup(payload)
deleteGroup(payload)

// Contact Methods
listContacts(){
listGroupContacts(payload)
getContact(payload)
addContact(payload)
updateContact(payload)
deleteContact(payload)

// Campaign Methods
sendBulkSMS(payload)
sendGroupBulkSMS(payload)
sendBulkCall(payload)
sendGroupBulkVoice(payload)

// Sender Id Methods
registerSenderId(payload)

//Reports And Stats
smsBalance()
voiceBalance()
deliveryReport(payload)
specificDeliveryReport(payload)
periodicDeliveryReport(payload)
voiceCallReport(payload)
specificVoiceCallReport(payload)
periodicVoiceCallReport(payload)

```

See documentation (https://readthedocs.mnotify.com) for required `payload` fields

## License

[MIT](LICENSE)
