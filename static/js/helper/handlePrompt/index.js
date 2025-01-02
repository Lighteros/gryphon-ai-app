import commonService from "../../services/commonService";

export const toApiPrompt = async (userPrompt, stylePromp) => {
  if (userPrompt) {
    const rs = await commonService.translatePrompt(userPrompt).catch(() => {
      return null;
    });
    if (rs && rs.success) {
      userPrompt = rs.data;
    }
  }
  if (!stylePromp) return userPrompt;
  return stylePromp?.replace("{prompt}", userPrompt);
};
export const toApiNegativePrompt = async (userPrompt, stylePromp) => {
  if (userPrompt) {
    const rs = await commonService.translatePrompt(userPrompt);
    if (rs && rs.success) {
      userPrompt = rs.data;
    }
  } else {
    if (!stylePromp) {
      return undefined;
    }
  }
  if (!stylePromp) {
    return userPrompt;
  }
  return stylePromp + " " + userPrompt;
};
