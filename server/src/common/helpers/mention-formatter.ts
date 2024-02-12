import { MentionEnum } from "../constants";

export const mentionFormatter = (grade: number): string => {
  if (grade < 10) {
    return MentionEnum.BAD;
  } else if (grade < 13) {
    return MentionEnum.NO;
  } else if (grade < 15) {
    return MentionEnum.GOOD;
  } else if (grade < 16) {
    return MentionEnum.VERY_GOOD;
  } else {
    return MentionEnum.EXCELLENT;
  }
};
