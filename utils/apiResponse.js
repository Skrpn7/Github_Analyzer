class ApiResponse {
  constructor({
    errorMessages = null,
    isSuccess = true,
    result = null,
    statusCode = 200,
    totalRecords = 0,
  } = {}) {
    this.errorMessages = errorMessages;
    this.isSuccess = isSuccess;
    this.result = result;
    this.statusCode = statusCode;
    this.totalRecords = totalRecords;
  }

  static success(
    result = null,
    totalRecords = 0,
    statusCode = 200
  ) {
    return new ApiResponse({
      isSuccess: true,
      result,
      statusCode,
      totalRecords,
    });
  }

  static error(
    errorMessages,
    statusCode = 500
  ) {
    return new ApiResponse({
      errorMessages: Array.isArray(errorMessages)
        ? errorMessages
        : [errorMessages],
      isSuccess: false,
      result: null,
      statusCode,
      totalRecords: 0,
    });
  }
}

module.exports = ApiResponse;