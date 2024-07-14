class CustomErrorHandle extends Error {
  constructor(statuscode, errMsg) {
    super();
    this.status = statuscode;
    this.msg = errMsg;
  }
  static alreadyExist(message) {
    return new CustomErrorHandle(409, message);
  }
}

export default CustomErrorHandle;
