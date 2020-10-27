const axios     = require("axios");
const responses = require("./lib/responses");

/**
* @author Joshua Commey
* @class Node JS mnotify connector
* @license MIT License
* htps://github.com/commisol/mnotify
*/
class mNotify{

	constructor(apiKey){
		if(!apiKey) {
			throw new Error("No API Key provided.");
		}
		/* Enabled API key */
		this.apiKey       = apiKey

		/* Base endpoint */
		this.baseEndpoint = "https://api.mnotify.com/api";
	}

	/**
	* @description Retrieve all your message templates.
	* @return {[type]} */
	async listTemplates(){
		return await this._get('template')
	}

	/**
	* @param {String}
	* @description Retrieve a specific message template with templateId as a parameter.
	* @return {Object} */
	async getTemplate(payload){
		return await this._get('template', payload)
	}

	/**
	* @param {String} title Title of message template
	* @param {String} content Content of message template
	* @description Add a message template with data. */
	async addTemplate(payload){
		return await this._post('template', payload)
	}
	
	/**
	* @description Update a Message Template
	* @field {int} id of message template to update
	* @field {String} title Title of message template
	* @field {String} content Content of message template
	* @return {[type]} */
	async updateTemplate(payload){
		return await this._put("template", payload)
	}

	async deleteTemplate(payload){
		return await this._delete("template", payload)
	}

	async listGroups(){
		return await this._get("group")
	}

	/**
	* @param  {[type]}
	* @return {[type]}
	*/
	async getGroup(payload){
		return await this._get("group", payload)
	}

	async addGroup(payload){
		return await this._post("group", payload)
	}

	async updateGroup(payload){
		const {id} = payload
		return await this._put("group/" + id, payload)
	}

	async deleteGroup(payload){
		return await this._delete("group", payload)
	}

	async listContacts(){
		return await this._get("contact")
	}

	async listGroupContacts(payload){
		return await this._get("contact/group", payload)
	}

	async getContact(payload){
		return await this._get("contact", payload)
	}

	/**
	* @param  {Object}
	* @field int group_id --> Id of group you want to save contact to @required
	* @field string phone --> Phone number of contact @required
	* @field string title --> Title of contact eg Mr, Dr, Miss etc @required
	* @field string firstname --> First name of contact @required
	* @field string lastname --> Last name of contact
	* @field string email --> Email name of contact
	* @field date dob --> Date of birth of contact in YYYY-MM-DD format
	* @return {Promise}
	*/
	async addContact(params){
		let {group_id} = params;
		return await this._post("contact" + "/" + group_id, {params})
	}

	/**
	* @param  {Object}
	* @field int id Contact id to update @required
	**/
	async updateContact(payload){
		const {id} = payload
		return await this._put("contact/"+id, payload)
	}

	/**
	 * @description Delete a specific contact with id and group_id as parameters
	 * @field id @require int  --> id of specified contact
	 * @field int @required group_id	--> id of group which contact belong
	 */
	async deleteContact(payload){
		return await this._delete("contact", payload)
	}

	async sendBulkSMS(payload){
		return await this._post("sms/quick", payload)
	}

	async sendGroupBulkSMS(payload){
		return await this._post("sms/group", payload)
	}

	async sendBulkCall(payload){
		return await this._post("voice/quick", payload)
	}
	async sendGroupBulkVoice(payload){
		return await this._post("voice/group", payload)
	}

	async registerSenderId(payload){
		return await this._post("senderid/register", payload)
	}

	/**
	* @return {[type]}
	*/
	async smsBalance(){
		return await this._get("balance/sms")
	}
	/**
	* @return {[type]}
	*/
	async voiceBalance(){
		return await this._get("balance/voice")
	}

	async deliveryReport(payload){
		return await this._get("campaign", payload)
	}

	async specificDeliveryReport(payload){
		return await this._get("status", payload)
	}

	async periodicDeliveryReport(payload){
		return await this._get("report", payload)
	}

	async voiceCallReport(payload){
		return await this._get("calls", payload)
	}

	async specificVoiceCallReport(payload){
		return await this._get("call-status", payload)
	}

	/**
	 * @description  Retrieves voice call report in between specified dates
	 * @field from date --> Date from in YYYY-MM-DD format
	 * @field to date --> Date to in YYYY-MM-DD format
	 */
	async periodicVoiceCallReport(payload){
		return await this._get("call-period", payload)
	}
			

	async _get(endpoint, params) {
		return await this._request("GET", endpoint, params)
		.then(response => response.data)
		.catch(e => { throw new Error(e.message) })
	}

	async _post(endpoint, params) {
		return await this._request("POST", endpoint, params)
		.then(response => response.data)
		.catch(e => { throw new Error(e.message) })
	}

	async _put(endpoint, params) {
		return await this._request("PUT", endpoint, params)
		.then(response => response.data)
		.catch(e => { throw new Error(e.message) })
	}

	async _delete(endpoint, params) {
		let {id} = params
		return await this._request("DELETE", endpoint + "/" + id, params)
		.then(response => response.data)
		.catch(e => { throw new Error(e.message) })
	}

	async _request(method, endpoint, payload){
		method = method || "GET";
		payload = Object.assign({key: this.apiKey}, payload)

		let url = this.baseEndpoint + "/" + endpoint
		let request;
		switch(method){
			default:
			case "GET":
				request = await axios.get(url, {params: payload})
				break;
			case "POST":
				request = await axios.post(url, payload)
				break;
			case "PUT":
				request = await axios.put(url, payload)
				break;
			case "DELETE":
				request = await axios.delete(url, {params: payload})
				break;
		}
		return request
	}
}

module.exports = mNotify;