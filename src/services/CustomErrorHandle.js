class CustomErrorHandle extends Error {
  constructor(statuscode, errMsg) {
    super();
    this.status = statuscode;
    this.msg = errMsg;
  }
  static alreadyExist(message) {
    return new CustomErrorHandle(409, message);
  }

  static wrongCredentials(message = "Invalid Credentials") {
    return new CustomErrorHandle(401, message);
  }
  static unAuthorizedError(message = "Un-Authorization Access") {
    return new CustomErrorHandle(401, message);
  }
  static notFound(message = "404 Not Found") {
    return new CustomErrorHandle(404, message);
  }
  static serverError(message = "Error!!!!!!") {
    return new CustomErrorHandle(500, message);
  }
}

export default CustomErrorHandle;
