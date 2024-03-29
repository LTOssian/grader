export enum ErrorMessageEnum {
  BAD_REQUEST = "Bad request.",
  FIELD_REQUIRED = "This field is required.",
  MULTIPLE_FIELDS_REQUIRED = "These fields are required.",
  INVALID_DATA = "Validation error. Check your credentials.",
  UNKNOWN_CLASS = "This ID does not match any class.",
  UNKNOWN_GRADE = "This ID does not match any grade.",
  UNKNOWN_GROUP = "This ID does not match any group.",
  UNKNOWN_ID = "This ID does not match.",
  UNKNOWN_STUDENT = "This ID does not match any student.",
  STUDENT_WITH_NO_CLASSES = "This student's group does not have classes.",
}

export enum MentionEnum {
  BAD_MENTION = "Attention.",
  NO_MENTION = "Sans mention.",
  GOOD_MENTION = "Bien.",
  VERY_GOOD_MENTION = "Très bien.",
  EXCELLENT_MENTION = "Félicitations.",
}
