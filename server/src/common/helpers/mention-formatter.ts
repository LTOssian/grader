import { MentionEnum } from "../constants";

export const mentionFormatter = (grade: number): string => {
  if (grade < 10) {
    return MentionEnum.BAD_MENTION;
  } else if (grade < 13) {
    return MentionEnum.NO_MENTION;
  } else if (grade < 15) {
    return MentionEnum.GOOD_MENTION;
  } else if (grade < 16) {
    return MentionEnum.VERY_GOOD_MENTION;
  } else {
    return MentionEnum.EXCELLENT_MENTION;
  }
};
