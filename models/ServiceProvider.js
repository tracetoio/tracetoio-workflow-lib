'use strict';

const TTEntity = require('./TTEntity');

class ServiceProvider extends TTEntity {
  constructor(name, priKey) {
    super(name, priKey);
    
    this.ServiceCreditContract = this.w3.addContract('ServiceCredit', environment.TraceToServiceCredit.address, environment.TraceToServiceCredit.abi);
    this.ProfileContract = this.w3.addContract('ProfileToken', environment.TraceToProfileToken.address, environment.TraceToProfileToken.abi);
  }
  addResultContract(name, addr){
    return this.w3.addContract(name, addr, environment.TraceToProfileResult.abi);
  }
  getPubKey(contractIdx){
      return this.w3.callContractbyIdx(contractIdx, 'getPubKey');
  }
  setResultForProfile(contractIdx, profileId, result, decay, expire){
      return this.w3.sendToContractbyIdx(contractIdx, 'setResult', this.gasPrice*4, profileId, result, decay, expire);
  }
  getProfile(profileId){
      return this.w3.callContractbyIdx(this.ProfileContract, 'getProfile', profileId);
  }
  getPendingEvents(fromBlock='latest'){
    return this.w3.getAllContractEventbyId(this.ServiceCreditContract, fromBlock);
  }
  sign(msg){
    return this.w3.sign(msg);
  }
}

module.exports = ServiceProvider;