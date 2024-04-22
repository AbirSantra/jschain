const { CustomError } = require("./apiError");

exports.fieldExtractor = (body, requiredFields) => {
  const extractedFields = {};
  const missingFields = [];

  requiredFields.forEach((field) => {
    if (body[field] !== undefined) {
      extractedFields[field] = body[field];
    } else {
      missingFields.push(field);
    }
  });

  if (missingFields.length > 0) {
    throw new CustomError({
      status: 500,
      message: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }

  Object.keys(body).forEach((key) => {
    if (!(key in extractedFields)) {
      extractedFields[key] = body[key];
    }
  });

  return extractedFields;
};
